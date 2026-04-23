var x, i, j, l, ll, selElmnt, a, b, c;
x = document.getElementsByClassName("order-select");
l = x.length;
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.setAttribute("data-value", selElmnt.options[j].getAttribute("value"))
        c.addEventListener("click", function (e) {
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}

function closeAllSelect(elmnt) {
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

document.addEventListener("click", closeAllSelect);

//scrollbar for user-modal
$(document).ready(function () {
    if (document.querySelectorAll('.user-modal__modal .tab-pane')) {
        document.addEventListener("DOMContentLoaded", function () {
            OverlayScrollbars(document.querySelectorAll('.user-modal__modal .tab-pane'), {});
        });
        //upload picture 
        $(function () {
            if ($("#aks-file-upload")) {
                $("#aks-file-upload").aksFileUpload({
                    fileUpload: "#uploadfile",
                    // File Format
                    fileType: ["jpg", "jpeg", "png"],
                    // File Format
                    /* (default) - [ "pdf", "docx", "rtf", "jpg", "jpeg", "png", "txt", "mpa", "ogg", "aif", "cda", "mid", "midi", "mp3", "wav", "wma", "wpl", "7z", "arj", "deb", "pkg", "rar", "rpm", "tar.gz", "z", "zip", "csv", "dat", "db", "dbf", "log", "mdb", "sav", "sql", "tar", "xml", "apk", "exe", "jar", "py", "fnt", "fon", "otf", "ttf", "ai", "bmp", "gif", "ico", "jpeg", "jpg", "png", "ps", "psd", "svg", "tif", "tiff", "asp", "aspx", "css", "htm", "html", "js", "jsp", "php", "rss", "pps", "ppt", "pptx", "avi", "flv", "mov", "mp4", "mpg", "mpeg", "vob", "wmv", "doc", "rtf", "eps", "opus", "aep", "fig", "sketch" ] */
                    multiple: true,
                    maxSize: "1 GB",
                });
            }

        });
    }
})
//scrollbar for user-modal
if ($(document).width() > 992) {
    if (document.querySelectorAll('.user-modal__modal .tab-pane')) {
        document.addEventListener("DOMContentLoaded", function () {
            OverlayScrollbars(document.querySelectorAll('.detail-page__content'), {});
        });
    }
}

$(document).ready(function () {
    //making share-tab
    //By clicking save or dismiss it get back to the search-user-page
    var temp1 = document.querySelector('#setting-save');
    if (temp1) {
        $(temp1).on('click', function (e) {
            e.preventDefault();
            document.querySelector('.share-modal__settings-content').style.opacity = 0;
            document.querySelector('.share-modal__settings-content').style.visibility = "hidden";
            setTimeout(function () {
                document.querySelector('.share-modal__search-content').style.opacity = 1;
                document.querySelector('.share-modal__search-content').style.visibility = "visible";
            }, 300);
        })
    }
    var temp2 = document.querySelector('#setting-dismiss');
    if (temp2) {
        $(temp2).on('click', function (e) {
            e.preventDefault();
            document.querySelector('.share-modal__settings-content').style.opacity = 0;
            document.querySelector('.share-modal__settings-content').style.visibility = "hidden";
            setTimeout(function () {
                document.querySelector('.share-modal__search-content').style.visibility = "visible";
                document.querySelector('.share-modal__search-content').style.opacity = 1;
            }, 300);
        })
    }
    var temp3 = document.querySelector('#show-setting-modal');
    if (temp3) {
        $(temp3).on('click', function (e) {
            e.preventDefault();
            document.querySelector('.share-modal__search-content').style.visibility = "hidden";
            document.querySelector('.share-modal__search-content').style.opacity = 0;
            setTimeout(function () {
                document.querySelector('.share-modal__settings-content').style.opacity = 1;
                document.querySelector('.share-modal__settings-content').style.visibility = "visible";
                document.querySelector('.share-modal__settings-content').style.display = "block";
            }, 300);
        })
    }
    //user auto search
    var userSearchInput = document.querySelector('#searchForName');
    if (userSearchInput) {
        $(userSearchInput).on('input', function (elem) {
            console.log(userSearchInput.value);
            var temp = document.querySelector('#user-search-recommend');
            if (userSearchInput.value) {
                temp.style.visibility = 'visible';
                document.querySelector('.share-modal__search-recommend').style.display = "flex";
                temp.style.opacity = '1';
                temp.style.display = 'block';
            }
            else {
                temp.style.visibility = 'hidden';
                document.querySelector('.share-modal__search-recommend').style.display = "none";

                temp.style.opacity = '0';
                temp.style.display = 'none';

            }
        })

    }
    var temp4 = document.querySelector('#get-back');
    if (temp4) {
        $(temp4).on('click', function (e) {
            e.preventDefault();
            document.querySelector('.share-modal__people-search').style.visibility = "hidden";
            document.querySelector('.share-modal__people-search').style.opacity = 0;
            document.querySelector('.share-modal__people-search').style.display = "none";
            setTimeout(function () {
                document.querySelector('.share-modal__search-content').style.opacity = 1;
                document.querySelector('.share-modal__search-content').style.visibility = "visible";
                document.querySelector('.share-modal__search-content').style.visibility = "flex";
            }, 300);
        });
    }
    var temp5 = document.querySelector('#open-people-search');
    if (temp5) {
        $(temp5).on('click', function (e) {
            e.preventDefault();
            document.querySelector('.share-modal__search-content').style.opacity = 0;
            document.querySelector('.share-modal__search-content').style.visibility = "hidden";
            setTimeout(function () {
                document.querySelector('.share-modal__people-search').style.visibility = "visible";
                document.querySelector('.share-modal__people-search').style.display = "block";
                document.querySelector('.share-modal__people-search').style.opacity = 1;
                document.querySelector('.share-modal__user-search-content').style.display = "flex";
            }, 300);
        })
    }


})

//Remove user-items by clicking on close button
var tempCloses = document.querySelectorAll('.search-users__item > .search-users__close');
if (tempCloses) {
    $(tempCloses).on('click', function (elem) {
        var parent = this.parentElement;
        parent.remove();
    })
}
var tempCloses = document.querySelectorAll('.search-users__pic > .search-users__close');
if (tempCloses) {
    $(tempCloses).on('click', function (elem) {
        var parent = this.parentElement.parentElement;
        parent.remove();
    })
}
//scrollbar for share-modal
if (document.querySelectorAll('.search-recommend')) {
    document.addEventListener("DOMContentLoaded", function () {
        OverlayScrollbars(document.querySelectorAll('.search-recommend'), {});
    });
}
//scrollbar for share-modal
if (document.querySelectorAll('.search-recommend')) {
    document.addEventListener("DOMContentLoaded", function () {
        OverlayScrollbars(document.querySelectorAll('.search-recommend'), {});
    });
}
//scrollbar for share-modal
if (document.querySelectorAll('.share-modal__users--show')) {
    document.addEventListener("DOMContentLoaded", function () {
        OverlayScrollbars(document.querySelectorAll('.share-modal__users--show'), {});
    });
}
if (document.querySelectorAll('#nav-new-them1')) {
    document.addEventListener("DOMContentLoaded", function () {
        OverlayScrollbars(document.querySelectorAll('#nav-new-them1'), {});
    });
}
if (document.querySelectorAll('#nav-myAccount')) {
    document.addEventListener("DOMContentLoaded", function () {
        OverlayScrollbars(document.querySelectorAll('#nav-myAccount'), {});
    });
}
if (document.querySelectorAll('.notification-modal .tab-pane:not(:last-child)')) {
    document.addEventListener("DOMContentLoaded", function () {
        OverlayScrollbars(document.querySelectorAll('.notification-modal .tab-pane:not(:last-child)'), {});
    });
}
if (document.querySelectorAll('.support__container')) {
    document.addEventListener("DOMContentLoaded", function () {
        OverlayScrollbars(document.querySelectorAll('.support__container'), {});
    });
}
//document-list
var stars = document.querySelectorAll('.document-list__star');
if (stars.length > 2) {
    stars.forEach(function (elem) {
        $(elem).on('click', function (e) {
            e.preventDefault();
            if (elem.classList.contains('active')) {
                elem.classList.remove('active');
            }
            else {
                elem.classList.add('active');
            }
        })
    })
}
else {
    var stars = document.querySelector('.document-list__star');
    $(stars).on('click', function (e) {
        e.preventDefault();
        if (stars.classList.contains('active')) {
            stars.classList.remove('active');
        }
        else {
            stars.classList.add('active');
        }
    })
}
var checkBoxes = document.querySelectorAll('.document-list__check');
checkBoxes.forEach(function (elem) {
    $(elem).on('click', function (e) {
        e.preventDefault();
        if (elem.classList.contains('active')) {
            elem.classList.remove('active');
            var temp = elem.parentElement;
            temp.classList.remove('active');
        }
        else {
            elem.classList.add('active');
            var temp = elem.parentElement;
            temp.classList.add('active');
        }
    })
})

//making new document
var new__doc = document.querySelectorAll('#new-doc');
if (new__doc) {
    new__doc.forEach(function (elem) {
        $(elem).on('click', function (e) {
            e.preventDefault();
            var container = document.querySelector('.document-list .os-content');
            var temp = `
            <div class="document-list__item document-list__item--new">
                                <div class="document-list__icon"> <i class="niafam  niafam-Component-149--3"></i></div>
                                <div class="document-list__content">
                                    <div class="document-list__title-container">
                                        <input type="text" class="document-list__input" placeholder="پرونده جدید">
                                    </div>
                                </div>
                            </div>
            `;
            $(container).prepend(temp);
        })
    })
}
//making random scrolls
if ($(document).width() > 992) {
    var scrolls__div = document.querySelectorAll('.scroll-needed');
    scrolls__div.forEach(function (elem) {
        document.addEventListener("DOMContentLoaded", function () {
            OverlayScrollbars(elem, {});
        });
    })
}