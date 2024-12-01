import { BaseElement } from '../../common/baseElem.js';
import styles from './gifts.module.scss';
import data from '../../data/gifts.json';
import { Card } from '../card/card.js';

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

    const cardsContainer = new BaseElement('div', [styles.cards]);

    // const giftCardAmound = 4;
    cardsContainer.append(...this.createArrCard());

    this.append(giftsTitle, giftsDescription, cardsContainer);
    // this.data = data;
    // this.getRandomData();
    // this.createArrCard();
  }

  // может получать сет из индексов от 0 до 31
  // а потом брать по карточке из джейсона
  getRandomData() {
    const giftCardAmound = 4;
    const setIdxs = new Set();
    while (setIdxs.size < giftCardAmound) {
      const randomCard = data.indexOf(this.getRandomElem(data));
      setIdxs.add(randomCard);
    }
    // console.log(setIdxs);
    return setIdxs;
    // const randomCard = this.getRandomElem(data);
    // const indexCardFromData = data.indexOf(randomCard);
    // return { randomCard: randomCard, indexCardFromData: indexCardFromData };
  }

  createArrCard() {
    const arrCard = [];

    const cardAmount = 4;
    this.ArrayFromSet = Array.from(this.getRandomData());

    for (let i = 0; i < cardAmount; i++) {
      this.curCard = new Card();
      // this.cardJSON = this.data[this.getRandomData()[i]];
      // console.log(data[this.ArrayFromSet[i]]);
      this.cardJSON = data[this.ArrayFromSet[i]];
      arrCard.push(this.curCard.createCard(this.cardJSON));
      // console.log(this.cardJSON);
      // arrCard.push(this.curCard.createCard(this.data[this.getRandomData()[i]]));
    }
    // for (let i = 0; i < cardAmount; i++) {
    //   this.curCard = new Card();
    //   console.log(this.curCardDesc);
    //   arrCard.push(this.curCard.createCard(this.getRandomData().randomCard));
    //   // console.log(new Card().cardDescription);
    // }
    // console.log(arrCard);
    return arrCard;
  }
}
