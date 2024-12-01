import { BaseElement } from '../../common/baseElem.js';
import styles from './giftCards.module.scss';
import { Card } from '../card/card.js';
import data from '../../data/gifts.json';

export class GiftCards extends BaseElement {
  tabInner = ['All', 'for work', 'for health', 'for harmony'];
  cardsContent = {
    work: {
      srcImg: './img/gift-for-work.png',
      tag: 'for work',
      innerText: [
        'Console.log Guru',
        'Bug Magnet',
        'Shortcut Cheater',
        'Merge Master',
      ],
      styleTag: 'forWork',
    },
    health: {
      srcImg: './img/gift-for-health.png',
      tag: 'for health',
      innerText: [
        'Step Master',
        'Posture Levitation',
        'Snack Resister',
        'Hydration Bot',
      ],
      styleTag: 'forHealth',
    },

    harmony: {
      srcImg: './img/gift-for-harmony.png',
      tag: 'for harmony',
      innerText: [
        'Bug Acceptance Guru',
        'Error Laugher',
        'Joy Charger',
        'Spontaneous Coding Philosopher',
      ],
      styleTag: 'forHarmony',
    },
  };

  layoutCardQueue = [
    this.cardsContent.work,
    this.cardsContent.health,
    this.cardsContent.work,
    this.cardsContent.work,
    this.cardsContent.health,
    this.cardsContent.harmony,
    this.cardsContent.health,
    this.cardsContent.harmony,
    this.cardsContent.health,
    this.cardsContent.work,
    this.cardsContent.harmony,
    this.cardsContent.harmony,
  ];

  constructor() {
    super('section', [styles.giftCardsSection]);

    const title = new BaseElement(
      'h2',
      [styles.title],
      {},
      'Achieve health, harmony, and inner strength',
    );

    const tabsContainer = new BaseElement('ul', [styles.tabsContainer]);
    this.tabsButton = Array.from(
      { length: this.tabInner.length },
      (_, idx) =>
        new BaseElement('button', [styles.tabButton], {}, this.tabInner[idx]),
    );
    this.tabItem = Array.from({ length: this.tabInner.length }, (tab, idx) => {
      if (idx === 0) {
        return new BaseElement('li', [styles.tabItem, styles.active], {});
      }
      return new BaseElement('li', [styles.tabItem], {});
    });

    const cardsContainer = new BaseElement('div', [styles.cardsContainer]);

    // const giftCardAmound = data.length;
    cardsContainer.append(...this.createArrCard());

    this.tabItem.forEach((li, idx) => li.append(this.tabsButton[idx]));
    const [allTab, workTab, healthTab, harmonyTab] = this.tabItem;
    tabsContainer.append(...this.tabItem);
    this.append(title, tabsContainer, cardsContainer);

    this.tabItem.forEach((tab) =>
      tab.addEventListener('click', (event) => {
        this.checkActiveTab(event.currentTarget);
        cardsContainer.removeChildren();
        cardsContainer.append(...this.filterGiftCards(event.currentTarget));

        if (event.currentTarget === allTab._elem) {
          console.log('gi');
          cardsContainer.append(...this.createArrCard());
        }
      }),
    );
  }

  createArrCard() {
    const arrCard = [];

    const cardAmount = data.length;

    for (let i = 0; i < cardAmount; i++) {
      this.curCard = new Card();
      this.cardJSON = data[i];
      arrCard.push(this.curCard.createCard(this.cardJSON));
    }
    return arrCard;
  }

  filterGiftCards(filterButton) {
    const filterCards = this.createArrCard().filter(
      (card) =>
        card.cardTag.getInnerText().toLowerCase() ===
        filterButton.innerText.toLowerCase(),
    );
    console.log(filterCards);
    return filterCards;
  }

  checkActiveTab(button) {
    this.tabItem.forEach((tab) => tab.controlClass(styles.active, false));
    button.classList.add(styles.active);
  }
}
