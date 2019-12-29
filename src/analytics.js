import {searchInText, getMonth, getDayAndWeekDay} from './utils.js';
import {getArticles, getLastSearchWord} from './localStorage.js'

const statsNumber = document.querySelector('.stats__number');
const statsMentions = document.querySelector('.stats__mentions');

let keyWord = document.querySelector('.stats__keyword');
if (keyWord) {
  let lastSearchWord = getLastSearchWord();
  console.log(lastSearchWord);
  if (lastSearchWord != null) {
    keyWord.textContent = lastSearchWord;
    let data = fetchDataForAnalytics(lastSearchWord);
    let frequencies = data[0];
    let totalMentions = data[1];
    generateDiagram(frequencies, totalMentions);

  }
}

function fetchDataForAnalytics(searchWord) {
  let result = getArticles(searchWord);
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

// generateDiagram creates the DOM object with number of mentions both in titles and descriptions
function generateDiagram(frequencies, total) {
  console.log("freq = " + frequencies + "total = " + total);
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
    if (total != 0) {
      graphBar.style.maxWidth = Math.round(frequencies[date]/total * 100) + "%";
    } else {
      graphBar.style.maxWidth = "0%";
    }
    graphContainer.appendChild(graphRow);
  }
}
