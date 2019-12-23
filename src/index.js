import "./style.css";
import {Api} from "./Api.js";
import {ResultCard} from "./ResultCard.js";
import {CardList} from "./CardList.js";

const searchButton = document.querySelector('.search__button');
// searchButton.disabled = true;
// const searchForm = document.forms.form_search;
const searchValidation = document.querySelector('.search__validation');

if (searchButton) {
  searchButton.addEventListener('click', validate);
  searchButton.addEventListener('click', saveDataFromApi);
}


function validate(event) {
  event.preventDefault();
  // searchButton.disabled = true;
  let searchWord = document.querySelector('.search__input').value;
  if (searchWord.length === 0) {
    searchValidation.classList.add('search__validation_error');
    return false;
  }
  searchValidation.classList.remove('search__validation_error');
  saveDataFromApi(searchWord);
  return true;
}

function saveDataFromApi (searchWord) {
  let apiKey = "a9927459bf884f1395b3cf33e659b1c1";
  let now = Date.now();
  let minusWeek = now - 604800000;
  let dateTo = new Date(now);
  let dateFrom = new Date(minusWeek);

  let apiObj = new Api(apiKey, searchWord, dateFrom, dateTo);
  apiObj.storeData();
}

function getDataFromStorage(searchWord) {
  let storedData = JSON.parse(localStorage.getItem(searchWord));
  return storedData;
}

export function createResultCards(searchWord) {
  let result = getDataFromStorage(searchWord);
  let cardsArray = [];
  for (let i = 0; i < result.totalResults; i++) {
    // let urlToImage = result.articles[i].urlToImage;
    let urlToImage = "./images/image-03.png";
    let publishedAt = result.articles[i].publishedAt;
    let title = result.articles[i].title;
    let text = result.articles[i].description;
    let source = result.articles[i].source.name;

    let resultCardObject = new ResultCard(urlToImage, publishedAt, title, text, source);
    let singleCard = resultCardObject.create();
    cardsArray.push(singleCard);
  }
  return cardsArray;
}

// export function renderCards(cardsArray) {
// let cardList = new CardList(cardsArray);
//   cardList.renderCards();
// }

// Analytics

let keyWord = document.querySelector('.stats__keyword');

if (keyWord) {
  keyWord.textContent = "moo";
}










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
