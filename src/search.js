import {NewsApi} from "./NewsApi.js";
import {NewsCard} from "./NewsCard.js";
import {getArticles, getLastSearchWord} from './localStorage.js'


const preloaderBlock = document.querySelector('.preloader');
const searchValidation = document.querySelector('.search__validation');
const resultsBlock = document.querySelector('.results');

export function getOnSearchClick(cards) {
  return function(event) {
    event.preventDefault();
    let searchWord = document.querySelector('.search__input').value;
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
  let result = getArticles(searchWord);
  let cardsArray = [];
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

    let resultCardObject = new NewsCard(urlToImage, publishedAt, title, text, source, url);
    let singleCard = resultCardObject.create();
    cardsArray.push(singleCard);
  }
  return cardsArray;
}

// Function loadCardsFromLocalStorage allows results data display
// after reopening browser tab or after returning from another page
export function loadCardsFromLocalStorage(cards) {
  let searchWord = getLastSearchWord();
  if (searchWord) {
    let cardsArray = createResultCards(searchWord);
    cards.populateCards(cardsArray);
    cards.renderCards();
  }
}

function saveDataFromApi (searchWord, cards) {
  // let apiKey = "a9927459bf884f1395b3cf33e659b1c1";
  let apiKey = "90b94e06f4c34ae88dc61b57c1aeb5e4";
  let now = Date.now();
  let dateTo = new Date(now);
  let dateFrom = new Date(now)
  dateFrom.setDate(dateTo.getDate() - 6);

  resultsBlock.classList.add('results__active');
  preloaderBlock.classList.add('preloader_active');

  cards.deleteCards();

  let apiObj = new NewsApi(apiKey, searchWord, dateFrom.toISOString(), dateTo.toISOString());
  apiObj.storeData(cards);
}
