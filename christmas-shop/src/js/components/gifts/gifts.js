import { BaseElement } from '../../common/baseElem.js';
import styles from './gifts.module.scss';

export class GiftsElement extends BaseElement {
  cardsContent = [
    {
      src: './img/gift-for-work.png',
      tag: 'for work',
      title: 'Console.log Guru',
      tagStyle: 'forWork',
    },
    {
      src: './img/gift-for-health.png',
      tag: 'for health',
      title: 'Hydration Bot',
      tagStyle: 'forHealt',
    },
    {
      src: './img/gift-for-work.png',
      tag: 'for work',
      title: 'Merge Master',
      tagStyle: 'forWork',
    },
    {
      src: './img/gift-for-harmony.png',
      tag: 'for harmony',
      title: 'Spontaneous Coding Philosopher',
      tagStyle: 'forHarmony',
    },
  ];
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
    const card = Array.from(
      { length: this.cardsContent.length },
      () => new BaseElement('article', [styles.card]),
    );
    const cardImg = Array.from(
      { length: this.cardsContent.length },
      (_, idx) =>
        new BaseElement('img', [styles.cardImg], {
          src: this.cardsContent[idx].src,
        }),
    );

    const cardText = Array.from(
      { length: this.cardsContent.length },
      () => new BaseElement('div', [styles.cardText]),
    );

    const cardTag = Array.from(
      { length: this.cardsContent.length },
      (_, idx) =>
        new BaseElement(
          'p',
          [styles.cardTag, styles[this.cardsContent[idx].tagStyle]],
          {},
          this.cardsContent[idx].tag,
        ),
    );
    const cardHeader = Array.from(
      { length: this.cardsContent.length },
      (_, idx) =>
        new BaseElement(
          'p',
          [styles.cardHeader],
          {},
          this.cardsContent[idx].title,
        ),
    );

    cardText.forEach((elem, idx) => elem.append(cardTag[idx], cardHeader[idx]));

    card.forEach((elem, idx) => elem.append(cardImg[idx], cardText[idx]));
    cardsContainer.append(...card);

    console.log(cardImg);
    this.append(giftsTitle, giftsDescription, cardsContainer);
  }
}
