import {NewsApi} from "./NewsApi.js";
import {NewsCard} from "./NewsCard.js";
import {getArticles, getLastSearchWord} from './localStorage.js'


const preloaderBlock = document.querySelector('.preloader');
const searchValidation = document.querySelector('.search__validation');
const resultsBlock = document.querySelector('.results');

export function getOnSearchClick(cards) {
  return function(event) {
    event.preventDefault();
    const searchWord = document.querySelector('.search__input').value;
    if (searchWord.length === 0) {
      searchValidation.classList.add('search__validation_error');
      return false;
    }
    searchValidation.classList.remove('search__validation_error');
    saveDataFromApi(searchWord, cards);
    return true;
  }
}

export function createResultCards(searchWord) {
  const result = getArticles(searchWord);
  const cardsArray = [];
  for (let i = 0; i < result.articles.length; i++) {
    let urlToImage = result.articles[i].urlToImage;
    let publishedAt = result.articles[i].publishedAt;
    let title = result.articles[i].title;
    let text = result.articles[i].description;
    let source = result.articles[i].source.name;
    let url = result.articles[i].url;

    if(!urlToImage || !publishedAt || !title || !text || !source || !url) {
      continue;
    }

    const resultCardObject = new NewsCard(urlToImage, publishedAt, title, text, source, url);
    const singleCard = resultCardObject.create();
    cardsArray.push(singleCard);
  }
  return cardsArray;
}

// Function loadCardsFromLocalStorage allows results data display
// after reopening browser tab or after returning from another page
export function loadCardsFromLocalStorage(cards) {
  const searchWord = getLastSearchWord();
  if (searchWord) {
    const cardsArray = createResultCards(searchWord);
    cards.populateCards(cardsArray);
    cards.renderCards();
  }
}

function saveDataFromApi (searchWord, cards) {
  const apiKey = "90b94e06f4c34ae88dc61b57c1aeb5e4";
  const now = Date.now();
  const dateTo = new Date(now);
  const dateFrom = new Date(now)
  dateFrom.setDate(dateTo.getDate() - 6);

  resultsBlock.classList.add('results__active');
  preloaderBlock.classList.add('preloader_active');

  cards.deleteCards();

  const apiObj = new NewsApi(apiKey, searchWord, dateFrom.toISOString(), dateTo.toISOString());
  apiObj.storeData(cards);
}
