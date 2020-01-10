import "./style.css";
import './about.js';
import './analytics.js';

import {CardList} from './js/components/CardList.js';
import {getOnSearchClick, loadCardsFromLocalStorage} from './js/search.js';

import {searchButton, moreButton} from './js/constants.js';
//  const searchButton = document.querySelector('.search__button');
// const resultsMore = document.querySelector('.results__more');

if (searchButton) {
  const cards = new CardList();

  searchButton.addEventListener('click', getOnSearchClick(cards));
  moreButton.addEventListener('click', cards.onMoreCardsClick.bind(cards));
  loadCardsFromLocalStorage(cards);
}
