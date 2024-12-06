import { BaseElement } from '../../common/baseElem.js';
import styles from './giftCards.module.scss';
import { Card } from '../card/card.js';
import { PopUp } from '../popUp/popUp.js';

export class GiftCards extends BaseElement {
  #tabInner = ['all', 'for work', 'for health', 'for harmony'];

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
      { length: this.#tabInner.length },
      (_, idx) =>
        new BaseElement('button', [styles.tabButton], {}, this.#tabInner[idx]),
    );
    this.tabItem = Array.from({ length: this.#tabInner.length }, (tab, idx) => {
      if (idx === 0) {
        return new BaseElement('li', [styles.tabItem, styles.active], {});
      }
      return new BaseElement('li', [styles.tabItem], {});
    });

    this.cardsContainer = new BaseElement('div', [styles.cardsContainer]);

    this.card = new Card();
    this.cardsArray = this.card.createJSONCard();
    this.cardsContainer.append(...this.cardsArray);

    this.tabItem.forEach((li, idx) => li.append(this.tabsButton[idx]));
    tabsContainer.append(...this.tabItem);
    this.append(title, tabsContainer, this.cardsContainer);

    this.tabItem.forEach((tab) =>
      tab.addEventListener('click', (event) => {
        this.checkActiveTab(event.currentTarget);
        this.cardsContainer.removeChildren();
        this.cardsArray = this.card.filterGiftCards(event.currentTarget);
        this.tabAnimation(this.cardsContainer);
        this.cardsContainer.append(...this.cardsArray);

        this.cardsArray.forEach((card) =>
          card.addEventListener('click', () => {
            popUp.createPopUp(card);
          }),
        );
      }),
    );

    const popUp = new PopUp();
    this.cardsArray.forEach((card) =>
      card.addEventListener('click', () => {
        popUp.createPopUp(card);
      }),
    );
  }

  tabAnimation(baseElement) {
    const newspaperSpinning = [{ opacity: '0.2' }, { opacity: '1' }];

    const newspaperTiming = {
      duration: 1000,
      iterations: 1,
    };
    baseElement._elem.animate(newspaperSpinning, newspaperTiming);
  }

  checkActiveTab(button) {
    this.tabItem.forEach((tab) => {
      tab.controlClass(styles.active, false);
    });
    button.classList.add(styles.active);
  }
}
