const _cardContainer = document.querySelector('.result-card__container');
const noResults = document.querySelector('.no-results');
const resultsBlock = document.querySelector('.results');
const moreButton = document.querySelector('.results__more');


export class CardList {

  populateCards(data) {
    this.data = data;
    this.renderIndex = 0;
  }

  onMoreCardsClick(object) {
    this.renderCards();
  }

  renderCards (renderLimit = 3) {
    if (this.data.length === 0) {
      noResults.classList.add('no-results__active');
      moreButton.classList.remove('results__more_active');
      return;
    }
    noResults.classList.remove('no-results__active');
    resultsBlock.classList.add('results__active');

    for (let i = this.renderIndex; i < Math.min(this.data.length, this.renderIndex + renderLimit); i++) {
      _cardContainer.appendChild(this.data[i]);
      moreButton.classList.add('results__more_active');

    }
    // To control when the "More" button should be hidden
    if ((this.data.length - this.renderIndex) <= 3) {
      moreButton.classList.remove('results__more_active');
    }
    this.renderIndex += renderLimit;

  }

  // deleteCards clears the data and the _cardContainer
  deleteCards() {
    while (_cardContainer.hasChildNodes()) {
      _cardContainer.removeChild(_cardContainer.lastChild);
    }
  }

}
