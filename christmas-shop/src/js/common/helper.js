export class Helper {
  constructor() {}

  getRandomElem(array) {
    const idx = Math.floor(Math.random() * array.length);
    return array[idx];
  }
}
