
/*
*  Font Size Plugin
*/
(function (e, d, a, g) { var b = "rvFontsize", f = { targetSection: "body", store: false, storeIsDefined: !(typeof store === "undefined"), variations: 7, controllers: { append: true, appendTo: "body", showResetButton: false, template: "" } }; function c(j, i) { var h = this; h.element = j; h.options = e.extend({}, f, i); h._defaults = f; h._name = b; h.init() } c.prototype = { init: function () { var h = this, i = function () { h.defineElements(); h.getDefaultFontSize() }; i(); if (h.options.store === true && !(h.options.storeIsDefined)) { h.dependencyWarning() } }, dependencyWarning: function () { console.warn('When you difine "store: true", store script is required (https://github.com/ramonvictor/rv-jquery-fontsize/blob/master/js/store.min.js)') }, bindControlerHandlers: function () { var h = this; h.$decreaseButton = e(".rvfs-decrease"); if (h.$decreaseButton.length > 0) { h.$decreaseButton.on("click", function (j) { j.preventDefault(); var i = e(this); if (!i.hasClass("disabled")) { var k = h.getCurrentVariation(); if (k > 1) { h.$target.removeClass("rvfs-" + k); h.$target.attr("data-rvfs", k - 1); if (h.options.store === true) { h.storeCurrentSize() } h.fontsizeChanged() } } }) } h.$increaseButton = e(".rvfs-increase"); if (h.$increaseButton.length > 0) { h.$increaseButton.on("click", function (j) { j.preventDefault(); var i = e(this); if (!i.hasClass("disabled")) { var k = h.getCurrentVariation(); if (k < h.options.variations) { h.$target.removeClass("rvfs-" + k); h.$target.attr("data-rvfs", k + 1); if (h.options.store === true) { h.storeCurrentSize() } h.fontsizeChanged() } } }) } h.$resetButton = e(".rvfs-reset"); if (h.$resetButton.length > 0) { h.$resetButton.on("click", function (j) { j.preventDefault(); var i = e(this); if (!i.hasClass("disabled")) { var k = h.getCurrentVariation(); h.$target.removeClass("rvfs-" + k); h.$target.attr("data-rvfs", h.defaultFontsize); if (h.options.store === true) { h.storeCurrentSize() } h.fontsizeChanged() } }) } }, defineElements: function () { var h = this; h.$target = e(h.options.targetSection); if (h.options.controllers.append !== false) { var i = h.options.controllers.showResetButton ? '<a href="#" class="rvfs-reset btn" title="Default font size">A</a>' : ""; var k = h.options.controllers.template, j = ""; h.$appendTo = e(h.options.controllers.appendTo); if (e.trim(k).length > 0) { j = k } else { j = '<div class="btn-group"><a href="#" class="rvfs-decrease btn" title="Decrease font size">A-</a></li>' + i + '<a href="#" class="rvfs-increase btn" title="Increase font size">A+</a></li></div>' } h.$appendTo.html(j); h.bindControlerHandlers() } }, getDefaultFontSize: function () { var h = this, i = h.options.variations; h.defaultFontsize = 0; if (i % 2 === 0) { h.defaultFontsize = (i / 2) + 1 } else { h.defaultFontsize = parseInt((i / 2) + 1, 10) } h.setDefaultFontSize() }, setDefaultFontSize: function () { var h = this; if (h.options.store === true && h.options.storeIsDefined) { var i = store.get("rvfs") || h.defaultFontsize; h.$target.attr("data-rvfs", i) } else { h.$target.attr("data-rvfs", h.defaultFontsize) } h.fontsizeChanged() }, storeCurrentSize: function () { var h = this; if (h.options.storeIsDefined) { store.set("rvfs", h.$target.attr("data-rvfs")) } else { h.dependencyWarning() } }, getCurrentVariation: function () { return parseInt(this.$target.attr("data-rvfs"), 10) }, fontsizeChanged: function () { var h = this, i = h.getCurrentVariation(); h.$target.addClass("rvfs-" + i); if (i === h.defaultFontsize) { h.$resetButton.addClass("disabled") } else { h.$resetButton.removeClass("disabled") } if (i === h.options.variations) { h.$increaseButton.addClass("disabled") } else { h.$increaseButton.removeClass("disabled") } if (i === 1) { h.$decreaseButton.addClass("disabled") } else { h.$decreaseButton.removeClass("disabled") } } }; e.fn[b] = function (i) { var h = this; return h.each(function () { if (!e.data(h, "plugin_" + b)) { e.data(h, "plugin_" + b, new c(h, i)) } }) }; e[b] = function () { var h = e(d); return h.rvFontsize.apply(h, Array.prototype.slice.call(arguments, 0)) } })(jQuery, window, document);

let address = "uploads/ipo-new";

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
    button.addEventListener("click", function (e) {
        e.preventDefault();
        var c = this.getAttribute("id");

        if ($(this).hasClass('active')) {
            body.className = "wrapper";
            $(this).removeClass('active');
            console.log('remove')
        } else {
            console.log('add')
            body.className = "wrapper " + c;
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
$("#blindness").on("click", function (e) { e.preventDefault(); $("#menu-1").hasClass("menu-1--open") ? ($("#menu-1").removeClass("menu-1--open"), $(".color-back").removeClass("color-back--open")) : ($("#menu-1").addClass("menu-1--open"), $(".color-back").addClass("color-back--open")) }), $(".color-back").on("click", function () { $("#menu-1").removeClass("menu-1--open"), $(".color-back").removeClass("color-back--open") });




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
    $('body').css("cursor", "url(/uploads/zaums/img/cursor-1.png) , auto");
});
$("#cur2").click(function () {
    $('body').css("cursor", "url(/uploads/zaums/img/cursor-2.png) , auto");
});
$("#curdef").click(function () {
    $('body').css("cursor", "");
});
$(document).ready(function () {
    //color blind

    //end color blind
    $('a[href*="https://]"]').attr('target', '_blank');
    $('a[href*="https://]').attr('target', '_blank');
    $.rvFontsize({
        targetSection: "body",
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

$(document).ready(function () {

    const disabledMenu = document.querySelector('.accessibility__menu');
    let fontSize = 100;
    let shbnamAdded = false;
    const shabnamFonts = `@font-face {font-family: Pinar;src: url('${address}/fonts/Shabnam-FD.woff') format('woff');font-weight: normal;font-style: normal;font-display: swap;} @font-face {font-family: Shabnam;src: url('${address}/fonts/Shabnam-Bold-FD.woff') format('woff');font-weight: bold;font-style: normal;font-display: swap;} @font-face {font-family: Shabnam;src: url('${address}/fonts/Shabnam-Medium-FD.woff') format('woff');font-weight: 500;font-style: normal;font-display: swap;}`;
    let sahelAdded = false;
    const sahelFonts = `@font-face {font-family: Pinar;src: url('${address}/fonts/Sahel-FD.woff') format('woff');font-weight: normal;font-style: normal;font-display: swap;} @font-face {font-family: Sahel;src: url('${address}/fonts/Sahel-Bold-FD.woff') format('woff');font-weight: bold;font-style: normal;font-display: swap;} @font-face {font-family: Sahel;src: url('${address}/fonts/Sahel-SemiBold-FD.woff') format('woff');font-weight: 500;font-style: normal;font-display: swap;}`;


    disabledMenu.addEventListener('click', function (e) {
        //Making fonts Bigger
        if (e.target.classList.contains('rvfs-increase')) {
            fontSize += 5;
            document.body.style.fontSize = fontSize + '%';
        }
        //Reset fonts 
        if (e.target.classList.contains('rvfs-reset')) {
            fontSize = 100;
            document.body.style.fontSize = fontSize + '%';
        }
        //Making fonts smaller
        if (e.target.classList.contains('rvfs-decrease')) {
            fontSize -= 5;
            document.body.style.fontSize = fontSize + '%';
        }
        //Mouse bigger
        if (e.target.id == 'cur1') {
            document.body.style.cursor = 'url("' + address + '/img/cursor-1.png"), auto';
        }
        //Mouse Reset
        if (e.target.id == 'curdef') {
            document.body.style.cursor = '';
        }
        //Mouse smaller
        if (e.target.id == 'cur2') {
            document.body.style.cursor = 'url("' + address + '/img/cursor-2.png"), auto';
        }
        //Text Color One
        if (e.target.id == 'primary-color') {
            document.querySelector('head').innerHTML += `
            <style purpose="color change">
                :root {--black-text-color: ${e.target.value} !important; --primary-color: ${e.target.value} !important;}
                .text__dark,.text__blue, bofy {color: ${e.target.value} !important;}
            </style>`;
        }
        //Text Color two
        if (e.target.id == 'secondary-color') {
            document.querySelector('head').innerHTML += `
            <style purpose="color change">
                :root {--white-text-color: ${e.target.value} !important; --secondary-color: ${e.target.value} !important;}
                .text__white, nav.mega-menu > ul > li > a{color:  ${e.target.value} !important;}
            </style>`;
        }

        //Fonts Change
        if (e.target.id == 'Sahel') {
            if (!sahelAdded) {
                sahelAdded = true;
                document.querySelector('head').innerHTML += `<style>${sahelFonts}</style>`;
            }
            document.body.style.fontFamily = 'Sahel';
        }
       
        if (e.target.id == 'Vazir') {
            document.body.style.fontFamily = ' Vazir FD';
        }
        if (e.target.id == 'Shabnam') {
            if (!shbnamAdded) {
                shbnamAdded = true;
                document.querySelector('head').innerHTML += `<style>${shabnamFonts}</style>`;
            }
            document.body.style.fontFamily = 'Shabnam';
        }



        if (e.target.id == 'bgcolor1') {
            document.querySelector('.wrapper').style.background = "#fff";
            $('.wrapper .sec ').css("background-color", "#fff");
        }
        if (e.target.id == 'bgcolor2') {
            document.querySelector('.wrapper').style.background = "#d8d8d8";
            $('.wrapper .sec ').css("background-color", "#d8d8d8");
        }
        if (e.target.id == 'bgcolor3') {
            document.querySelector('.wrapper').style.background = "#333333";
            $('.wrapper .sec ').css("background-color", "#333333");

        }
        if (e.target.id == 'bgcolor4') {
            document.querySelector('.wrapper').style.background = "#fffedb";
            $('.wrapper .sec ').css("background-color", "#fffedb");

        }

    });
});

var texttags = document.querySelectorAll('.wrapper');
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
texttags = document.querySelectorAll(".news-item__title, .wrapper, .news-item__lead, .contact-us__text, .footer__list a")
$("#addlh").click(function () {
    lhClicks += 1;
    $("#sublh").prop("disabled", false);
    if (lhClicks >= 3) { $(this).prop("disabled", true); }
    if (texttags && lhClicks <= 3) {
        texttags.forEach(function (elem) {
            lineHeight = parseInt($(elem).css("line-height"));
            lineHeight = lineHeight + 1;
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
            lineHeight = lineHeight - 1;
            $(elem).css("line-height", String(lineHeight) + "px");
        })
    }
});