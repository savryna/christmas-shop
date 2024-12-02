import { BaseElement } from '../../common/baseElem';
import styles from './popUp.module.scss';
import dataJSON from '../../data/gifts.json';

export class PopUp extends BaseElement {
  imgExtension = ['avif', 'webp', 'png'];
  modalsContent = [
    {
      src: './img/gift-for-work',
      category: 'For Work',
      cssStyle: 'forWork',
    },
    {
      src: './img/gift-for-health',
      category: 'For Health',
      cssStyle: 'forHealth',
    },
    {
      src: './img/gift-for-harmony',
      category: 'For Harmony',
      cssStyle: 'forHarmony',
    },
  ];

  buttonCloseSrc = './img/svg/close.svg';

  snowflakePoint = {
    active: './img/svg/snowflake.svg',
    notActive: './img/svg/snowflake-not-active.svg',
  };

  maxPoint = 5;

  constructor() {
    super('dialog', [styles.popUp]);
    this.addEventListener('click', (event) => this.closeClickBack(event));
    this.addEventListener('keydown', (event) => this.closeKey(event));
  }

  showDialog() {
    this.appendTo(document.body);
    document.body.classList.add(styles.noScroll);
    this._elem.showModal();
  }

  closeDialog() {
    this._elem.close();
    this.setInnerHTML('');
    document.body.classList.remove(styles.noScroll);
  }

  closeFromButton(btn) {
    btn.addEventListener('click', () => this.closeDialog());
  }

  closeKey(event) {
    if (event.key === 'Escape') {
      this.closeDialog();
    }
  }

  closeClickBack(event) {
    const modalRect = this._elem.getBoundingClientRect();

    if (
      event.clientX < modalRect.left ||
      event.clientX > modalRect.right ||
      event.clientY < modalRect.top ||
      event.clientY > modalRect.bottom
    ) {
      this.closeDialog();
      this.setInnerHTML('');
    }
  }

  findSrcToModal(data) {
    return this.modalsContent.find(
      (content) => content.category === data.category,
    );
  }

  findInJSON(card) {
    return dataJSON.find(
      (cardJSON) => cardJSON.description === card.cardDescription,
    );
  }

  createPopUp(data) {
    const currentJSONCard = this.findInJSON(data);
    this.showDialog();

    this.buttonClose = new BaseElement('button', [styles.buttonClose]);

    this.imgButtonClose = new BaseElement('img', [], {
      src: this.buttonCloseSrc,
    });
    this.buttonClose.append(this.imgButtonClose);

    this.modalPicture = new BaseElement('picture', [styles.modalPicture]);
    this.modalImg = new BaseElement('img', [styles.modalImg], {
      src: `${this.findSrcToModal(data).src}.png`,
      alt: `${data.cardImg.getAttribute('alt')}`,
    });
    this.modalSources = Array.from(
      { length: this.imgExtension.length },
      (_, idxSource) =>
        new BaseElement('source', [], {
          type: `image/${this.imgExtension[idxSource]}`,
          srcset: `${this.findSrcToModal(data).src}.${this.imgExtension[idxSource]}`,
        }),
    );
    this.giftDescription = new BaseElement('div', [styles.giftDescription]);
    this.descriptionText = new BaseElement('div', [styles.descriptionText]);
    this.tag = new BaseElement(
      'p',
      [styles.tag, styles[this.findSrcToModal(data).cssStyle]],
      {},
      currentJSONCard.category,
    );
    this.name = new BaseElement('h3', [styles.name], {}, currentJSONCard.name);
    this.description = new BaseElement(
      'p',
      [styles.description],
      {},
      currentJSONCard.description,
    );

    this.superpowers = new BaseElement('div', [styles.superpowers]);
    this.superpowersHeader = new BaseElement(
      'h4',
      [styles.superpowersHeader],
      {},
      'Adds superpowers to:',
    );
    this.superpowersBottom = new BaseElement('ul', [styles.superpowersBottom]);
    this.superpowersItem = Array.from(
      {
        length: Object.keys(currentJSONCard.superpowers).length,
      },
      (_, idxItems) => new BaseElement('li', [styles.superpowersItem]),
    );
    this.superpowersItemName = Array.from(
      {
        length: Object.keys(currentJSONCard.superpowers).length,
      },
      (_, idxItemName) =>
        new BaseElement(
          'span',
          [styles.superpowersItemName],
          {},
          Object.keys(currentJSONCard.superpowers)[idxItemName],
        ),
    );

    this.superpowersPoint = Array.from(
      {
        length: Object.keys(currentJSONCard.superpowers).length,
      },
      (_, idxPoint) =>
        new BaseElement(
          'div',
          [styles.superpowersPoint],
          {},
          Object.values(currentJSONCard.superpowers)[idxPoint],
        ),
    );
    this.superpowersSnowflakeBlock = Array.from(
      {
        length: Object.keys(currentJSONCard.superpowers).length,
      },
      (_, idxPoint) =>
        new BaseElement('div', [styles.superpowersSnowflakeBlock]),
    );

    this.superpowersPoint.forEach((div, idx) =>
      div.append(this.superpowersSnowflakeBlock[idx]),
    );

    this.superpowersSnowflakeBlock.forEach((div, idx) =>
      div.append(...this.innerSnowflake(data)[idx]),
    );
    this.superpowersItem.forEach((item, idx) =>
      item.append(this.superpowersItemName[idx], this.superpowersPoint[idx]),
    );
    this.superpowersBottom.append(...this.superpowersItem);
    this.superpowers.append(this.superpowersHeader, this.superpowersBottom);

    this.giftDescription.append(this.descriptionText, this.superpowers);
    this.descriptionText.append(this.tag, this.name, this.description);
    this.modalPicture.append(...this.modalSources, this.modalImg);
    this.append(this.modalPicture, this.giftDescription, this.buttonClose);
    this.closeFromButton(this.buttonClose);
  }

  innerSnowflake(data) {
    const currentJSONCard = this.findInJSON(data);
    const pointArray = Object.values(currentJSONCard.superpowers).map(
      (points) => +points[1],
    );
    const snowflakePointsList = Array.from(
      {
        length: Object.keys(currentJSONCard.superpowers).length,
      },
      (_, idxSnowFlakeArray) => {
        return Array.from({ length: this.maxPoint }, (_, idxSnowflake) => {
          if (idxSnowflake < pointArray[idxSnowFlakeArray]) {
            return new BaseElement('img', [styles.snowflakeImg], {
              src: this.snowflakePoint.active,
            });
          }
          return new BaseElement('img', [styles.snowflakeImg], {
            src: this.snowflakePoint.notActive,
          });
        });
      },
    );

    return snowflakePointsList;
  }
}
