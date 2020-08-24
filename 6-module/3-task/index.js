import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  get elem() {
    return this._elem;
  }

  constructor(slides) {
    this.createCarousel(slides);
    this._leftArrow.addEventListener('click', (event) => {
      this.arrowClick(1);
    });
  
    this._rightArrow.addEventListener('click', (event) => {
      this.arrowClick(-1);
    });

    this._elem.addEventListener('product-add', (event) => {});
    this._elem.addEventListener('click', (event) => this.productAdd(event));
  }

  createCarousel(slides) {
    let carouselContainer = document.createElement('div');
    carouselContainer.classList.add('carousel');

    let rightArrow = document.createElement('div');
    rightArrow.className = 'carousel__arrow carousel__arrow_right';
    rightArrow.innerHTML = '<img src="/assets/images/icons/angle-icon.svg" alt="icon">';
    this._rightArrow = rightArrow;

    let leftArrow = document.createElement('div');
    leftArrow.className = 'carousel__arrow carousel__arrow_left';
    leftArrow.innerHTML = '<img src="/assets/images/icons/angle-left-icon.svg" alt="icon">';
    this._leftArrow = leftArrow;
    this._leftArrow.style.display = 'none';

    carouselContainer.append(rightArrow);
    carouselContainer.append(leftArrow);
    
    let carouselInnerContainer = document.createElement('div');
    carouselInnerContainer.classList.add('carousel__inner');
    carouselContainer.append(carouselInnerContainer);
    
    let slidesHtml = slides.map(item => {
      let slide = `
        <div class="carousel__slide" data-id="${item.id}">
          <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${item.price.toFixed(2)}</span>
            <div class="carousel__title">${item.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `;

      return slide;
    });

    carouselInnerContainer.insertAdjacentHTML('afterbegin', slidesHtml.join(''));

    let carouselSlide = carouselInnerContainer.querySelectorAll('.carousel__slide');
    this._slidesArray = Array.from(carouselSlide);
    this._slidesArray[0].classList.add('active');

    this._carouselBody = carouselInnerContainer;
  
    this._elem = carouselContainer;
  }

  arrowClick(direction) {
    let activeSlideIndex = this._slidesArray.findIndex(item => item.classList.contains('active'));
    let nextSlideIndex = activeSlideIndex - direction;

    let currentOffset = this._carouselBody.style.transform.match(/(-?[0-9\.]+)/g);
    if (currentOffset) {
      currentOffset = +currentOffset[0];
    } else {
      currentOffset = 0;
    }

    let newOffset = currentOffset + this._slidesArray[0].offsetWidth * direction;
  
    this._carouselBody.style.transform = `translateX(${newOffset}px)`;

    this._slidesArray[activeSlideIndex].classList.remove('active');
    this._slidesArray[nextSlideIndex].classList.add('active');
    
    if(nextSlideIndex === this._slidesArray.length - 1) {
      this._rightArrow.style.display = 'none';
    } else if (nextSlideIndex === 0) {
      this._leftArrow.style.display = 'none';
    } else {
      this._rightArrow.style.display = '';
      this._leftArrow.style.display = '';
    }
  }

  productAdd(event) {
    if (event.target.closest('.carousel__button')) {
      let id = event.target.closest('[data-id]').dataset.id;
      this._elem.dispatchEvent(new CustomEvent('product-add', {
        detail: id,
        bubbles: true
      }));
    }
  }
}
