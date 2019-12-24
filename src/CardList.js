const _cardContainer = document.querySelector('.result-card__container');

export class CardList {

  renderCards(data) {
    for (let element of data) {
        data.forEach(element => {
          _cardContainer.appendChild(element);});
    }
  }

  // deleteCards clears the data and the cardContainer
  deleteCards() {
    while (_cardContainer.hasChildNodes()) {
      _cardContainer.removeChild(_cardContainer.lastChild);
    }
  }

}
