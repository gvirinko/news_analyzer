import {NewsApi} from './modules/NewsApi.js';
import {NewsCard} from './components/NewsCard.js';
import {getArticles, getLastSearchWord} from './modules/localStorage.js'

import {preloaderBlock, searchValidation, resultsBlock, searchInput, searchButton} from './constants.js';

export function getOnSearchClick(cards) {
  return function(event) {
    event.preventDefault();
    // searchInput.disabled = true;
    // searchButton.disabled = true;

    const searchWord = searchInput.value;
    searchInput.setCustomValidity('');

    if (searchWord.length === 0) {
      // searchValidation.classList.add('search__validation_error');
      searchInput.setCustomValidity('Please enter a search topic');
      return false;
    }
    // searchValidation.classList.remove('search__validation_error');

    if (!protectionFromXSS(searchWord)) {
      searchInput.setCustomValidity('Please do not use symbols < and >');
      return false;
    }
    saveDataFromApi(searchWord, cards);
    return true;
  }
}

function protectionFromXSS (searchWord) {
  if(searchWord.includes("<") || searchWord.includes(">")) {
    return false;
  }
  return true;
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
