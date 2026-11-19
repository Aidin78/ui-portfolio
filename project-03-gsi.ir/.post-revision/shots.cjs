const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const source = path.resolve(process.env.GSI_SOURCE ||
  path.join(__dirname, '../../../ui-portfolio/project-03-gsi.ir'));
const assets = path.join(__dirname, 'assets');
const origin = 'http://gsi.local';
const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.png': 'image/png', '.jpg': 'image/jpeg'
};

async function capture() {
  fs.mkdirSync(assets, { recursive: true });
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 920 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
    await page.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.origin !== origin) return route.abort();
      const file = path.resolve(source, '.' + decodeURIComponent(url.pathname));
      if (!file.startsWith(source + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
        return route.fulfill({ status: 404 });
      }
      return route.fulfill({ path: file, contentType: mime[path.extname(file)] || 'application/octet-stream' });
    });

    async function shot(file, name, options = {}) {
      const response = await page.goto(origin + '/' + file);
      if (!response.ok()) throw new Error('Unable to load ' + file + ' from ' + source);
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => Promise.all(
        [...document.images].filter(img => img.getAttribute('src')).map(img => img.decode())
      ));
      await page.addStyleTag({ content: '.accessibility,.go-top{visibility:hidden!important} *{animation:none!important;transition:none!important}' });
      await page.evaluate(() => document.querySelectorAll('[data-src]').forEach(img => { img.src = img.dataset.src; }));
      await page.evaluate(() => document.querySelectorAll('.flickity-enabled')
        .forEach(slider => Flickity.data(slider)?.resize()));
      if (options.scroll) {
        await page.locator(options.scroll).evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
      }
      await page.waitForTimeout(350);
      const settings = { path: path.join(assets, name + '.png'), type: 'png' };
      if (options.crop) await page.locator(options.crop).screenshot(settings);
      else await page.screenshot(settings);
    }

    await shot('index.html', 'home-desktop');
    await shot('news.html', 'news-desktop', { scroll: '.breadcrumb__container' });
    await shot('eservice.html', 'services-desktop');
    await shot('books.html', 'books-desktop', { scroll: '.publication-layout' });
    await shot('books-info.html?book=b2', 'book-detail-desktop', { crop: '.publication-feature' });
    await page.setViewportSize({ width: 390, height: 844 });
    await shot('index.html', 'home-mobile');
    await shot('eservice.html', 'services-mobile');
    await shot('books.html', 'books-mobile');
    await shot('books-info.html?book=b2', 'book-detail-mobile');
  } finally {
    await browser.close();
  }
}

capture().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
