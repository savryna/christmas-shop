import { BaseElement } from '../../common/baseElem.js';
import { GiftCards } from '../giftCards/giftCards.js';

import styles from './main.module.scss';
export class Main2Page extends BaseElement {
  constructor() {
    super('section', [styles.main]);

    const giftCards = new GiftCards();

    this.append(giftCards);
  }
}
