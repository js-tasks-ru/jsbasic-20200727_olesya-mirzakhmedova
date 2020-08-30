export default class StepSlider {
  get elem() {
    return this._sliderElem;
  }
  
  constructor({ steps, value = 0 }) {
    this._steps = steps;
    this._value = value;
    this.renderSlider(this._steps, this._value);
    
    this._sliderElem.addEventListener('click', event => this.sliderClick(event));
  }

  renderSlider(steps, value) {
    // верстка для слайдера
    this._sliderElem = document.createElement('div');
    this._sliderElem.className = 'slider';

    let sliderHtml = `
      <div class="slider__thumb">
        <span class="slider__value"></span>
      </div>

      <div class="slider__progress"></div>

      <div class="slider__steps"></div>
    `;

    this._sliderElem.innerHTML = sliderHtml;

    // формируем шаги
    let sliderSteps = this._sliderElem.querySelector('.slider__steps');
    for (let i = 0; i < steps; i++) {
      let stepItem = document.createElement('span');

      if(i === value) {
        stepItem.className = 'slider__step-active';
      }
      sliderSteps.append(stepItem);
    }

    // число у бегунка, соответствующее выбранному "сегменту"
    this._sliderValue = this._sliderElem.querySelector('.slider__value');
    this._sliderValue.textContent = this._value;

    // определяем, сколько надо закрасить от шкалы при инициализации слайдера
    let shiftPercents = this._value * 100 / (this._steps - 1);

    this._thumb = this._sliderElem.querySelector('.slider__thumb'); // бегунок
    this._progress = this._sliderElem.querySelector('.slider__progress'); // прогресс-бар

    this._thumb.style.left = `${shiftPercents}%`;
    this._progress.style.width = `${shiftPercents}%`;
  }

  sliderClick(event) {
    let sliderRect = event.target.getBoundingClientRect();
    let x = event.clientX - sliderRect.left;  // координата клика относительно блока слайдера

    this._sliderWidth = this._sliderElem.clientWidth; // ширина блока слайдера
    this._sliderStepWidth = this._sliderWidth / (this._steps - 1); // ширина сегмента

    // определяем номер выбранного сегмента, меняем число у бегунка на соответствующее
    let stepNumber = Math.round(x / this._sliderStepWidth);
    this._sliderValue.textContent = stepNumber;

    // удаляем активный класс у предыдущего шага, делаем активным выбранный
    document.querySelector('.slider__step-active').classList.remove('slider__step-active');
    let spans = document.querySelectorAll('.slider__steps span');
    let spansArray = Array.from(spans);
    spansArray[stepNumber].classList.add('slider__step-active');

    // высчитываем на сколько процентов должен быть закрашен слайдер
    // закрашиваем, смещаем бегунок
    let shiftPercents = stepNumber * this._sliderStepWidth * 100 / this._sliderWidth;

    this._thumb.style.left = `${shiftPercents}%`;
    this._progress.style.width = `${shiftPercents}%`;

    this._sliderElem.dispatchEvent(new CustomEvent('slider-change', {
      detail: stepNumber,
      bubbles: true
    }));
  }
}
