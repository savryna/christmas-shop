import { Helper } from './helper';

export class BaseElement extends Helper {
  constructor(tag, cssClasses = [], attributes = {}, innerContent = '') {
    super();

    this._elem = document.createElement(tag);
    this.addClasses(cssClasses);
    this.setAttributes(attributes);
    this._elem.innerHTML = innerContent;
  }

  addClasses(cssClasses) {
    this._elem.classList.add(...cssClasses);
  }

  innerHTML(innerContent) {
    this._elem.innerHTML = innerContent;
  }

  removeAttributes(attributes) {
    attributes.forEach((atr) => this._elem.removeAttribute(atr));
    // this._elem.removeAttribute(...attributes);
  }

  append(...children) {
    children.forEach((child) => {
      if (child instanceof HTMLElement) {
        this._elem.append(child);
      } else if (child instanceof BaseElement) {
        this._elem.append(child._elem);
      }
    });
  }

  appendTo(parent) {
    if (parent instanceof HTMLElement || parent instanceof BaseElement) {
      parent.append(this._elem);
    } else {
      throw new Error('parent not instanceof HTMLElement or BaseElement');
    }
  }

  setAttributes(atrs) {
    Object.entries(atrs).forEach(([key, val]) =>
      this._elem.setAttribute(key, val),
    );
  }

  remove() {
    this._elem.remove();
  }

  removeChildren() {
    this._elem.innerHTML = '';
  }

  controlClass(style, option) {
    this._elem.classList.toggle(style, option);
  }

  hasClass(style) {
    return this._elem.classList.contains(style);
  }

  addEventListener(event, callback) {
    this._elem.addEventListener(event, callback);
  }

  getInnerText() {
    return this._elem.innerText;
  }
}
