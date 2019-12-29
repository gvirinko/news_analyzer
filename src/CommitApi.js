import { CommitCard } from "./CommitCard.js";

const _swiperWrapper = document.querySelector('.swiper-wrapper');


export class CommitApi {
  constructor () {
    this.url = "https://api.github.com/repos/gvirinko/news_analyzer/commits";
  }

  httpGet() {
    return fetch(this.url)
    .then (result => {
        if (result.ok) {
            return result.json();
        }
        return Promise.reject(`Ошибка: ${result.status}`);
    })
  }

  getData() {
    this.httpGet()
    .then(result => {
      const commitsArray = [];
      for (let i = 0; i < result.length; i++) {
        let name = result[i].commit.committer.name;
        let email = result[i].commit.committer.email;
        let date = result[i].commit.committer.date;
        let message = result[i].commit.message;
        let avatar = result[i].author.avatar_url;
        let commitCardObj = new CommitCard(name, email, date, message, avatar);
        let singleCommit = commitCardObj.create();
        commitsArray.push(singleCommit);
      }
      return commitsArray;
    })
    .then(commitsArray => {
      for (let i = 0; i < commitsArray.length; i++) {
        _swiperWrapper.appendChild(commitsArray[i]);
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }

}
