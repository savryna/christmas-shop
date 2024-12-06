import { BaseElement } from '../../common/baseElem';
import styles from './card.module.scss';
import data from '../../data/gifts.json';

export class Card extends BaseElement {
  #cardsContent = [
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
  imgExtension = ['avif', 'webp', 'png'];

  constructor() {
    super('article', [styles.card]);
  }

  findSrcToCard(cardFromData) {
    return this.#cardsContent.find(
      (card) => card.category === cardFromData.category,
    );
  }

  getDataForCard(dataForCard) {
    const currentCard = dataForCard;

    const cardsSrcFromCategory = this.findSrcToCard(currentCard);
    const src = cardsSrcFromCategory.src;
    const category = cardsSrcFromCategory.category;
    const cssStyle = `${category.split(' ')[0].toLowerCase()}${category.split(' ')[1][0].toUpperCase() + category.split(' ')[1].slice(1)}`;
    const cardHeader = currentCard.name;
    const cardDescription = currentCard.description;
    return {
      src: src,
      category: category,
      cssStyle: cssStyle,
      cardHeader: cardHeader,
      cardDescription: cardDescription,
    };
  }

  createCard(dataForCard) {
    const data = this.getDataForCard(dataForCard);
    this.data = data;
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
    this.category = data.category;

    this.cardText.append(this.cardTag, this.cardHeader);
    this.cardPicture.append(...this.cardSources, this.cardImg);
    this.append(this.cardPicture, this.cardText);
    return this;
  }

  getRandomData() {
    const giftCardAmounts = 4;
    const setIdxs = new Set();
    while (setIdxs.size < giftCardAmounts) {
      const randomCard = data.indexOf(this.getRandomElem(data));
      setIdxs.add(randomCard);
    }
    return setIdxs;
  }

  createInstanceCard() {
    return new Card();
  }

  createRandomCard(cardAmount) {
    const arrCard = [];
    this.ArrayFromSet = Array.from(this.getRandomData());

    for (let i = 0; i < cardAmount; i++) {
      this.curCard = this.createInstanceCard();

      this.cardJSON = data[this.ArrayFromSet[i]];
      arrCard.push(this.curCard.createCard(this.cardJSON));
    }
    return arrCard;
  }

  createJSONCard() {
    const arrCard = [];

    const cardAmount = data.length;

    for (let i = 0; i < cardAmount; i++) {
      this.curCard = this.createInstanceCard();
      this.cardJSON = data[i];
      arrCard.push(this.curCard.createCard(this.cardJSON));
    }
    return arrCard;
  }

  filterGiftCards(filterButton) {
    if (filterButton.innerText.toLowerCase() === 'all') {
      return this.createJSONCard();
    }
    const filterCards = this.createJSONCard().filter(
      (card) =>
        card.cardTag.getInnerText().toLowerCase() ===
        filterButton.innerText.toLowerCase(),
    );

    return filterCards;
  }
}
