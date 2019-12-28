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
  let result = getDataFromStorage(searchWord);
  let data = {};
  let totalNumberInTitle = 0;
  let totalMentions = 0;
  for (let i = 6; i >= 0; i--) {
    let yyyymmdd = new Date();
    yyyymmdd.setDate(yyyymmdd.getDate() - i);
    let yyyymmdd_string = yyyymmdd.toISOString();
    let yyyymmdd_short = yyyymmdd_string.substring(0, yyyymmdd_string.indexOf('T'));
    data[yyyymmdd_short] = 0;
    let month = getMonth(yyyymmdd_short);
    const graphMonth = document.querySelector('.graph__month');
    graphMonth.textContent = month;
  }
  for (let i = 0; i < result.articles.length; i++) {
    let d = result.articles[i].publishedAt;
    let yyyymmdd = d.substring(0, d.indexOf('T'));
    let numberInTitle = searchInText(result.articles[i].title, searchWord);
    totalNumberInTitle += numberInTitle;
    let numberInText = searchInText(result.articles[i].description, searchWord);
    totalMentions += numberInText;
    data[yyyymmdd] += numberInTitle + numberInText;
  }
  totalMentions += totalNumberInTitle;
  statsNumber.textContent = result.articles.length;
  statsMentions.textContent = totalNumberInTitle;
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

// generateDiagram creates the DOM object with number of mentions both in titles and descriptions
function generateDiagram(frequencies, total) {
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

    graphRow.appendChild(graphDate);
    graphRow.appendChild(graphBar);
    graphDate.textContent = getDayAndWeekDay(date);
    graphBar.textContent = frequencies[date];
    if (frequencies[date] === 0) {
      graphBar.style.color = "black";
    }
    graphBar.style.maxWidth = Math.round(frequencies[date]/total * 100) + "%";
    graphContainer.appendChild(graphRow);
  }
}

function getMonth(yyyymmdd) {
  let t = yyyymmdd.split("-");
  let mmddyyyy = t[1]+"/"+t[2]+"/"+ t[0];
  let timestamp = new Date(mmddyyyy).getTime(); //will alert 1330210800000
  let month = new Date(timestamp).toLocaleString('ru', {
    month: 'long',
  });
  return month;
}

function getDayAndWeekDay(date) {
  let t = date.split("-");
  let mmddyyyy = t[1]+"/"+t[2]+"/"+ t[0];
  let timestamp = new Date(mmddyyyy).getTime(); //will alert 1330210800000
  let day = new Date(timestamp).toLocaleString('ru', {
    day: 'numeric',
  });
  let weekDay = new Date(timestamp).toLocaleString('ru', {
    weekday: 'short',
  });
  let dayAndWeekDay = day + ', ' + weekDay;
  return dayAndWeekDay;
}
