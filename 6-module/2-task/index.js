import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  get elem() {
    return this._elem;
  }

  constructor(product) {
    this._name = product.name;
    this._price = `€${product.price.toFixed(2)}`;
    this._category = product.category;
    this._imgUrl = `/assets/images/products/${product.image}`;
    this._id = product.id;

    this.createProductCard(product);

    this._elem.addEventListener('product-add', (event) => {});
    this._elem.addEventListener('click', (event) => this.productAdd(event));
  }

  createProductCard(product) {
    let productCard = document.createElement('div');
    productCard.classList.add('card');
    productCard.innerHTML = `
      <div class="card__top">
        <img src="${this._imgUrl}" class="card__image" alt="product">
        <span class="card__price">${this._price}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${this._name}</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    `;
    
    this._elem = productCard;
  }

  productAdd(event) {
    if (event.target.closest('.card__button')) {
      this._elem.dispatchEvent(new CustomEvent('product-add', {
        detail: this._id,
        bubbles: true
      }));
    }
  }
}
