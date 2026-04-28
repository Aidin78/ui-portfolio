

$(function () {

    // Toggle Nav on Click
    $('.off-canvas__bars').click(function () {
        // Calling a function in case you want to expand upon this.
        toggleNav();
    });


});

function toggleNav() {
    if ($('.off-canvas__box').hasClass('.off-canvas__box--open')) {
        // Do things on Nav Close
        $('.off-canvas__box').removeClass('off-canvas__box--open');
    } else {
        // Do things on Nav Open
        $('.off-canvas__box').addClass('off-canvas__box--open');
    }
}

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
    $('#main-menu').smartmenus({
        mainMenuSubOffsetX: -1,
        subMenusSubOffsetX: 10,
        subMenusSubOffsetY: 0
    });
});

$(document).ready(function () {
    //resizing fonts
    document.querySelectorAll('p').forEach(element => {
        $(element).addClass('resizable');
    })
    document.querySelectorAll('a').forEach(element => {
        $(element).addClass('resizable');
    })
    document.querySelectorAll('h4').forEach(element => {
        $(element).addClass('resizable');
    })

    var resize = new Array('p', '.resizable');

    resize = resize.join(',');

    //increases font size when "+" is clicked
    $(".increase-font").click(function () {
        var originalFontSize = $(resize).css('font-size');
        var originalFontNumber = parseFloat(originalFontSize, 10);
        var newFontSize = originalFontNumber * 1.08;
        $(resize).css('font-size', newFontSize);
        return false;
    });

    //decrease font size when "-" is clicked

    $(".decrease-font").click(function () {
        var originalFontSize = $(resize).css('font-size');
        var originalFontNumber = parseFloat(originalFontSize, 10);
        var newFontSize = originalFontNumber * 0.92;
        $(resize).css('font-size', newFontSize);
        return false;
    });

});

var lastScrollTop = 0;
$(window).scroll(function (event) {
    var st = $(this).scrollTop();
    if (st > lastScrollTop) {
        document.getElementsByTagName("header")[0].style.top = "-100px";
    } else {
        document.getElementsByTagName("header")[0].style.top = "0px";
    }
    lastScrollTop = st;
});
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
            "uploads/subsites/img/FailedLophoto19.jpg";
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
$(document).ready(function () {

    setTimeout(function () {
        $('body').addClass('loaded');

    }, 3000);

});
$(document).ready(function (param) {
    var poll_containers = document.querySelectorAll('.poll-content');
    if (poll_containers) {
        poll_containers.forEach(function (elem) {
            var poll_items = elem.querySelectorAll('.answers .result ');
            var maxElem = '';
            var maxprecent = '0%';
            poll_items.forEach(function (item) {
                if (maxprecent < item.querySelector('.answers-value')) {
                    maxprecent = item.querySelector('.answers-value');
                    maxElem = item;
                }
            })
            $(maxElem).addClass('max-precent');
            console.log(maxElem)

        })
    }
})
$(document).ready(function (param) {

    var share_modal = document.querySelector('#share-box');
    share_modal.onclick = function (e) {
        var modal_back = document.querySelector('.modal-backdrop');
        modal_back.style.opacity = "0.4";
    }
    var search_modal = document.querySelector('.header__search');
    search_modal.onclick = function () {
        var modal_back = document.querySelector('.modal-backdrop');
        modal_back.style.opacity = "0.7";
    }
    var temp = document.querySelectorAll('.es-post-gallery__item')
    var temp2 = '';
    temp.forEach(function name(params) {
        temp2 += param
    })
})
$(document).ready(function () {
    function persianToEnglish(input) {
        var inputstring = input;
        var persian = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]
        var english = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        for (var i = 0; i < 10; i++) {
            var regex = new RegExp(persian[i], 'g');
            inputstring = inputstring.toString().replace(regex, english[i]);
        }
        return inputstring;
    }
    $('.calendar tbody td').on('click', function () {
        var day = this.getAttribute('date-day');
        if (parseInt(day) <= parseInt([query-result:day])) {
            var month = this.getAttribute('date-month');
            var year = this.getAttribute('date-year');
            window.open('[esprit:query:52]/صفحه:' + year + '/' + month + '/' + day);
        }
    });
    $('.calendar  .archive ').on('click', function (e) {
        e.preventDefault();
        var firstTd = document.querySelectorAll('.calendar td');
        var targetTd = '';

        firstTd.forEach(function (param) {
            if (param.getAttribute('date-month') != null) {
                targetTd = param;
                var month = param.getAttribute('date-month');
                var year = param.getAttribute('date-year');
                window.open('[esprit:query:52]/صفحه:' + year + '/' + month);
            }
        })
    })
    document.querySelectorAll('.calendar tbody td').forEach(function (e) {
        var month = e.getAttribute('date-month');
        var year = e.getAttribute('date-year');
        var day = e.getAttribute('date-day');
        if (parseInt(year) < parseInt([query-result:year])) {
            e.style = 'color:#00bcd4;cursor:pointer';
        }
        else if (parseInt(year) == parseInt([query-result:year])) {
            if (parseInt(month) < parseInt([query-result:month])) {
                e.style = 'color:#00bcd4;cursor:pointer';

            }
            else if (parseInt(month) == parseInt([query-result:month])) {
                if (parseInt(day) <= parseInt([query-result:day])) {
                    e.style = 'color:#00bcd4;cursor:pointer';
                }
            }
        }
    })
    $('.calendar__header .btn-next, .calendar__header .btn-prev').on('click', function () {

        document.querySelectorAll('.calendar tbody td').forEach(function (e) {
            var month = e.getAttribute('date-month');
            var year = e.getAttribute('date-year');
            var day = e.getAttribute('date-day');
            if (parseInt(year) < parseInt([query-result:year])) {
                e.style = 'color:#00bcd4;cursor:pointer';
                $('.calendar tbody td').on('click', function () {
                    var day1 = this.getAttribute('date-day');
                    var month1 = this.getAttribute('date-month');
                    var year1 = this.getAttribute('date-year');
                    window.open('[esprit:query:52]/صفحه:' + year1 + '/' + month1 + '/' + day1);
                });
            }
            else if (parseInt(year) == parseInt([query-result:year])) {
                if (parseInt(month) < parseInt([query-result:month])) {
                    e.style = 'color:#00bcd4;cursor:pointer';
                    $('.calendar tbody td').on('click', function () {
                        var day1 = this.getAttribute('date-day');
                        var month1 = this.getAttribute('date-month');
                        var year1 = this.getAttribute('date-year');
                        window.open('[esprit:query:52]/صفحه:' + year1 + '/' + month1 + '/' + day1);
                    });
                }
                else if (parseInt(month) == parseInt([query-result:month])) {
                    if (parseInt(day) <= parseInt([query-result:day])) {
                        e.style = 'color:#00bcd4;cursor:pointer';
                        $('.calendar tbody td').on('click', function () {
                            var day = this.getAttribute('date-day');
                            if (parseInt(day) <= parseInt([query-result:day])) {
                                var day1 = this.getAttribute('date-day');
                                var month1 = this.getAttribute('date-month');
                                var year1 = this.getAttribute('date-year');

                                window.open('[esprit:query:52]/صفحه:' + year1 + '/' + month1 + '/' + day1);
                            }
                        });
                    }
                }
            }
        })
    })
});