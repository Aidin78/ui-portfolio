// Variables
const mainMenu = document.querySelector("#espritmenu");
let siteRtl = document.querySelector('body').getAttribute("dir");
let menuTitle;
let moreTitle;
if (siteRtl == "rtl") {
  menuTitle = "منوی اصلی";
  moreTitle = "بیشتر";
}
else {
  menuTitle = "Main Menu";
  moreTitle = "More";
}
// Event Listners
document.addEventListener("DOMContentLoaded", onPageLoad);

// Functions
function onPageLoad() {
  if (siteRtl != "rtl") {
    makeMenuLTR();
  }
  if (mainMenu) {
    initMenu();
  }
  initLazyLoad();
  goTopBtn();
  initScrollbars();
  initResponsiveSliders();
  initPageSearch();
  initListFilter();
  initPoll();
}

function initPoll() {
  const form = document.querySelector('.poll-form');
  if (!form) return;
  const feedback = form.querySelector('.poll-feedback');
  form.addEventListener('change', () => { feedback.textContent = ''; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    feedback.textContent = 'گزینهٔ شما انتخاب شد. ارسال رأی در نسخهٔ نمایشی فعال نیست.';
  });
}

function initMenu() {
  const desktopMenu = $(mainMenu).clone().removeAttr('id');

  // Making Mmenu for phone
  $('#espritmenu > ul').removeClass("sm sm-rtl sm-simple");
  initMmenu();

  // Add clone of menu for desktop menu
  $('.header__menu').append(desktopMenu);


  initSmMenu(desktopMenu.children('.sm'));
}

function initMmenu() {
  (function (e) { new Mmenu(mainMenu, { extensions: ["light", "shadow-page", "shadow-panels", "position-front", "position-right", "pagedim-black", "fx-panels-slide-100", "fx-listitems-slide"], navbars: [, !0], navbar: { add: !0, title: menuTitle } }, { clone: 0 }) }).apply(this, [jQuery]);
}

function initSmMenu(menu) {
  //fixing the more button for smart menu
  (function ($) {

    $.SmartMenus.prototype.old_init = $.SmartMenus.prototype.init;
    $.SmartMenus.prototype.init = function (refresh) {
      if (!refresh && !this.$root.hasClass('sm-vertical')) {
        var $originalItems = this.$root.children('li'),
          $moreSub = this.$root.clone().removeAttr('id').removeAttr('class').addClass('dropdown-menu'),
          $moreSubItems = $moreSub.children('li'),
          $moreItem = $('<li><a href="#">' + moreTitle + '<span class="caret"></span></a></li>').append($moreSub).appendTo(this.$root),
          self = this,
          vieportW,
          hiddenItems = [],
          hiddenMoreItems = [];
      }

      this.old_init(refresh);

      if (!refresh && !this.$root.hasClass('sm-vertical')) {
        function handleResize(force) {
          var curWidth = $(window).width();
          if (vieportW !== curWidth || force) {
            // hide More item
            $moreItem.detach();

            // show all main menu items
            $.each(hiddenItems, function () {
              $(this).appendTo(self.$root);
            });
            hiddenItems = [];

            // show all More sub items
            $.each(hiddenMoreItems, function () {
              $(this).prependTo($moreSub);
            });
            hiddenMoreItems = [];

            // if in desktop view and the last item is wrapped
            if (!self.$root.hasClass('sm-vertical') && (/^(left|right)$/.test(self.$firstLink.parent().css('float')) || self.$firstLink.parent().css('display') == 'table-cell') && $originalItems.eq(-1)[0].offsetTop != $originalItems.eq(0)[0].offsetTop) {
              // show More item
              $moreItem.appendTo(self.$root);

              // while the More item is wrapped
              while ($moreItem.prev('li').length && $moreItem[0].offsetTop != $originalItems.eq(0)[0].offsetTop) {
                hiddenItems.unshift($moreItem.prev('li').detach());
              };

              // hide proper More sub items
              $moreSubItems.slice(0, $moreSubItems.length - hiddenItems.length).each(function () {
                hiddenMoreItems.unshift($(this).detach());
              });
            }

            // save new viewport width
            vieportW = curWidth;
          }
        }
        handleResize();

        $(window).bind({
          'load.smartmenus': function () {
            handleResize(true);
          },
          'resize.smartmenus': handleResize
        });
      }
    };

    // Fix isCollapsible method
    $.SmartMenus.prototype.isCollapsible = function () {
      return this.$root.find('ul').eq(0).css('position') == 'static';
    };

  })(jQuery);
  //initial smart menu in desktop devices
  $(function () {
    menu.smartmenus({
      mainMenuSubOffsetX: -1,
      subMenusSubOffsetX: 10,
      subMenusSubOffsetY: 0
    });
  });
}

function initLazyLoad() {
  new LazyLoad();
}

function goTopBtn() {
  var btn = $('.go-top');
  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn.addClass('go-top--show');
    } else {
      btn.removeClass('go-top--show');
    }
  });
  btn.on('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  });

}

function fixedMenu() {
  var header = $('.sec__header .bottom');
  $(window).scroll(function () {
    if ($(window).scrollTop() > 600) {
      header.addClass('header--animation');
      setTimeout(() => {

        header.addClass('header--fixed');
      }, 300);
    } else {
      header.removeClass('header--fixed');
      setTimeout(() => {
        header.removeClass('header--animation');
      }, 300);
    }
  });
}

function makeMenuLTR() {
  $('.sm-rtl').removeClass("sm-rtl");
}

function initScrollbars() {
  const scrollbars = Array.from(document.querySelectorAll(".scrollbar"));
  scrollbars.forEach(function (elem) {
    OverlayScrollbars(elem, {});
  });
}

function initResponsiveSliders() {
  const sliders = [...document.querySelectorAll(
    '.areas-sec__slider, .products-sec__list, .banner__slider, .related-book__slider'
  )];
  if (!sliders.length) return;

  const rtl = siteRtl === 'rtl';
  const phone = matchMedia('(max-width: 575.98px)');
  const compact = matchMedia('(max-width: 991.98px)');
  function update() {
    sliders.forEach(slider => {
      const instance = Flickity.data(slider);
      if (slider.matches('.products-sec__list') && !compact.matches) {
        if (instance) instance.destroy();
        return;
      }
      const cellAlign = phone.matches ? 'center' : rtl ? 'right' : 'left';
      if (instance) {
        instance.options.cellAlign = cellAlign;
        if (slider.getClientRects().length) instance.resize();
        return;
      }
      new Flickity(slider, {
        wrapAround: true,
        pageDots: true,
        prevNextButtons: false,
        rightToLeft: rtl,
        cellAlign,
        imagesLoaded: true,
        groupCells: '100%'
      });
    });
  }

  phone.addEventListener('change', update);
  compact.addEventListener('change', update);
  $(document).on('shown.bs.tab', update);
  update();
}

function normalizeSearch(value) {
  return value.toLocaleLowerCase('fa')
    .replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/[\s\u200c]+/g, '');
}

function initPageSearch() {
  const form = document.querySelector('#searchmodal form');
  if (!form) return;
  const query = form.elements.q;
  const list = form.querySelector('.gsi-search-results');
  const pages = new Map();
  mainMenu.querySelectorAll('a[href$=".html"]').forEach(link => {
    pages.set(link.getAttribute('href'), link.textContent.trim());
  });
  for (const [url, label] of [
    ['assistants-info.html', 'معاونت اکتشاف مواد معدنی'],
    ['books-info.html', 'پارینه‌لرزه‌شناسی'],
    ['regurlations-info.html', 'اساسنامهٔ سازمان زمین‌شناسی کشور'],
    ['basket.html', 'سبد خرید نشریات']
  ]) pages.set(url, label);

  function showResults() {
    list.replaceChildren();
    const value = normalizeSearch(query.value);
    if (!value) return;
    for (const [url, label] of pages) {
      if (!normalizeSearch(label).includes(value)) continue;
      const link = document.createElement('a');
      link.href = url;
      link.textContent = label;
      const item = document.createElement('li');
      item.append(link);
      list.append(item);
    }
    if (!list.children.length) {
      const item = document.createElement('li');
      item.textContent = 'صفحه‌ای با این عنوان پیدا نشد.';
      list.append(item);
    }
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    showResults();
  });
  query.addEventListener('input', showResults);
  $('#searchmodal').on('shown.bs.modal', () => query.focus());
}

function initListFilter() {
  const form = document.querySelector('[data-list-filter]');
  if (!form) return;
  const items = [...document.querySelectorAll('[data-filter-item]')];
  const status = document.querySelector('[data-filter-status]');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const query = normalizeSearch(form.elements.title.value);
    let matches = 0;
    items.forEach(item => {
      item.hidden = !normalizeSearch(item.querySelector('[data-filter-title]').textContent).includes(query);
      if (!item.hidden) matches++;
    });
    status.textContent = matches ? '' : 'موردی با این عنوان پیدا نشد.';
  });
}

/*Dropdown Menu*/
$('.dropdown').click(function () {
  $(this).attr('tabindex', 1).focus();
  $(this).toggleClass('active');
  $(this).find('.dropdown-menu').slideToggle(300);
});
$('.dropdown').focusout(function () {
  $(this).removeClass('active');
  $(this).find('.dropdown-menu').slideUp(300);
});
$('.dropdown .dropdown-menu li').click(function () {
  $(this).parents('.dropdown').find('span').text($(this).text());
  $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
});
/*End Dropdown Menu*/


$('.dropdown-menu li').click(function () {
  var input = '<strong>' + $(this).parents('.dropdown').find('input').val() + '</strong>',
    msg = '<span class="msg">Hidden input value: ';
  $('.msg').html(msg + input + '</span>');
});
