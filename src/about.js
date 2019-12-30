import {CommitApi} from "./CommitApi.js";
import './swiper-custom.js';


const commitsTitle = document.querySelector('.commits__title');

if (commitsTitle) {
  new CommitApi().getData();
}
