import { BaseElement } from '../../common/baseElem.js';
import styles from './header.module.scss';

export class Header extends BaseElement {
  navLinks = [
    { gifts: 'gifts.html' },
    { about: './home#about' },
    { best: './home#gifts' },
    { contacts: '#contacts' },
  ];

  constructor() {
    super('header', [styles.header]);

    const logo = new BaseElement('a', [styles.logo], { href: './home.html' });
    const logoDivImg = new BaseElement('div', [styles.logoDivImg]);
    const logoImg = new BaseElement('img', [styles.logoImg], {
      src: './img/svg/snowflake.svg',
      alt: 'logo icon',
    });
    const logoText = new BaseElement('h1', [styles.logoText], {}, 'the gifts');
    const navigation = new BaseElement('nav', [styles.nav]);
    const navList = new BaseElement('ul', [styles.navList]);
    const navLink = Array.from(
      { length: this.navLinks.length },
      (_, idx) =>
        new BaseElement(
          'a',
          [styles.navLink],
          { href: Object.values(this.navLinks[idx]) },
          `<span>${Object.keys(this.navLinks[idx])}</span>`,
        ),
    );
    this.navLink = navLink;

    const navItem = Array.from(
      { length: this.navLinks.length },
      (_, idx) => new BaseElement('li', [styles.navItem]),
    );

    navItem.forEach((item, idx) => item.append(navLink[idx]));

    const burgerButton = new BaseElement('div', [styles.burgerButton]);
    const hr = Array.from({ length: 2 }, () => new BaseElement('hr'));

    burgerButton.append(...hr);
    logoDivImg.append(logoImg);
    logo.append(logoDivImg, logoText);
    navList.append(...navItem);
    navigation.append(navList);
    this.append(logo, navigation, burgerButton);
  }

  activeClassNav() {
    this.navLink[0].addClasses([styles.active]);
    this.navLink[0].removeAttributes(['href']);
  }
}
