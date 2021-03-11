import {sendData} from './api.js';
import {setDefaultMainPinMarker} from './map.js';
import {resetMapFilters} from './map-filters.js';


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

const resetForm = () => {
  adForm.reset();
  resetMapFilters();
  setDefaultMainPinMarker();
}

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
})

const setAdress = function ({lat, lng}) {
  adresInput.value = lat.toFixed(5) + ', ' + lng.toFixed(5);
}

const setAdFormSubmit = (onSuccess, onError) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onError(),
      new FormData(evt.target),
    )
  });
}




export {deactivationAdForm, activationAdForm, setAdress, setAdFormSubmit, resetForm};
