import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.renderModal();
    this._modalElem.addEventListener('click', event => this.closeOnClick(event));
    document.addEventListener('keydown', event => this.closeOnEscape(event));
  }

  renderModal() {
    this._modalElem = document.createElement('div');
    this._modalElem.classList.add('modal');

    let modalHtml = `
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title"></h3>
        </div>

        <div class="modal__body"></div>
      </div>
    `;

    this._modalElem.innerHTML = modalHtml;
  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.append(this._modalElem);
  }

  setTitle(title) {
    this._modalTitle = this._modalElem.querySelector('.modal__title');
    this._modalTitle.innerHTML = title;
  }

  setBody(node) {
    this._modalBody = this._modalElem.querySelector('.modal__body');
    this._modalBody.innerHTML = '';
    this._modalBody.insertAdjacentElement('afterbegin', node);
  }

  closeOnClick(event) {
    if (event.target.closest('.modal__close')) {
      this.close();
    }
  }

  closeOnEscape(event) {
    if(event.code === 'Escape') {
      this.close();
    }
  }

  close() {
    document.body.classList.remove('is-modal-open');
    this._modalElem.remove();
  }
}
