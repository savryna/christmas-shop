import { BaseElement } from '../../common/baseElem.js';
import { Hero } from '../hero/hero.js';

export class Main extends BaseElement {
  constructor() {
    super('main', []);

    const hero = new Hero();

    this.append(hero);
  }
}
