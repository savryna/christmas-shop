import { BaseElement } from '../../common/baseElem';
import styles from './buttonUp.module.scss';

export class ButtonUp extends BaseElement {
  constructor() {
    super(
      'button',
      [styles.button],
      {},
      `
        <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="24"
    viewBox="0 0 30 24"
    fill="none"
  >
    <path
      d="M15 5V19"
      stroke="#FF4646"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M22.25 11L15 5"
      stroke="#FF4646"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7.75 11L15 5"
      stroke="#FF4646"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
      `,
    );
    this.addEventListener('click', () => this.returnTop());
  }

  returnTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  addButtonUp() {
    window.addEventListener('scroll', () => {
      const buttonVisibilityHeight = 301;

      this.controlClass(
        styles.visible,
        window.pageYOffset > buttonVisibilityHeight,
      );
    });
  }
}
