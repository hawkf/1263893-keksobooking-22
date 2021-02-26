import {sendData} from './api.js';
import {showAlert} from './util.js';
import {setDefaultMainPinMarker} from './map.js';


const adForm = document.querySelector('.ad-form');
const formElements = adForm.querySelectorAll('fieldset');
const adresInput = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');


const deactivationAdForm = function() {
  adForm.classList.add('ad-form--disabled');

  for (let i = 0; i < formElements.length; i++) {
    formElements[i].setAttribute('disabled', 'disabled');
  }
};

const activationAdForm = function() {
  adForm.classList.remove('ad-form--disabled');

  for (let i = 0; i < formElements.length; i++) {
    formElements[i].removeAttribute('disabled', 'disabled');
  }

  adresInput.setAttribute('readonly', 'readonly');
}

const resetForm = (resetMapFilters) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    adForm.reset();
    resetMapFilters();
    setDefaultMainPinMarker();
  })
}

const setAdress = function ({lat, lng}) {
  adresInput.value = lat.toFixed(5) + ', ' + lng.toFixed(5);
}

const setAdFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => showAlert('Не удалось отправить форму'),
      new FormData(evt.target),
    );
  });
}




export {deactivationAdForm, activationAdForm, setAdress, setAdFormSubmit, resetForm};
