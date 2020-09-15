import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    let cartItem = this.cartItems.find(item => item.product.id === product.id);
    
    if (cartItem) {
      cartItem.count++;
    } else {
      let cartItem = {};
      cartItem.product = product;
      cartItem.count = 1;
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);
    let productAmount = cartItem.count;

    let newAmount = productAmount + amount;
    if (newAmount === 0) {
      let index = this.cartItems.indexOf(cartItem);
      this.cartItems.splice(index, 1);
    }
    cartItem.count = newAmount;

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length ? false : true;
  }

  getTotalCount() {
    let productsAmount = 0;
    
    for (let product of this.cartItems) {
      productsAmount += product.count;
    }

    return productsAmount;
  }

  getTotalPrice() {
    let productsPrice = 0;
    
    for (let product of this.cartItems) {
      productsPrice += product.count * product.product.price;
    }

    return productsPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let cartModalBody = document.createElement('div');
    for (let product of this.cartItems) {
      cartModalBody.append(this.renderProduct(product.product, product.count));
    }
    cartModalBody.append(this.renderOrderForm());

    this.cartModal = new Modal();
    this.cartModal.setTitle('Your order');
    this.cartModal.setBody(cartModalBody);
    this.cartModal.open();

    document.addEventListener('click', this.changeAmount);
    let cartForm = cartModalBody.querySelector('.cart-form');
    cartForm.addEventListener('submit', this.onSubmit);
  }

  changeAmount = () => {
    let button = event.target.closest('.cart-counter__button');
    if (!button) {
      return;
    }

    let product = event.target.closest('[data-product-id]');
    let productId = product.dataset.productId;

    if(button.classList.contains('cart-counter__button_minus')) {
      this.updateProductCount(productId, -1);
    } else {
      this.updateProductCount(productId, 1);
    }
  } 

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (document.body.classList.contains('is-modal-open')) {
      if (cartItem.count === 0 && this.isEmpty()) {
        this.cartModal.close();
        return;
      }

      let productId = cartItem.product.id;
      let modalBody = this.cartModal._modalBody;

      if (cartItem.count === 0) {
        let itemToDelete = modalBody.querySelector(`[data-product-id="${productId}"]`);
        itemToDelete.remove();
        return;
      }

      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${cartItem.product.price.toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    
    let sendButton = event.target.querySelector('button[type="submit"]');
    sendButton.classList.add('is-loading');
    
    let orderFormData = new FormData(event.target);

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: orderFormData,
    })
    .then(response => {
      if (response.ok) {
        this.cartItems = [];

        let successModalBody = document.createElement('div');
        successModalBody.className = 'modal__body-inner';
        successModalBody.innerHTML = `
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        `;
        this.cartModal.setTitle('Success!');
        this.cartModal.setBody(successModalBody);
      }
    });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

