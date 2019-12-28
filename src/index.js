import "./style.css";
import './about.js';
import './analytics.js';
import './swiper-custom.js'
import {NewsApi} from "./NewsApi.js";
import {NewsCard} from "./NewsCard.js";
import {CardList} from "./CardList.js";

const searchButton = document.querySelector('.search__button');
const preloaderBlock = document.querySelector('.preloader');
const searchValidation = document.querySelector('.search__validation');
const resultsBlock = document.querySelector('.results');
const resultsMore = document.querySelector('.results__more');

let _cards = new CardList();

if (searchButton) {
  searchButton.addEventListener('click', onSearchClick);
  resultsMore.addEventListener('click', _cards.onMoreCardsClick.bind(_cards));
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

export function saveDataFromApi (searchWord) {
  // let apiKey = "a9927459bf884f1395b3cf33e659b1c1";
  let apiKey = "90b94e06f4c34ae88dc61b57c1aeb5e4";
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

  let apiObj = new NewsApi(apiKey, searchWord, dateFrom.toISOString(), dateTo.toISOString());
  apiObj.storeData(_cards);
}
export function getDataFromStorage(searchWord) {
  let storedData = JSON.parse(localStorage.getItem(searchWord));
  return storedData;
}

export function createResultCards(searchWord) {
  let result = getDataFromStorage(searchWord);
  let cardsArray = [];
  for (let i = 0; i < result.totalResults; i++) {
    let urlToImage = result.articles[i].urlToImage;
    let publishedAt = result.articles[i].publishedAt;
    let title = result.articles[i].title;
    let text = result.articles[i].description;
    let source = result.articles[i].source.name;

    if(!urlToImage || !publishedAt || !title || !text || !source) {
      continue;
    }

    let resultCardObject = new NewsCard(urlToImage, publishedAt, title, text, source);
    let singleCard = resultCardObject.create();
    cardsArray.push(singleCard);
  }
  return cardsArray;
}

export function changeDateFormat(date) {
  let toLocaleStringDate = new Date(date).toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  let year = toLocaleStringDate.slice(0, -3).slice(-4);
  let dayAndMonth = toLocaleStringDate.slice(0, -3).slice(0, -5);
  let formattedDate = dayAndMonth + ', ' + year;
  return formattedDate;
}
