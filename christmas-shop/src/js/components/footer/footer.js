import { BaseElement } from '../../common/baseElem.js';
import styles from './footer.module.scss';

export class Footer extends BaseElement {
  contacts = [
    {
      href: 'tel:+375 (29) 111-22-33',
      srcImg: './img/svg/santa-claus.svg',
      contact: '+375 (29) 111-22-33',
      description: 'Call Us',
    },

    {
      href: 'https://maps.app.goo.gl/Ls1v5pe5a3h6yfz29',
      srcImg: './img/svg/christmas-tree.svg',
      contact: 'Magic forest',
      description: 'meet us',
    },
    {
      href: 'mailto:gifts@magic.com',
      srcImg: './img/svg/snake.svg',
      contact: 'gifts@magic.com',
      description: 'write us',
    },
  ];
  svgElemsCode = [
    {
      telegram: `
        <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="17"
    viewBox="0 0 21 17"
    fill="none"
  >
    <path
      d="M20 1L1 8.5L8 9.5M20 1L17.5 16L8 9.5M20 1L8 9.5M8 9.5V15L11.2488 11.7229"
      stroke="#181C29"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
      `,
    },
    {
      facebook: `
        <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M17 2H14C12.6739 2 11.4021 2.52678 10.4645 3.46447C9.52678 4.40215 9 5.67392 9 7V10H6V14H9V22H13V14H16L17 10H13V7C13 6.73478 13.1054 6.48043 13.2929 6.29289C13.4804 6.10536 13.7348 6 14 6H17V2Z"
      stroke="#181C29"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
      `,
    },
    {
      instagram: `
      <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
      stroke="#181C29"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z"
      stroke="#181C29"
      stroke-width="1.5"
    />
    <path
      d="M17.5 6.51L17.51 6.49889"
      stroke="#181C29"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
      `,
    },
    {
      x: `
        <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M16.8196 20.7684L3.75299 3.96836C3.44646 3.57425 3.72731 3 4.2266 3H6.70637C6.89152 3 7.06631 3.08548 7.17998 3.23164L20.2466 20.0316C20.5532 20.4258 20.2723 21 19.773 21H17.2933C17.1081 21 16.9333 20.9145 16.8196 20.7684Z"
      stroke="#181C29"
      stroke-width="1.5"
    />
    <path
      d="M20 3L4 21"
      stroke="#181C29"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
      `,
    },
  ];

  constructor() {
    super('footer', [styles.footer], { id: 'contacts' });

    const contactLinksContainer = new BaseElement('div', [
      styles.contactLinksContainer,
    ]);
    const contactLinks = Array.from(
      { length: this.contacts.length },
      (_, idx) =>
        new BaseElement('a', [styles.linkCard], {
          target: '_blank',
          href: this.contacts[idx].href,
        }),
    );
    const contactImgs = Array.from(
      { length: this.contacts.length },
      (_, idx) =>
        new BaseElement('img', [styles.contactImgs], {
          src: this.contacts[idx].srcImg,
        }),
    );

    const contactsTextLink = Array.from(
      { length: this.contacts.length },
      (_, idx) =>
        new BaseElement(
          'p',
          [styles.contactsTextLink],
          {},
          this.contacts[idx].contact,
        ),
    );
    const contactDescription = Array.from(
      { length: this.contacts.length },
      (_, idx) =>
        new BaseElement(
          'p',
          [styles.contactDescription],
          {},
          this.contacts[idx].description,
        ),
    );

    contactLinks.forEach((linkCard, idx) =>
      linkCard.append(
        contactImgs[idx],
        contactsTextLink[idx],
        contactDescription[idx],
      ),
    );

    const socialNetworksBlock = new BaseElement('div', [
      styles.socialNetworksBlock,
    ]);
    const svgElems = Array.from(
      { length: this.svgElemsCode.length },
      (_, idx) =>
        new BaseElement(
          'a',
          [styles.socialLink],
          { href: '#empty' },
          Object.values(this.svgElemsCode[idx]),
        ),
    );

    const copyrightElement = new BaseElement(
      'p',
      [styles.copyrightElement],
      {},
      '© Copyright 2025, All Rights Reserved',
    );

    const rssLink = new BaseElement(
      'a',
      [styles.rssLink],
      {
        href: 'https://rs.school/',
        target: '_blank',
      },
      'Made in Rolling Scopes School',
    );

    contactLinksContainer.append(...contactLinks);
    socialNetworksBlock.append(...svgElems);
    this.append(
      contactLinksContainer,
      socialNetworksBlock,
      copyrightElement,
      rssLink,
    );
  }
}

{
}
