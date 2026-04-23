// Variables
let siteRtl = document.querySelector("body").getAttribute("dir");
const mainMenu = document.querySelector("#espritmenu");
let menuTitle;
let moreTitle;
let menuPos, search;
if (siteRtl == "rtl") {
  menuTitle = "منوی اصلی";
  moreTitle = "بیشتر";
  menuPos = "right";
  search = "جستجو";
} else {
  menuTitle = "Main Menu";
  moreTitle = "More";
  menuPos = "left";
  search = "search";
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
  fixedMenu();
  removePageNumberForNews();
  let menuIsLoaded = setInterval(function () {
    if (document.querySelector(".mm-searchfield__input")) {
      addElementsToMenu();
      clearInterval(menuIsLoaded);
    }
  }, 100);
}

function initMenu() {
  let smMenu = $("#espritmenu").clone();

  // Making Mmenu for phone
  $("#espritmenu > ul").removeClass("sm sm-rtl sm-simple");
  initMmenu();
}

function initMmenu() {
  (function (e) {
    new Mmenu(mainMenu, { searchfield: { add: true, title: search }, extensions: ["light", "position-front", "position-" + menuPos], navbar: { add: !0, title: menuTitle } }, { clone: 0 });
  }.apply(this, [jQuery]));
}

function initSmMenu() {
  //fixing the more button for smart menu
  (function ($) {
    $.SmartMenus.prototype.old_init = $.SmartMenus.prototype.init;
    $.SmartMenus.prototype.init = function (refresh) {
      if (!refresh && !this.$root.hasClass("sm-vertical")) {
        var $originalItems = this.$root.children("li"),
          $moreSub = this.$root.clone().removeAttr("id").removeAttr("class").addClass("dropdown-menu"),
          $moreSubItems = $moreSub.children("li"),
          $moreItem = $('<li><a href="#">' + moreTitle + '<span class="caret"></span></a></li>')
            .append($moreSub)
            .appendTo(this.$root),
          self = this,
          vieportW,
          hiddenItems = [],
          hiddenMoreItems = [];
      }

      this.old_init(refresh);

      if (!refresh && !this.$root.hasClass("sm-vertical")) {
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
            if (
              !self.$root.hasClass("sm-vertical") &&
              (/^(left|right)$/.test(self.$firstLink.parent().css("float")) || self.$firstLink.parent().css("display") == "table-cell") &&
              $originalItems.eq(-1)[0].offsetTop != $originalItems.eq(0)[0].offsetTop
            ) {
              // show More item
              $moreItem.appendTo(self.$root);

              // while the More item is wrapped
              while ($moreItem[0].offsetTop != $originalItems.eq(0)[0].offsetTop) {
                hiddenItems.unshift($moreItem.prev("li").detach());
              }

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
          "load.smartmenus": function () {
            handleResize(true);
          },
          "resize.smartmenus": handleResize,
        });
      }
    };

    // Fix isCollapsible method
    $.SmartMenus.prototype.isCollapsible = function () {
      return this.$root.find("ul").eq(0).css("position") == "static";
    };
  })(jQuery);
  //initial smart menu in desktop devices
  $(function () {
    $("#espritmenu > .sm").smartmenus({
      mainMenuSubOffsetX: -1,
      subMenusSubOffsetX: 10,
      subMenusSubOffsetY: 0,
    });
  });
}

function initLazyLoad() {
  (function () {
    function logElementEvent(eventName, element) {
      console.log(Date.now(), eventName, element.getAttribute("data-src"));
    }

    var callback_enter = function (element) {
      logElementEvent("", element);
    };
    var callback_exit = function (element) {
      logElementEvent("", element);
    };
    var callback_loading = function (element) {
      logElementEvent("", element);
    };
    var callback_loaded = function (element) {
      logElementEvent("", element);
    };
    var callback_error = function (element) {
      logElementEvent("", element);
      element.src = "uploads/daneshbonyan/img/FailedLoad.png";
    };
    var callback_finish = function () {
      logElementEvent("", document.documentElement);
    };
    var callback_cancel = function (element) {
      logElementEvent("", element);
    };

    var ll = new LazyLoad({
      // Assign the callbacks defined above
      callback_enter: callback_enter,
      callback_exit: callback_exit,
      callback_cancel: callback_cancel,
      callback_loading: callback_loading,
      callback_loaded: callback_loaded,
      callback_error: callback_error,
      callback_finish: callback_finish,
    });
  })();
}

function goTopBtn() {
  var btn = $(".go-top");
  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn.addClass("go-top--show");
    } else {
      btn.removeClass("go-top--show");
    }
  });
  btn.on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "300");
  });
}

function fixedMenu() {
  var header = $(".header__menu-bar");
  $(window).scroll(function () {
    if ($(window).scrollTop() > 600) {
      header.addClass("header--animation");
      setTimeout(() => {
        header.addClass("header--fixed");
      }, 300);
    } else {
      header.removeClass("header--fixed");
      setTimeout(() => {
        header.removeClass("header--animation");
      }, 300);
    }
  });
}

function makeMenuLTR() {
  $(".sm-rtl").removeClass("sm-rtl");
}
// Remove News Page Number from Inside Pages
function removePageNumberForNews() {
  if ($("#es-content").length > 0) {
    if (document.getElementById("es-content").childNodes[0].textContent.search("لیست اخبار") != -1 || document.getElementById("es-content").childNodes[0].textContent.search("Page Number") != -1) {
      $("#es-content")
        .contents()
        .filter(function () {
          return this.nodeType == 3;
        })[0].nodeValue = "";
    }
  }
}
function initScrollbars() {
  const scrollbars = Array.from(document.querySelectorAll(".scrollbar"));
  scrollbars.forEach(function (elem) {
    OverlayScrollbars(elem, {});
  });
}
/// Specific Functions
document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 992) {
    const boxLinks = document.querySelector(".box-link__links");
    if (boxLinks) {
      const items = boxLinks.querySelectorAll(".box-link__item");
      const sizeOfItems = (Math.ceil(items.length / 2) - 1) * items[0].offsetWidth;
      const img = document.querySelector(".box-link__background");
      img.style.width = `calc(100% - ${sizeOfItems}px)`;
    }
  }
});
function addElementsToMenu() {
  $(".mm-searchfield__input input").attr("placeholder", search);
  $(".menu__close").on("click", function () {});
}

function removePageNumberForNews() {
  if ($("#es-content").length > 0) {
    if (document.getElementById("es-content").childNodes[0].textContent.search("لیست اخبار") != -1 || document.getElementById("es-content").childNodes[0].textContent.search("Page Number") != -1) {
      $("#es-content")
        .contents()
        .filter(function () {
          return this.nodeType == 3;
        })[0].nodeValue = "";
    }
  }
}
