import { BaseElement } from '../../common/baseElem.js';
import { Header } from '../header/header.js';
import { Main } from '../main/main.js';
import styles from './wrapper.module.scss';

export class Root extends BaseElement {
  constructor() {
    super('div', [styles.wrapper]);

    const header = new Header();
    const hero = new Main();
    this.append(header, hero);
  }

  init() {
    this.appendTo(document.body);
  }
}
