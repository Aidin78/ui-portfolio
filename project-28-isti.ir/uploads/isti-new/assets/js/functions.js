//Initialing Lazyload
(function () {
  // Direction setting
  var lang = $("html")[0].lang;
  if (lang == "fa" || lang == "ar") {
    $("#espritmenu > ul").addClass("sm-rtl");
    $("html").attr("dir", "rtl");
    $menu_name = "منو";
  } else {
    $("html").attr("dir", "ltr");
    $menu_name = "Menu";
  }

  var lazyloading = new LazyLoad({});
}).apply(this, [jQuery]);

$(function () {
  $("#espritmenu > ul").smartmenus({
    subMenusSubOffsetX: 1,
    subMenusSubOffsetY: -8,
  });
});

// menu
if ($(window).width() < 992) {
  (function ($) {
    new Mmenu(
      document.querySelector("#espritmenu"),
      {
        extensions: ["theme-white", "shadow-page", "shadow-panels", "position-front", "position-right", "pagedim-black", "fx-panels-slide-100", "fx-listitems-slide"],
        navbars: [
          {
            position: "bottom",
            content: ["<div>ISTI</div>"],
          },
          ,
          true,
        ],
        navbar: {
          add: true,
          title: $menu_name,
        },
      },
      {
        clone: true,
      }
    );
  }).apply(this, [jQuery]);
}

//fixing the more button for smart menu

$.SmartMenus.prototype.old_init = $.SmartMenus.prototype.init;
$.SmartMenus.prototype.init = function (refresh) {
  if (!refresh && !this.$root.hasClass("sm-vertical")) {
    var $originalItems = this.$root.children("li"),
      $moreSub = this.$root.clone().removeAttr("id").removeAttr("class").addClass("dropdown-menu"),
      $moreSubItems = $moreSub.children("li"),
      $moreItem = $('<li><a href="#">بیشتر <span class="caret"></span></a></li>').append($moreSub).appendTo(this.$root),
      self = this,
      vieportW,
      hiddenItems = [],
      hiddenMoreItems = [];
  }

  this.old_init(refresh);

  if (!refresh && !this.$root.hasClass("sm-vertical")) {
    function handleResize() {
      var curWidth = $(window).width();
      if (vieportW !== curWidth) {
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
        if (!self.isCollapsible() && $originalItems.eq(-1)[0].offsetTop != $originalItems.eq(0)[0].offsetTop) {
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

    $(window).bind("load.smartmenus resize.smartmenus", handleResize);
  }
};

// jquery ui easing  --> just easeInOutExpo  that is what we need
// t: current time, b: begInnIng value, c: change In value, d: duration
$.easing.jswing = $.easing.swing;
$.extend($.easing, {
  def: "easeOutQuad",
  easeInOutExpo: function (x, t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
    return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
  },
});

$(document).ready(function () {
  $menuoffset = $(".menu-height").offset().top;
  $windowheight = $(window).height() - 700;

  // for fixed menu
  if ($(window).scrollTop() > $menuoffset) {
    $(".header").addClass("header--fixed");
  }

  // for fixed scrolltop button
  if ($(window).scrollTop() > $windowheight) {
    $("#scrolltop").addClass("scrolltop--show");
  }
  $(window).scroll(function () {
    // for fixed menu
    if ($(window).scrollTop() > $menuoffset) {
      $(".header").addClass("header--fixed");
    } else {
      $(".header").removeClass("header--fixed");
    }

    // for fixed scrolltop button
    if ($(window).scrollTop() > $windowheight) {
      $("#scrolltop").addClass("scrolltop--show");
    } else {
      $("#scrolltop").removeClass("scrolltop--show");
    }
  });

  $("#btn-search").click(function () {
    //  $(".search-area").addClass("search-area--opened");
    $(".new__search").toggleClass("new__search__active");
    $(this).toggleClass("open");
    $(".logo__box").toggleClass("searching");
  });
  $(".search-area__close-btn").click(function () {
    $(".search-area").removeClass("search-area--opened");
  });

  //action for fixed menu
  $("#scrolltop").click(function () {
    $("body,html").stop(!0).animate(
      {
        scrollTop: 0,
      },
      1e3,
      "easeInOutExpo"
    ),
      !1;
  });

  //actiom for blind area

  $(".blind__button,.blind__overlay").click(function () {
    $(".blind__button").toggleClass("blind__button--hidden");
    $(".blind-area").toggleClass("blind-area--show");
    $(".main-pusher").toggleClass("main-pusher--pushed");
    $(".blind__overlay").toggleClass("blind__overlay--show");
  });
});

$(document).ready(function () {
  $(".main__slider").flickity({
    wrapAround: true,
    cellAlign: "right",
    contain: "right",
    pageDots: true,
    prevNextButtons: true,
    rightToLeft: true,
    imagesLoaded: true,
    lazyLoad: true,
    groupCells: 1,
    arrowShape: "",
    autoPlay: 5000,
  });
  $(".gov__slider").flickity({
    wrapAround: true,
    cellAlign: "right",
    contain: "right",
    pageDots: false,
    prevNextButtons: true,
    rightToLeft: true,
    imagesLoaded: true,
    lazyLoad: true,
    groupCells: 1,
    arrowShape: "",
    autoPlay: 5000,
  });
  $(".news__slider").flickity({
    wrapAround: true,
    cellAlign: "right",
    contain: "right",
    pageDots: false,
    prevNextButtons: true,
    rightToLeft: true,
    imagesLoaded: true,
    lazyLoad: true,
    groupCells: 1,
    arrowShape: "",
    autoPlay: 5000,
  });
  $(".news__slider4").flickity({
    wrapAround: true,
    cellAlign: "right",
    contain: "right",
    pageDots: false,
    prevNextButtons: true,
    rightToLeft: true,
    imagesLoaded: true,
    lazyLoad: true,
    groupCells: 1,
    arrowShape: "",
    autoPlay: 7000,
  });
  $(".news__slider2").flickity({
    wrapAround: true,
    cellAlign: "right",
    contain: "right",
    pageDots: false,
    prevNextButtons: true,
    rightToLeft: true,
    imagesLoaded: true,
    lazyLoad: true,
    groupCells: 1,
    arrowShape: "",
    autoPlay: 4000,
  });
  $(".news__slider3").flickity({
    wrapAround: true,
    cellAlign: "right",
    contain: "right",
    pageDots: false,
    prevNextButtons: true,
    rightToLeft: true,
    imagesLoaded: true,
    lazyLoad: true,
    groupCells: 1,
    arrowShape: "",
    autoPlay: 6000,
  });
  $(' .news__slider [aria-hidden="true"]').removeAttr("aria-hidden");

  $(".news__slider").on("scroll.flickity", function (event, progress) {
    $('.news__slider [aria-hidden="true"]').removeAttr("aria-hidden");
  });
});

$(document).ready(function () {
  //color blind
  $(".blind__link").on("click", function () {
    $(".blind__link").each(function () {
      $("body").removeClass($(this).attr("id"));
    });
    if ($(this).hasClass("active")) {
      $(".blind__link").removeClass("active");
    } else {
      $(".blind__link").removeClass("active");
      $("body").addClass($(this).attr("id"));
      $(this).addClass("active");
    }
  });
  //end color blind
});

//text customizes

var texttags = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,pre,a,span,li");
var wordSpaceing;
var wsClicks = 0;
$("#addws").click(function () {
  wsClicks += 1;
  $("#subws").prop("disabled", false);
  if (wsClicks >= 3) {
    $(this).prop("disabled", true);
  }
  if (texttags && wsClicks <= 3) {
    texttags.forEach(function (elem) {
      wordSpaceing = parseInt($(elem).css("word-spacing"));
      wordSpaceing = wordSpaceing + 3;
      $(elem).css("word-spacing", String(wordSpaceing) + "px");
    });
  }
});
$("#subws").click(function () {
  wsClicks -= 1;
  $("#addws").prop("disabled", false);
  if (wsClicks <= -1) {
    $(this).prop("disabled", true);
  }
  if (texttags && wsClicks >= -1) {
    texttags.forEach(function (elem) {
      wordSpaceing = parseInt($(elem).css("word-spacing"));
      wordSpaceing = wordSpaceing - 3;
      $(elem).css("word-spacing", String(wordSpaceing) + "px");
    });
  }
});
$("#defws").click(function () {
  wsClicks = 0;
  $("#addws,#subws").prop("disabled", false);
  if (texttags) {
    texttags.forEach(function (elem) {
      $(elem).css("word-spacing", "");
    });
  }
});

var lineHeight;
var lhClicks = 0;
$("#addlh").click(function () {
  lhClicks += 1;
  $("#sublh").prop("disabled", false);
  if (lhClicks >= 3) {
    $(this).prop("disabled", true);
  }
  if (texttags && lhClicks <= 3) {
    texttags.forEach(function (elem) {
      lineHeight = parseInt($(elem).css("line-height"));
      lineHeight = lineHeight + 5;
      $(elem).css("line-height", String(lineHeight) + "px");
    });
  }
});
$("#sublh").click(function () {
  lhClicks -= 1;
  $("#addlh").prop("disabled", false);
  if (lhClicks <= -2) {
    $(this).prop("disabled", true);
  }
  if (texttags && lhClicks >= -2) {
    texttags.forEach(function (elem) {
      lineHeight = parseInt($(elem).css("line-height"));
      lineHeight = lineHeight - 5;
      $(elem).css("line-height", String(lineHeight) + "px");
    });
  }
});
$("#deflh").click(function () {
  $("#addlh,#sublh").prop("disabled", false);
  lhClicks = 0;
  if (texttags) {
    texttags.forEach(function (elem) {
      $(elem).css("line-height", "");
    });
  }
});

///////////
var fontsize;
var fsClicks = 0;
$("#addfs").click(function () {
  fsClicks += 1;
  $("#subfs").prop("disabled", false);
  if (fsClicks >= 3) {
    $(this).prop("disabled", true);
  }
  if (texttags && fsClicks <= 3) {
    texttags.forEach(function (elem) {
      fontsize = parseInt($(elem).css("font-size"));
      fontsize = fontsize + 1;
      $(elem).css("font-size", String(fontsize) + "px");
    });
  }
});
$("#subfs").click(function () {
  fsClicks -= 1;
  $("#addfs").prop("disabled", false);
  if (fsClicks <= -2) {
    $(this).prop("disabled", true);
  }
  if (texttags && fsClicks >= -2) {
    texttags.forEach(function (elem) {
      fontsize = parseInt($(elem).css("font-size"));
      fontsize = fontsize - 1;
      $(elem).css("font-size", String(fontsize) + "px");
    });
  }
});
$("#defs").click(function () {
  $("#addfs,#subfs").prop("disabled", false);
  fsClicks = 0;
  if (texttags) {
    texttags.forEach(function (elem) {
      $(elem).css("font-size", "");
    });
  }
});
/////////

$("#cur1").click(function () {
  $("body").css("cursor", "url(uploads/isti-new/assets/images/cursor-1.webp) , auto");
});
$("#cur2").click(function () {
  $("body").css("cursor", "url(uploads/isti-new/assets/images/cursor-2.webp) , auto");
});
$("#curdef").click(function () {
  $("body").css("cursor", "");
});

// Overlay scrollbars
$(function () {
  $(".number__box ").overlayScrollbars({
    scrollbars: {
      autoHide: "leave",
      autoHideDelay: 200,
      dragScrolling: true,
      clickScrolling: false,
      touchSupport: true,
    },
  });
});

// tabs action
$(function () {
  var tabItemClass = $(".sys-tabs__item");
  var tabPaneClass = $(".sys-tabs__pane");
  $target = "";
  tabItemClass.on("click", function (event) {
    event.preventDefault(); //prevents previous event
    $(this).find("a").addClass("active");
    $(this).siblings().find("a").removeClass("active");

    tabPaneClass.removeClass("show");
    $target = $(this).find("a").attr("href");
    $($target).addClass("show");
  });
});

$(document).ready(function () {
  //action for scroll links
  $(".scroll__link").click(function (e) {
    e.preventDefault();
    $section_offset = $($(this).attr("href")).offset().top;
    $("body,html")
      .stop(!0)
      .animate(
        {
          scrollTop: $section_offset - 150,
        },
        1e3,
        "easeInOutExpo"
      ),
      !1;
  });
});

$(".contact_search").on("keyup", function () {
  var value = $(this).val().toLowerCase();
  $temp = $(this).parent().parent().parent().attr("id");
  $("#" + $temp + " .number__box li").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
});

$(document).ready(function () {
  fontFlag = 0;
  $(".font-change").click(function () {
    if (!fontFlag) {
      fontFlag = 1;
      var newFontStyles = `
                @font-face {font-family: Sahel;src: url('/uploads/isti-new/assets/fonts/Sahel-FD.woff') format('woff');font-weight: normal;font-style: normal;font-display: swap;}
      			@font-face {font-family: Sahel;src: url('/uploads/isti-new/assets/fonts/Sahel-Bold-FD.woff') format('woff');font-weight: bold;font-style: normal;font-display: swap;}
      			@font-face {font-family: Sahel;src: url('/uploads/isti-new/assets/fonts/Sahel-SemiBold-FD.woff') format('woff');font-weight: 500;font-style: normal;font-display: swap;}
        
        		@font-face {font-family: Shabnam;src: url('/uploads/isti-new/assets/fonts/Shabnam-FD.woff') format('woff');font-weight: normal;font-style: normal;font-display: swap;}
      			@font-face {font-family: Shabnam;src: url('/uploads/isti-new/assets/fonts/Shabnam-Bold-FD.woff') format('woff');font-weight: bold;font-style: normal;font-display: swap;}
      			@font-face {font-family: Shabnam;src: url('/uploads/isti-new/assets/fonts/Shabnam-Medium-FD.woff') format('woff');font-weight: 500;font-style: normal;font-display: swap;}
                `;
      $(".newstyle").append(document.createTextNode(newFontStyles));
    }
    document.documentElement.style.setProperty("--istiFont", $(this).data("font"));
  });

  $(".font-color").change(function () {
    console.log("changed");
    var root = document.documentElement;
    if ($(this).attr("id") === "primary-color") root.style.setProperty("--pcolor", document.getElementById("primary-color").value);
    if ($(this).attr("id") === "secondary-color") root.style.setProperty("--scolor", document.getElementById("secondary-color").value);
    if ($(this).attr("id") === "tertiary-color") root.style.setProperty("--tcolor", document.getElementById("tertiary-color").value);
  });
  $(".font-color").click(function () {
    console.log("clicked");
  });
  // color darker func
  function ColorLuminance(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, "");
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;
    // convert to decimal and change luminosity
    var rgb = "#",
      c,
      i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
      rgb += ("00" + c).substr(c.length);
    }
    return rgb;
  }

  $(".bgcolorbtn").click(function () {
    $(".golden-cards,.last-links,.st-content").css("background-color", $(this).data("bgcolor"));
    $(".news, footer").css("background-image", "none");
    $(".news, footer").css("background-color", $(this).data("bgcolor2"));
  });
  $(".bgcolorbtndef").click(function () {
    $(".golden-cards,.last-links,.st-content").css("background-color", $(this).data("bgcolor"));
    $(".news").css("background-image", "url(uploads/tbtb/assets/images/news-bg.png");
    $("footer").css("background-color", $(this).data("bgcolor2"));
    $(".news").css("background-color", "");
  });
});

// counters
var counted = 0;
$(window).scroll(function () {
  if (document.getElementById("counters")) {
    var oTop = $("#counters").offset().top - window.innerHeight;
    if (counted == 0 && $(window).scrollTop() > oTop) {
      $(".count").each(function () {
        var $this = $(this),
          countTo = $this.attr("data-count");
        $({
          countNum: $this.text(),
        }).animate(
          {
            countNum: countTo,
          },

          {
            duration: 4000,
            easing: "swing",
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
              //alert('finished');
            },
          }
        );
      });
      counted = 1;
    }
  }
});

$(".miz__box").click(function (e) {
  e.preventDefault();
  $(".sub__miz2").toggleClass("open");
  $(this).toggleClass("open");
});

$(".openning_row").click(function (e) {
  e.preventDefault();
  $(this).parent().toggleClass("open");
  $(this).toggleClass("open");
});
