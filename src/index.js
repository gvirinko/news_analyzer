import "./style.css";
import './about.js';
import './analytics.js';

import {CardList} from './js/components/CardList.js';
import {getOnSearchClick, loadCardsFromLocalStorage} from './js/search.js';
import {searchButton, moreButton} from './js/constants.js';

if (searchButton) {
  const cards = new CardList();

  searchButton.addEventListener('click', getOnSearchClick(cards));
  moreButton.addEventListener('click', cards.onMoreCardsClick.bind(cards));
  loadCardsFromLocalStorage(cards);
}
