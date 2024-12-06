import { BaseElement } from '../../common/baseElem.js';
import styles from './cta.module.scss';

export class CTASection extends BaseElement {
  timerVariables = {
    days: '47',
    hours: '5',
    minutes: '34',
    seconds: '12',
  };

  #deadlineUTC = '2025-01-01T00:00:00.000Z';

  #deadlineWord = 'Happy New Year!';

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

    this.timerBlock = new BaseElement('ul', [styles.timerBlock]);
    const timerItems = Array.from(
      { length: Object.keys(this.timerVariables).length },
      (_, idx) => new BaseElement('li', [styles.timerItem]),
    );

    this.timerNumber = Array.from(
      { length: Object.values(this.countParameters()).length },
      (_, idx) =>
        new BaseElement(
          'p',
          [styles.timerNumber],
          {},
          Object.values(this.countParameters())[idx + 1],
        ),
    );

    const timerWord = Array.from(
      { length: Object.keys(this.timerVariables).length },
      (_, idx) =>
        new BaseElement(
          'p',
          [styles.timerWord],
          {},
          Object.keys(this.timerVariables)[idx],
        ),
    );
    this.timerWord = timerWord;

    timerItems.forEach((li, idx) =>
      li.append(this.timerNumber[idx], timerWord[idx]),
    );
    this.timerBlock.append(...timerItems);
    ctaContent.append(question, toGiftsPage, timerText, this.timerBlock);
    this.append(ctaContent);
    this.drawTimer();
  }

  countParameters() {
    const currentTimeUTC = new Date().toISOString();

    const deltaTime =
      Date.parse(this.#deadlineUTC) - Date.parse(currentTimeUTC);
    const remainTime = deltaTime <= 0 ? this.changeEventTimer() : deltaTime;
    const remainSeconds = Math.floor((remainTime / 1000) % 60);
    const remainMinutes = Math.floor((remainTime / 1000 / 60) % 60);
    const remainHours = Math.floor((remainTime / 1000 / 60 / 60) % 24);
    const remainDays = Math.floor(remainTime / 1000 / 60 / 60 / 24);
    return {
      remainTime: remainTime,
      remainDays: remainDays,
      remainHours: remainHours,
      remainMinutes: remainMinutes,
      remainSeconds: remainSeconds,
    };
  }

  drawTimer() {
    setInterval(() => {
      const timerBlockInner = Object.values(this.countParameters());
      this.timerNumber.forEach((timerBlock, idx) =>
        timerBlock.setInnerHTML(timerBlockInner[idx + 1]),
      );
    }, 1000);
  }

  changeEventTimer() {
    this.#deadlineUTC = this.#deadlineUTC
      .split('-')
      .map((parametr, idx) => {
        if (idx === 0) {
          return Number(parametr) + 1;
        }
        return parametr;
      })
      .join('-');
    this.countParameters();
  }
}
