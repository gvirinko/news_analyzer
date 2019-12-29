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

export function getMonth(timestamp) {
  return timestamp.toLocaleString('ru', {
    month: 'long',
  });
}

export function getDayAndWeekDay(dateString) {
  let fields = dateString.split("-");
  let monthDayYearDateString = fields[1]+"/"+fields[2]+"/"+ fields[0];
  let date = new Date(monthDayYearDateString)
  let day = date.toLocaleString('ru', {
    day: 'numeric',
  });
  let weekDay = date.toLocaleString('ru', {
    weekday: 'short',
  });
  let dayAndWeekDay = day + ', ' + weekDay;
  return dayAndWeekDay;
}


