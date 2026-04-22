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
$('.burger-menu').on('click', openMenu)
$('.main-sidebar').on('click', function (e) { e.stopPropagation })
$('.back-shadow').on('click', closeMenu)
// Functions
function onPageLoad() {
    initDonughChart();

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
function initScrollbars() {
    const scrollbars = Array.from(document.querySelectorAll('.scrollbar'));
    scrollbars.forEach(function (elem) {
        OverlayScrollbars(elem, { autoUpdate: true });
    })
}
function initDonughChart() {
    if ($('.donough-charts').length > 0) {
        let count = 1;
        $('.donough-charts').each(function () {
            $(this).addClass('donught-' + count);
            var width = 60,
                height = 60;

            var outerRadius = width / 2;
            var innerRadius = 23;
            console.log($(this).attr('data-chart'))
            var data = [$(this).attr('data-chart')];
            var pie = d3.layout.pie().value(function (d) {
                return d;
            });

            var endAng = function (d) {
                return (d / 100) * Math.PI * 2;
            };

            var bgArc = d3.svg
                .arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .startAngle(0)
                .endAngle(Math.PI * 2);

            var dataArc = d3.svg
                .arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .cornerRadius(15)

            var svg = d3
                .select('.donught-' + count)
                .append("svg")

            var path = svg
                .selectAll("g")
                .data(pie(data))
                .enter()
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            path
                .append("path")
                .attr("d", bgArc)
                .style("stroke-width", 6)
                .attr("fill", "#D9E8F1");

            path
                .append("path")
                .attr("fill", "#FFB648")
                .transition()
                .ease("ease-in-out")
                .duration(750)
                .attrTween("d", arcTween);

            path
                .append("text")
                .attr("fill", "#fff")
                .attr("font-size", "14px")
                .attr("tex-anchor", "middle")
                .attr("x", 11
                )
                .attr("y", 6)
                .transition()
                .ease("ease-in-out")
                .duration(750)
                .attr("fill", "#FFB648")
                .text(data);

            path.append("text")
                .attr("fill", "#fff")
                .attr("class", "ratingtext")
                .attr("font-size", "12px")
                .attr("tex-anchor", "middle")
                .attr("x", -6)
                .attr("y", 6)
                .text('%')
                .transition()
                .ease("ease-in-out")
                .duration(750)
                .attr("fill", "#FFB648");

            function arcTween(d) {
                var interpolate = d3.interpolate(d.startAngle, endAng(d.data));
                return function (t) {
                    d.endAngle = interpolate(t);
                    return dataArc(d);
                };
            }
            count++;

        });
    }
}
function openMenu(e) {
    e.preventDefault();
    $('body').addClass('menu-active');
}
function closeMenu() {
    $('body').removeClass('menu-active');
}
function fixedMenu() {
    var lastScrollTop = 0;

    // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
    document.addEventListener("scroll", function () { // or window.addEventListener("scroll"....
        var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (st > lastScrollTop) {
            $('.page__header').addClass('hide');
        } else {
            $('.page__header').removeClass('hide');
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }, false);

}