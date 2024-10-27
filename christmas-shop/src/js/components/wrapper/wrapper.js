import { BaseElement } from '../../common/baseElem.js';
import { Header } from '../header/header.js';
import { Main } from '../main/main.js';
import { Main2Page } from '../main2Page/main.js';
import { Footer } from '../footer/footer.js';
import styles from './wrapper.module.scss';

export class Root extends BaseElement {
  constructor() {
    super('div', [styles.wrapper]);

    const header = new Header();
    const main = new Main();
    const footer = new Footer();

    this.append(header, main, footer);
  }

  init() {
    this.appendTo(document.body);
  }
}

export class RootGifts extends BaseElement {
  constructor() {
    super('div', [styles.wrapper]);

    const header = new Header();
    header.activeClassNav(0);
    const main = new Main2Page();
    const footer = new Footer();

    this.append(header, main, footer);
  }

  init() {
    this.appendTo(document.body);
  }
}
