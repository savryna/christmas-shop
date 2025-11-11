true&&(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
}());

class Helper {
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

class BaseElement extends Helper {
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

  setInnerHTML(innerContent) {
    this._elem.innerHTML = innerContent;
  }

  getInnerHTML() {
    return this._elem.innerHTML;
  }

  removeAttributes(attributes) {
    attributes.forEach((atr) => this._elem.removeAttribute(atr));
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

  getAttribute(atr) {
    return this._elem.getAttribute(atr);
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

const header = "_header_x6478_22";
const logo = "_logo_x6478_36";
const logoText = "_logoText_x6478_44";
const logoDivImg = "_logoDivImg_x6478_54";
const logoImg = "_logoImg_x6478_58";
const nav = "_nav_x6478_66";
const open = "_open_x6478_76";
const navList = "_navList_x6478_83";
const navItem = "_navItem_x6478_100";
const navLink = "_navLink_x6478_109";
const active$1 = "_active_x6478_116";
const burgerButton = "_burgerButton_x6478_160";
const noScroll$1 = "_noScroll_x6478_204";
const styles$d = {
	header: header,
	logo: logo,
	logoText: logoText,
	logoDivImg: logoDivImg,
	logoImg: logoImg,
	nav: nav,
	open: open,
	navList: navList,
	navItem: navItem,
	navLink: navLink,
	active: active$1,
	burgerButton: burgerButton,
	noScroll: noScroll$1
};

class Header extends BaseElement {
  navLinks = [
    { gifts: 'gifts.html' },
    { about: './home.html#about' },
    { best: './home.html#gifts' },
    { contacts: '#contacts' },
  ];

  constructor() {
    super('header', [styles$d.header]);

    const logo = new BaseElement('a', [styles$d.logo], { href: './home.html' });
    const logoDivImg = new BaseElement('div', [styles$d.logoDivImg]);
    const logoImg = new BaseElement('img', [styles$d.logoImg], {
      src: './img/svg/snowflake.svg',
      alt: 'logo icon',
    });
    const logoText = new BaseElement('h1', [styles$d.logoText], {}, 'the gifts');
    const navigation = new BaseElement('nav', [styles$d.nav]);
    this.navigation = navigation;
    const navList = new BaseElement('ul', [styles$d.navList]);
    const navLink = Array.from(
      { length: this.navLinks.length },
      (_, idx) =>
        new BaseElement(
          'a',
          [styles$d.navLink],
          { href: Object.values(this.navLinks[idx]) },
          `<span>${Object.keys(this.navLinks[idx])}</span>`,
        ),
    );
    this.navLink = navLink;

    const navItem = Array.from(
      { length: this.navLinks.length },
      (_, idx) => new BaseElement('li', [styles$d.navItem]),
    );
    this.navItem = navItem;

    navItem.forEach((item, idx) => item.append(navLink[idx]));

    const burgerButton = new BaseElement('div', [styles$d.burgerButton]);
    this.burgerButton = burgerButton;
    logoDivImg.append(logoImg);
    logo.append(logoDivImg, logoText);
    navList.append(...navItem);
    navigation.append(navList);
    this.append(logo, navigation, burgerButton);
    this.openBurgerMenu();
  }

  activeClassNav() {
    this.navLink[0].addClasses([styles$d.active]);
    this.navLink[0].removeAttributes(['href']);
  }

  openBurgerMenu() {
    this.burgerButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      this.navigation.controlClass(styles$d.open);
      this.isMenuOpen();
    });

    this.navItem.forEach((link) =>
      link.addEventListener('click', () => {
        this.navigation.controlClass(styles$d.open, false);
        this.isMenuOpen();
      }),
    );

    window.addEventListener('resize', () => {
      this.isMenuOpen();
      this.navigation.controlClass(
        styles$d.open,
        window.innerWidth < 768 && this.navigation.hasClass(styles$d.open),
      );
    });
  }

  isMenuOpen() {
    if (this.navigation.hasClass(styles$d.open)) {
      document.body.classList.add(styles$d.noScroll);
    } else {
      document.body.classList.remove(styles$d.noScroll);
    }
  }
}

const hero = "_hero_rxv29_26";
const containerContent = "_containerContent_rxv29_38";
const congratulationTop = "_congratulationTop_rxv29_48";
const congratulationBottom = "_congratulationBottom_rxv29_49";
const congratulationMiddle = "_congratulationMiddle_rxv29_57";
const heroLink = "_heroLink_rxv29_67";
const styles$c = {
	hero: hero,
	containerContent: containerContent,
	congratulationTop: congratulationTop,
	congratulationBottom: congratulationBottom,
	congratulationMiddle: congratulationMiddle,
	heroLink: heroLink
};

class Hero extends BaseElement {
  constructor() {
    super('section', [styles$c.hero]);

    const containerContent = new BaseElement('div', [styles$c.containerContent]);

    const congratulationTop = new BaseElement(
      'p',
      [styles$c.congratulationTop],
      {},
      'Merry Christmas',
    );
    const congratulationMiddle = new BaseElement(
      'h2',
      [styles$c.congratulationMiddle],
      {},
      'Gift yourself the magic of new possibilities',
    );
    const congratulationBottom = new BaseElement(
      'p',
      [styles$c.congratulationBottom],
      {},
      'and Happy New Year',
    );

    const toGiftsPage = new BaseElement(
      'a',
      [styles$c.heroLink],
      {
        href: 'gifts.html',
      },
      'Explore Magical Gifts',
    );

    containerContent.append(
      congratulationTop,
      congratulationMiddle,
      toGiftsPage,
      congratulationBottom,
    );
    this.append(containerContent);
  }
}

const sliderSection = "_sliderSection_uhwve_22";
const gratitude = "_gratitude_uhwve_35";
const gratitudeBottom = "_gratitudeBottom_uhwve_44";
const sliderContainer = "_sliderContainer_uhwve_56";
const sliderItems = "_sliderItems_uhwve_60";
const sliderImgs = "_sliderImgs_uhwve_69";
const sliderText = "_sliderText_uhwve_78";
const sliderControls = "_sliderControls_uhwve_88";
const sliderButton = "_sliderButton_uhwve_95";
const styles$b = {
	sliderSection: sliderSection,
	gratitude: gratitude,
	gratitudeBottom: gratitudeBottom,
	sliderContainer: sliderContainer,
	sliderItems: sliderItems,
	sliderImgs: sliderImgs,
	sliderText: sliderText,
	sliderControls: sliderControls,
	sliderButton: sliderButton
};

class Slider extends BaseElement {
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
    super('section', [styles$b.sliderSection]);

    const gratitude = new BaseElement(
      'h2',
      [styles$b.gratitude],
      {},
      'Become Happier!',
    );
    const gratitudeBottom = new BaseElement(
      'p',
      [styles$b.gratitudeBottom],
      {},
      'in the new 2025',
    );

    this.sliderContainer = new BaseElement('div', [styles$b.sliderContainer]);
    this.sliderItems = new BaseElement('div', [styles$b.sliderItems]);

    const imgElems = Array.from(
      { length: this.#sliderSrcPath.length },
      (_, idx) =>
        new BaseElement('img', [styles$b.sliderImgs], {
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
        new BaseElement('p', [styles$b.sliderText], {}, this.#sliderText[idx]),
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

    const sliderControls = new BaseElement('div', [styles$b.sliderControls]);

    this.arrowRight = new BaseElement(
      'button',
      [styles$b.sliderButton],
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
      [styles$b.sliderButton],
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

const aboutSection = "_aboutSection_13lfn_22";
const aboutContent = "_aboutContent_13lfn_35";
const aboutContainer = "_aboutContainer_13lfn_49";
const aboutDescriptionBlock = "_aboutDescriptionBlock_13lfn_68";
const descriptionTitle = "_descriptionTitle_13lfn_89";
const descriptionCongratulation = "_descriptionCongratulation_13lfn_98";
const descriptionText$1 = "_descriptionText_13lfn_108";
const aboutImg = "_aboutImg_13lfn_114";
const styles$a = {
	aboutSection: aboutSection,
	aboutContent: aboutContent,
	aboutContainer: aboutContainer,
	aboutDescriptionBlock: aboutDescriptionBlock,
	descriptionTitle: descriptionTitle,
	descriptionCongratulation: descriptionCongratulation,
	descriptionText: descriptionText$1,
	aboutImg: aboutImg
};

class About extends BaseElement {
  constructor() {
    super('section', [styles$a.aboutSection], { id: 'about' });

    const aboutContainer = new BaseElement('div', [styles$a.aboutContainer]);
    const aboutContent = new BaseElement('div', [styles$a.aboutContent]);
    const aboutDescriptionBlock = new BaseElement('div', [
      styles$a.aboutDescriptionBlock,
    ]);

    const descriptionTitle = new BaseElement(
      'h2',
      [styles$a.descriptionTitle],
      {},
      'About',
    );

    const descriptionCongratulation = new BaseElement(
      'p',
      [styles$a.descriptionCongratulation],
      {},
      'Unleash your inner superhero!',
    );

    const descriptionText = new BaseElement(
      'p',
      [styles$a.descriptionText],
      {},
      'This New Year marks the beginning of your journey to inner harmony and new strengths. We offer unique gifts that will help you improve your life.',
    );

    const aboutImgBlock = new BaseElement('div', [styles$a.aboutImg]);

    aboutContainer.append(aboutDescriptionBlock);
    aboutDescriptionBlock.append(
      descriptionTitle,
      descriptionCongratulation,
      descriptionText,
    );
    aboutContent.append(aboutContainer, aboutImgBlock);
    this.append(aboutContent);
  }
}

const giftsSection = "_giftsSection_1wc43_22";
const giftsTitle = "_giftsTitle_1wc43_46";
const giftsDescription = "_giftsDescription_1wc43_54";
const cards = "_cards_1wc43_69";
const card$1 = "_card_1wc43_69";
const cardHeader$1 = "_cardHeader_1wc43_97";
const cardPicture$1 = "_cardPicture_1wc43_113";
const cardImg$2 = "_cardImg_1wc43_117";
const cardText$1 = "_cardText_1wc43_123";
const cardTag$2 = "_cardTag_1wc43_131";
const forWork$3 = "_forWork_1wc43_141";
const forHealth$3 = "_forHealth_1wc43_145";
const forHarmony$3 = "_forHarmony_1wc43_149";
const styles$9 = {
	giftsSection: giftsSection,
	giftsTitle: giftsTitle,
	giftsDescription: giftsDescription,
	cards: cards,
	card: card$1,
	cardHeader: cardHeader$1,
	cardPicture: cardPicture$1,
	cardImg: cardImg$2,
	cardText: cardText$1,
	cardTag: cardTag$2,
	forWork: forWork$3,
	forHealth: forHealth$3,
	forHarmony: forHarmony$3
};

const dataJSON = [
	{
		name: "Bug Magnet",
		description: "Able to find bugs in code like they were placed there on purpose.",
		category: "For Work",
		superpowers: {
			live: "+500",
			create: "+500",
			love: "+200",
			dream: "+400"
		}
	},
	{
		name: "Console.log Guru",
		description: "Uses console.log like a crystal ball to find any issue.",
		category: "For Work",
		superpowers: {
			live: "+500",
			create: "+500",
			love: "+200",
			dream: "+400"
		}
	},
	{
		name: "Shortcut Cheater",
		description: "Knows every keyboard shortcut like they were born with them.",
		category: "For Work",
		superpowers: {
			live: "+500",
			create: "+500",
			love: "+400",
			dream: "+200"
		}
	},
	{
		name: "Merge Master",
		description: "Merges branches in Git without conflicts, like a wizard during an exam.",
		category: "For Work",
		superpowers: {
			live: "+200",
			create: "+500",
			love: "+200",
			dream: "+300"
		}
	},
	{
		name: "Async Tamer",
		description: "Handles asynchronous code and promises like well-trained pets.",
		category: "For Work",
		superpowers: {
			live: "+100",
			create: "+400",
			love: "+200",
			dream: "+300"
		}
	},
	{
		name: "CSS Tamer",
		description: "Can make Flexbox and Grid work together like they were always best friends.",
		category: "For Work",
		superpowers: {
			live: "+200",
			create: "+500",
			love: "+200",
			dream: "+300"
		}
	},
	{
		name: "Time Hacker",
		description: "Writes code at the last moment but always meets the deadline.",
		category: "For Work",
		superpowers: {
			live: "+500",
			create: "+500",
			love: "+500",
			dream: "+200"
		}
	},
	{
		name: "Layout Master",
		description: "Creates perfect layouts on the first try, like they can read the designer's mind.",
		category: "For Work",
		superpowers: {
			live: "+500",
			create: "+300",
			love: "+200",
			dream: "+200"
		}
	},
	{
		name: "Documentation Whisperer",
		description: "Understands cryptic documentation as if they wrote it themselves.",
		category: "For Work",
		superpowers: {
			live: "+500",
			create: "+500",
			love: "+200",
			dream: "+100"
		}
	},
	{
		name: "Feedback Master",
		description: "Accepts client revisions with the Zen calm of Buddha.",
		category: "For Work",
		superpowers: {
			live: "+300",
			create: "+500",
			love: "+300",
			dream: "+400"
		}
	},
	{
		name: "Code Minimalist",
		description: "Writes code so concise that one line does more than a whole file.",
		category: "For Work",
		superpowers: {
			live: "+500",
			create: "+500",
			love: "+500",
			dream: "+200"
		}
	},
	{
		name: "Pixel-Perfect Magician",
		description: "Aligns elements to the last pixel, even when the design looks abstract.",
		category: "For Work",
		superpowers: {
			live: "+500",
			create: "+500",
			love: "+400",
			dream: "+400"
		}
	},
	{
		name: "Posture Levitation",
		description: "Can sit for hours, but maintains perfect posture like a ballerina.",
		category: "For Health",
		superpowers: {
			live: "+400",
			create: "+500",
			love: "+500",
			dream: "+400"
		}
	},
	{
		name: "Step Master",
		description: "Gets 10,000 steps a day even while sitting at the computer.",
		category: "For Health",
		superpowers: {
			live: "+400",
			create: "+300",
			love: "+500",
			dream: "+400"
		}
	},
	{
		name: "Snack Resister",
		description: "Ignoring desktop snacks like a strict dietician.",
		category: "For Health",
		superpowers: {
			live: "+400",
			create: "+100",
			love: "+200",
			dream: "+400"
		}
	},
	{
		name: "Hydration Bot",
		description: "Drinks the recommended 2 liters of water a day like a health-programmed robot.",
		category: "For Health",
		superpowers: {
			live: "+500",
			create: "+300",
			love: "+500",
			dream: "+500"
		}
	},
	{
		name: "Sleep Overlord",
		description: "Sleeps 6 hours but feels like they had 10.",
		category: "For Health",
		superpowers: {
			live: "+400",
			create: "+500",
			love: "+500",
			dream: "+500"
		}
	},
	{
		name: "Break Guru",
		description: "Takes a stretch break every hour without forgetting, no matter how focused.",
		category: "For Health",
		superpowers: {
			live: "+300",
			create: "+300",
			love: "+300",
			dream: "+400"
		}
	},
	{
		name: "Eye Protector",
		description: "Can work all day at the monitor without feeling like their eyes are on fire.",
		category: "For Health",
		superpowers: {
			live: "+100",
			create: "+300",
			love: "+500",
			dream: "+400"
		}
	},
	{
		name: "Stress Dodger",
		description: "Masters meditation right at the keyboard.",
		category: "For Health",
		superpowers: {
			live: "+100",
			create: "+400",
			love: "+200",
			dream: "+400"
		}
	},
	{
		name: "Yoga Coder",
		description: "Easily switches from coding to yoga and back.",
		category: "For Health",
		superpowers: {
			live: "+400",
			create: "+400",
			love: "+400",
			dream: "+400"
		}
	},
	{
		name: "Healthy Snacker",
		description: "Always picks fruit, even when chocolate is within arm’s reach.",
		category: "For Health",
		superpowers: {
			live: "+400",
			create: "+300",
			love: "+200",
			dream: "+400"
		}
	},
	{
		name: "Chair Exerciser",
		description: "Manages to work out without leaving the chair.",
		category: "For Health",
		superpowers: {
			live: "+500",
			create: "+500",
			love: "+500",
			dream: "+400"
		}
	},
	{
		name: "Caffeine Filter",
		description: "Drinks coffee at night and still falls asleep with no problem.",
		category: "For Health",
		superpowers: {
			live: "+400",
			create: "+300",
			love: "+500",
			dream: "+200"
		}
	},
	{
		name: "Joy Charger",
		description: "Finds joy in the little things—even in a build that finishes unexpectedly fast.",
		category: "For Harmony",
		superpowers: {
			live: "+200",
			create: "+200",
			love: "+500",
			dream: "+500"
		}
	},
	{
		name: "Error Laugher",
		description: "Laughs at code errors like they’re jokes instead of getting angry.",
		category: "For Harmony",
		superpowers: {
			live: "+300",
			create: "+200",
			love: "+500",
			dream: "+500"
		}
	},
	{
		name: "Bug Acceptance Guru",
		description: "Accepts bugs as part of the journey to perfection — it’s just another task.",
		category: "For Harmony",
		superpowers: {
			live: "+300",
			create: "+200",
			love: "+500",
			dream: "+400"
		}
	},
	{
		name: "Spontaneous Coding Philosopher",
		description: "Philosophically accepts any client suggestion after a long refactor.",
		category: "For Harmony",
		superpowers: {
			live: "+300",
			create: "+200",
			love: "+500",
			dream: "+400"
		}
	},
	{
		name: "Deadline Sage",
		description: "Remains zen even when the deadline is close and the project manager is stressed.",
		category: "For Harmony",
		superpowers: {
			live: "+200",
			create: "+200",
			love: "+300",
			dream: "+500"
		}
	},
	{
		name: "Inspiration Maestro",
		description: "Finds inspiration on an empty screen as if masterpieces are already there.",
		category: "For Harmony",
		superpowers: {
			live: "+300",
			create: "+200",
			love: "+400",
			dream: "+100"
		}
	},
	{
		name: "Peace Keeper",
		description: "Maintains inner calm even in moments of intense crisis.",
		category: "For Harmony",
		superpowers: {
			live: "+200",
			create: "+200",
			love: "+500",
			dream: "+500"
		}
	},
	{
		name: "Empathy Guru",
		description: "Feels the team’s mood and can lift everyone’s spirits.",
		category: "For Harmony",
		superpowers: {
			live: "+500",
			create: "+200",
			love: "+500",
			dream: "+500"
		}
	},
	{
		name: "Laughter Generator",
		description: "Can lighten any tense situation with a joke that even bugs laugh at.",
		category: "For Harmony",
		superpowers: {
			live: "+300",
			create: "+200",
			love: "+200",
			dream: "+500"
		}
	},
	{
		name: "Pause Master",
		description: "Knows when to just step back from the keyboard and breathe.",
		category: "For Harmony",
		superpowers: {
			live: "+300",
			create: "+200",
			love: "+100",
			dream: "+100"
		}
	},
	{
		name: "Coder Healer",
		description: "Can support a colleague in their darkest hour, even if it’s a 500 error.",
		category: "For Harmony",
		superpowers: {
			live: "+300",
			create: "+200",
			love: "+500",
			dream: "+500"
		}
	},
	{
		name: "Music Code Curator",
		description: "Creates work playlists so good, even deadlines follow the rhythm.",
		category: "For Harmony",
		superpowers: {
			live: "+300",
			create: "+200",
			love: "+300",
			dream: "+200"
		}
	}
];

const card = "_card_cd89w_22";
const cardHeader = "_cardHeader_cd89w_32";
const cardPicture = "_cardPicture_cd89w_48";
const cardImg$1 = "_cardImg_cd89w_52";
const cardText = "_cardText_cd89w_58";
const cardTag$1 = "_cardTag_cd89w_66";
const forWork$2 = "_forWork_cd89w_76";
const forHealth$2 = "_forHealth_cd89w_80";
const forHarmony$2 = "_forHarmony_cd89w_84";
const styles$8 = {
	card: card,
	cardHeader: cardHeader,
	cardPicture: cardPicture,
	cardImg: cardImg$1,
	cardText: cardText,
	cardTag: cardTag$1,
	forWork: forWork$2,
	forHealth: forHealth$2,
	forHarmony: forHarmony$2
};

class Card extends BaseElement {
  #cardsContent = [
    {
      src: './img/gift-for-work',
      category: 'For Work',
    },
    {
      src: './img/gift-for-health',
      category: 'For Health',
    },
    {
      src: './img/gift-for-harmony',
      category: 'For Harmony',
    },
  ];
  imgExtension = ['avif', 'webp', 'png'];

  constructor() {
    super('article', [styles$8.card]);
  }

  findSrcToCard(cardFromData) {
    return this.#cardsContent.find(
      (card) => card.category === cardFromData.category,
    );
  }

  getDataForCard(dataForCard) {
    const currentCard = dataForCard;

    const cardsSrcFromCategory = this.findSrcToCard(currentCard);
    const src = cardsSrcFromCategory.src;
    const category = cardsSrcFromCategory.category;
    const cssStyle = `${category.split(' ')[0].toLowerCase()}${category.split(' ')[1][0].toUpperCase() + category.split(' ')[1].slice(1)}`;
    const cardHeader = currentCard.name;
    const cardDescription = currentCard.description;
    return {
      src: src,
      category: category,
      cssStyle: cssStyle,
      cardHeader: cardHeader,
      cardDescription: cardDescription,
    };
  }

  createCard(dataForCard) {
    const data = this.getDataForCard(dataForCard);
    this.data = data;
    this.cardPicture = new BaseElement('picture', [styles$8.cardPicture]);
    this.cardImg = new BaseElement('img', [styles$8.cardImg], {
      src: `${data.src}.png`,
      alt: `${data.category.toLowerCase()} gift image`,
    });
    this.cardSources = Array.from(
      { length: this.imgExtension.length },
      (_, idxSource) =>
        new BaseElement('source', [], {
          type: `image/${this.imgExtension[idxSource]}`,
          srcset: `${data.src}.${this.imgExtension[idxSource]}`,
        }),
    );

    this.cardText = new BaseElement('div', [styles$8.cardText]);
    this.cardTag = new BaseElement(
      'p',
      [styles$8.cardTag, styles$8[data.cssStyle]],
      {},
      data.category.toLowerCase(),
    );

    this.cardHeader = new BaseElement(
      'h3',
      [styles$8.cardHeader],
      {},
      data.cardHeader,
    );
    this.cardDescription = data.cardDescription;
    this.category = data.category;

    this.cardText.append(this.cardTag, this.cardHeader);
    this.cardPicture.append(...this.cardSources, this.cardImg);
    this.append(this.cardPicture, this.cardText);
    return this;
  }

  getRandomData() {
    const giftCardAmounts = 4;
    const setIdxs = new Set();
    while (setIdxs.size < giftCardAmounts) {
      const randomCard = dataJSON.indexOf(this.getRandomElem(dataJSON));
      setIdxs.add(randomCard);
    }
    return setIdxs;
  }

  createInstanceCard() {
    return new Card();
  }

  createRandomCard(cardAmount) {
    const arrCard = [];
    this.ArrayFromSet = Array.from(this.getRandomData());

    for (let i = 0; i < cardAmount; i++) {
      this.curCard = this.createInstanceCard();

      this.cardJSON = dataJSON[this.ArrayFromSet[i]];
      arrCard.push(this.curCard.createCard(this.cardJSON));
    }
    return arrCard;
  }

  createJSONCard() {
    const arrCard = [];

    const cardAmount = dataJSON.length;

    for (let i = 0; i < cardAmount; i++) {
      this.curCard = this.createInstanceCard();
      this.cardJSON = dataJSON[i];
      arrCard.push(this.curCard.createCard(this.cardJSON));
    }
    return arrCard;
  }

  filterGiftCards(filterButton) {
    if (filterButton.innerText.toLowerCase() === 'all') {
      return this.createJSONCard();
    }
    const filterCards = this.createJSONCard().filter(
      (card) =>
        card.cardTag.getInnerText().toLowerCase() ===
        filterButton.innerText.toLowerCase(),
    );

    return filterCards;
  }
}

const popUp = "_popUp_8okpf_22";
const noScroll = "_noScroll_8okpf_42";
const modalPicture = "_modalPicture_8okpf_46";
const modalImg = "_modalImg_8okpf_51";
const giftDescription = "_giftDescription_8okpf_63";
const descriptionText = "_descriptionText_8okpf_69";
const tag = "_tag_8okpf_77";
const forWork$1 = "_forWork_8okpf_86";
const forHealth$1 = "_forHealth_8okpf_90";
const forHarmony$1 = "_forHarmony_8okpf_94";
const name = "_name_8okpf_98";
const description = "_description_8okpf_69";
const superpowersHeader = "_superpowersHeader_8okpf_113";
const superpowersItem = "_superpowersItem_8okpf_125";
const superpowersItemName = "_superpowersItemName_8okpf_131";
const superpowersPoint = "_superpowersPoint_8okpf_139";
const snowflakeImg = "_snowflakeImg_8okpf_146";
const superpowersSnowflakeBlock = "_superpowersSnowflakeBlock_8okpf_151";
const superpowersBottom = "_superpowersBottom_8okpf_156";
const buttonClose = "_buttonClose_8okpf_161";
const styles$7 = {
	popUp: popUp,
	noScroll: noScroll,
	modalPicture: modalPicture,
	modalImg: modalImg,
	giftDescription: giftDescription,
	descriptionText: descriptionText,
	tag: tag,
	forWork: forWork$1,
	forHealth: forHealth$1,
	forHarmony: forHarmony$1,
	name: name,
	description: description,
	superpowersHeader: superpowersHeader,
	superpowersItem: superpowersItem,
	superpowersItemName: superpowersItemName,
	superpowersPoint: superpowersPoint,
	snowflakeImg: snowflakeImg,
	superpowersSnowflakeBlock: superpowersSnowflakeBlock,
	superpowersBottom: superpowersBottom,
	buttonClose: buttonClose
};

class PopUp extends BaseElement {
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
    super('dialog', [styles$7.popUp]);
    this.addEventListener('click', (event) => this.closeClickBack(event));
    this.addEventListener('keydown', (event) => this.closeKey(event));
  }

  openAnimation() {
    const newspaperSpinning = [
      { transform: ' scale(0)' },
      { transform: ' scale(1)' },
    ];

    const newspaperTiming = {
      duration: 300,
      iterations: 1,
    };
    this._elem.animate(newspaperSpinning, newspaperTiming);
  }

  baubleAnimation(baseElem) {
    const newspaperSpinning = [
      { transform: ' rotate(-10deg)', transformOrigin: 'top' },
      { transform: ' rotate(10deg)', transformOrigin: 'top' },
      { transform: ' rotate(-10deg) ', transformOrigin: 'top' },
      { transform: ' rotate(3deg) ', transformOrigin: 'top' },
      { transform: ' rotate(-3deg) ', transformOrigin: 'top' },
      { transform: ' rotate(3deg) ', transformOrigin: 'top' },
      { transform: ' rotate(-1deg) ', transformOrigin: 'top' },
      { transform: ' rotate(1deg) ', transformOrigin: 'top' },
      { transform: ' rotate(-1deg) ', transformOrigin: 'top' },
    ];

    const newspaperTiming = {
      duration: 2000,
      iterations: 1,
    };
    baseElem._elem.animate(newspaperSpinning, newspaperTiming);
  }

  closeAnimation() {
    const newspaperSpinning = [
      { transform: 'scale(1)' },
      { transform: 'scale(0)' },
    ];

    const newspaperTiming = {
      duration: 300,
      iterations: 1,
    };
    return this._elem.animate(newspaperSpinning, newspaperTiming);
  }

  showDialog() {
    this.appendTo(document.body);
    this.openAnimation();
    document.body.classList.add(styles$7.noScroll);
    this._elem.showModal();
  }

  closeDialog() {
    const anim = this.closeAnimation();
    anim.onfinish = (event) => {
      this._elem.close();
      this.setInnerHTML('');
      document.body.classList.remove(styles$7.noScroll);
    };
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
      const anim = this.closeAnimation();
      anim.onfinish = (event) => {
        this._elem.close();
        this.setInnerHTML('');
        document.body.classList.remove(styles$7.noScroll);
      };
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

    this.buttonClose = new BaseElement('button', [styles$7.buttonClose]);

    this.imgButtonClose = new BaseElement('img', [], {
      src: this.buttonCloseSrc,
    });
    this.buttonClose.append(this.imgButtonClose);

    this.modalPicture = new BaseElement('picture', [styles$7.modalPicture]);
    this.modalImg = new BaseElement('img', [styles$7.modalImg], {
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
    this.giftDescription = new BaseElement('div', [styles$7.giftDescription]);
    this.descriptionText = new BaseElement('div', [styles$7.descriptionText]);
    this.tag = new BaseElement(
      'p',
      [styles$7.tag, styles$7[this.findSrcToModal(data).cssStyle]],
      {},
      currentJSONCard.category,
    );
    this.name = new BaseElement('h3', [styles$7.name], {}, currentJSONCard.name);
    this.description = new BaseElement(
      'p',
      [styles$7.description],
      {},
      currentJSONCard.description,
    );

    this.superpowers = new BaseElement('div', [styles$7.superpowers]);
    this.superpowersHeader = new BaseElement(
      'h4',
      [styles$7.superpowersHeader],
      {},
      'Adds superpowers to:',
    );
    this.superpowersBottom = new BaseElement('ul', [styles$7.superpowersBottom]);
    this.superpowersItem = Array.from(
      {
        length: Object.keys(currentJSONCard.superpowers).length,
      },
      (_, idxItems) => new BaseElement('li', [styles$7.superpowersItem]),
    );
    this.superpowersItemName = Array.from(
      {
        length: Object.keys(currentJSONCard.superpowers).length,
      },
      (_, idxItemName) =>
        new BaseElement(
          'span',
          [styles$7.superpowersItemName],
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
          [styles$7.superpowersPoint],
          {},
          Object.values(currentJSONCard.superpowers)[idxPoint],
        ),
    );
    this.superpowersSnowflakeBlock = Array.from(
      {
        length: Object.keys(currentJSONCard.superpowers).length,
      },
      (_, idxPoint) =>
        new BaseElement('div', [styles$7.superpowersSnowflakeBlock]),
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
    this.addEventListener('click', () => this.baubleAnimation(this.modalImg));
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
            return new BaseElement('img', [styles$7.snowflakeImg], {
              src: this.snowflakePoint.active,
            });
          }
          return new BaseElement('img', [styles$7.snowflakeImg], {
            src: this.snowflakePoint.notActive,
          });
        });
      },
    );

    return snowflakePointsList;
  }
}

class GiftsElement extends BaseElement {
  constructor() {
    super('section', [styles$9.giftsSection], { id: 'gifts' });

    const giftsTitle = new BaseElement(
      'h2',
      [styles$9.giftsTitle],
      {},
      'Best Gifts',
    );
    const giftsDescription = new BaseElement(
      'p',
      [styles$9.giftsDescription],
      {},
      'especially for you',
    );

    this.cardsContainer = new BaseElement('div', [styles$9.cards]);

    this.card = new Card();
    this.cardsArray = this.card.createRandomCard(4);
    this.cardsContainer.append(...this.cardsArray);

    const popUp = new PopUp();
    this.cardsArray.forEach((card) =>
      card.addEventListener('click', () => {
        popUp.createPopUp(card);
      }),
    );

    this.append(giftsTitle, giftsDescription, this.cardsContainer);
  }
}

const ctaSection = "_ctaSection_11xhs_22";
const ctaContent = "_ctaContent_11xhs_32";
const question = "_question_11xhs_49";
const ctaLink = "_ctaLink_11xhs_58";
const timerText = "_timerText_11xhs_79";
const timerBlock = "_timerBlock_11xhs_86";
const timerItem = "_timerItem_11xhs_102";
const timerNumber = "_timerNumber_11xhs_117";
const timerWord = "_timerWord_11xhs_127";
const styles$6 = {
	ctaSection: ctaSection,
	ctaContent: ctaContent,
	question: question,
	ctaLink: ctaLink,
	timerText: timerText,
	timerBlock: timerBlock,
	timerItem: timerItem,
	timerNumber: timerNumber,
	timerWord: timerWord
};

class CTASection extends BaseElement {
  timerVariables = {
    days: '47',
    hours: '5',
    minutes: '34',
    seconds: '12',
  };

  #deadlineUTC = '2025-01-01T00:00:00.000Z';

  #deadlineWord = 'Happy New Year!';

  constructor() {
    super('section', [styles$6.ctaSection]);

    const ctaContent = new BaseElement('div', [styles$6.ctaContent]);

    const question = new BaseElement(
      'p',
      [styles$6.question],
      {},
      'Ready to start your journey to a better version of yourself?',
    );
    const toGiftsPage = new BaseElement(
      'a',
      [styles$6.ctaLink],
      {
        href: 'gifts.html',
      },
      'Explore Magical Gifts',
    );
    const timerText = new BaseElement(
      'h2',
      [styles$6.timerText],
      {},
      'The New Year is Coming Soon...',
    );

    this.timerBlock = new BaseElement('ul', [styles$6.timerBlock]);
    const timerItems = Array.from(
      { length: Object.keys(this.timerVariables).length },
      (_, idx) => new BaseElement('li', [styles$6.timerItem]),
    );

    this.timerNumber = Array.from(
      { length: Object.values(this.countParameters()).length },
      (_, idx) =>
        new BaseElement(
          'p',
          [styles$6.timerNumber],
          {},
          Object.values(this.countParameters())[idx + 1],
        ),
    );

    const timerWord = Array.from(
      { length: Object.keys(this.timerVariables).length },
      (_, idx) =>
        new BaseElement(
          'p',
          [styles$6.timerWord],
          {},
          Object.keys(this.timerVariables)[idx],
        ),
    );
    this.timerWord = timerWord;

    timerItems.forEach((li, idx) =>
      li.append(this.timerNumber[idx], timerWord[idx]),
    );
    this.timerBlock.append(...timerItems);
    ctaContent.append(question, toGiftsPage, timerText, this.timerBlock);
    this.append(ctaContent);
    this.drawTimer();
  }

  countParameters() {
    const currentTimeUTC = new Date().toISOString();

    const deltaTime =
      Date.parse(this.#deadlineUTC) - Date.parse(currentTimeUTC);
    const remainTime = deltaTime <= 0 ? this.changeEventTimer() : deltaTime;
    const remainSeconds = Math.floor((remainTime / 1000) % 60);
    const remainMinutes = Math.floor((remainTime / 1000 / 60) % 60);
    const remainHours = Math.floor((remainTime / 1000 / 60 / 60) % 24);
    const remainDays = Math.floor(remainTime / 1000 / 60 / 60 / 24);
    return {
      remainTime: remainTime,
      remainDays: remainDays,
      remainHours: remainHours,
      remainMinutes: remainMinutes,
      remainSeconds: remainSeconds,
    };
  }

  drawTimer() {
    setInterval(() => {
      const timerBlockInner = Object.values(this.countParameters());
      this.timerNumber.forEach((timerBlock, idx) =>
        timerBlock.setInnerHTML(timerBlockInner[idx + 1]),
      );
    }, 1000);
  }

  changeEventTimer() {
    this.#deadlineUTC = this.#deadlineUTC
      .split('-')
      .map((parametr, idx) => {
        if (idx === 0) {
          return Number(parametr) + 1;
        }
        return parametr;
      })
      .join('-');
    this.countParameters();
  }
}

const main$1 = "_main_1v7z0_1";
const styles$5 = {
	main: main$1
};

class Main extends BaseElement {
  constructor() {
    super('main', [styles$5.main]);

    const hero = new Hero();
    const slider = new Slider();
    const about = new About();
    const giftsElement = new GiftsElement();
    const ctaSection = new CTASection();

    this.append(hero, about, slider, giftsElement, ctaSection);
  }
}

const giftCardsSection = "_giftCardsSection_1fgfq_22";
const title = "_title_1fgfq_48";
const tabsContainer = "_tabsContainer_1fgfq_60";
const tabItem = "_tabItem_1fgfq_73";
const tabButton = "_tabButton_1fgfq_84";
const active = "_active_1fgfq_97";
const cardsContainer = "_cardsContainer_1fgfq_111";
const cardArticle = "_cardArticle_1fgfq_118";
const cardInnerText = "_cardInnerText_1fgfq_127";
const cardImg = "_cardImg_1fgfq_142";
const cardDescription = "_cardDescription_1fgfq_147";
const cardTag = "_cardTag_1fgfq_155";
const forWork = "_forWork_1fgfq_165";
const forHealth = "_forHealth_1fgfq_169";
const forHarmony = "_forHarmony_1fgfq_173";
const styles$4 = {
	giftCardsSection: giftCardsSection,
	title: title,
	tabsContainer: tabsContainer,
	tabItem: tabItem,
	tabButton: tabButton,
	active: active,
	cardsContainer: cardsContainer,
	cardArticle: cardArticle,
	cardInnerText: cardInnerText,
	cardImg: cardImg,
	cardDescription: cardDescription,
	cardTag: cardTag,
	forWork: forWork,
	forHealth: forHealth,
	forHarmony: forHarmony
};

class GiftCards extends BaseElement {
  #tabInner = ['all', 'for work', 'for health', 'for harmony'];

  constructor() {
    super('section', [styles$4.giftCardsSection]);

    const title = new BaseElement(
      'h2',
      [styles$4.title],
      {},
      'Achieve health, harmony, and inner strength',
    );

    const tabsContainer = new BaseElement('ul', [styles$4.tabsContainer]);
    this.tabsButton = Array.from(
      { length: this.#tabInner.length },
      (_, idx) =>
        new BaseElement('button', [styles$4.tabButton], {}, this.#tabInner[idx]),
    );
    this.tabItem = Array.from({ length: this.#tabInner.length }, (tab, idx) => {
      if (idx === 0) {
        return new BaseElement('li', [styles$4.tabItem, styles$4.active], {});
      }
      return new BaseElement('li', [styles$4.tabItem], {});
    });

    this.cardsContainer = new BaseElement('div', [styles$4.cardsContainer]);

    this.card = new Card();
    this.cardsArray = this.card.createJSONCard();
    this.cardsContainer.append(...this.cardsArray);

    this.tabItem.forEach((li, idx) => li.append(this.tabsButton[idx]));
    tabsContainer.append(...this.tabItem);
    this.append(title, tabsContainer, this.cardsContainer);

    this.tabItem.forEach((tab) =>
      tab.addEventListener('click', (event) => {
        this.checkActiveTab(event.currentTarget);
        this.cardsContainer.removeChildren();
        this.cardsArray = this.card.filterGiftCards(event.currentTarget);
        this.tabAnimation(this.cardsContainer);
        this.cardsContainer.append(...this.cardsArray);

        this.cardsArray.forEach((card) =>
          card.addEventListener('click', () => {
            popUp.createPopUp(card);
          }),
        );
      }),
    );

    const popUp = new PopUp();
    this.cardsArray.forEach((card) =>
      card.addEventListener('click', () => {
        popUp.createPopUp(card);
      }),
    );
  }

  tabAnimation(baseElement) {
    const newspaperSpinning = [{ opacity: '0.2' }, { opacity: '1' }];

    const newspaperTiming = {
      duration: 1000,
      iterations: 1,
    };
    baseElement._elem.animate(newspaperSpinning, newspaperTiming);
  }

  checkActiveTab(button) {
    this.tabItem.forEach((tab) => {
      tab.controlClass(styles$4.active, false);
    });
    button.classList.add(styles$4.active);
  }
}

const button = "_button_4389c_22";
const visible = "_visible_4389c_39";
const styles$3 = {
	button: button,
	visible: visible
};

class ButtonUp extends BaseElement {
  constructor() {
    super(
      'button',
      [styles$3.button],
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
        styles$3.visible,
        window.pageYOffset > buttonVisibilityHeight,
      );
    });
  }
}

const main = "_main_rkid3_1";
const styles$2 = {
	main: main
};

class Main2Page extends BaseElement {
  constructor() {
    super('main', [styles$2.main]);

    const giftCards = new GiftCards();
    this.buttonUp = new ButtonUp();

    this.append(giftCards, this.buttonUp);

    this.buttonUp.addButtonUp();
  }
}

const footer = "_footer_zj3rx_22";
const contactLinksContainer = "_contactLinksContainer_zj3rx_38";
const linkCard = "_linkCard_zj3rx_49";
const contactsTextLink = "_contactsTextLink_zj3rx_62";
const contactDescription = "_contactDescription_zj3rx_71";
const contactImgs = "_contactImgs_zj3rx_87";
const socialNetworksBlock = "_socialNetworksBlock_zj3rx_92";
const socialLink = "_socialLink_zj3rx_105";
const copyrightElement = "_copyrightElement_zj3rx_122";
const rssLink = "_rssLink_zj3rx_135";
const styles$1 = {
	footer: footer,
	contactLinksContainer: contactLinksContainer,
	linkCard: linkCard,
	contactsTextLink: contactsTextLink,
	contactDescription: contactDescription,
	contactImgs: contactImgs,
	socialNetworksBlock: socialNetworksBlock,
	socialLink: socialLink,
	copyrightElement: copyrightElement,
	rssLink: rssLink
};

class Footer extends BaseElement {
  contacts = [
    {
      href: 'tel:+375291112233',
      srcImg: './img/svg/santa-claus.svg',
      contact: '+375 (29) 111-22-33',
      description: 'Call Us',
      alt: 'santa claus image',
    },

    {
      href: 'https://maps.app.goo.gl/Ls1v5pe5a3h6yfz29',
      srcImg: './img/svg/christmas-tree.svg',
      contact: 'Magic forest',
      description: 'meet us',
      alt: 'christmas tree image',
    },
    {
      href: 'mailto:gifts@magic.com',
      srcImg: './img/svg/snake.svg',
      contact: 'gifts@magic.com',
      description: 'write us',
      alt: 'snake christmas tree image',
    },
  ];
  svgElemsCode = [
    {
      telegram: `
        <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="17"
    viewBox="0 0 21 17"
    fill="none"
  >
    <path
      d="M20 1L1 8.5L8 9.5M20 1L17.5 16L8 9.5M20 1L8 9.5M8 9.5V15L11.2488 11.7229"
      stroke="#181C29"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
      `,
    },
    {
      facebook: `
        <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M17 2H14C12.6739 2 11.4021 2.52678 10.4645 3.46447C9.52678 4.40215 9 5.67392 9 7V10H6V14H9V22H13V14H16L17 10H13V7C13 6.73478 13.1054 6.48043 13.2929 6.29289C13.4804 6.10536 13.7348 6 14 6H17V2Z"
      stroke="#181C29"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
      `,
    },
    {
      instagram: `
      <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
      stroke="#181C29"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z"
      stroke="#181C29"
      stroke-width="1.5"
    />
    <path
      d="M17.5 6.51L17.51 6.49889"
      stroke="#181C29"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
      `,
    },
    {
      x: `
        <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M16.8196 20.7684L3.75299 3.96836C3.44646 3.57425 3.72731 3 4.2266 3H6.70637C6.89152 3 7.06631 3.08548 7.17998 3.23164L20.2466 20.0316C20.5532 20.4258 20.2723 21 19.773 21H17.2933C17.1081 21 16.9333 20.9145 16.8196 20.7684Z"
      stroke="#181C29"
      stroke-width="1.5"
    />
    <path
      d="M20 3L4 21"
      stroke="#181C29"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
      `,
    },
  ];

  constructor() {
    super('footer', [styles$1.footer], { id: 'contacts' });

    const contactLinksContainer = new BaseElement('div', [
      styles$1.contactLinksContainer,
    ]);
    const contactLinks = Array.from(
      { length: this.contacts.length },
      (_, idx) =>
        new BaseElement('a', [styles$1.linkCard], {
          target: '_blank',
          href: this.contacts[idx].href,
        }),
    );
    const contactImgs = Array.from(
      { length: this.contacts.length },
      (_, idx) =>
        new BaseElement('img', [styles$1.contactImgs], {
          src: this.contacts[idx].srcImg,
          alt: this.contacts[idx].alt,
        }),
    );

    const contactsTextLink = Array.from(
      { length: this.contacts.length },
      (_, idx) =>
        new BaseElement(
          'p',
          [styles$1.contactsTextLink],
          {},
          this.contacts[idx].contact,
        ),
    );
    const contactDescription = Array.from(
      { length: this.contacts.length },
      (_, idx) =>
        new BaseElement(
          'p',
          [styles$1.contactDescription],
          {},
          this.contacts[idx].description,
        ),
    );

    contactLinks.forEach((linkCard, idx) =>
      linkCard.append(
        contactImgs[idx],
        contactsTextLink[idx],
        contactDescription[idx],
      ),
    );

    const socialNetworksBlock = new BaseElement('div', [
      styles$1.socialNetworksBlock,
    ]);
    const svgElems = Array.from(
      { length: this.svgElemsCode.length },
      (_, idx) =>
        new BaseElement(
          'a',
          [styles$1.socialLink],
          { href: '#empty' },
          Object.values(this.svgElemsCode[idx]),
        ),
    );

    const copyrightElement = new BaseElement(
      'p',
      [styles$1.copyrightElement],
      {},
      '© Copyright 2025, All Rights Reserved',
    );

    const rssLink = new BaseElement(
      'a',
      [styles$1.rssLink],
      {
        href: 'https://rs.school/',
        target: '_blank',
      },
      'Made in Rolling Scopes School',
    );

    contactLinksContainer.append(...contactLinks);
    socialNetworksBlock.append(...svgElems);
    this.append(
      contactLinksContainer,
      socialNetworksBlock,
      copyrightElement,
      rssLink,
    );
  }
}

const wrapper = "_wrapper_1d1l1_1";
const styles = {
	wrapper: wrapper
};

class Root extends BaseElement {
  constructor() {
    super('div', [styles.wrapper]);

    const header = new Header();
    const main = new Main();
    const footer = new Footer();

    this.append(header, main, footer);
  }

  init() {
    this.appendTo(document.body);
  }
}

class RootGifts extends BaseElement {
  constructor() {
    super('div', [styles.wrapper]);

    const header = new Header();
    header.activeClassNav();
    const main = new Main2Page();
    const footer = new Footer();

    this.append(header, main, footer);
  }

  init() {
    this.appendTo(document.body);
  }
}

export { Root as R, RootGifts as a };
//# sourceMappingURL=wrapper-BzsoT8c0.js.map
