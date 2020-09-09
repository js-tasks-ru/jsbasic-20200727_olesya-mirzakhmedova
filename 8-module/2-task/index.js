import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.render();
    this.createProducts(this.products);
  }

  render() {
    let productsContainer = document.createElement('div');
    productsContainer.innerHTML = `
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
    `;

    this.elem = productsContainer;
    this.productsInner = this.elem.querySelector('.products-grid__inner');
  }

  createProducts(products) {
    this.productsInner.innerHTML = '';

    for (let product of products) {
      let card = new ProductCard({
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
        id: product.id
      });
      
      this.productsInner.append(card.elem);
    }
  }

  updateFilter(filters) {
    if(!Object.keys(this.filters).length) {
      this.filters = filters;
    } else {
      for (let filterProperty in filters) {
        this.filters[filterProperty] = filters[filterProperty];
      }
    }

    let filteredProducts = this.products;

    if (this.filters.noNuts) {
      filteredProducts = filteredProducts.filter(item => item.nuts === false || !item.nuts);
    }

    if (this.filters.vegeterianOnly) {
      filteredProducts = filteredProducts.filter(item => item.vegeterian === true);
    }

    if (this.filters.maxSpiciness) {
      filteredProducts = filteredProducts.filter(item => item.spiciness <= this.filters.maxSpiciness);
    }

    if (this.filters.category) {
      filteredProducts = filteredProducts.filter(item => item.category === this.filters.category);
    }

    this.createProducts(filteredProducts);
  }
}
