import { BaseElement } from '../../common/baseElem.js';
import styles from './header.module.scss';

export class Header extends BaseElement {
  constructor() {
    super('header', [styles.header]);
  }
}
