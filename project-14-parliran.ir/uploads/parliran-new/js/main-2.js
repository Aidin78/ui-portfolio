// Variables
let siteRtl = document.querySelector('body').getAttribute("dir");
const mainMenu = document.querySelector("#espritmenu");
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
$('.header__search input').on('click', activeSearch);
$('.header__search ').on('click', function (event) { event.stopPropagation(); });
// Functions
function onPageLoad() {
    initMenu();
    initScrollbars();
    initLazyLoad();
    goTopBtn();
    removePageNumberForNews()
    changeFooterLinks();
    let menuIsLoaded = setInterval(function () {
        if (document.querySelector('.mm-searchfield__input')) {
            addElementsToMenu();
            clearInterval(menuIsLoaded);
        }
    }, 100)
}

function initMenu() {
    let smMenu = $('#espritmenu').clone();

    // Making Mmenu for phone
    $('#espritmenu > ul').removeClass("sm sm-rtl sm-simple");
    initMmenu();
}

function initMmenu() {
    (function (e) { new Mmenu(mainMenu, {searchfield:{add: true,  title: "جستجو"}, extensions: ["light", "position-front", "position-right",], navbar: { add: !0, title: menuTitle } }, { clone: 0 }) }).apply(this, [jQuery]);
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
        $('html, body').animate({ scrollTop: 0 }, '300');
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
// Remove News Page Number from Inside Pages
function removePageNumberForNews() {
    if ($('#es-content').length > 0) {
        if (document.getElementById("es-content").childNodes[0].textContent.search("لیست اخبار") != -1 || document.getElementById("es-content").childNodes[0].textContent.search("Page Number") != -1) {
            $('#es-content').contents().filter(function () {
                return this.nodeType == 3;
            })[0].nodeValue = ''
        }
    }
}

function initScrollbars() {
    const scrollbars = Array.from(document.querySelectorAll('.scrollbar'));
    scrollbars.forEach(function (elem) {
        OverlayScrollbars(elem, {});
    })
}


//Main Page
//Sliders Initial
function newsBottomCarousel() {
    if (document.querySelector('.news-bottom') != null) {
        if (window.innerWidth < 991.98) {
            $('.news-bottom').flickity({
                wrapAround: true,
                pageDots: false,
                prevNextButtons: false,
                rightToLeft: true,
                cellAlign: 'right',
                imagesLoaded: true,
                autoPlay: 5000
            });
        }
        else {
            if ($('.news-bottom').hasClass("flickity-enabled")) {
                $('.news-bottom').flickity('destroy');
            }
        }
    }
}
function newsCarousel() {
    if (document.querySelector('.news-slider') != null) {
        $('.news-slider').flickity({
            wrapAround: true,
            pageDots: true,
            prevNextButtons: false,
            rightToLeft: sliderRtl,
            imagesLoaded: true,
            lazyLoad: true,
            groupCells: 1,
            autoPlay: 5000
        });
    }
}
function fractionCarousel() {
    if (document.querySelector('.fraction__carousel') != null) {
        let fractionCarousel = $('.fraction__carousel');
        let fractionGroupCells = 3;
        if (window.innerWidth < 1229.98) {
            fractionGroupCells = '100%'
        }
        fractionCarousel.flickity({
            pageDots: true,
            prevNextButtons: true,
            rightToLeft: true,
            imagesLoaded: true,
            cellAlign: 'right',
            lazyLoad: true,
            groupCells: fractionGroupCells
        });

        let fractionCarouselCellNum = document.querySelectorAll('.fraction__cell').length;
        // Change arrow base on how many elements it has
        fractionCarousel.on('change.flickity', function (event, index) {
            $(fractionCarousel).removeClass("last in-between");
            console.log(index)
            // last cell
            if (index >= parseInt(fractionCarouselCellNum / 3) - 1) {
                $(fractionCarousel).addClass('last');
            }
            //first cell
            else if (index == 0) {

            }
            // cells in between
            else {
                $(fractionCarousel).addClass('in-between');

            }
        });
    }
}
function makeFractions() {
    let fractionSlider = $('.fraction__carousel');
    let items = document.querySelectorAll(".fraction__item:not(.fraction__item--disable)");
    console.log(items)
    let disabled = document.querySelectorAll('.fraction__item--disable');

    let slider = document.createElement('div');
    slider.classList.add('fraction__carousel');
    let cell = document.createElement('div');
    cell.classList.add('fraction__cell');
    let list = document.createElement('div');
    list.classList.add('fraction__list');
    $('fraction__carousel').html('')
    items.forEach(function (elem, index) {
        list.appendChild(elem);
        if ((index + 1) % 8 == 0 || index == items.length - 1) {
            console.log("here")
            cell.appendChild(list);
            slider.appendChild(cell);
            list = document.createElement('div');
            list.classList.add('fraction__list');
            cell = document.createElement('div');
            cell.classList.add('fraction__cell');
        }
    })
    $(fractionSlider).html('');
    $(fractionSlider).html($(slider).html());
    $(fractionSlider).after(disabled)
}
function commissionCarousel() {
    if (document.querySelector('.commission__carousel') != null) {
        if (window.innerWidth < 1229.98) {
            if ($('.commission__carousel').hasClass('flickity-enabled') == false) {
                let commissionCarousel = $('.commission__carousel');

                // Making Cells
                let items = document.querySelectorAll('.commission__item');

                let slider = document.createElement('div');
                slider.classList.add('commission__carousel');
                let cell = document.createElement('div');
                cell.classList.add('commission__cell');
                items.forEach(function (elem, index) {
                    cell.appendChild(elem);
                    if ((index + 1) % 3 == 0) {
                        slider.prepend(cell)
                        cell = document.createElement('div');
                        cell.classList.add('commission__cell');
                    }
                    else if (index == items.length) {
                        slider.prepend(cell)
                    }
                })

                $(commissionCarousel).html('');
                $(commissionCarousel).html($(slider).html());
                commissionCarousel.flickity({
                    pageDots: true,
                    prevNextButtons: false,
                    rightToLeft: true,
                    imagesLoaded: true,
                    cellAlign: 'right',
                    lazyLoad: true,
                    groupCells: '100%'
                });
            }
        }
        else {
            if (document.querySelector('.commission__cell') != null) {
                let items = document.querySelectorAll('.commission__item');
                $('.commission__carousel').flickity('destroy');
                $('.commission__carousel').html('');
                $('.commission__carousel').append(items);
            }
        }
    }

}
function friendsCarousel() {
    if (document.querySelector('.friends__carousel') != null) {
        if (window.innerWidth < 991.98) {
            if ($('.friends__carousel').hasClass('flickity-enabled') != true) {
                let friendsCarousel = $('.friends__carousel');
                // Making Cells
                let items = document.querySelectorAll('.friends__item');
                let slider = document.createElement('div');
                slider.classList.add('friends__carousel');
                let cell = document.createElement('div');
                cell.classList.add('friends__cell');
                items.forEach(function (elem, index) {
                    cell.appendChild(elem);
                    if ((index + 1) % 7 == 0) {
                        console.log(index)
                        slider.appendChild(cell);
                        cell = document.createElement('div');
                        cell.classList.add('friends__cell');
                    }
                    else if (index == items.length) {
                        slider.appendChild(cell);
                    }
                })
                $(friendsCarousel).html('');
                $(friendsCarousel).html($(slider).html());
                friendsCarousel.flickity({
                    pageDots: true,
                    prevNextButtons: false,
                    rightToLeft: true,
                    imagesLoaded: true,
                    cellAlign: 'right',
                    lazyLoad: true,
                    groupCells: 1
                });
            }
        }
        else {
            if ($('.friends__carousel').hasClass('flickity-enabled') == true) {
                $('.friends__carousel').flickity('destroy')
                let items = document.querySelectorAll('.friends__item');
                $('.friends__carousel').html('');
                $('.friends__carousel').append(items);
                OverlayScrollbars(document.querySelector('.friends__carousel'), {});
            }
        }
    }
}
function multimediaCarousel() {
    let multimediaCarousel = $('.multimedia__carousel');
    multimediaCarousel.flickity({
        pageDots: true,
        prevNextButtons: false,
        rightToLeft: true,
        imagesLoaded: true,
        cellAlign: 'right',
        lazyLoad: true,
        groupCells: 3
    });

    //Click on tabs
    $('.multimedia__tabs a').on('click', function () {
        setTimeout(() => {
            multimediaCarousel.flickity('resize');
        }, 200);
    })
}

function initScrollbarsDesktop() {
    if (window.innerWidth > 992) {
        const scrollbars = Array.from(document.querySelectorAll('.scrollbar-desktop'));
        scrollbars.forEach(function (elem) {
            OverlayScrollbars(elem, {});
        })
    }
}
function initScrollbarsPhone() {
    if (window.innerWidth < 991.98) {
        const scrollbars = Array.from(document.querySelectorAll('.scrollbar-phone'));
        scrollbars.forEach(function (elem) {
            OverlayScrollbars(elem, {});
        })
    }
}
function changeFooterLinks() {
    if (window.innerWidth < 991.98) {
        let links = document.querySelectorAll('.footer__left li');
        let container = document.querySelector('.footer__right ul');
        links.forEach(function (elem) {
            container.appendChild(elem);
        })
        document.querySelector('.footer__left').remove();
    }
}
function checkFirefox() {
    let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        // Firefox-related activities
        $('.activity__item').addClass('firefox');
    }
}
function addElementsToMenu() {
    $('.mm-searchfield__input input').attr("placeholder", "جستجو");

    let html = `
    <div class="menu__header">
        <a class="menu__close" href="#mm-0"></a>
        <a class="menu__login">ورود</a>
    </div>
    `;
    $('.mm-panel').prepend(html);
    $('.menu__close').on('click', function () {
    })
}
function activeSearch(e) {
    if ($('.header__search').hasClass('acitve')) {

    }
    else {
        $('.header__search').addClass('active');
    }
}
$(window).click(function () {
    //Hide the Search if visible
    $('.header__search').removeClass('active');
    $('.header__search input').attr('placeholder', 'جستجو')
    $('.header__search input').val('')
});
