export class Helper {
  constructor() {}

  getRandomElem(array) {
    const idx = Math.floor(Math.random() * array.length);
    return array[idx];
  }

  getScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    outer.remove();
    return scrollbarWidth;
  }
}
