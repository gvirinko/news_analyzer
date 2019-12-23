import "./style.css";
// import {Api} from "./Api.js";
// import {ResultCard} from "./ResultCard.js"

// const searchButton = document.querySelector('.search__button');
// searchButton.addEventListener('click', function(event) {
// });


// function createApiObject () {
//   let apiKey = "a9927459bf884f1395b3cf33e659b1c1";
//   let newApiObject = new Api(apiKey, "макароны", "2019-12-05", "2019-12-12");
//   newApiObject.createUrl();
//   newApiObject.loadResultData();
//   // console.log(newApiObject);
// }

// createApiObject();

// let now = new Date().toLocaleString('ru', {
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric'
// });
// console.log(now);

// console.log(now.slice( -3));


// for (let i = 0; i < now.length; i++) {
//   // console.log(now[i]);
// }













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
