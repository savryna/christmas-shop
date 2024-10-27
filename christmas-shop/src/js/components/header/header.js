import { BaseElement } from '../../common/baseElem.js';
import styles from './header.module.scss';

export class Header extends BaseElement {
  navLinks = [
    { gifts: 'gifts.html' },
    { about: './index.html#about' },
    { best: './index.html#gifts' },
    { contacts: '#contacts' },
  ];

  constructor() {
    super('header', [styles.header]);

    const logo = new BaseElement('a', [styles.logo], { href: './index.html' });
    const logoDivImg = new BaseElement('div', [styles.logoDivImg]);
    const logoImg = new BaseElement('img', [styles.logoImg], {
      src: './img/svg/snowflake.svg',
    });
    const logoText = new BaseElement('h1', [styles.logoText], {}, 'the gifts');
    const navigation = new BaseElement('nav', []);
    const navList = new BaseElement('ul', [styles.navList]);
    const navLink = Array.from(
      { length: this.navLinks.length },
      (_, idx) =>
        new BaseElement(
          'a',
          [styles.navLink],
          { href: Object.values(this.navLinks[idx]) },
          Object.keys(this.navLinks[idx]),
        ),
    );
    this.navLink = navLink;
    const navItem = Array.from(
      { length: this.navLinks.length },
      (_, idx) => new BaseElement('li', [styles.navItem]),
    );

    navItem.forEach((item, idx) => item.append(navLink[idx]));

    logoDivImg.append(logoImg);
    logo.append(logoDivImg, logoText);
    navList.append(...navItem);
    navigation.append(navList);
    this.append(logo, navigation);
  }

  activeClassNav(idx) {
    this.navLink[idx].addClasses([styles.active]);
  }
}
