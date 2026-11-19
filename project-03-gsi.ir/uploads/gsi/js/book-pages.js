(() => {
  const { books, find, details, money, number, digits } = window.GsiBooks;
  const catalog = document.querySelector('[data-book-catalog]');
  const detail = document.querySelector('[data-book-detail]');

  function card(book, related = false) {
    return `<article class="publication-card" data-filter-item>
      <a class="publication-card__cover" href="${details(book)}" aria-hidden="true" tabindex="-1">
        <img src="uploads/gsi/img/${book.cover}" width="182" height="244" alt="">
        <span>${book.price === null ? 'نیازمند استعلام' : 'نسخهٔ چاپی'}</span>
      </a>
      <div class="publication-card__body">
        <p class="publication-meta">${book.subject}</p>
        <h2 data-filter-title><a href="${details(book)}">${book.title}</a></h2>
        ${book.credit ? `<p class="publication-credit">${book.credit}</p>` : ''}
        <div class="publication-card__bottom">
          <span class="publication-price"><small>قیمت نسخهٔ چاپی</small><strong>${money(book.price)}</strong></span>
          <div class="publication-card__actions">
            <a class="publication-link" href="${details(book)}" aria-label="مشاهده جزئیات ${book.title}">مشاهده</a>
            ${book.price !== null && !related ? `<button class="publication-quick-add" type="button" data-quick-cart-add="${book.id}">افزودن به سبد</button>` : ''}
          </div>
        </div>
      </div>
    </article>`;
  }

  if (catalog) {
    const form = document.querySelector('[data-book-filters]');
    const grid = catalog.querySelector('[data-book-grid]');
    const status = catalog.querySelector('[data-filter-status]');
    const activeFilters = catalog.querySelector('[data-active-filters]');
    const filters = document.querySelector('.publication-filters');
    const toggle = document.querySelector('[data-filter-toggle]');
    for (const subject of new Set(books.map(book => book.subject))) {
      form.elements.subject.add(new Option(subject, subject));
    }

    filters.classList.add('is-collapsible');
    function setFilterOpen(open) {
      filters.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'بستن فیلترها' : 'نمایش فیلترها';
    }
    setFilterOpen(false);
    toggle.addEventListener('click', () => setFilterOpen(!filters.classList.contains('is-open')));

    function renderChips(fields) {
      const values = [
        ['title', fields.title.value && 'عنوان: ' + fields.title.value],
        ['credit', fields.credit.value && 'پدیدآورنده: ' + fields.credit.value],
        ['subject', fields.subject.value && fields.subject.selectedOptions[0].textContent],
        ['price', fields.price.value && fields.price.selectedOptions[0].textContent],
        ['maximum', fields.maximum.value && 'تا ' + fields.maximum.value + ' ریال'],
        ['sort', fields.sort.value && fields.sort.selectedOptions[0].textContent]
      ].filter(([, label]) => label);
      activeFilters.replaceChildren(...values.map(([name, label]) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.clearFilter = name;
        button.textContent = label + ' ×';
        button.setAttribute('aria-label', 'حذف فیلتر ' + label);
        return button;
      }));
      activeFilters.hidden = values.length === 0;
    }

    function render(reportInvalid = false) {
      const fields = form.elements;
      const title = normalizeSearch(fields.title.value);
      const credit = normalizeSearch(fields.credit.value);
      const subject = fields.subject.value;
      const price = fields.price.value;
      const max = digits(fields.maximum.value).replace(/[٬,\s]/g, '').trim();
      const maxField = fields.maximum;
      maxField.setCustomValidity(max && !/^\d+$/.test(max) ? 'سقف قیمت را به عدد وارد کنید.' : '');
      if (!maxField.checkValidity()) {
        status.textContent = 'سقف قیمت را فقط به عدد وارد کنید.';
        if (reportInvalid) maxField.reportValidity();
        return;
      }
      const matches = books.filter(book =>
        normalizeSearch(book.title).includes(title) &&
        normalizeSearch(book.credit || '').includes(credit) &&
        (!subject || book.subject === subject) &&
        (!price || (book.price !== null) === (price === 'listed')) &&
        (!max || (book.price !== null && book.price <= Number(max)))
      );
      if (fields.sort.value === 'title') {
        matches.sort((a, b) => a.title.localeCompare(b.title, 'fa'));
      } else if (fields.sort.value === 'price') {
        matches.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
      }
      grid.innerHTML = matches.length ? matches.map(book => card(book)).join('') : `<div class="publication-empty-results">
        <h2>عنوانی پیدا نشد</h2><p>عبارت جست‌وجو یا فیلترها را تغییر دهید.</p>
        <button type="button" class="shop-outline-button" data-clear-all-filters>پاک کردن فیلترها</button>
      </div>`;
      status.textContent = matches.length ? number(matches.length) + ' عنوان از ' + number(books.length) + ' عنوان' : 'بدون نتیجه';
      renderChips(fields);
    }

    form.addEventListener('submit', event => {
      event.preventDefault();
      render(true);
    });
    let searchTimer;
    form.addEventListener('input', () => {
      form.elements.maximum.setCustomValidity('');
      clearTimeout(searchTimer);
      searchTimer = setTimeout(render, 180);
    });
    form.addEventListener('change', () => render());
    form.addEventListener('reset', () => requestAnimationFrame(render));
    function clearOne(event) {
      const button = event.target.closest('[data-clear-filter]');
      if (!button) return;
      event.preventDefault();
      form.elements[button.dataset.clearFilter].value = '';
      render();
    }
    activeFilters.addEventListener('pointerdown', clearOne);
    activeFilters.addEventListener('click', event => { if (event.detail === 0) clearOne(event); });
    function clearAll(event) {
      if (!event.target.closest('[data-clear-all-filters]')) return;
      event.preventDefault();
      form.reset();
    }
    grid.addEventListener('pointerdown', clearAll);
    grid.addEventListener('click', event => { if (event.detail === 0) clearAll(event); });
    render();
  }

  if (detail) {
    const id = new URLSearchParams(location.search).get('book');
    const book = find(id ?? 'b1');
    if (!book) {
      detail.innerHTML = '<div class="shop-empty"><h1>این عنوان در فهرست نیست</h1><a href="books.html">بازگشت به فهرست نشریات</a></div>';
      return;
    }
    document.title = book.title + ' | سازمان زمین‌شناسی و اکتشافات معدنی کشور';
    for (const [selector, value] of [
      ['meta[name="title"], meta[property="og:title"], meta[property="twitter:title"]', book.title],
      ['meta[name="description"], meta[property="og:description"], meta[property="twitter:description"]', book.description],
      ['meta[property="og:image"], meta[property="twitter:image"]', 'uploads/gsi/img/' + book.cover]
    ]) document.querySelectorAll(selector).forEach(meta => { meta.content = value; });
    detail.querySelector('[data-book-title]').textContent = book.title;
    detail.querySelector('[data-book-code]').textContent = 'کد مرجع ' + book.id.toUpperCase();
    detail.querySelector('[data-book-subject]').textContent = book.subject;
    detail.querySelector('[data-book-credit]').textContent = book.credit ? 'پدیدآورنده: ' + book.credit : 'نام پدیدآورنده در فهرست درج نشده است.';
    detail.querySelector('[data-book-description]').textContent = book.description;
    detail.querySelector('[data-book-price]').textContent = money(book.price);
    const cover = detail.querySelector('[data-book-cover]');
    cover.src = 'uploads/gsi/img/' + book.cover;
    cover.alt = 'جلد ' + book.title;
    const facts = [
      ['کد مرجع', book.id.toUpperCase()],
      ['موضوع', book.subject],
      ['زبان', 'فارسی'],
      ['نوع اثر', book.id === 'b5' ? 'کاتالوگ نقشه' : 'کتاب تخصصی'],
      ['قالب', 'چاپی'],
      ['نام درج‌شده در فهرست', book.credit || 'درج نشده'],
      ['سال انتشار', book.year || 'درج نشده'],
      ['تعداد صفحات', book.pages ? number(book.pages) : 'درج نشده'],
      ['شابک', book.isbn || 'درج نشده']
    ];
    const factsList = detail.querySelector('[data-book-facts]');
    for (const [label, value] of facts) {
      const row = document.createElement('div');
      const term = document.createElement('dt');
      const definition = document.createElement('dd');
      term.textContent = label;
      definition.textContent = value;
      row.append(term, definition);
      factsList.append(row);
    }
    const overview = detail.querySelector('[data-book-overview]');
    overview.querySelector('p').textContent = book.overview || book.description;
    overview.hidden = false;
    const add = detail.querySelector('[data-cart-add]');
    if (book.price !== null) {
      add.dataset.cartAdd = book.id;
      add.hidden = false;
    } else {
      detail.querySelector('[data-book-price-note]').hidden = false;
    }
    const related = books.filter(item => item.id !== book.id);
    const ordered = [...related.filter(item => item.subject === book.subject),
      ...related.filter(item => item.subject !== book.subject)];
    detail.querySelector('[data-related-books]').innerHTML = ordered.slice(0, 3).map(book => card(book, true)).join('');
  }
})();
