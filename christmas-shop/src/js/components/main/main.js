import { BaseElement } from '../../common/baseElem.js';
import { Hero } from '../hero/hero.js';
import { Slider } from '../slider/slider.js';
import { About } from '../about/about.js';
import { GiftsElement } from '../gifts/gifts.js';
import { CTASection } from '../cta/cta.js';
import styles from './main.module.scss';

export class Main extends BaseElement {
  constructor() {
    super('main', [styles.main]);

    const hero = new Hero();
    const slider = new Slider();
    const about = new About();
    const giftsElement = new GiftsElement();
    const ctaSection = new CTASection();

    this.append(hero, about, slider, giftsElement, ctaSection);
  }
}
