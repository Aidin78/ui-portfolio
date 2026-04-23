//using smartmenu in phone and smartmenu in desktop
//init espiritmenu

initMenu()
function initMenu() {
    let smMenu = $('#espritmenu').clone();
    $('#espritmenu > ul').removeClass("sm sm-rtl sm-simple");
    (function (e) { new Mmenu(document.querySelector("#espritmenu"), { extensions: ["light", "shadow-page", "shadow-panels", "position-front", "position-right", "pagedim-black", "fx-panels-slide-100", "fx-listitems-slide"], navbars: [, !0], navbar: { add: !0, title: "منوی اصلی" } }, { clone: 0 }) }).apply(this, [jQuery]);

    $('.header__menu').append(smMenu);

    //fixing the more button for smart menu
    (function ($) {

        $.SmartMenus.prototype.old_init = $.SmartMenus.prototype.init;
        $.SmartMenus.prototype.init = function (refresh) {
            if (!refresh && !this.$root.hasClass('sm-vertical')) {
                var $originalItems = this.$root.children('li'),
                    $moreSub = this.$root.clone().removeAttr('id').removeAttr('class').addClass('dropdown-menu'),
                    $moreSubItems = $moreSub.children('li'),
                    $moreItem = $('<li><a href="#">بیشتر <span class="caret"></span></a></li>').append($moreSub).appendTo(this.$root),
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
                            while ($moreItem[0].offsetTop != $originalItems.eq(0)[0].offsetTop) {
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
        $('#espritmenu > .sm').smartmenus({
            mainMenuSubOffsetX: -1,
            subMenusSubOffsetX: 10,
            subMenusSubOffsetY: 0
        });
    });
}

//Initialing Lazyload
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
        element.src =
            "uploads/daneshbonyan/img/FailedLoad.png";
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
        callback_finish: callback_finish
    });
})();

//go-to-top
var btn = $('.go-top');
var header = document.querySelector('.sec__header');
$(window).scroll(function () {
    if ($(window).scrollTop() > 0) {
        header.classList.add('header-fixed');
    }
    else {
        header.classList.remove('header-fixed');
    }
    if ($(window).scrollTop() > 300) {
        btn.addClass('go-top--show');
    } else {
        btn.removeClass('go-top--show');
    }
});
btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
});

