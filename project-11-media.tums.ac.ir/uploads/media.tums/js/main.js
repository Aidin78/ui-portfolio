// Variables
let siteRtl = document.querySelector('body').getAttribute("dir");

// Event Listners
document.addEventListener("DOMContentLoaded", onPageLoad);

// Functions
function onPageLoad() {
    initLazyLoad();
    goTopBtn();

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