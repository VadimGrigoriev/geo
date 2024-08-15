import './geolocation-handler.css';
import parseCoordinates from '../../utils/parse-coordinates';

export default class GeolocationHandler {
  constructor() {
    this.coordinates = { latitude: null, longitude: null };
    this.modal = document.querySelector('.modal-location');
    this.closeModalSpan = document.querySelector('.close-modal-location');
    this.manualCoordsInput = document.querySelector('.manual-coords');
    this.manualCoordsSubmit = document.querySelector('.modal-button-location');

    this.postInput = document.querySelector('.post-input');
    this.notification = document.querySelector('.notification');

    this.hideModal = this.hideModal.bind(this);
  }


  getUserCoordinates() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {       //функция при успешном получении координат
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {          //функция при получении ошибки
            console.error('Ошибка при получении геолокации через API:', error);
            this.showModal(resolve, reject);
          },
        );
      } else {
        reject(new Error('Геолокация не поддерживается в этом браузере.'));
      }
    });
  }


  showModal(resolve, reject) {
    this.modal.style.display = 'block';
    this.manualCoordsInput.focus();
    this.bindModalEvents(resolve, reject);
  }


  hideModal() {
    this.modal.style.display = 'none';
    // this.manualCoordsInput.value = '';
    this.postInput.focus();
  }

  
  bindModalEvents(resolve, reject) {
    this.closeModalSpan.addEventListener('click', () => {
      this.hideModal();
      this.showNotification('Не удалось получить координаты. Пожалуйста, проверьте настройки геолокации.');
      reject(new Error('Пользователь закрыл модальное окно.'));
    });

    window.addEventListener('click', (event) => {
      if (event.target === this.modal) {
        this.hideModal();
        this.showNotification('Не удалось получить координаты. Пожалуйста, проверьте настройки геолокации.');
        reject(new Error('Пользователь кликнул вне модального окна.'));
      }
    });

    this.manualCoordsSubmit.addEventListener('click', () => {
      const input = this.manualCoordsInput.value.trim();
      try {
        this.coordinates = parseCoordinates(input);
        this.hideModal();
        resolve(this.coordinates);
      } catch (error) {
        this.showNotification('Неверный формат координат. Пожалуйста, введите координаты в формате: "51.50851, -0.12572".', true);
      }
    });

    this.manualCoordsInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const input = this.manualCoordsInput.value.trim();
        try {
          this.coordinates = parseCoordinates(input);
          this.hideModal();
          resolve(this.coordinates);
        } catch (error) {
          this.showNotification('Неверный формат координат. Пожалуйста, введите координаты в формате: "51.50851, -0.12572".', true);
        }
      }      
    });
  }


  showNotification(text, redBorder = null) {
    if (redBorder !== null) {
      this.manualCoordsInput.classList.add('highlight');
    }
    this.notification.textContent = text;
    this.notification.classList.add('show');
    setTimeout(() => {
      this.manualCoordsInput.classList.remove('highlight');
      this.notification.classList.remove('show');
    }, 3000);
  }
}
