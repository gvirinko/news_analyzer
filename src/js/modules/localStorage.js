const _lastSearchItemKeyName = "lastSearchItem";

export function getArticles(searchWord) {
  return JSON.parse(localStorage.getItem(searchWord));
}

export function getLastSearchWord() {
  return localStorage.getItem(_lastSearchItemKeyName);
}

export function deleteArticles(searchWord) {
  localStorage.removeItem(searchWord);
  localStorage.removeItem(_lastSearchItemKeyName);
}

export function putArticles(searchWord, articlesJSON) {
  localStorage.setItem(searchWord, JSON.stringify(articlesJSON));
  localStorage.setItem(_lastSearchItemKeyName, searchWord);
}
