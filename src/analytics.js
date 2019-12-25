import {lastSearchItemKeyName} from "./NewsApi.js";

let keyWord = document.querySelector('.stats__keyword');
// localStorage.clear();
if (keyWord) {
  for (let i = 0; i < localStorage.length; i++) {
    console.log(i);
    console.log(localStorage.key(i));

  }
  let lastSearchWord = localStorage.getItem(lastSearchItemKeyName);
  if (lastSearchWord != null) {
    keyWord.textContent = lastSearchWord;
  }
}
