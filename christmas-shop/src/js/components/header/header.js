import { BaseElement } from '../../common/baseElem.js';
import styles from './header.module.scss';

export class Header extends BaseElement {
  navLinks = [
    { gifts: 'gifts.html' },
    { about: './home.html#about' },
    { best: './home.html#gifts' },
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
    this.navigation = navigation;
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
    this.navItem = navItem;

    navItem.forEach((item, idx) => item.append(navLink[idx]));

    const burgerButton = new BaseElement('div', [styles.burgerButton]);
    this.burgerButton = burgerButton;
    logoDivImg.append(logoImg);
    logo.append(logoDivImg, logoText);
    navList.append(...navItem);
    navigation.append(navList);
    this.append(logo, navigation, burgerButton);
    this.openBurgerMenu();
  }

  activeClassNav() {
    this.navLink[0].addClasses([styles.active]);
    this.navLink[0].removeAttributes(['href']);
  }

  openBurgerMenu() {
    this.burgerButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      this.navigation.controlClass(styles.open);
      this.isMenuOpen();
    });

    this.navItem.forEach((link) =>
      link.addEventListener('click', () => {
        this.navigation.controlClass(styles.open, false);
        this.isMenuOpen();
      }),
    );

    window.addEventListener('resize', () => {
      this.isMenuOpen();
      this.navigation.controlClass(
        styles.open,
        window.innerWidth < 768 && this.navigation.hasClass(styles.open),
      );
    });
  }

  isMenuOpen() {
    if (this.navigation.hasClass(styles.open)) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }
  }
}
