import {searchInText, getMonth, getDayAndWeekDay} from './js/utils.js';
import {getArticles, getLastSearchWord} from './js/modules/localStorage.js';

import {statsNumber, statsMentions} from './js/constants.js';
// const statsNumber = document.querySelector('.stats__number');
// const statsMentions = document.querySelector('.stats__mentions');

const keyWord = document.querySelector('.stats__keyword');
if (keyWord) {
  const lastSearchWord = getLastSearchWord();
  if (lastSearchWord != null) {
    keyWord.textContent = lastSearchWord;
    const data = fetchDataForAnalytics(lastSearchWord);
    const frequencies = data[0];
    const totalMentions = data[1];
    generateDiagram(frequencies, totalMentions);

  }
}

function fetchDataForAnalytics(searchWord) {
  const result = getArticles(searchWord);
  const data = {};
  let totalNumberInTitle = 0;
  let totalMentions = 0;
  for (let i = 6; i >= 0; i--) {
    const timestamp = new Date();
    timestamp.setDate(timestamp.getDate() - i);
    const timestampString = timestamp.toISOString();
    const dateString = timestampString.substring(0, timestampString.indexOf('T'));
    data[dateString] = 0;
    const month = getMonth(timestamp);
    const graphMonth = document.querySelector('.graph__month');
    graphMonth.textContent = month;
  }
  for (let i = 0; i < result.articles.length; i++) {
    const publishedTimestamp = result.articles[i].publishedAt;
    const dateString = publishedTimestamp.substring(0, publishedTimestamp.indexOf('T'));
    let numberInTitle = searchInText(result.articles[i].title, searchWord);
    totalNumberInTitle += numberInTitle;
    let numberInText = searchInText(result.articles[i].description, searchWord);
    totalMentions += numberInText;
    data[dateString] += numberInTitle + numberInText;
  }
  totalMentions += totalNumberInTitle;
  statsNumber.textContent = result.articles.length;
  statsMentions.textContent = totalNumberInTitle;
  return [data, totalMentions]
}

// generateDiagram creates the DOM object with number of mentions both in titles and descriptions
function generateDiagram(frequencies, total) {
  const graphContainer = document.querySelector('.graph__body');
  const dates = Object.keys(frequencies).sort();
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
    if (total != 0) {
      graphBar.style.maxWidth = Math.round(frequencies[date]/total * 100) + "%";
    } else {
      graphBar.style.maxWidth = "0%";
    }
    graphContainer.appendChild(graphRow);
  }
}
