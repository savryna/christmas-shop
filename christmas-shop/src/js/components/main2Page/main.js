import { BaseElement } from '../../common/baseElem.js';
import { GiftCards } from '../giftCards/giftCards.js';
import { ButtonUp } from '../buttonUp/buttonUp.js';
import stylesButton from '../buttonUp/buttonUp.module.scss';

import styles from './main.module.scss';
export class Main2Page extends BaseElement {
  constructor() {
    super('main', [styles.main]);

    const giftCards = new GiftCards();
    this.buttonUp = new ButtonUp();

    this.append(giftCards, this.buttonUp);

    this.addButtonUp();
  }

  addButtonUp() {
    window.addEventListener('scroll', () => {
      const buttonVisibilityHeight = 301;

      this.buttonUp.controlClass(
        stylesButton.visible,
        window.pageYOffset >= buttonVisibilityHeight,
      );
    });
  }
}
