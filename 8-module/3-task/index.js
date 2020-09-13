export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
      cartItem.count = newAmount;
      let index = this.cartItems.indexOf(cartItem);
      this.cartItems.splice(index, 1);
    } else {
      cartItem.count = newAmount;
    }

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

  onProductUpdate() {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

