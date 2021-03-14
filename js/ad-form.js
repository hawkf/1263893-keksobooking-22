import {sendData} from './api.js';
import {setDefaultMainPinMarker} from './map.js';
import {resetMapFilters} from './map-filters.js';


const adForm = document.querySelector('.ad-form');
const formElements = adForm.querySelectorAll('fieldset');
const adresInput = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout')
const titleInput = adForm.querySelector('#title');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const priceMap = new Map();
priceMap.set('flat', '1000');
priceMap.set('bungalow', '0')
priceMap.set('house', '5000');
priceMap.set('palace', '10000');

price.placeholder = priceMap.get(type.value);

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
    //evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onError(),
      new FormData(evt.target),
    )
  });
}

type.addEventListener('change', () => {
  price.placeholder = priceMap.get(type.value);
} );

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
})

titleInput.addEventListener('invalid', () => {
  if(titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
  } else if(titleInput.validity.tooLong) {
    titleInput.setCustomValidity('Заголовок не должен превышать 100 символов');
  } else if(titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  } else {
    titleInput.setCustomValidity('');
  }
});

titleInput.addEventListener('input', () => {
  titleInput.reportValidity();
});

price.addEventListener('input', () => {
  if(price.value < Number(price.placeholder)) {
    price.setCustomValidity('Минимальная цена ' + price.placeholder);
  } else {
    price.setCustomValidity('');
  }
  price.reportValidity();
});

capacity.addEventListener('change', () => {
  if(roomNumber.value === '1' && capacity.value !== '1') {
    capacity.setCustomValidity('1 комната — «для 1 гостя»');
    capacity.value = '1';
  } else if(roomNumber.value === '2' && capacity.value === '3' || capacity.value === '0') {
    capacity.setCustomValidity('2 комнаты — «для 2 гостей» или «для 1 гостя»');
    capacity.value = '1';
  } else if(roomNumber.value === '3' && capacity.value === '0') {
    capacity.setCustomValidity('3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
    capacity.value = '1';
  } else if(roomNumber.value === '100' && capacity.value !== '0') {
    capacity.setCustomValidity('100 комнат — «не для гостей»');
    capacity.value = '0';
  } else {
    capacity.setCustomValidity('');
  }
  capacity.reportValidity();
})

export {deactivationAdForm, activationAdForm, setAdress, setAdFormSubmit, resetForm};
