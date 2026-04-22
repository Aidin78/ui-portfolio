// Variables
let siteRtl = document.querySelector("body").getAttribute("dir");
const mainMenu = document.querySelector("#espritmenu");
let menuTitle;
let moreTitle;
if (siteRtl == "rtl") {
    menuTitle = "منوی اصلی";
    moreTitle = "بیشتر";
} else {
    menuTitle = "Main Menu";
    moreTitle = "More";
}
// Event Listners
document.addEventListener("DOMContentLoaded", onPageLoad);
$(".burger-menu").on("click", openMenu);
$(".main-sidebar").on("click", function (e) {
    e.stopPropagation;
});
$(".back-shadow").on("click", closeMenu);
$("input[type='password']").on("change", passwordsCheck);
// Functions
function onPageLoad() {
    initScrollbars();
    fixedMenu();
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
function initScrollbars() {
    const scrollbars = Array.from(document.querySelectorAll(".scrollbar"));
    scrollbars.forEach(function (elem) {
        OverlayScrollbars(elem, { autoUpdate: true });
    });
}
function openMenu(e) {
    e.preventDefault();
    $("body").addClass("menu-active");
}
function closeMenu() {
    $("body").removeClass("menu-active");
}
function fixedMenu() {
    var lastScrollTop = 0;

    // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
    document.addEventListener(
        "scroll",
        function () {
            // or window.addEventListener("scroll"....
            var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
            if (st > lastScrollTop) {
                $(".page__header").addClass("hide");
            } else {
                $(".page__header").removeClass("hide");
            }
            lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        },
        false
    );
}
function passwordsCheck() {
    if (this.value != "") {
        $(this).parent().children(".dot").addClass("deactive");
    } else {
        $(this).parent().children(".dot").removeClass("deactive");
    }
}

document.querySelector(".phone-menu__close").addEventListener("click", (e) => {
    e.preventDefault()
    fadeOut(document.querySelector(".phone-menu"))
})
document.querySelector(".mburger").addEventListener("click", (e) => {
    e.preventDefault()
    fadeIn(document.querySelector(".phone-menu"))
})

function fadeOut(element) {
    element.classList.add('hidden');
    // Optionally, remove the element from the DOM after the fade-out is complete
    setTimeout(function () {
        element.style.display = 'none';
    }, 100); // 1000ms matches the duration of the fade-out
}

function fadeIn(element) {
    setTimeout(function () {
        element.style.display = 'block';
    }, 100);
    element.classList.remove('hide'); // Make sure it's visible
    element.classList.remove('hidden'); // Fade in
}
window.onscroll = function () { stickyHeader() };

var header = document.querySelector(".header");
var headerHeight = header.offsetHeight;
var stickyPoint = headerHeight * 2;

function stickyHeader() {
    if (window.pageYOffset > stickyPoint) {
        if (!header.classList.contains("sticky")) {
            header.classList.add("sticky");
            document.querySelector(".wrapper ").style.paddingTop = headerHeight + 'px';
            setTimeout(() => {
                requestAnimationFrame(function () {
                    header.classList.add("show");
                });

            }, 50);
        }
    } else {
        header.classList.remove("sticky", "show");
        document.querySelector(".wrapper ").style.paddingTop = '0';
    }
}
const questionTitles = document.querySelectorAll('.question-item__title');

questionTitles.forEach(title => {
    title.querySelector("button").addEventListener('click', function () {
        document.querySelectorAll('.arrow').forEach(arrow => {
            arrow.classList.remove('reverse');
        });
        const arrow = title.querySelector('.arrow');
        if (arrow) {
            arrow.classList.toggle('reverse');
        }
    });
});