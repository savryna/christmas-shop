import { BaseElement } from '../../common/baseElem.js';
import { GiftCards } from '../giftCards/giftCards.js';
import { ButtonUp } from '../buttonUp/buttonUp.js';

import styles from './main.module.scss';
export class Main2Page extends BaseElement {
  constructor() {
    super('main', [styles.main]);

    const giftCards = new GiftCards();
    const button = new ButtonUp();

    this.append(giftCards, button);
  }
}
