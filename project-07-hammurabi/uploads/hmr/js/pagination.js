class Pagination {
  constructor(total, currentPage, pageLength) {
    this.total = parseInt(total);
    this.currentPage = parseInt(currentPage);
    this.pageLength = parseInt(pageLength);
    this.html = "";
    this.url = "";
    this.pageCount = 0;
    this.centerItem = 3;
  }

  createPagination(container) {
    if (this.total <= 0) {
      $(container).remove();
    } else {
      this.makeUrl();
      this.calculatePageCount();
      this.html += this.makePrev();
      if (this.pageCount > this.centerItem + 2) {
        this.html += this.makeFirst();
        if (this.currentPage + (this.centerItem - 1) <= this.pageCount) {
          this.makeListOfPagination(this.currentPage, this.currentPage + (this.centerItem - 1));
          if (this.currentPage + (this.centerItem - 1) != this.pageCount) {
            this.html += this.makeLast();
          }
        } else {
          this.makeListOfPagination(this.pageCount - (this.centerItem - 1), this.pageCount);
        }
      } else {
        this.makeListOfPagination(1, this.pageCount);
      }
      this.html += this.makeNext();
      container.innerHTML = this.html;
    }
  }

  calculatePageCount() {
    this.pageCount = this.total % this.pageLength == 0 ? Math.floor(this.total / this.pageLength) : Math.floor(this.total / this.pageLength) + 1;
  }

  makeUrl() {
    let url = String(window.location);
    if (url.indexOf("pageid") == -1) {
      if (url.indexOf("?") == -1) {
        url += "?";
      } else {
        url += "&";
      }
      url += "pageid=";
    } else {
      url = url.substr(0, url.indexOf("pageid") - 1);
      if (url.indexOf("?") == -1) {
        url += "?pageid=";
      } else {
        url += "&pageid=";
      }
    }
    this.url = url;
  }

  makeItem(url, text, className = "") {
    var active = "";
    if (text == this.currentPage) {
      active = "active__page";
    }
    return `<li class="${className} ${active}"><a href="${url}">${text}</a></li>`;
  }

  makePrev() {
    console.log(this.currentPage)
    if (this.currentPage != 1) {
      return this.makeItem(this.url + this.currentPage, `<i class="niafam  niafam-right-arrow "></i>`, "previous");
    } else {
      return this.makeItem(this.url + this.currentPage, `<i class="niafam  niafam-right-arrow "></i>`, "previous deactivated");
    }
  }

  makeNext() {
    if (this.currentPage != this.pageCount) {
      return this.makeItem(this.url + (this.currentPage + 1), `<i class="niafam  niafam-left-arrow "></i>`, "next");
    } else {
      return this.makeItem(this.url + (this.currentPage + 1), `<i class="niafam  niafam-left-arrow "></i>`, "next deactivated");
    }
  }

  makeFirst() {
    if (this.currentPage != 1) {
      return this.makeItem(this.url + 1, "1", "first");
    } else {
      return " ";
    }
  }

  makeLast() {
    if (this.currentPage != this.pageCount) {
      return this.makeItem(this.url + this.pageCount, this.pageCount, "last");
    } else {
      return " ";
    }
  }

  makeListOfPagination(first, last) {
    for (var i = first; i <= last; i++) {
      this.html += this.makeItem(this.url + i, i, "pagination-item");
    }
  }

}

/// How to work with it
// const pagination = new Pagination(total, current Page, each page length)
// pagination.createPagination(pagination container)