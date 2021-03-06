
import Swiper from '../../node_modules/swiper/js/swiper.js';


var mySwiper = new Swiper('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,

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
  centeredSlides: false,
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
      centeredSlides: false,
    },
    1440: {
      slidesPerView: 3.4,
      spaceBetween: 16,
    },
  },
  observer: true,
  observeParents: true,

  allowTouchMove: false,

});
