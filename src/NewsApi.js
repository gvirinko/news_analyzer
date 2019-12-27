import { NewsCard } from "./NewsCard.js";
import {CardList} from "./CardList.js";
import {createResultCards} from "./index.js";
// import {renderCards} from "./index.js";

const preloaderBlock = document.querySelector('.preloader');
const resultsBlock = document.querySelector('.results');
const searchValidation = document.querySelector('.search__validation');
export const lastSearchItemKeyName = "lastSearchItem";



export class NewsApi {
  constructor(apiKey, searchWord, dateFrom, dateTo) {
    this.apiKey = apiKey;
    this.searchWord = searchWord;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }

  createUrl() {
    let url = "https://newsapi.org/v2/everything?q="
    + this.searchWord + "&language=ru&from="
    + this.dateFrom + "&to="
    + this.dateTo + "&pageSize=100&apiKey="
    + this.apiKey;
    return url;
  }

  httpGet(url) {
    return fetch(url)
    .then (result => {
        if (result.ok) {
            return result.json();
        }
        // throw new Error('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        return Promise.reject(`Ошибка: ${result.status}`);
    })
  }

  storeData(cardListObj) {
    let cardUrl = this.createUrl();
      this.httpGet(cardUrl)
      .then(result => {
        localStorage.setItem(this.searchWord, JSON.stringify(result));
        localStorage.setItem(lastSearchItemKeyName, this.searchWord);
        return this.searchWord;
      })
      .then(searchWord => {
        return createResultCards(searchWord);
      })
      .then(cardsArray => {
        cardListObj.populateCards(cardsArray);
        preloaderBlock.classList.remove('preloader_active');
        cardListObj.renderCards();
      })
      .catch(error=>{
        preloaderBlock.classList.remove('preloader_active');
        console.log(error);
        // searchValidation.classList.add('search__validation_error');
        // searchValidation.textContent = error;
      })
  }
}
