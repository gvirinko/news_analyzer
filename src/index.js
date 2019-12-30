import "./style.css";
import './about.js';
import './analytics.js';

import {CardList} from "./CardList.js";
import {getOnSearchClick, loadCardsFromLocalStorage} from './search.js';

const searchButton = document.querySelector('.search__button');
const resultsMore = document.querySelector('.results__more');

if (searchButton) {
  const cards = new CardList();

  searchButton.addEventListener('click', getOnSearchClick(cards));
  resultsMore.addEventListener('click', cards.onMoreCardsClick.bind(cards));
  loadCardsFromLocalStorage(cards);
}
