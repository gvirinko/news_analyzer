import {CommitApi} from "./CommitApi.js";

const commitsTitle = document.querySelector('.commits__title');

  function requestCommits() {
    let commitsApiObj = new CommitApi();
    let commitsList = commitsApiObj.getData();
  }

if (commitsTitle) {
  requestCommits();
}
