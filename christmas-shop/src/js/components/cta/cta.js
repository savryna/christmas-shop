import { BaseElement } from '../../common/baseElem.js';
import styles from './cta.module.scss';

export class CTASection extends BaseElement {
  timer = [
    { days: '47' },
    { hours: '5' },
    { minutes: '34' },
    { seconds: '12' },
  ];

  constructor() {
    super('section', [styles.ctaSection]);

    const ctaContent = new BaseElement('div', [styles.ctaContent]);

    const question = new BaseElement(
      'p',
      [styles.question],
      {},
      'Ready to start your journey to a better version of yourself?',
    );
    const toGiftsPage = new BaseElement(
      'a',
      [styles.ctaLink],
      {
        href: 'gifts.html',
      },
      'Explore Magical Gifts',
    );
    const timerText = new BaseElement(
      'h2',
      [styles.timerText],
      {},
      'The New Year is Coming Soon...',
    );

    const timerBlock = new BaseElement('ul', [styles.timerBlock]);
    const timerItems = Array.from(
      { length: this.timer.length },
      (_, idx) => new BaseElement('li', [styles.timerItem]),
    );

    const timerNumber = Array.from(
      { length: this.timer.length },
      (_, idx) =>
        new BaseElement(
          'p',
          [styles.timerNumber],
          {},
          Object.values(this.timer[idx]),
        ),
    );

    const timerWord = Array.from(
      { length: this.timer.length },
      (_, idx) =>
        new BaseElement(
          'p',
          [styles.timerWord],
          {},
          Object.keys(this.timer[idx]),
        ),
    );

    timerItems.forEach((li, idx) =>
      li.append(timerNumber[idx], timerWord[idx]),
    );
    timerBlock.append(...timerItems);
    ctaContent.append(question, toGiftsPage, timerText, timerBlock);
    this.append(ctaContent);
  }
}
