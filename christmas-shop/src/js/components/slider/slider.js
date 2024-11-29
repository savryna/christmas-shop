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

  moveIndex = 0;

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
    this.sliderItems = new BaseElement('div', [styles.sliderItems]);
    // this.sliderItems = sliderItems;

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
    this.arrowRight = arrowRight;

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
    this.arrowLeft = arrowLeft;

    sliderControls.append(arrowLeft, arrowRight);
    this.sliderItems.append(...sliderArray);
    sliderContainer.append(this.sliderItems, sliderControls);
    this.append(gratitude, gratitudeBottom, sliderContainer);

    this.moveSliderStart();
    this.countVariables();
    this.arrowLeft.addEventListener('click', () => this.moveLeft());
    this.arrowRight.addEventListener('click', () => this.moveRight());
  }

  countWidthPadding() {
    const minVW = 380;
    const maxVW = 1440;
    const minPadding = 8;
    const maxPaddimg = 82;
    const currentVW = Math.min(window.innerWidth, 1440);
    const linearInterpolation =
      minPadding +
      ((maxPaddimg - minPadding) * (currentVW - minVW)) / (maxVW - minVW);
    return linearInterpolation;
  }

  countVariables() {
    this.widthSlider = 1993 + this.countWidthPadding();
    this.currentVW = Math.min(window.innerWidth, 1440);
    this.brakePointOfClick = 768;
    this.visible = this.currentVW - this.countWidthPadding();
    this.numberOfClick = this.currentVW > this.brakePointOfClick ? 3 : 6;
    this.widthMove = (this.widthSlider - this.visible) / this.numberOfClick;
    return [
      this.widthSlider,
      this.currentVW,
      this.brakePointOfClick,
      this.visible,
      this.numberOfClick,
      this.widthMove,
    ];
  }

  moveSliderStart() {
    window.addEventListener('resize', () => {
      this.countVariables();
      this.checkDisabledButton();
      this.moveIndex = 0;
      this.numberOfClick = this.currentVW > this.brakePointOfClick ? 3 : 6;
      this.sliderItems._elem.style.transform = `translateX(-${this.widthMove * this.moveIndex}px)`;
    });
  }

  moveRight() {
    this.moveIndex += 1;
    this.sliderItems._elem.style.transform = `translateX(-${this.widthMove * this.moveIndex}px)`;

    this.checkDisabledButton();
  }

  moveLeft() {
    this.moveIndex -= 1;
    this.sliderItems._elem.style.transform = `translateX(-${this.widthMove * this.moveIndex}px)`;
    this.checkDisabledButton();
  }

  checkDisabledButton() {
    if (this.moveIndex >= 1) {
      this.arrowLeft.removeAttributes(['disabled']);
    }
    if (this.moveIndex >= this.numberOfClick) {
      this.arrowRight.setAttributes({ disabled: 'disabled' });
    }
    if (this.moveIndex <= 0) {
      this.arrowRight.removeAttributes(['disabled']);
      this.arrowLeft.setAttributes({ disabled: 'disabled' });
    }
  }
}
