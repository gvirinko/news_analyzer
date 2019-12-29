import {changeDateFormat} from './index.js';

export class NewsCard {
  constructor(urlToImage, publishedAt, title, text, source, url) {
    this.urlToImage = urlToImage;
    this.publishedAt = publishedAt;
    this.title = title;
    this.text = text;
    this.source = source;
    this.url = url;
  }

  create() {
    const resultCard = document.createElement('a');
    const resultImage = document.createElement('img');
    const resultDescription = document.createElement('div');
    const resultDate = document.createElement('p');
    const resultTitle = document.createElement('h4');
    const resultText = document.createElement('p');
    const resultSource = document.createElement('a');

    resultCard.classList.add("result-card");
    resultImage.classList.add("result-card__image");
    resultDescription.classList.add("result-card__description");
    resultDate.classList.add("result-card__date");
    resultTitle.classList.add("result-card__title");
    resultText.classList.add("result-card__text");
    resultSource.classList.add("link");
    resultSource.classList.add("result-card__source");

    resultDescription.appendChild(resultDate);
    resultDescription.appendChild(resultTitle);
    resultDescription.appendChild(resultText);
    resultDescription.appendChild(resultSource);

    resultCard.appendChild(resultImage);
    resultCard.appendChild(resultDescription);

    resultCard.href = this.url;
    resultCard.target = '_blank';
    resultImage.src = this.urlToImage;
    resultDate.textContent = changeDateFormat(this.publishedAt);
    resultTitle.textContent = this.title;
    resultText.textContent = this.text;
    resultSource.textContent = this.source;
    return resultCard;
  }
}
