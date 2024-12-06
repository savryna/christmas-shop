import { BaseElement } from '../../common/baseElem.js';
import styles from './gifts.module.scss';
import data from '../../data/gifts.json';
import { Card } from '../card/card.js';
import { PopUp } from '../popUp/popUp.js';

export class GiftsElement extends BaseElement {
  constructor() {
    super('section', [styles.giftsSection], { id: 'gifts' });

    const giftsTitle = new BaseElement(
      'h2',
      [styles.giftsTitle],
      {},
      'Best Gifts',
    );
    const giftsDescription = new BaseElement(
      'p',
      [styles.giftsDescription],
      {},
      'especially for you',
    );

    this.cardsContainer = new BaseElement('div', [styles.cards]);

    this.card = new Card();
    this.cardsArray = this.card.createRandomCard(4);
    this.cardsContainer.append(...this.cardsArray);

    const popUp = new PopUp();
    this.cardsArray.forEach((card) =>
      card.addEventListener('click', () => {
        popUp.createPopUp(card);
      }),
    );

    this.append(giftsTitle, giftsDescription, this.cardsContainer);
  }
}
