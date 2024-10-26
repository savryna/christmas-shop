import { BaseElement } from '../../common/baseElem.js';
import styles from './about.module.scss';

export class About extends BaseElement {
  constructor() {
    super('section', [styles.aboutSection], { id: 'about' });

    const aboutContent = new BaseElement('div', [styles.aboutContent]);
    const aboutDescriptionBlock = new BaseElement('div', [
      styles.aboutDescriptionBlock,
    ]);

    const descriptionTitle = new BaseElement(
      'h2',
      [styles.descriptionTitle],
      {},
      'About',
    );

    const descriptionCongratulation = new BaseElement(
      'p',
      [styles.descriptionCongratulation],
      {},
      'Unleash your inner superhero!',
    );

    const descriptionText = new BaseElement(
      'p',
      [styles.descriptionText],
      {},
      'This New Year marks the beginning of your journey to inner harmony and new strengths. We offer unique gifts that will help you improve your life.',
    );

    const aboutImgBlock = new BaseElement('div', [styles.aboutImg]);

    aboutDescriptionBlock.append(
      descriptionTitle,
      descriptionCongratulation,
      descriptionText,
    );
    aboutContent.append(aboutDescriptionBlock, aboutImgBlock);
    this.append(aboutContent);
  }
}
