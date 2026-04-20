if (document.querySelector(".header__ham"))
    document.querySelector(".header__ham").addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(".phone-menu").classList.add("show");
    })
document.querySelector(".phone-menu__close button").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".phone-menu").classList.remove("show");
})
if (document.querySelector(".bellservices"))
    document.querySelector(".bellservices").addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(".menu-service").classList.add("show");
    })
if (document.querySelector(".menu-service__close button"))
    document.querySelector(".menu-service__close button").addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(".menu-service").classList.remove("show");
    })

document.addEventListener("DOMContentLoaded", (e) => {
    initScrollbars()
})

function initScrollbars() {
    const scrollbars = Array.from(document.querySelectorAll(".scrollbar"));
    scrollbars.forEach(function (elem) {
        OverlayScrollbars(elem, { autoUpdate: true });
    });
}
document.querySelectorAll('select').forEach(function (selectElement) {
    selectElement.addEventListener('focus', function () {
        this.parentNode.classList.add('focused');
    });

    selectElement.addEventListener('blur', function () {
        this.parentNode.classList.remove('focused');
    });
});
