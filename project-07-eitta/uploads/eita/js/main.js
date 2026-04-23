document.addEventListener("DOMContentLoaded", () => {
  popMenu();
  initAccordion();
  searchBox();
  questionPollResponsive();
  select();
  modal();
  tickets();
  ticketInfo();
  initScrollbars();
});

function popMenu() {
  const popMenu = document.querySelectorAll(".pop-menu");
  if (popMenu.length > 0) {
    popMenu.forEach((menu) => {
      //button to open body
      const button = menu.querySelector(".pop-menu__ham");
      //links
      const body = menu.querySelector(".pop-menu__menu");

      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (menu.classList.contains("active")) {
          menu.classList.remove("active");
        } else {
          menu.classList.add("active");
          //close the body if any click outside happens
          window.addEventListener("click", () => menu.classList.remove("active"));
        }
      });

      body.addEventListener("click", (e) => e.stopPropagation());
    });
  }
}

function initAccordion() {
  const accordions = document.querySelectorAll(".accordion");
  if (accordions.length > 0) {
    accordions.forEach((accordion) => {
      //Making accordion works
      const accordionBtn = accordion.querySelector(".accordion__button");
      accordionBtn.addEventListener("click", (e) => {
        e.preventDefault();
        accordions.forEach((item) => {
          const accordionBody = item.querySelector(".accordion__body");
          const accordionContent = item.querySelector(".accordion__content");
          item.classList.remove("open");
          accordionBody.style.height = "0px";
        });
        const accordionBody = accordion.querySelector(".accordion__body");
        const accordionContent = accordion.querySelector(".accordion__content");
        if (accordion.classList.contains("open")) {
          accordion.classList.remove("open");
          accordionBody.style.height = "0px";
        } else {
          accordion.classList.add("open");
          const height = accordionContent.getBoundingClientRect().height;
          accordionBody.style.height = `${height}px`;
        }
      });

      //open accordion that has class open
      const accordionBody = accordion.querySelector(".accordion__body");
      const accordionContent = accordion.querySelector(".accordion__content");
      if (accordion.classList.contains("open")) {
        accordion.classList.add("open");
        const height = accordionContent.getBoundingClientRect().height;
        accordionBody.style.height = `${height}px`;
      }
    });
  }
}

function searchBox() {
  const searches = document.querySelectorAll(".search-box");
  if (searches.length > 0) {
    searches.forEach((search) => {
      const input = search.querySelector("input");
      const searchBtn = search.querySelector("button.search");
      const clsoeBtn = search.querySelector("button.close");
      //check which button should be active
      if (input.value != "") {
        searchBtn.classList.add("hide");
        clsoeBtn.classList.remove("hide");
      } else {
        clsoeBtn.classList.add("hide");
        searchBtn.classList.remove("hide");
      }

      clsoeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        input.value = "";
        clsoeBtn.classList.add("hide");
        searchBtn.classList.remove("hide");
      });

      input.addEventListener("keydown", (e) => {
        if (input.value != "") {
          searchBtn.classList.add("hide");
          clsoeBtn.classList.remove("hide");
        } else {
          clsoeBtn.classList.add("hide");
          searchBtn.classList.remove("hide");
        }
      });
    });
  }
}

function questionPollResponsive() {
  if (window.innerWidth < 575) {
    const questions = document.querySelectorAll(".questions__item");
    if (questions.length > 0) {
      questions.forEach((question) => {
        const poll = question.querySelector(".questions__poll");
        if (poll) {
          const body = question.querySelector(".questions__content");
          if (body) {
            console.log(poll);
            body.append(poll);
          }
        }
      });
    }
  }
}

function select() {
  const select = document.querySelectorAll(".select");
  if (select.length > 0) {
    select.forEach((menu) => {
      //button to open body
      const button = menu.querySelector(".select__active");
      //links
      const body = menu.querySelector(".select__menu");

      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (menu.classList.contains("active")) {
          menu.classList.remove("active");
        } else {
          menu.classList.add("active");
          //close the body if any click outside happens
          window.addEventListener("click", () => menu.classList.remove("active"));
        }
      });
      body.addEventListener("click", (e) => e.stopPropagation());

      const links = menu.querySelectorAll(".select__menu a");
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          menu.querySelector("select").value = link.getAttribute("data-value");
          menu.querySelector(".select__active span").innerHTML = link.text;

          links.forEach((link) => link.classList.remove("active"));
          link.classList.add("active");

          menu.classList.remove("active");
        });
      });
    });
  }
}

function modal() {
  const modalsButtons = document.querySelectorAll(".modal__button");
  if (modalsButtons.length > 0) {
    modalsButtons.forEach((modalBtn) => {
      const modal = document.querySelector("#" + modalBtn.getAttribute("data-modal"));
      modalBtn.addEventListener("click", (e) => {
        e.preventDefault();

        modal.classList.remove("hide");
        document.querySelector(".modal__back").classList.remove("hide");
      });
    });
    if (document.querySelector(".modal__back")) {
      document.querySelector(".modal__back").addEventListener("click", (e) => {
        document.querySelector(".modal__back").classList.add("hide");
        document.querySelectorAll(".modal:not(.hide)").forEach((item) => item.classList.add("hide"));
      });
    }
  }
}

function tickets() {
  const ticket = document.getElementById("tickets");
  if (ticket) {
    if (window.innerWidth < 575.98) {
      const tr = ticket.querySelectorAll("tr");
      tr.forEach((row) => {
        if (row.querySelector(".shenase span")) {
          row.querySelector(".shenase span").classList.add("shenase-span");
          row.querySelector(".title span").classList.add("title-span");
          row.querySelector(".date span").classList.add("date-span");
          row.querySelector(".subject span").classList.add("subject-span");

          let container = document.createElement("span");
          container.classList.add("parent");
          container.append(row.querySelector(".shenase-span"));
          container.querySelector(".shenase-span").append(row.querySelector(".date-span"));
          container.append(row.querySelector(".title-span"));
          container.append(row.querySelector(".subject-span"));
          row.querySelector(".title").innerHTML = "";
          row.querySelector(".title").append(container);

          row.querySelector(".shenase").remove();
          row.querySelector(".date").remove();
          row.querySelector(".subject").remove();
          row.querySelector(".arrow").remove();
        }
      });
      ticket.querySelector("th.title").innerHTML = `<span class="text__14">شناسه / عنوان / موضوع</span>`;
    } else if (window.innerWidth < 991.98) {
      const tr = ticket.querySelectorAll("tr");
      tr.forEach((row) => {
        row.querySelector(".shenase span").classList.add("shenase-span");
        row.querySelector(".title span").classList.add("title-span");

        let container = document.createElement("span");
        container.classList.add("parent");
        container.append(row.querySelector(".shenase-span"));
        container.append(row.querySelector(".title-span"));
        row.querySelector(".title").innerHTML = "";
        row.querySelector(".title").append(container);

        row.querySelector(".shenase").remove();
      });
    }
  }
}

function ticketInfo() {
  const container = document.getElementById("ticket-info");
  if (container) {
    if (window.innerWidth < 991.98) {
      const item = document.querySelector(".ticket-info__close");
      const placeToPut = document.querySelector(".ticket-info__footer");
      if (item && placeToPut) {
        placeToPut.append(item);
      }
    }
  }
}

function initScrollbars() {
  const scrollbars = Array.from(document.querySelectorAll(".scrollbar"));
  scrollbars.forEach(function (elem) {
    if (elem.classList.contains("scrollbar--phone")) {
      if (window.innerWidth > 992) {
        OverlayScrollbars(elem, {});
      }
    } else {
      OverlayScrollbars(elem, {});
    }
  });
}
