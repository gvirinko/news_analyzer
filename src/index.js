import "./style.css";


//------------------------------------------------------






import "../node_modules/swiper/js/swiper.js";
import "./swiper.js";

var mySwiper = new Swiper ('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  centeredSlides: true,
  spaceBetween: 16,
  slidesPerView: 3.4,

  // uniqueNavElements: true,

  breakpoints: {
    320: {
      slidesPerView: 1.1,
      spaceBetween: 8,
    },
    768: {
      slidesPerView: 2.2,
      spaceBetween: 8,
      centeredSlides: true,
    },
    1440: {
      slidesPerView: 3.4,
      spaceBetween: 16,
    },
  },

  allowTouchMove: false,

})
