import {CommitApi} from './js/modules/CommitApi.js';
import './js/swiper-custom.js';
import {commitsTitle} from './js/constants';

// const commitsTitle = document.querySelector('.commits__title');

if (commitsTitle) {
  new CommitApi().getData();
}
