import {getCommits} from "./index.js";
import { CommitCard } from "./CommitCard.js";

export class CommitsApi {
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
      console.log(result);
      let commitsArray = [];
      for (let i = 0; i < result.length; i++) {
        let name = result[i].commit.committer.name;
        let email = result[i].commit.committer.email;
        let date = result[i].commit.committer.date;
        let message = result[i].commit.message;
        // let avatar = result[i].commit.author.avatar_url;
        let commitCardObj = new CommitCard(name, email, date, message, avatar);
        let singleCommit = commitCardObj.create();
        commitsArray.push(singleCommit);
        // console.log(commitsArray);
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }

}
