import getDate from '../../utils/get-date';
import GeolocationHandler from '../geolocation-handler/geolocation-handler';

export default class MainWindow {
  constructor() {
    this.postInput = document.querySelector('.post-input');

    this.timeline = document.querySelector('.timeline');
    this.modal = document.querySelector('.modal');
    this.closeModalSpan = document.querySelector('.close-modal');
    this.modalButton = document.querySelector('.modal-button');

    this.geolocationHandler = new GeolocationHandler();

    this.addPost = this.addPost.bind(this);
    this.hideModal = this.hideModal.bind(this);

    this.setupEventListeners();
  }

  
  setupEventListeners() {
    this.postInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addPost();
      }
    });
    this.closeModalSpan.addEventListener('click', () => {
      this.hideModal();
    });
    this.modalButton.addEventListener('click', () => {
      this.hideModal();
    });
    // Закрытие модального окна при клике вне его
    window.addEventListener('click', (event) => {
      if (event.target === this.modal) {
        this.hideModal();
      }
    });
  }


  async addPost() {
    const text = this.postInput.value.trim();

    if (text === '') {
      this.showModal();
      return;
    }

    try {
      const coords = await this.geolocationHandler.getUserCoordinates();
      const postElement = this.createMessage(text, coords);
      this.timeline.insertAdjacentElement('beforeend', postElement);
      this.postInput.value = '';
    } catch (error) {
      console.error('Ошибка при добавлении поста: ', error);
    }
  }


  createMessage(text, coords) {
    const divElement = document.createElement('div');
    divElement.classList.add('post');

    const textElement = document.createElement('p');
    textElement.textContent = text;

    const timeElement = document.createElement('span');
    timeElement.classList.add('time');
    timeElement.textContent = getDate();

    const coordsElement = document.createElement('span');
    coordsElement.classList.add('coords');
    coordsElement.textContent = `[${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}]`;

    divElement.appendChild(textElement);
    divElement.appendChild(timeElement);
    divElement.appendChild(coordsElement);

    return divElement;
  }


  showModal() {
    this.modal.style.display = 'block';
    this.postInput.disabled = true;
  }


  hideModal() {
    this.modal.style.display = 'none';
    this.postInput.disabled = false;
    this.postInput.focus();
  }
}
