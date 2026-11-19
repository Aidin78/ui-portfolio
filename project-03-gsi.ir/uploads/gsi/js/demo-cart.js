(() => {
  const { books, find, details, money, number, digits } = window.GsiBooks;
  const cartKey = 'gsi-demo-cart-v2';
  const legacyKey = 'gsi-demo-book-quantity';
  const receiptKey = 'gsi-demo-receipt';
  const limit = 99;
  const items = document.querySelector('[data-cart-items]');
  const form = document.querySelector('.gsi-form');
  const receipt = document.querySelector('[data-cart-receipt]');
  const status = document.querySelector('[data-cart-status]');
  const trigger = document.querySelector('.header__cart');
  const panel = document.querySelector('#header-cart-panel');

  function setStatus(message) {
    if (status) status.textContent = message;
  }

  function positionPanel() {
    if (!panel || panel.hidden) return;
    const anchor = trigger.getBoundingClientRect();
    const width = Math.min(380, innerWidth - 30);
    panel.style.width = width + 'px';
    panel.style.left = Math.min(Math.max(15, anchor.left), innerWidth - width - 15) + 'px';
    panel.style.top = Math.max(15, anchor.bottom + 12) + 'px';
    panel.style.maxHeight = Math.max(120, innerHeight - anchor.bottom - 30) + 'px';
  }

  function closePanel(returnFocus = false) {
    if (!panel || panel.hidden) return;
    if (panel.matches(':popover-open')) panel.hidePopover();
    panel.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    if (returnFocus) trigger.focus();
  }

  trigger?.addEventListener('click', () => {
    if (!panel.hidden) return closePanel();
    panel.hidden = false;
    positionPanel();
    if (panel.showPopover) panel.showPopover();
    trigger.setAttribute('aria-expanded', 'true');
  });
  addEventListener('resize', positionPanel);
  addEventListener('scroll', positionPanel, true);
  panel?.querySelector('[data-close-cart]').addEventListener('click', () => closePanel(true));
  document.addEventListener('click', event => {
    const path = event.composedPath();
    if (panel && !path.includes(panel) && !path.includes(trigger)) closePanel();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && panel && !panel.hidden) {
      event.preventDefault();
      closePanel(true);
    }
  });
  document.addEventListener('focusin', event => {
    if (panel && !panel.contains(event.target) && !trigger.contains(event.target)) closePanel();
  });

  function renderHeader(entries) {
    if (!panel) return;
    const count = entries.reduce((sum, entry) => sum + entry.count, 0);
    const total = entries.reduce((sum, entry) => sum + entry.book.price * entry.count, 0);
    const badge = trigger.querySelector('[data-header-cart-count]');
    badge.textContent = '';
    badge.setAttribute('aria-hidden', 'true');
    badge.hidden = true;
    trigger.setAttribute('aria-label', count ? 'سبد خرید، ' + number(count) + ' کتاب' : 'سبد خرید خالی');
    panel.querySelector('[data-header-cart-items]').innerHTML = entries.length
      ? entries.map(({ book, count }) => `<div class="header-cart-item">
          <a href="${details(book)}">
            <img src="uploads/gsi/img/${book.cover}" width="40" height="54" alt="">
            <span><b>${book.title}</b><small>${number(count)} نسخه · ${money(book.price * count)}</small></span>
          </a>
          <button type="button" data-header-cart-remove="${book.id}" aria-label="حذف ${book.title} از سبد">حذف</button>
        </div>`).join('')
      : '<p class="header-cart-empty">سبد خرید خالی است.</p><a class="header-cart-browse" href="books.html">مرور کتاب‌ها و نشریات</a>';
    panel.querySelector('[data-header-cart-footer]').hidden = !count;
    panel.querySelector('[data-header-cart-total]').textContent = money(total);
  }

  function quantity(value) {
    const normalized = digits(value).trim();
    return /^\d+$/.test(normalized) ? Math.min(limit, Number(normalized)) : 0;
  }

  function validCart(value) {
    return Object.fromEntries(books.flatMap(book => {
      const count = quantity(value?.[book.id]);
      return book.price !== null && count > 0 ? [[book.id, count]] : [];
    }));
  }

  function readCart(fallback = {}) {
    try {
      const saved = localStorage.getItem(cartKey);
      if (saved !== null) return validCart(JSON.parse(saved));
      return validCart({ b1: localStorage.getItem(legacyKey) });
    } catch {
      return fallback;
    }
  }

  let cart = readCart();
  try {
    if (!localStorage.getItem('gsi-sample-cart-initialized')) {
      cart = { b1: 1, b2: 1, ...cart };
      localStorage.setItem(cartKey, JSON.stringify(cart));
      localStorage.setItem('gsi-sample-cart-initialized', 'true');
    }
  } catch {
    // Keep the in-memory sample usable when browser storage is unavailable.
  }

  function rows(cart) {
    return Object.entries(cart).map(([id, count]) => ({ book: find(id), count }));
  }

  function cartItem({ book, count }) {
    const title = book.title;
    return `<article class="shop-cart-item" data-cart-item="${book.id}">
      <a class="shop-cart-item__cover" href="${details(book)}" tabindex="-1" aria-hidden="true">
        <img src="uploads/gsi/img/${book.cover}" width="182" height="244" alt="">
      </a>
      <div class="shop-cart-item__body">
        <h3><a href="${details(book)}">${title}</a></h3>
        <p>قیمت واحد <b>${money(book.price)}</b></p>
        <div class="shop-cart-item__actions">
          <div class="shop-quantity" aria-label="تعداد ${title}">
            <button type="button" data-cart-action="minus" aria-label="کاهش تعداد ${title}" ${count === 1 ? 'disabled' : ''}>−</button>
            <input data-cart-quantity type="text" inputmode="numeric" value="${number(count)}" aria-label="تعداد ${title}">
            <button type="button" data-cart-action="plus" aria-label="افزایش تعداد ${title}" ${count === limit ? 'disabled' : ''}>+</button>
          </div>
          <button type="button" class="shop-text-button" data-cart-action="remove" aria-label="حذف ${title}">حذف</button>
        </div>
      </div>
      <strong class="shop-cart-item__total"><small>جمع این عنوان</small><span data-cart-line-total>${money(book.price * count)}</span></strong>
    </article>`;
  }

  function renderItems(entries) {
    for (const row of [...items.children]) {
      if (!cart[row.dataset.cartItem]) row.remove();
    }
    for (const { book, count } of entries) {
      const row = items.querySelector(`[data-cart-item="${book.id}"]`);
      if (!row) {
        items.insertAdjacentHTML('beforeend', cartItem({ book, count }));
        continue;
      }
      const input = row.querySelector('[data-cart-quantity]');
      const formatted = number(count);
      if (input.value !== formatted) input.value = formatted;
      row.querySelector('[data-cart-action="minus"]').disabled = count === 1;
      row.querySelector('[data-cart-action="plus"]').disabled = count === limit;
      row.querySelector('[data-cart-line-total]').textContent = money(book.price * count);
    }
  }

  function render() {
    const entries = rows(cart);
    renderHeader(entries);
    let displayed = entries;
    if (receipt) {
      try {
        displayed = rows(validCart(JSON.parse(sessionStorage.getItem(receiptKey))));
      } catch {
        displayed = [];
      }
      receipt.querySelector('[data-receipt-empty]').hidden = displayed.length > 0;
      receipt.querySelector('[data-receipt-summary]').hidden = displayed.length === 0;
      receipt.querySelector('[data-receipt-items]').innerHTML = displayed.map(({ book, count }) =>
        `<div><dt>${book.title} × ${number(count)}</dt><dd>${money(book.price * count)}</dd></div>`
      ).join('');
    }
    const count = displayed.reduce((sum, entry) => sum + entry.count, 0);
    const total = displayed.reduce((sum, entry) => sum + entry.book.price * entry.count, 0);
    document.querySelectorAll('[data-cart-total]').forEach(el => { el.textContent = money(total); });
    document.querySelectorAll('[data-cart-count]').forEach(el => {
      el.textContent = el.closest('.publication-purchase') && !count ? '' : number(count);
    });
    document.querySelectorAll('[data-cart-layout]').forEach(el => { el.hidden = !entries.length; });
    const empty = document.querySelector('[data-cart-empty]');
    if (empty) empty.hidden = entries.length > 0;
    if (items) renderItems(entries);
    if (form) {
      form.hidden = !entries.length;
      setStatus(entries.length ? '' : 'سبد خرید خالی است.');
    }
  }

  function update(id, nextQuantity) {
    const saved = readCart(cart);
    const count = quantity(nextQuantity(saved[id] || 0));
    if (count) saved[id] = count;
    else delete saved[id];
    try {
      localStorage.setItem(cartKey, JSON.stringify(saved));
    } catch {
      setStatus('ذخیرهٔ سبد خرید در مرورگر امکان‌پذیر نیست.');
      return false;
    }
    cart = saved;
    render();
    return true;
  }

  const add = document.querySelector('[data-cart-add]');
  add?.addEventListener('click', () => {
    const book = find(add.dataset.cartAdd);
    if (!book || book.price === null) return;
    if (update(book.id, count => count + 1)) {
      setStatus(cart[book.id] === limit
        ? 'حداکثر تعداد این عنوان در سبد ' + number(limit) + ' نسخه است.'
        : 'کتاب به سبد خرید اضافه شد.');
    }
  });

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-quick-cart-add]');
    if (!button) return;
    const book = find(button.dataset.quickCartAdd);
    if (!book || book.price === null) return;
    if (update(book.id, count => count + 1)) {
      setStatus('«' + book.title + '» به سبد خرید اضافه شد.');
      const previous = button.textContent;
      button.textContent = 'اضافه شد ✓';
      button.disabled = true;
      setTimeout(() => {
        if (!button.isConnected) return;
        button.textContent = previous;
        button.disabled = false;
      }, 1400);
    }
  });

  panel?.addEventListener('click', event => {
    const remove = event.target.closest('[data-header-cart-remove]');
    if (!remove) return;
    const id = remove.dataset.headerCartRemove;
    if (update(id, () => 0)) {
      const next = panel.querySelector('[data-header-cart-remove]') || panel.querySelector('.header-cart-browse');
      next?.focus();
    }
  });

  items?.addEventListener('click', event => {
    const button = event.target.closest('[data-cart-action]');
    if (!button) return;
    const id = button.closest('[data-cart-item]').dataset.cartItem;
    const action = button.dataset.cartAction;
    const adjust = action === 'plus' ? count => count + 1 : count => Math.max(1, count - 1);
    if (!update(id, action === 'remove' ? () => 0 : adjust)) return;
    if (action === 'remove') {
      setStatus('کتاب از سبد خرید حذف شد.');
      const next = items.querySelector('[data-cart-action="remove"]') ||
        document.querySelector('[data-cart-empty] a');
      next?.focus();
    } else {
      setStatus('تعداد کتاب به‌روز شد.');
      const row = items.querySelector(`[data-cart-item="${id}"]`);
      (row.querySelector(`[data-cart-action="${action}"]:enabled`) || row.querySelector('input')).focus();
    }
  });

  items?.addEventListener('change', event => {
    if (!event.target.matches('[data-cart-quantity]')) return;
    const input = event.target;
    const id = input.closest('[data-cart-item]').dataset.cartItem;
    const count = quantity(input.value);
    if (!count) {
      input.value = number(cart[id]);
      setStatus('برای تعداد، عددی بین ۱ و ۹۹ وارد کنید.');
      return;
    }
    if (update(id, () => count)) setStatus('تعداد کتاب به‌روز شد.');
  });

  form?.addEventListener('submit', event => {
    event.preventDefault();
    cart = readCart(cart);
    if (!rows(cart).length) return render();
    try {
      sessionStorage.setItem(receiptKey, JSON.stringify(cart));
    } catch {
      setStatus('ساخت پیش‌نمایش سفارش در این مرورگر ممکن نیست.');
      return;
    }
    location.assign('basket_2.html');
  });

  function sync() {
    cart = readCart(cart);
    render();
  }
  addEventListener('pageshow', event => { if (event.persisted) sync(); });
  addEventListener('storage', event => { if (event.key === cartKey || event.key === null) sync(); });
  render();
})();
