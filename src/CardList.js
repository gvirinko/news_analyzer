const cardContainer = document.querySelector('.result-card__container');

export class CardList {
  constructor(data) {
    this.data = data;
    // this.renderCards();
  }

  renderCards() {
    for (let element of this.data) {
      // if (element.render() === false) {
        this.data.forEach(element => {
          cardContainer.appendChild(element);});
      // }
    }
  }



}
