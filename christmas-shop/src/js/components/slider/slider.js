import { BaseElement } from '../../common/baseElem.js';
import styles from './slider.module.scss';

export class Slider extends BaseElement {
  sliderSrc = [
    './img/snowman.png',
    './img/christmas-trees.png',
    './img/christmas-tree-ball.png',
    './img/fairytale-house.png',
  ];
  sliderSrcPath = [
    './img/snowman',
    './img/christmas-trees',
    './img/christmas-tree-ball',
    './img/fairytale-house',
  ];
  sliderText = ['live', 'create', 'love', 'dream'];
  sliderAlts = [
    'snowman image',
    'christmas trees image',
    'christmas tree ball image',
    'fairytale house image',
  ];
  imgExtension = ['avif', 'webp', 'png'];

  constructor() {
    super('section', [styles.sliderSection]);

    const gratitude = new BaseElement(
      'h2',
      [styles.gratitude],
      {},
      'Become Happier!',
    );
    const gratitudeBottom = new BaseElement(
      'div',
      [styles.gratitudeBottom],
      {},
      '<span>in the new 2025</span>',
    );

    const sliderContainer = new BaseElement('div', [styles.sliderContainer]);
    const sliderItems = new BaseElement('div', [styles.sliderItems]);

    const imgElems = Array.from(
      { length: this.sliderSrc.length },
      (_, idx) =>
        new BaseElement('img', [styles.sliderImgs], {
          src: this.sliderSrc[idx],
          alt: this.sliderAlts[idx],
          loading: 'lazy',
        }),
    );

    const pictureElems = Array.from(
      { length: this.sliderSrc.length },
      () => new BaseElement('picture'),
    );
    const sourceElems = Array.from(
      { length: this.sliderSrc.length },
      (_, idxSources) =>
        Array.from(
          { length: this.imgExtension.length },
          (_, idxSource) =>
            new BaseElement('source', [], {
              type: `image/${this.imgExtension[idxSource]}`,
              srcset: `${this.sliderSrcPath[idxSources]}.${this.imgExtension[idxSource]}`,
            }),
        ),
    );
    pictureElems.forEach((picture, idxPicture) =>
      picture.append(...sourceElems[idxPicture], imgElems[idxPicture]),
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
          return pictureElems[(idx - 1) / 2];
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
    this.append(gratitude, gratitudeBottom, sliderContainer);
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
