import { BaseElement } from '../../common/baseElem.js';
import styles from './slider.module.scss';

export class Slider extends BaseElement {
  sliderSrc = [
    './img/snowman.png',
    './img/christmas-trees.png',
    './img/christmas-tree-ball.png',
    './img/fairytale-house.png',
  ];
  sliderText = ['live', 'create', 'love', 'dream'];

  constructor() {
    super('section', [styles.sliderSection]);

    const gratitude = new BaseElement(
      'p',
      [styles.gratitude],
      {},
      'Become Happier!<br><p>in the new 2025</p>',
    );

    const sliderContainer = new BaseElement('div', [styles.sliderContainer]);
    const sliderItems = new BaseElement('div', [styles.sliderItems]);

    const imgElems = Array.from(
      { length: this.sliderSrc.length },
      (_, idx) =>
        new BaseElement('img', [styles.sliderImgs], {
          src: this.sliderSrc[idx],
        }),
    );

    const textElems = Array.from(
      { length: this.sliderText.length },
      (_, idx) =>
        new BaseElement('p', [styles.sliderText], {}, this.sliderText[idx]),
    );

    const sliderArray = Array.from(
      {
        length: this.sliderSrc.length + this.sliderText.length,
      },
      (_, idx) => {
        if (idx % 2) {
          return imgElems[(idx - 1) / 2];
        }
        return textElems[idx / 2];
      },
    );

    const sliderControls = new BaseElement('div', [styles.sliderControls]);

    const arrowRight = new BaseElement(
      'button',
      [styles.sliderButton],
      {},
      `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 12H18.5M18.5 12L12.5 6M18.5 12L12.5 18"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>`,
    );

    const arrowLeft = new BaseElement(
      'button',
      [styles.sliderButton],
      { disabled: 'disabled' },
      `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
           d="M18.5 12H6M6 12L12 6M6 12L12 18"
           stroke="white"
           stroke-linecap="round"
           stroke-linejoin="round"
        />
      </svg>
      `,
    );

    sliderControls.append(arrowLeft, arrowRight);
    sliderItems.append(...sliderArray);
    sliderContainer.append(sliderItems, sliderControls);
    this.append(gratitude, sliderContainer);
  }
}

{
  /* <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
>
  <path
    d="M6 12H18.5M18.5 12L12.5 6M18.5 12L12.5 18"
    stroke="white"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>; */
}

{
  /* <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
>
  <path
    d="M18.5 12H6M6 12L12 6M6 12L12 18"
    stroke="white"
    stroke-opacity="0.4"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>; */
}
