import {changeDateFormat} from './index.js';

export class CommitCard {
  constructor(name, email, date, message, avatar) {
    this.name = name;
    this.email = email;
    this.date = date;
    this.message = message;
    this.avatar = avatar;
  }

  create() {
    const commitCard = document.createElement('a');
    const commitDate = document.createElement('p');
    const commitAuthor = document.createElement('div');
    const commitAvatar = document.createElement('img');
    const commitWrapper = document.createElement('div');
    const commitName = document.createElement('h4');
    const commitEmail = document.createElement('p');
    const commitText = document.createElement('p');

    commitCard.classList.add('link');
    commitCard.classList.add('swiper-slide');
    commitCard.classList.add('commit-card');
    commitDate.classList.add('commit-card__date');
    commitAuthor.classList.add('commit-card__author');
    commitAvatar.classList.add('commit-card__avatar');
    commitWrapper.classList.add('commit-card__wrapper');
    commitName.classList.add('commit-card__name');
    commitEmail.classList.add('commit-card__email');
    commitText.classList.add('commit-card__text');

    commitWrapper.appendChild(commitName);
    commitWrapper.appendChild(commitEmail);
    commitAuthor.appendChild(commitAvatar);
    commitAuthor.appendChild(commitWrapper);

    commitCard.appendChild(commitDate);
    commitCard.appendChild(commitAuthor);
    commitCard.appendChild(commitText);

    commitName.textContent = this.name;
    commitEmail.textContent = this.email;
    commitDate.textContent = changeDateFormat(this.date);
    commitText.textContent = this.message;
    commitAvatar.src = this.avatar;
    return commitCard;
  }
}
