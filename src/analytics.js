import {lastSearchItemKeyName} from "./NewsApi.js";
import {getDataFromStorage} from './index.js';

const statsNumber = document.querySelector('.stats__number');
const statsMentions = document.querySelector('.stats__mentions');


let keyWord = document.querySelector('.stats__keyword');
if (keyWord) {
  let lastSearchWord = localStorage.getItem(lastSearchItemKeyName);
  if (lastSearchWord != null) {
    keyWord.textContent = lastSearchWord;
    let data = fetchDataForAnalytics(lastSearchWord);
    let frequencies = data[0];
    let totalMentions = data[1];
    generateDiagram(frequencies, totalMentions);

  }
}

function fetchDataForAnalytics(searchWord) {
  console.log(searchWord);
  let result = getDataFromStorage(searchWord);
  let data = {};
  let totalNumberInTitle = 0;
  let totalMentions = 0;
  for (let i = 6; i >= 0; i--) {
    let yyyymmdd = new Date();
    yyyymmdd.setDate(yyyymmdd.getDate() - i);
    let yyyymmdd_string = yyyymmdd.toISOString();
    data[yyyymmdd_string.substring(0, yyyymmdd_string.indexOf('T'))] = 0;
  }
  console.log("data = " + Object.keys(data));
  for (let i = 0; i < result.articles.length; i++) {
    let d = result.articles[i].publishedAt;
    let yyyymmdd = d.substring(0, d.indexOf('T'));
    let numberInTitle = searchInText(result.articles[i].title, searchWord);
    totalNumberInTitle += numberInTitle;
    let numberInText = searchInText(result.articles[i].description, searchWord);
    console.log("number in title = " + numberInTitle + "number in text = " + numberInText);
    totalMentions += numberInText;
    data[yyyymmdd] += numberInTitle + numberInText;
    console.log(numberInTitle + numberInText);
  }
  totalMentions += totalNumberInTitle;
  statsNumber.textContent = result.articles.length;
  // console.log("l: " + result.articles.length);
  statsMentions.textContent = totalNumberInTitle;
  // console.log(data);
  return [data, totalMentions]
}

function searchInText(text, searchWord) {
  let index = 0;
  let lowerSearchWord = searchWord.toLowerCase();
  let splitText = text.split(/[\s!?:;.,:"'«»]+/);
  for (let i = 0; i < splitText.length; i++) {
    if (splitText[i].toLowerCase() === lowerSearchWord) {
      index++;
    }
  }
   return index;
}

// generateDiagram creates the DOM frequency diagram from the mentions per day
// and the total number of mentions
function generateDiagram(frequencies, total) {
  console.log(frequencies);
  const graphContainer = document.querySelector('.graph__body');
  let dates = Object.keys(frequencies);
  dates = dates.sort();
  for (let date of dates) {
    const graphRow = document.createElement('div');
    const graphDate = document.createElement('div');
    const graphBar = document.createElement('div');

    graphRow.classList.add('graph__row');
    graphDate.classList.add('graph__date');
    graphBar.classList.add('graph__bar');
    // graphBar.classList.add(`graph__bar_${date}`);

    graphRow.appendChild(graphDate);
    graphRow.appendChild(graphBar);
    graphDate.textContent = date;
    graphBar.textContent = frequencies[date];
    // console.log(frequencies[date]/total);
    graphBar.style.maxWidth = Math.round(frequencies[date]/total * 100) + "%";
    console.log(graphBar.style.maxWidth);
    graphContainer.appendChild(graphRow);

  }
}
