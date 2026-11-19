const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

async function render() {
  const output = path.join(__dirname, 'export');
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('requestfailed', request => errors.push(request.url()));
    await page.goto(pathToFileURL(path.join(__dirname, 'slides.html')).href);
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => Promise.all([...document.images].map(image => image.decode())));
    const slides = page.locator('.slide');
    const count = await slides.count();
    if (count !== 8) throw new Error('Expected eight slides.');
    if (errors.length) throw new Error(errors.join('\n'));
    const names = [];
    for (let index = 0; index < count; index++) {
      const name = 'gsi-' + String(index + 1).padStart(2, '0') + '.png';
      const png = await slides.nth(index).screenshot({ path: path.join(output, name) });
      if (png.readUInt32BE(16) !== 1080 || png.readUInt32BE(20) !== 1350) {
        throw new Error('Incorrect dimensions for ' + name);
      }
      names.push(name);
    }
    fs.copyFileSync(path.join(__dirname, 'caption.txt'), path.join(output, 'caption.txt'));
    await page.setViewportSize({ width: 1080, height: 675 });
    await page.evaluate(files => {
      const grid = document.createElement('main');
      grid.style.cssText = 'display:grid;grid-template-columns:repeat(4,270px);direction:ltr';
      grid.replaceChildren(...files.map(name => {
        const image = new Image();
        image.src = 'export/' + name;
        image.style.cssText = 'display:block;width:270px;height:337.5px';
        return image;
      }));
      document.body.replaceChildren(grid);
      return Promise.all([...document.images].map(image => image.decode()));
    }, names);
    await page.screenshot({ type: 'jpeg', quality: 94, path: path.join(__dirname, 'preview.jpg') });
    console.log('Eight validated 1080x1350 PNGs and a preview.');
  } finally {
    await browser.close();
  }
}

render().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
