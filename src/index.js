import "./style.css";

import "./swiper.js";
//import z from './images/html_logo.png';
//import b from './images/css_logo.png';

var mySwiper = new Swiper ('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  slidesPerView: 3,
  centeredSlides: true,
  spaceBetween: 16,
  slidesPerView: 3.4,
  coverflowEffect: {
    rotate: 30,
    //slideShadows: true,
  },

  fadeEffect: {
    crossFade: true,
  },
  //effect: 'coverflow',
  //effect: 'fade',
  // loop: true,
  allowTouchMove: false,

})
