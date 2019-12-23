import { ResultCard } from "./ResultCard";
import {CardList} from "./CardList.js";
import {createResultCards} from "./index.js"
import {renderCards} from "./index.js";

export class Api {
  constructor(apiKey, searchWord, dateFrom, dateTo) {
    this.apiKey = apiKey;
    this.searchWord = searchWord;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.url = this.createUrl();
    // this.storeData();
  }

  createUrl() {
    let url = "https://newsapi.org/v2/everything?q="
    + this.searchWord + "&language=ru&from="
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
        return Promise.reject(`Ошибка: ${result.status}`);
    })
  }

  storeData() {
    let cardUrl = this.createUrl();
      this.httpGet(cardUrl)
      .then(result => {
        localStorage.setItem(this.searchWord, JSON.stringify(result));
        return this.searchWord;
      })
      .then(searchWord => {
        return createResultCards(searchWord);
      })
      .then(cardsArray => {
        let cardListObj = new CardList(cardsArray);
        cardListObj.renderCards();
      })
      .catch(error=>{console.log(error);
      })
  }
}




// getData() {
//   let cardUrl = this.createUrl();
//     this.httpGet(cardUrl)
//     .then(result=>{
//       let data = [];
//       let localStoragedData = [];
//       for (let i = 0; i < result.totalResults; i++) {
//         let urlToImage = result.articles[i].urlToImage;
//         let publishedAt = result.articles[i].publishedAt;
//         let title = result.articles[i].title;
//         let text = result.articles[i].description;
//         let source = result.articles[i].source.name;

//         let resultCardObject = new ResultCard(urlToImage, publishedAt, title, text, source);
//         let singleCard = resultCardObject.create();
//         // console.log(singleCard);
//         data.push(singleCard);
//       }
//       let cardList = new CardList(data);
//       cardList.renderCards();
//     })
//     .catch(error=>{console.log(error);})
// }
