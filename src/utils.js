export function changeDateFormat(date) {
  let toLocaleStringDate = new Date(date).toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  let year = toLocaleStringDate.slice(0, -3).slice(-4);
  let dayAndMonth = toLocaleStringDate.slice(0, -3).slice(0, -5);
  let formattedDate = dayAndMonth + ', ' + year;
  return formattedDate;
}

export function searchInText(text, searchWord) {
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

export function getMonth(yyyymmdd) {
  let t = yyyymmdd.split("-");
  let mmddyyyy = t[1]+"/"+t[2]+"/"+ t[0];
  let timestamp = new Date(mmddyyyy).getTime(); //will alert 1330210800000
  let month = new Date(timestamp).toLocaleString('ru', {
    month: 'long',
  });
  return month;
}

export function getDayAndWeekDay(date) {
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


