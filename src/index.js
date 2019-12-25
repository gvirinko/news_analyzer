import "./style.css";
import {NewsApi} from "./NewsApi.js";
import {ResultCard} from "./ResultCard.js";
import {CardList} from "./CardList.js";
import {CommitsApi} from "./CommitsApi.js";

const searchButton = document.querySelector('.search__button');
const moreButton = document.querySelector('.results__more');
const preloaderBlock = document.querySelector('.preloader');
// searchButton.disabled = true;
const searchValidation = document.querySelector('.search__validation');
const resultsBlock = document.querySelector('.results');
const searchForm = document.forms.form_search;
const resultsMore = document.querySelector('.results__more');


let _cards = new CardList();


// const noResults = document.querySelector('.no-results');


if (searchButton) {
  searchButton.addEventListener('click', onSearchClick);
  resultsMore.addEventListener('click', _cards.onMoreCardsClick.bind(_cards));

  // searchForm.addEventListener('input', validate);
}


function onSearchClick(event) {
  event.preventDefault();
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

  resultsBlock.classList.add('results__active');
  preloaderBlock.classList.add('preloader_active');


  localStorage.removeItem(searchWord);
  // NB: we must clear the DOM object here, since we want to reset it even if
  // the upcoming API request returns an error; in that case, the user will see
  // an empty list of cards.
  _cards.deleteCards();

  let apiObj = new NewsApi(apiKey, searchWord, dateFrom, dateTo);
  apiObj.storeData(_cards);
}

function getDataFromStorage(searchWord) {
  let storedData = JSON.parse(localStorage.getItem(searchWord));
  return storedData;
}

export function createResultCards(searchWord) {
  let result = getDataFromStorage(searchWord);
  let cardsArray = [];
  for (let i = 0; i < result.totalResults; i++) {
    let urlToImage = result.articles[i].urlToImage;
      if (!urlToImage) {
        urlToImage = "./images/nophoto.jpeg";
      }
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


// Analytics

let keyWord = document.querySelector('.stats__keyword');

if (keyWord) {
  keyWord.textContent = "moo";
}

// About

let commitsTitle = document.querySelector('.commits__title');

  function requestCommits() {
    let commitsApiObj = new CommitsApi();
    let commitsList = commitsApiObj.getData();
  }

if (commitsTitle) {
  commitsTitle.addEventListener('click', requestCommits);
  // requestCommits();
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
