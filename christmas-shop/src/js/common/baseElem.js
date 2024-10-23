export class BaseElement {
  constructor(tag, cssClasses = [], attributes = {}, innerContent = '') {
    this._elem = document.createElement(tag);
    this._elem.classList.add(...cssClasses);
    this.setAttributes(attributes);
    this._elem.innerHtml = innerContent;
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
}
