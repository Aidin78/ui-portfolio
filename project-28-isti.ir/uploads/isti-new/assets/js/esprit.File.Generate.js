/* 
Build Number : 1009812251508
*/

//file Genereate
(function ($) {
  
    $.fn.extend({
        generateFile: function (option, callback) {
            var defOption = {
                elem: this,
                xhrURL: "/inc/ajax.ashx",
                filename:"contents-generated.pdf",
                action: "pdf", 
                url: "",
                hash:"",
                textSelector: "",

                blockLoader:{
                    "elem":"body",
                    "class":"preloadblock",
                    "css":{
                        "position": "fixed",
                        "top": 0,
                        "width": "100%",
                        "height": "100%",
                        "z-index": "99999",
                        "background": "rgba(255,255,255,.9)",
                        "line-height": "20",
                        "text-align": "center"
                    }
                }
            }
            if (typeof option == "function") {
                callback = option;
                option = {}
            }
 
            option = $.extend(defOption, option);
             $(option.elem).on("click",  function(el) {
               console.log($(this).attr("data-url") , $(this).attr("data-hash"));
               if (typeof $(this).attr("data-url") !="undefined")  option.url =   $(this).attr("data-url") ;
               option.hash = (typeof $(this).attr("data-hash") !="undefined" ? $(this).attr("data-hash") : "" )
                el.preventDefault();
                $("."+option.blockLoader.class).remove();
               $(option.blockLoader.elem).append('<div class="'+option.blockLoader.class+'">لطفا صبر کنید...</div>');
               $("."+option.blockLoader.class).css(option.blockLoader.css)
                var request = new XMLHttpRequest();
                request.open('POST', option.xhrURL, true);
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                request.responseType = 'blob';
                request.onload =   function(e) {
                    $("."+option.blockLoader.class).remove();
                    if (this.status === 200) {
                        var blob = this.response;
                        if (window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveBlob(blob, fileName);
                        }
                        else {
                            var downloadLink = window.document.createElement('a');
                            var contentTypeHeader = request.getResponseHeader("Content-Type");
                            var fileName = (request.getResponseHeader("content-disposition") != null ? request.getResponseHeader("content-disposition") : "exported.xls")
                            downloadLink.href = window.URL.createObjectURL(new Blob([blob], { type: contentTypeHeader }));
                            downloadLink.download = option.filename;
                            document.body.appendChild(downloadLink);
                            downloadLink.click();
                            document.body.removeChild(downloadLink);
                        }
                    }
                };
                var data = { "action": option.action, "hash":option.hash};
                if (typeof option.newsid != "undefined") {
                  data["newsid"]= option.newsid
                }else if (typeof option.url != "undefined" ){
                  data["url"]="B64:"+$.fn.Base64.encode(option.url);
                }
                var dataToSend = [];
                for (var key in data) {
                    dataToSend.push(key + "=" + encodeURIComponent(data[key]));
                }
                request.send(dataToSend.join("&"));

            })


        },
        Base64 : { 
            // private property
            _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
           
            // public method for encoding
            encode : function (input) {
              var output = "";
              var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
              var i = 0;
              input = $.fn.Base64._utf8_encode(input);
           
              while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
           
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
           
                if (isNaN(chr2)) {
                  enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                  enc4 = 64;
                }
           
                output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
              }
           
              return output;
            },
           
            // public method for decoding
            decode : function (input) {
              var output = "";
              var chr1, chr2, chr3;
              var enc1, enc2, enc3, enc4;
              var i = 0;
           
              input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
           
              while (i < input.length) {
                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));
           
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
           
                output = output + String.fromCharCode(chr1);
           
                if (enc3 != 64) {
                  output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                  output = output + String.fromCharCode(chr3);
                }
              }
              output = $.fn.Base64._utf8_decode(output);
              return output;
            },
          
            // private method for UTF-8 encoding
            _utf8_encode : function (string) {
              string = string.replace(/\r\n/g,"\n");
              var utftext = "";
           
              for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
           
                if (c < 128) {
                  utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                  utftext += String.fromCharCode((c >> 6) | 192);
                  utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                  utftext += String.fromCharCode((c >> 12) | 224);
                  utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                  utftext += String.fromCharCode((c & 63) | 128);
                }
              }
           
              return utftext;
            },
          
            // private method for UTF-8 decoding
            _utf8_decode : function (utftext) {
              var string = "";
              var i = 0;
              var c = c1 = c2 = 0;
           
              while ( i < utftext.length ) { 
                c = utftext.charCodeAt(i);
           
                if (c < 128) {
                  string += String.fromCharCode(c);
                  i++;
                }
                else if((c > 191) && (c < 224)) {
                  c2 = utftext.charCodeAt(i+1);
                  string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                  i += 2;
                }
                else {
                  c2 = utftext.charCodeAt(i+1);
                  c3 = utftext.charCodeAt(i+2);
                  string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                  i += 3;
                }
              }
           
              return string;
            }
          }
        
    })
})(jQuery);

(function ($) {
    $.fn.extend({
        printPage: function (option, callback) {
            var defOption = {
                elem: this,
                xhrURL: "/inc/ajax.ashx",
                action: "pdf", 
                url: window.location.href,
                textSelector: "",

                blockLoader:{
                    "elem":"body",
                    "class":"preloadblock",
                    "css":{
                        "position": "fixed",
                        "top": 0,
                        "width": "100%",
                        "height": "100%",
                        "z-index": "99999",
                        "background": "rgba(255,255,255,.9)",
                        "line-height": "20",
                        "text-align": "center"
                    }
                }
            }
            if (typeof option == "function") {
                callback = option;
                option = {}
            }
            option = $.extend(defOption, option);
            $(option.elem).on("click", function (el) {
               el.preventDefault();
               $("."+option.blockLoader.class).remove();
            });
        }
    })
})(jQuery)