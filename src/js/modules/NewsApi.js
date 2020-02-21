import {createResultCards} from "../search.js";
import {deleteArticles, putArticles} from "./localStorage.js";

import {preloaderBlock, resultsError, moreButton, searchInput, searchButton} from '../constants.js';

// const preloaderBlock = document.querySelector('.preloader');
// const resultsError = document.querySelector('.results__error');
// const moreButton = document.querySelector('.results__more');



export class NewsApi {
  constructor(apiKey, searchWord, dateFrom, dateTo) {
    this.apiKey = apiKey;
    this.searchWord = searchWord;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }

  createUrl() {
    const url = "https://newsapi.org/v2/everything?q="
    + this.searchWord + "&language=en&from="
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
        throw new Error('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
        // return Promise.reject(`Ошибка: ${result.status}`);
    })
  }

  storeData(cardListObj) {
    const cardUrl = this.createUrl();
      this.httpGet(cardUrl)
      .then(result => {
        deleteArticles(this.searchWord);
        putArticles(this.searchWord, result);
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
          // NB: we must clear the DOM object here, since we want to reset it
          // even if the upcoming API request returns an error; in that case,
          // the user will see an empty list of cards.
        deleteArticles(this.searchWord);
        preloaderBlock.classList.remove('preloader_active');
        resultsError.classList.add('results__error_active');
        resultsError.textContent = error;
        moreButton.classList.remove('results__more_active');
      })
      .finally(function(){
        console.log(searchInput.value);
        // searchInput.disabled = false;
        // searchButton.disabled = false;
        // searchButton.removeAttribute('disabled');
      })
  }
}
