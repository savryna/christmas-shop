import { BaseElement } from '../../common/baseElem';
import styles from './card.module.scss';
import data from '../../data/gifts.json';

export class Card extends BaseElement {
  cardsContent = [
    {
      src: './img/gift-for-work',
      category: 'For Work',
    },
    {
      src: './img/gift-for-health',
      category: 'For Health',
    },
    {
      src: './img/gift-for-harmony',
      category: 'For Harmony',
    },
  ];
  cardsCategory = ['For Work', 'For Health', 'For Harmony'];
  imgExtension = ['avif', 'webp', 'png'];

  constructor() {
    super('article', [styles.card]);

    // this.createCard();
  }

  // getRandomData() {
  //   const randomCard = this.getRandomElem(data);
  //   const indexCardFromData = data.indexOf(randomCard);
  //   return randomCard;
  // }

  findSrcToCard(cardFromRandom) {
    return this.cardsContent.find(
      (card) => card.category === cardFromRandom.category,
    );
  }

  getDataForCard(dataForCard) {
    // const currentCard = this.getRandomData();
    const currentCard = dataForCard;

    const cardsSrcFromCategory = this.findSrcToCard(currentCard);
    const src = cardsSrcFromCategory.src;
    const category = cardsSrcFromCategory.category;
    const cssStyle = `${category.split(' ')[0].toLowerCase()}${category.split(' ')[1][0].toUpperCase() + category.split(' ')[1].slice(1)}`;
    const cardHeader = currentCard.name;
    const cardDescription = currentCard.description;
    // console.log(cardDescription);
    return {
      src: src,
      category: category,
      cssStyle: cssStyle,
      cardHeader: cardHeader,
      cardDescription: cardDescription,
    };
  }

  createCard(dataForCard) {
    // const data = this.getDataForCard();
    const data = this.getDataForCard(dataForCard);

    // this.card = new BaseElement('article', [styles.card]);
    this.cardPicture = new BaseElement('picture', [styles.cardPicture]);
    this.cardImg = new BaseElement('img', [styles.cardImg], {
      src: `${data.src}.png`,
      alt: `${data.category.toLowerCase()} gift image`,
    });
    this.cardSources = Array.from(
      { length: this.imgExtension.length },
      (_, idxSource) =>
        new BaseElement('source', [], {
          type: `image/${this.imgExtension[idxSource]}`,
          srcset: `${data.src}.${this.imgExtension[idxSource]}`,
        }),
    );

    this.cardText = new BaseElement('div', [styles.cardText]);
    this.cardTag = new BaseElement(
      'p',
      [styles.cardTag, styles[data.cssStyle]],
      {},
      data.category.toLowerCase(),
    );

    this.cardHeader = new BaseElement(
      'h3',
      [styles.cardHeader],
      {},
      data.cardHeader,
    );
    this.cardDescription = data.cardDescription;

    this.cardText.append(this.cardTag, this.cardHeader);
    this.cardPicture.append(...this.cardSources, this.cardImg);
    this.append(this.cardPicture, this.cardText);
    return this;
  }
}
