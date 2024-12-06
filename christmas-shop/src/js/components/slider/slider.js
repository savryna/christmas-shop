import { BaseElement } from '../../common/baseElem.js';
import styles from './slider.module.scss';

export class Slider extends BaseElement {
  #sliderSrcPath = [
    './img/snowman',
    './img/christmas-trees',
    './img/christmas-tree-ball',
    './img/fairytale-house',
  ];
  #sliderText = ['live', 'create', 'love', 'dream'];
  #sliderAlts = [
    'snowman image',
    'christmas trees image',
    'christmas tree ball image',
    'fairytale house image',
  ];
  imgExtension = ['avif', 'webp', 'png'];

  #sliderVariables = {
    middleVW: 768,
    maxVW: 1440,
    minPadding: 8,
    maxPadding: 82,
    widthContents: 1993,
    clickLargeScreen: 3,
    clickSmallScreen: 6,
  };

  #moveIndex = 0;

  constructor() {
    super('section', [styles.sliderSection]);

    const gratitude = new BaseElement(
      'h2',
      [styles.gratitude],
      {},
      'Become Happier!',
    );
    const gratitudeBottom = new BaseElement(
      'p',
      [styles.gratitudeBottom],
      {},
      'in the new 2025',
    );

    this.sliderContainer = new BaseElement('div', [styles.sliderContainer]);
    this.sliderItems = new BaseElement('div', [styles.sliderItems]);

    const imgElems = Array.from(
      { length: this.#sliderSrcPath.length },
      (_, idx) =>
        new BaseElement('img', [styles.sliderImgs], {
          src: `${this.#sliderSrcPath[idx]}.png`,
          alt: this.#sliderAlts[idx],
          loading: 'lazy',
        }),
    );

    const pictureElems = Array.from(
      { length: this.#sliderSrcPath.length },
      () => new BaseElement('picture'),
    );
    const sourceElems = Array.from(
      { length: this.#sliderSrcPath.length },
      (_, idxSources) =>
        Array.from(
          { length: this.imgExtension.length },
          (_, idxSource) =>
            new BaseElement('source', [], {
              type: `image/${this.imgExtension[idxSource]}`,
              srcset: `${this.#sliderSrcPath[idxSources]}.${this.imgExtension[idxSource]}`,
            }),
        ),
    );
    pictureElems.forEach((picture, idxPicture) =>
      picture.append(...sourceElems[idxPicture], imgElems[idxPicture]),
    );

    const textElems = Array.from(
      { length: this.#sliderText.length },
      (_, idx) =>
        new BaseElement('p', [styles.sliderText], {}, this.#sliderText[idx]),
    );

    const sliderArray = Array.from(
      {
        length: this.#sliderSrcPath.length + this.#sliderText.length,
      },
      (_, idx) => {
        if (idx % 2) {
          return pictureElems[(idx - 1) / 2];
        }
        return textElems[idx / 2];
      },
    );

    const sliderControls = new BaseElement('div', [styles.sliderControls]);

    this.arrowRight = new BaseElement(
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

    this.arrowLeft = new BaseElement(
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

    this.sliderItems.append(...sliderArray);
    sliderControls.append(this.arrowLeft, this.arrowRight);
    this.sliderContainer.append(this.sliderItems, sliderControls);
    this.append(gratitude, gratitudeBottom, this.sliderContainer);

    this.moveSliderStart();
    this.countVariables();
    this.arrowLeft.addEventListener('click', () => this.moveLeft());
    this.arrowRight.addEventListener('click', () => this.moveRight());
  }

  countWidthPadding() {
    const currentVW = Math.min(
      document.documentElement.clientWidth,
      this.#sliderVariables.maxVW,
    );

    const linearInterpolation =
      this.#sliderVariables.minPadding +
      ((this.#sliderVariables.maxPadding - this.#sliderVariables.minPadding) *
        (currentVW - this.#sliderVariables.middleVW)) /
        (this.#sliderVariables.maxVW - this.#sliderVariables.middleVW);
    let resPadding = Math.max(
      this.#sliderVariables.minPadding,
      Math.min(linearInterpolation, this.#sliderVariables.maxPadding),
    );
    return resPadding;
  }

  countVariables() {
    this.widthSlider =
      this.#sliderVariables.widthContents + this.countWidthPadding();
    this.currentVW = Math.min(window.innerWidth, this.#sliderVariables.maxVW);
    this.visible =
      document.documentElement.clientWidth > this.#sliderVariables.maxVW
        ? this.currentVW - this.countWidthPadding()
        : this.currentVW - this.countWidthPadding() - this.getScrollbarWidth();
    this.currentVW - this.countWidthPadding() - this.getScrollbarWidth();
    this.numberOfClick =
      this.currentVW > this.#sliderVariables.middleVW
        ? this.#sliderVariables.clickLargeScreen
        : this.#sliderVariables.clickSmallScreen;
    this.widthMove = (this.widthSlider - this.visible) / this.numberOfClick;
    return [
      this.widthSlider,
      this.currentVW,
      this.visible,
      this.numberOfClick,
      this.widthMove,
    ];
  }

  moveSliderStart() {
    window.addEventListener('resize', () => {
      this.#moveIndex = 0;
      this.countVariables();
      this.checkDisabledButton();
      this.numberOfClick =
        this.currentVW > this.#sliderVariables.middleVW
          ? this.#sliderVariables.clickLargeScreen
          : this.#sliderVariables.clickSmallScreen;
      this.sliderItems._elem.style.transform = `translateX(-${this.widthMove * this.#moveIndex}px)`;
    });
  }

  moveRight() {
    this.#moveIndex += 1;
    this.sliderItems._elem.style.transform = `translateX(-${this.widthMove * this.#moveIndex}px)`;

    this.checkDisabledButton();
  }

  moveLeft() {
    this.#moveIndex -= 1;
    this.sliderItems._elem.style.transform = `translateX(-${this.widthMove * this.#moveIndex}px)`;

    this.checkDisabledButton();
  }

  checkDisabledButton() {
    if (this.#moveIndex >= 1) {
      this.arrowLeft.removeAttributes(['disabled']);
      this.arrowRight.removeAttributes(['disabled']);
    }
    if (this.#moveIndex >= this.numberOfClick) {
      this.arrowRight.setAttributes({ disabled: 'disabled' });
    }

    if (this.#moveIndex <= 0) {
      this.arrowRight.removeAttributes(['disabled']);
      this.arrowLeft.setAttributes({ disabled: 'disabled' });
    }
  }
}
