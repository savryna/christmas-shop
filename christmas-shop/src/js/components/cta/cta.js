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
      li.append(this.timerNumber[idx], timerWord[idx]),
    );
    timerBlock.append(...timerItems);
    ctaContent.append(question, toGiftsPage, timerText, timerBlock);
    this.append(ctaContent);
    this.drawTimer();
  }

  countParameters() {
    const deadlineUTC = '2025-01-01T00:00:00.000Z';
    const currentTimeUTC = new Date().toISOString();

    const deltaTime = Date.parse(deadlineUTC) - Date.parse(currentTimeUTC);
    const remainTime = deltaTime < 0 ? 0 : deltaTime;
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
    const timeInterval = setInterval(() => {
      const timerBlockInner = Object.values(this.countParameters());
      this.timerNumber.forEach((timerBlock, idx) =>
        timerBlock.innerHTML(timerBlockInner[idx + 1]),
      );
    }, 1000);
    this.stopTimer(this.remainTime, timeInterval);
  }

  stopTimer(remainTime, timeInterval) {
    if (remainTime <= 0) {
      clearInterval(timeInterval);
      this.drawTimer();
    }
  }
}
