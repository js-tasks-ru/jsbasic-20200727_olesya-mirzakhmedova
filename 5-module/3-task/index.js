function initCarousel() {
  let leftArrow = document.querySelector('.carousel__arrow_left');
  let rightArrow = document.querySelector('.carousel__arrow_right');
  leftArrow.style.display = 'none';

  let carouselBody = document.querySelector('.carousel__inner');
  let carouselSlide = document.querySelectorAll('.carousel__slide');
  let slidesArray = Array.from(carouselSlide);

  slidesArray[0].classList.add('active');

  leftArrow.addEventListener('click', (event) => {
    arrowClick(1);
  });

  rightArrow.addEventListener('click', (event) => {
    arrowClick(-1);
  });


  function arrowClick(direction) {
    let activeSlideIndex = slidesArray.findIndex(item => item.classList.contains('active'));
    let nextSlideIndex = activeSlideIndex - direction;

    let currentOffset = carouselBody.style.transform.match(/(-?[0-9\.]+)/g);
    if (currentOffset) {
      currentOffset = +currentOffset[0];
    } else {
      currentOffset = 0;
    }

    let newOffset = currentOffset + slidesArray[0].offsetWidth * direction;
  
    carouselBody.style.transform = `translateX(${newOffset}px)`;

    slidesArray[activeSlideIndex].classList.remove('active');
    slidesArray[nextSlideIndex].classList.add('active');
    
    if(nextSlideIndex === slidesArray.length - 1) {
      rightArrow.style.display = 'none';
    } else if (nextSlideIndex === 0) {
      leftArrow.style.display = 'none';
    } else {
      rightArrow.style.display = '';
      leftArrow.style.display = '';
    }
  }
}