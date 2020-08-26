import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  get elem() {
    return this._elem;
  }

  constructor(categories) {
    this.renderMenu(categories);

    this._leftArrow.addEventListener('click', (event) => this._ribbonInnerContainer.scrollBy(-350, 0));
    this._rightArrow.addEventListener('click', (event) => this._ribbonInnerContainer.scrollBy(350, 0));

    this._ribbonInnerContainer.addEventListener('scroll', (event) => this.checkScrollPosition(event));
    this._elem.addEventListener('click', (event) => this.selectCategory(event));
  }

  renderMenu (categories) {
    let ribbonContainer = document.createElement('div');
    ribbonContainer.classList.add('ribbon');

    let ribbonlHtml = `
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `;

    ribbonContainer.insertAdjacentHTML('afterbegin', ribbonlHtml);

    this._rightArrow = ribbonContainer.querySelector('.ribbon__arrow_right');
    this._leftArrow = ribbonContainer.querySelector('.ribbon__arrow_left');

    let ribbonInnerContainer = ribbonContainer.querySelector('.ribbon__inner');
    this._ribbonInnerContainer = ribbonInnerContainer;

    let menuItemsHtml = categories.map(item => {
      let link = `
        <a href="#" class="ribbon__item" data-id="${item.id}"><span>${item.name}</span></a>
      `;

      return link;
    }).join('');

    ribbonInnerContainer.insertAdjacentHTML('afterbegin', menuItemsHtml);

    this._elem = ribbonContainer;
  }

  checkScrollPosition(event) {
    let scrollLeft = this._ribbonInnerContainer.scrollLeft;
    let scrollWidth = this._ribbonInnerContainer.scrollWidth;
    let clientWidth = this._ribbonInnerContainer.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if(scrollLeft === 0) {
      this._leftArrow.classList.remove('ribbon__arrow_visible');
    } else if (scrollRight < 1) {
      this._rightArrow.classList.remove('ribbon__arrow_visible');
    } else {
      this._leftArrow.classList.add('ribbon__arrow_visible');
      this._rightArrow.classList.add('ribbon__arrow_visible');
    }
  }

  selectCategory(event) {
    let categoryItem = event.target.closest('.ribbon__item');

    if (categoryItem) {
      event.preventDefault();
      let currentActive = this._ribbonInnerContainer.querySelector('.ribbon__item_active');
      if (currentActive) {
        currentActive.classList.remove('ribbon__item_active');
      }
      categoryItem.classList.add('ribbon__item_active');

      let id = categoryItem.dataset.id;
      this._elem.dispatchEvent(new CustomEvent('ribbon-select', {
        detail: id,
        bubbles: true
      }));
    }
  }
}
