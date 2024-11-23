import { BaseElement } from '../../common/baseElem.js';
import styles from './gifts.module.scss';

export class GiftsElement extends BaseElement {
  cardsContent = [
    {
      src: './img/gift-for-work',
      tag: 'for work',
      title: 'Console.log Guru',
      tagStyle: 'forWork',
    },
    {
      src: './img/gift-for-health',
      tag: 'for health',
      title: 'Hydration Bot',
      tagStyle: 'forHealth',
    },
    {
      src: './img/gift-for-work',
      tag: 'for work',
      title: 'Merge Master',
      tagStyle: 'forWork',
    },
    {
      src: './img/gift-for-harmony',
      tag: 'for harmony',
      title: 'Spontaneous Coding Philosopher',
      tagStyle: 'forHarmony',
    },
  ];
  imgExtension = ['avif', 'webp', 'png'];
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
    const cardPictures = Array.from(
      { length: this.cardsContent.length },
      () => new BaseElement('picture', [styles.cardPicture]),
    );
    const cardImg = Array.from(
      { length: this.cardsContent.length },
      (_, idx) =>
        new BaseElement('img', [styles.cardImg], {
          src: `${this.cardsContent[idx].src}.png`,
          alt: `${this.cardsContent[idx].tag} gift image`,
        }),
    );
    const cardSources = Array.from(
      { length: this.cardsContent.length },
      (_, idxPicture) =>
        Array.from(
          { length: this.imgExtension.length },
          (_, idxSource) =>
            new BaseElement('source', [], {
              type: `image/${this.imgExtension[idxSource]}`,
              srcset: `${this.cardsContent[idxPicture].src}.${this.imgExtension[idxSource]}`,
            }),
        ),
    );

    const cardText = Array.from(
      { length: this.cardsContent.length },
      () => new BaseElement('div', [styles.cardText]),
    );

    const cardTag = Array.from(
      { length: this.cardsContent.length },
      (_, idx) =>
        new BaseElement(
          'h3',
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

    cardPictures.forEach((picture, idxPicture) =>
      picture.append(...cardSources[idxPicture], cardImg[idxPicture]),
    );
    cardText.forEach((elem, idx) => elem.append(cardTag[idx], cardHeader[idx]));

    card.forEach((elem, idx) => elem.append(cardPictures[idx], cardText[idx]));
    cardsContainer.append(...card);

    this.append(giftsTitle, giftsDescription, cardsContainer);
  }
}
