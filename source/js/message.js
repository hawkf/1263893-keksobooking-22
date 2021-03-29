import {isEscEvent} from './util.js';
import {resetForm} from './ad-form.js';

const ALERT_SHOW_TIME = 4000;

const successMessage = document.querySelector('#success')
  .content
  .querySelector('.success')
  .cloneNode(true);
const errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error')
  .cloneNode(true);
const closeErrorMessageButton = errorMessage.querySelector('.error__button');


const showAlert = function(message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.right = 0;
  alertContainer.style.top = 0;
  alertContainer.style.padding = '10px, 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;
  document.querySelector('body').appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

const onMessageSuccessEscKeyDown = function (evt) {
  if(isEscEvent(evt)) {
    evt.preventDefault();
    removeSuccessMessage();
  }
}

const onMessageSuccesClick = function (evt) {
  evt.preventDefault();
  removeSuccessMessage();
}

const showSuccessMessage = () => {
  document.querySelector('main').appendChild(successMessage);
  document.addEventListener('keydown' , onMessageSuccessEscKeyDown);
  document.addEventListener('click', onMessageSuccesClick);
  resetForm();
}

const removeSuccessMessage = () => {
  document.querySelector('main').removeChild(successMessage);
  document.removeEventListener('keydown' , onMessageSuccessEscKeyDown);
  document.removeEventListener('click', onMessageSuccesClick);
}

const onMessageErrorEscKeyDown = function (evt) {
  if(isEscEvent(evt)) {
    evt.preventDefault();
    removeErrorMessage();
  }
}

const onMessageErrorClick = function (evt) {
  evt.preventDefault();
  removeErrorMessage();
}

const showErrorMessage = () => {
  document.querySelector('main').appendChild(errorMessage);
  document.addEventListener('keydown' , onMessageErrorEscKeyDown);
  document.addEventListener('click', onMessageErrorClick);
}

const removeErrorMessage = () => {
  document.querySelector('main').removeChild(errorMessage);
  document.removeEventListener('keydown' , onMessageErrorEscKeyDown);
  document.removeEventListener('click', onMessageErrorClick);
}

closeErrorMessageButton.addEventListener('click', () => {
  removeErrorMessage();
})

export {showAlert, showSuccessMessage, showErrorMessage}
