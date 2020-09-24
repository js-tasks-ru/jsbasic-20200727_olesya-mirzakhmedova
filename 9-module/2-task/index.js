import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  constructor() {
    this.slides = slides;
    this.categories = categories;
    this.nutsCheckbox = document.getElementById('nuts-checkbox');
    this.vegeterianCheckbox = document.getElementById('vegeterian-checkbox');

    this.nutsCheckbox.addEventListener('change', event => {
      this.productsGrid.updateFilter({
        noNuts: this.nutsCheckbox.checked
      });
    });

    this.vegeterianCheckbox.addEventListener('change', event => {
      this.productsGrid.updateFilter({
        vegeterianOnly: this.vegeterianCheckbox.checked
      });
    });
  }

  async render() {
    let response = await fetch('./products.json');

    if (response.ok) {
      this.products = await response.json();
      
      this.carousel = new Carousel(this.slides);
      let carouselHolder = document.querySelector('[data-carousel-holder]');
      carouselHolder.append(this.carousel.elem);

      this.ribbonMenu = new RibbonMenu(this.categories);
      let ribbonHolder = document.querySelector('[data-ribbon-holder]');
      ribbonHolder.append(this.ribbonMenu.elem);

      this.stepSlider = new StepSlider({
        steps: 5,
        value: 3,
      });
      let sliderHolder = document.querySelector('[data-slider-holder]');
      sliderHolder.append(this.stepSlider.elem);

      this.cartIcon = new CartIcon();
      let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
      cartIconHolder.append(this.cartIcon.elem);

      this.cart = new Cart(this.cartIcon);

      this.productsGrid = new ProductsGrid(this.products);
      let productsGridHolder = document.querySelector('[data-products-grid-holder]');
      productsGridHolder.innerHTML = '';
      productsGridHolder.append(this.productsGrid.elem);

      this.productsGrid.updateFilter({
        noNuts: document.getElementById('nuts-checkbox').checked,
        vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
        maxSpiciness: this.stepSlider.value,
        category: this.ribbonMenu.value
      });

      document.body.addEventListener('product-add', event => {
        let productToAdd = this.products.find(item => item.id === event.detail);
        this.cart.addProduct(productToAdd);
      });

      this.stepSlider.elem.addEventListener('slider-change', event => {
        this.productsGrid.updateFilter({
          maxSpiciness: event.detail
        });
      });

      this.ribbonMenu.elem.addEventListener('ribbon-select', event => {
        this.productsGrid.updateFilter({
          category: event.detail
        });
      });

      return response;
    }
  }
}
