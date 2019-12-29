import {CommitApi} from "./CommitApi.js";

const commitsTitle = document.querySelector('.commits__title');

if (commitsTitle) {
  new CommitApi().getData();
}
