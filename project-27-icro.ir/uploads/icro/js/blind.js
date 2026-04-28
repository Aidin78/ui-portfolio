
/*
*  Font Size Plugin
*/
(function (e, d, a, g) { var b = "rvFontsize", f = { targetSection: "body", store: false, storeIsDefined: !(typeof store === "undefined"), variations: 7, controllers: { append: true, appendTo: "body", showResetButton: false, template: "" } }; function c(j, i) { var h = this; h.element = j; h.options = e.extend({}, f, i); h._defaults = f; h._name = b; h.init() } c.prototype = { init: function () { var h = this, i = function () { h.defineElements(); h.getDefaultFontSize() }; i(); if (h.options.store === true && !(h.options.storeIsDefined)) { h.dependencyWarning() } }, dependencyWarning: function () { console.warn('When you difine "store: true", store script is required (https://github.com/ramonvictor/rv-jquery-fontsize/blob/master/js/store.min.js)') }, bindControlerHandlers: function () { var h = this; h.$decreaseButton = e(".rvfs-decrease"); if (h.$decreaseButton.length > 0) { h.$decreaseButton.on("click", function (j) { j.preventDefault(); var i = e(this); if (!i.hasClass("disabled")) { var k = h.getCurrentVariation(); if (k > 1) { h.$target.removeClass("rvfs-" + k); h.$target.attr("data-rvfs", k - 1); if (h.options.store === true) { h.storeCurrentSize() } h.fontsizeChanged() } } }) } h.$increaseButton = e(".rvfs-increase"); if (h.$increaseButton.length > 0) { h.$increaseButton.on("click", function (j) { j.preventDefault(); var i = e(this); if (!i.hasClass("disabled")) { var k = h.getCurrentVariation(); if (k < h.options.variations) { h.$target.removeClass("rvfs-" + k); h.$target.attr("data-rvfs", k + 1); if (h.options.store === true) { h.storeCurrentSize() } h.fontsizeChanged() } } }) } h.$resetButton = e(".rvfs-reset"); if (h.$resetButton.length > 0) { h.$resetButton.on("click", function (j) { j.preventDefault(); var i = e(this); if (!i.hasClass("disabled")) { var k = h.getCurrentVariation(); h.$target.removeClass("rvfs-" + k); h.$target.attr("data-rvfs", h.defaultFontsize); if (h.options.store === true) { h.storeCurrentSize() } h.fontsizeChanged() } }) } }, defineElements: function () { var h = this; h.$target = e(h.options.targetSection); if (h.options.controllers.append !== false) { var i = h.options.controllers.showResetButton ? '<a href="#" class="rvfs-reset btn" title="Default font size">A</a>' : ""; var k = h.options.controllers.template, j = ""; h.$appendTo = e(h.options.controllers.appendTo); if (e.trim(k).length > 0) { j = k } else { j = '<div class="btn-group"><a href="#" class="rvfs-decrease btn" title="Decrease font size">A-</a></li>' + i + '<a href="#" class="rvfs-increase btn" title="Increase font size">A+</a></li></div>' } h.$appendTo.html(j); h.bindControlerHandlers() } }, getDefaultFontSize: function () { var h = this, i = h.options.variations; h.defaultFontsize = 0; if (i % 2 === 0) { h.defaultFontsize = (i / 2) + 1 } else { h.defaultFontsize = parseInt((i / 2) + 1, 10) } h.setDefaultFontSize() }, setDefaultFontSize: function () { var h = this; if (h.options.store === true && h.options.storeIsDefined) { var i = store.get("rvfs") || h.defaultFontsize; h.$target.attr("data-rvfs", i) } else { h.$target.attr("data-rvfs", h.defaultFontsize) } h.fontsizeChanged() }, storeCurrentSize: function () { var h = this; if (h.options.storeIsDefined) { store.set("rvfs", h.$target.attr("data-rvfs")) } else { h.dependencyWarning() } }, getCurrentVariation: function () { return parseInt(this.$target.attr("data-rvfs"), 10) }, fontsizeChanged: function () { var h = this, i = h.getCurrentVariation(); h.$target.addClass("rvfs-" + i); if (i === h.defaultFontsize) { h.$resetButton.addClass("disabled") } else { h.$resetButton.removeClass("disabled") } if (i === h.options.variations) { h.$increaseButton.addClass("disabled") } else { h.$increaseButton.removeClass("disabled") } if (i === 1) { h.$decreaseButton.addClass("disabled") } else { h.$decreaseButton.removeClass("disabled") } } }; e.fn[b] = function (i) { var h = this; return h.each(function () { if (!e.data(h, "plugin_" + b)) { e.data(h, "plugin_" + b, new c(h, i)) } }) }; e[b] = function () { var h = e(d); return h.rvFontsize.apply(h, Array.prototype.slice.call(arguments, 0)) } })(jQuery, window, document);



(function ($) {
    $(document).ready(function () {
        $(".reset-colors").click(function () {
            $(".wrapper")
                .removeClass("website-color-1 website-color-2 website-color-3");
        });
        $(".website-color-1").click(function () {
            $(".wrapper").addClass("website-color-1").removeClass("website-color-2 website-color-3");
        });
        $(".website-color-2").click(function () {
            $(".wrapper").addClass("website-color-2").removeClass("website-color-1 website-color-3");
        });
        $(".website-color-3").click(function () {
            $(".wrapper").addClass("website-color-3").removeClass("website-color-1 website-color-2");
        });
    });
})(jQuery);


function hasClass(el, cls) {
    return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
}
var body = document.body.querySelector('.wrapper');
var demos = document.querySelectorAll(".classes_list a");

[].forEach.call(demos, function (button) {
    button.addEventListener("click", function () {
        var c = this.getAttribute("id");

        if (hasClass(body, c)) {
            body.className = "wrapper";
            deactiveButton(this);
        } else {
            body.className = "wrapper " + c;
            setTimeout(() => {
                this.className += " active ";
            }, 500);
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
$("#blindness").on("click", function (e) { e.preventDefault(); $("#menu-1").hasClass("menu-1--open") ? ($("#menu-1").removeClass("menu-1--open"), $(".color-back").removeClass("color-back--open")) : ($("#menu-1").addClass("menu-1--open"), $(".color-back").addClass("color-back--open")) }), $(".color-back").on("click", function () { $("#menu-1").removeClass("menu-1--open"), $(".color-back").removeClass("color-back--open") });



var texttags = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,pre,a,span,li');
var wordSpaceing;
var wsClicks = 0;
$("#addws").click(function () {
    wsClicks += 1;
    $("#subws").prop("disabled", false);
    if (wsClicks >= 3) { $(this).prop("disabled", true); }
    if (texttags && wsClicks <= 3) {
        texttags.forEach(function (elem) {
            wordSpaceing = parseInt($(elem).css("word-spacing"));
            wordSpaceing = wordSpaceing + 3;
            $(elem).css("word-spacing", String(wordSpaceing) + "px");
        })
    }
});
$("#subws").click(function () {
    wsClicks -= 1;
    $("#addws").prop("disabled", false);
    if (wsClicks <= -1) { $(this).prop("disabled", true); }
    if (texttags && wsClicks >= -1) {
        texttags.forEach(function (elem) {
            wordSpaceing = parseInt($(elem).css("word-spacing"));
            wordSpaceing = wordSpaceing - 3;
            $(elem).css("word-spacing", String(wordSpaceing) + "px");
        })
    }
});
$("#defws").click(function () {
    wsClicks = 0;
    $("#addws,#subws").prop("disabled", false);
    if (texttags) {
        texttags.forEach(function (elem) {
            $(elem).css("word-spacing", "");
        })
    }
});
var lineHeight;
var lhClicks = 0;
$("#addlh").click(function () {
    lhClicks += 1;
    $("#sublh").prop("disabled", false);
    if (lhClicks >= 3) { $(this).prop("disabled", true); }
    if (texttags && lhClicks <= 3) {
        texttags.forEach(function (elem) {
            lineHeight = parseInt($(elem).css("line-height"));
            lineHeight = lineHeight + 5;
            $(elem).css("line-height", String(lineHeight) + "px");
        })
    }
});
$("#sublh").click(function () {
    lhClicks -= 1;
    $("#addlh").prop("disabled", false);
    if (lhClicks <= -2) { $(this).prop("disabled", true); }
    if (texttags && lhClicks >= -2) {
        texttags.forEach(function (elem) {
            lineHeight = parseInt($(elem).css("line-height"));
            lineHeight = lineHeight - 5;
            $(elem).css("line-height", String(lineHeight) + "px");
        })
    }
});
$("#deflh").click(function () {
    $("#addlh,#sublh").prop("disabled", false);
    lhClicks = 0;
    if (texttags) {
        texttags.forEach(function (elem) {
            $(elem).css("line-height", "");
        })
    }
});

$("#cur1").click(function () {
    $('.body .wrapper').css("cursor", "url(/uploads/ivo/assets/images/cursor-1.png) , auto");
});
$("#cur2").click(function () {
    $('.body .wrapper').css("cursor", "url(/uploads/ivo/assets/images/cursor-2.png) , auto");
});
$("#curdef").click(function () {
    $('.body .wrapper').css("cursor", "");
});
$(document).ready(function () {
    //color blind
    $(".classes_list a").on("click", function () {

        $(".classes_list a").each(function () {
            $(".body .wrapper").removeClass($(this).attr("id"))
        })
        if ($(this).hasClass("active")) {
            $(".classes_list a").removeClass("active");
        } else {
            $(".classes_list a").removeClass("active");
            $(".body .wrapper").addClass($(this).attr("id"));
            $(this).addClass("active");
        }
    })
    //end color blind
    $('a[href*="https://]"]').attr('target', '_blank');
    $('a[href*="https://]').attr('target', '_blank');
    $.rvFontsize({
        targetSection: ".body .wrapper",
        store: false,
        variations: 7,
        controllers: {
            appendTo: ".font-resize",
            showResetButton: true,
            template: '<div class="btn-group">' +
                '<a href="#" class="rvfs-decrease btn">آ-</a>' +
                '<a href="#" class="rvfs-reset btn">آ</a>' +
                '<a href="#" class="rvfs-increase btn">آ+</a>' +
                '</div>'
        },
    });
});
