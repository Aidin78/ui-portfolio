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
          row.querySelector(".last-response > span").classList.add("last-response-span");

          let container = document.createElement("span");
          container.classList.add("parent");
          container.append(row.querySelector(".shenase-span"));
          container.querySelector(".shenase-span").append(row.querySelector(".date-span"));
          container.append(row.querySelector(".title-span"));
          container.append(row.querySelector(".last-response-span"));
          container.querySelector(".last-response-span").append(row.querySelector(".subject-span"));
          container.append(row.querySelector(".action__buttons"));
          if (container.querySelector(".action__buttons")) {
            container.querySelector(".action__buttons").append(row.querySelector(".status span"));
          }

          row.querySelector(".title").innerHTML = "";
          row.querySelector(".title").append(container);

          row.querySelector(".shenase").remove();
          row.querySelector(".date").remove();
          row.querySelector(".subject").remove();
          row.querySelector(".arrow").remove();
          row.querySelector(".action").remove();
          row.querySelector(".last-response").remove();
          row.querySelectorAll("td.status").forEach((item) => item.remove())

        }
      });
      let testi = 20;
      setTimeout(() => {
        ticket.querySelectorAll(".title").forEach((item) => {
          item.setAttribute("colspan", testi++);
        })
        console.log(testi)

      }, 500);
      ticket.querySelector("th.title").innerHTML = `<span class="text__14">شناسه / عنوان / موضوع</span>`;
      ticket.querySelector("th.status").innerHTML = `<span class="text__14">وضعیت</span>`;
    } else if (window.innerWidth < 1359.98) {
      const tr = ticket.querySelectorAll("tr");
      tr.forEach((row) => {
        if (row.querySelector(".shenase span")) {
          row.querySelector(".shenase span").classList.add("shenase-span");
          row.querySelector(".title span").classList.add("title-span");
          row.querySelector(".date span").classList.add("date-span");
          row.querySelector(".subject span").classList.add("subject-span");
          row.querySelector(".last-response > span").classList.add("last-response-span");

          let container = document.createElement("span");
          container.classList.add("parent");
          container.append(row.querySelector(".shenase-span"));
          container.querySelector(".shenase-span");
          container.append(row.querySelector(".title-span"));
          container.append(row.querySelector(".date-span"));
          row.querySelector(".title").innerHTML = "";
          row.querySelector(".title").append(container);

          row.querySelector(".shenase").remove();
          row.querySelector(".date").remove();

          container = document.createElement("span");
          container.classList.add("parent");
          container.append(row.querySelector(".subject-span"));
          container.append(row.querySelector(".last-response-span"));
          row.querySelector(".last-response").innerHTML = "";
          row.querySelector(".last-response").append(container);
          row.querySelector(".subject").remove();
        }
      });
      ticket.querySelector("th.title").innerHTML = `<span class="text__14">شناسه / عنوان</span>`;
      ticket.querySelector("th.last-response").innerHTML = `<span class="text__14">موضوع / پاسخ دهنده </span>`;
    }
  }
}

function ticketInfo() {
  const container = document.getElementById("ticket-info");
  if (container) {
    if (window.innerWidth < 1359.98) {
      const item = document.querySelector(".ticket-info__close");
      const placeToPut = document.querySelector(".ticket-info__footer");
      if (item && placeToPut) {
        placeToPut.append(item);
      }

      const keywords = document.getElementById("keywords");
      const keywordsContainer = document.getElementById("ticket-info");
      keywordsContainer.append(keywords);
    }
    if (window.innerWidth < 1359.98 && window.innerWidth > 576) {
      //bio
      const bio = document.getElementById("bio");
      const bioContainer = document.getElementById("ticket-info");
      bioContainer.append(bio);
    }
    if (document.querySelector(" .ticket-info__arrow"))
      document.querySelector(" .ticket-info__arrow").addEventListener("click", () => {
        if (document.querySelector('.ticket-info__drop-down').classList.contains('open')) {
          document.querySelector(".ticket-info__drop-down").classList.remove('open');
          document.querySelector('.modal__back ').classList.add('hide');
        }
        else {
          document.querySelector(".ticket-info__drop-down").classList.add('open');
          document.querySelector('.modal__back ').classList.remove('hide');
        }
      });
    if (document.querySelector(".ticket-info__closed button"))
      document.querySelector(".ticket-info__closed button").addEventListener("click", () => {
        document.querySelector(".ticket-info__drop-down").classList.remove('open');
        document.querySelector('.modal__back ').classList.add('hide');
      });


  }
}

function initScrollbars() {
  const scrollbars = Array.from(document.querySelectorAll(".scrollbar"));
  scrollbars.forEach(function (elem) {
    if (elem.classList.contains("scrollbar--phone")) {
      if (window.innerWidth > 1360) {
        OverlayScrollbars(elem, {});
      }
    } else {
      OverlayScrollbars(elem, {});
    }
  });
}
