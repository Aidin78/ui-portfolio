
document.addEventListener('DOMContentLoaded', () => {
  initAniamtion();
  if (window.innerWidth < 991.98) {
    if (document.querySelector('.wrapper').classList.contains("morabi")) {
      document.querySelector('.menu').append(document.querySelector('.header__button'));
    }
    else{
      if (window.innerWidth < 719.98) {
        document.querySelector('.menu').append(document.querySelector('.header__button'));
      }
    }
    document.querySelector('body').append(document.querySelector('.menu'))
  }

  document.querySelector('.header__ham').addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelector('.menu').classList.add('active');
    document.querySelector('.menu-back').classList.add('active');
  })
  document.querySelector(' .close-menu a').addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelector('.menu').classList.remove('active');
    document.querySelector('.menu-back').classList.remove('active');
  })
  document.querySelector('.menu-back').addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelector('.menu').classList.remove('active');
    document.querySelector('.menu-back').classList.remove('active');
  })
})

function initAniamtion() {
  AOS.init();

  setInterval(() => {
    AOS.refresh();
  }, 500);

  if (window.innerWidth > 992) {

  }
  else {
    document.querySelector('.header__button').classList.add("aos-init")
    document.querySelector('.header__button').classList.add("aos-animate")
  }
}
