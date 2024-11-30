import { BaseElement } from '../../common/baseElem.js';
import styles from './hero.module.scss';

export class Hero extends BaseElement {
  constructor() {
    super('section', [styles.hero]);

    const containerContent = new BaseElement('div', [styles.containerContent]);

    const congratulationTop = new BaseElement(
      'p',
      [styles.congratulationTop],
      {},
      'Merry Christmas',
    );
    const congratulationMiddle = new BaseElement(
      'h2',
      [styles.congratulationMiddle],
      {},
      'Gift yourself the magic of new possibilities',
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

    containerContent.append(
      congratulationTop,
      congratulationMiddle,
      toGiftsPage,
      congratulationBottom,
    );
    this.append(containerContent);
  }
}
