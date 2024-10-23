import { BaseElement } from '../../common/baseElem.js';
import { Header } from '../header/header.js';
import styles from './wrapper.module.scss';

export class Root extends BaseElement {
  constructor() {
    super('div', [styles.wrapper]);

    const header = new Header();
    this.append(header);
  }

  init() {
    this.appendTo(document.body);
  }
}
