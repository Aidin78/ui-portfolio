

(function ($) {
    $(document).ready(function () {
        $(".reset-colors").click(function () {
            $("body")
                .removeClass("website-color-1 website-color-2 website-color-3");
        });
        $(".website-color-1").click(function () {
            $("body").addClass("website-color-1").removeClass("website-color-2 website-color-3");
        });
        $(".website-color-2").click(function () {
            $("body").addClass("website-color-2").removeClass("website-color-1 website-color-3");
        });
        $(".website-color-3").click(function () {
            $("body").addClass("website-color-3").removeClass("website-color-1 website-color-2");
        });
    });
})(jQuery);


function hasClass(el, cls) {
    return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
}
var body = document.body;
var demos = document.querySelectorAll(".classes_list a");

[].forEach.call(demos, function (button) {
    button.addEventListener("click", function () {
        var c = this.getAttribute("id");

        if (hasClass(body, c)) {
            body.className = "";
            deactiveButton(this);
        } else {
            body.className = c;
            deactiveAllButtons();
            this.className += " active ";
        }
    });
});

function deactiveAllButtons() {
    [].forEach.call(demos, function (button) {
        deactiveButton(button);
    });
}

function deactiveButton(elem) {
    elem.className = elem.className.replace(" active ", "");
}
$("#blindness").on("click", function () { $("#menu-1").hasClass("menu-1--open") ? ($("#menu-1").removeClass("menu-1--open"), $(".color-back").removeClass("color-back--open")) : ($("#menu-1").addClass("menu-1--open"), $(".color-back").addClass("color-back--open")) }), $(".color-back").on("click", function () { $("#menu-1").removeClass("menu-1--open"), $(".color-back").removeClass("color-back--open") });




