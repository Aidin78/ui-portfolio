/* 
Build Number : 1009911130210
*/
(function ($) {
    //esprit.File.Generate.js
    $(".esprit-view-act[data-act='pdfme']").generateFile({
      newsid: $("meta[name='content-id']").attr("content"),
      //url: "http://"+window.location.host + "/inc/ajax.ashx?action=query&newsid=" + $("meta[name='content-id']").attr("content")
    });
    if ($(".esprit-view-act[data-act='printme']").length > 0) {
      $("#print-preview-modal").iziModal({
        headerColor: "#45ad74",
        padding: 40,
        overlayClose: true,
        width: "80%",
        autoOpen: false,
        overlayColor: "rgba(0, 0, 0, 0.8)",
        rtl: true,
        appendToOverlay: ".page-wrapper",
        onOpening: function (modal) {
          modal.startLoading();
          $.get("/inc/ajax.ashx?action=newsprint&qid=", function (data) {
            $("#print-preview-modal .iziModal-content").html(data);
            $("#printpdf").on("click", function () {
              $("#page-print-content").print();
            });
            modal.stopLoading();
          });
        },
      });
      $(".esprit-view-act[data-act='printme']").on("click", function () {
        $("#print-preview-modal").iziModal("open");
        // url:window.location.host+"/inc/ajax.ashx?action=newsprint&newsid="+$("meta[name='content-id']").attr("content")
      });
    }
  
    //jquery.slimscroll.min.js
    $(".playlist-block-style-two").each(function () {
      var siblingHeight = $(this).parent(".playlist-wrap").siblings(".player-main-block").innerHeight();
      $(this).slimScroll({
        height: siblingHeight,
      });
    });
    $("body").on("click", ".refresh-captcha", function () {
      let $imgElem = $(this).closest(".es-form-group").find(".captcha-img");
      $imgElem.attr("src", "/inc/captcha.ashx?r=" + Math.random());
    });
    //Start
    $("body").on("click", "#es-send-button", function (e) {
      var $target = $(this),
          $form =$target.closest("form");
          var dataToSend = {
               action: "sendToFriend",
              contentid:$("meta[name='content-id']").attr("content"),
              newslink: window.location.href
          }
          $form.find("input").each(function(){
              dataToSend[$(this).attr("name")]=$(this).val()
          });
          
      $.ajax({
        url: "/inc/ajax.ashx",
        async: true,
        type: "POST",
        "dataType":"json",
        data: dataToSend,
        beforeSend: function () {
          $target.attr("disabled", true);
        },
        success: function (res) {
          $target.attr("disabled", false);
  
            var $imgElem = $form.find(".captcha-img");
              $imgElem.attr("src", "/inc/captcha.ashx?r=" + Math.random());
          if (res.status == "success") {
            $form.find(".es-msg-form").html('<div class="alert alert-success"> ط§غŒظ…غŒظ„ ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط§ط±ط³ط§ظ„ ط´ط¯.!</div>');
          } else {
            $form.find(".es-msg-form").html(res.msg);
          }
        },
        error: function (res) {
          $target.attr("disabled", false);
          $target.closest("form").find(".es-msg-form").html(res);
        },
      });
    });
    //End
    var resize = new Array(
      ".es-post-content p",
      ".es-news-box-similar ul li a",
      ".es-news-box-download ul li a",
      ".es-post-content .news-content > div",
      ".news-head h2",
      ".news-head h6"
    );
    resize = resize.join(",");
  
    //resets the font size when "reset" is clicked
    var resetFont = $(resize).css("font-size");
    $(".reset").click(function () {
      $(resize).css("font-size", resetFont);
    });
    //increases font size when "+" is clicked
    $(".increase").click(function () {
      var originalFontSize = $(resize).css("font-size");
      var originalFontNumber = parseFloat(originalFontSize, 10);
      var newFontSize = originalFontNumber * 1.2;
      $(resize).css("font-size", newFontSize);
      return false;
    });
    //decrease font size when "-" is clicked
    $(".decrease").click(function () {
      var originalFontSize = $(resize).css("font-size");
      var originalFontNumber = parseFloat(originalFontSize, 10);
      var newFontSize = originalFontNumber * 0.8;
      $(resize).css("font-size", newFontSize);
      return false;
    });
      if($("#facial-recognition").length > 0 ){
          initFaceRectangle("#facial-recognition");
      }
    //iziModal.min.js
    if($("#modal-send-to-friend").length > 0 ){
        $("body").on("click", ".modal-send-to-friend", function (event) {
          event.preventDefault();
          $("#modal-send-to-friend").iziModal("open");
        });
        $("#modal-send-to-friend").iziModal({
          headerColor: "#45ad74",
          padding: 40,
          overlayClose: true,
          width: 600,
          autoOpen: false,
          overlayColor: "rgba(0, 0, 0, 0.8)",
          rtl: true,
          appendToOverlay: ".page-wrapper",
        });
    }
  
    //function
  })(jQuery);
  function initFaceRectangle(elem, face) {
    var faces = typeof face == "undefined" ? $(elem).attr("face").split("|") : face.split("|");
    faces.map(function (item, index) {
      var rect = item.split(",");
      var lang = typeof $("html").attr("lang") != "undefined" ? $("html").attr("lang") : "fa";
  
      var ratioX = typeof rect[7] != "undefined" ? $(elem).width() / rect[7] : 1;
      var ratioY = typeof rect[7] != "undefined" ? $(elem).height() / rect[8] : 1;
      var leftBorder = Number($(elem).css("border-left-width").replace("px", ""));
  
  
      var newRect = $('<div data-pid="p' + index + '" class="detected-face-rect" ></div>')
        .css({
          left: rect[1] * ratioX + leftBorder + "px",
          top: rect[2] * ratioY + "px",
          width: rect[3] * ratioX + "px",
          height: rect[4] * ratioY + "px",
        })
        .append('<div class="rect-arrow"> </div>\
       <div class="rect-input rect-input-1" >' + rect[lang == "fa" ? 0 : 5] + " </div>\
       ");
      if (rect[0] != "") $(elem).parent().append(newRect);
    });
  }
  