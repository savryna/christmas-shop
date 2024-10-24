import { BaseElement } from '../../common/baseElem.js';
import styles from './hero.module.scss';

export class Hero extends BaseElement {
  constructor() {
    super('section', [styles.hero]);

    const congratulationTop = new BaseElement(
      'p',
      [styles.congratulationTop],
      {},
      'Merry Christmas',
    );
    const congratulationMiddle = new BaseElement(
      'p',
      [styles.congratulationMiddle],
      {},
      'Gift yourself <br> the&nbsp;magic&nbsp;of&nbsp;new  possibilities',
    );
    const congratulationBottom = new BaseElement(
      'p',
      [styles.congratulationBottom],
      {},
      'and Happy New Year',
    );

    const toGiftsPage = new BaseElement(
      'a',
      [styles.heroLink],
      {
        href: 'gifts.html',
      },
      'Explore Magical Gifts',
    );

    this.append(
      congratulationTop,
      congratulationMiddle,
      toGiftsPage,
      congratulationBottom,
    );
  }
}
