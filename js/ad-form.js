import {sendData} from './api.js';
import {setDefaultMainPinMarker} from './map.js';
import {resetMapFilters} from './map-filters.js';


const adForm = document.querySelector('.ad-form');
const adFormSubmitButton = adForm.querySelector('.ad-form__submit');
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
const capacityOptions = capacity.querySelectorAll('option');
const priceMap = new Map();
priceMap.set('flat', '1000');
priceMap.set('bungalow', '0')
priceMap.set('house', '5000');
priceMap.set('palace', '10000');
const capacityMap = new Map();
capacityMap.set('1', ['1']);
capacityMap.set('2', ['1', '2']);
capacityMap.set('3', ['1', '2', '3']);
capacityMap.set('100', ['0']);

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
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onError(),
      new FormData(evt.target),
    )
  });
}

type.addEventListener('change', () => {
  price.placeholder = priceMap.get(type.value);
  price.min = priceMap.get(type.value);
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

capacity.addEventListener('click', () => {
  setValidCapacity();
});

roomNumber.addEventListener('click', () => {
  setValidCapacity();
});

const setValidCapacity = function () {
  for(let i = 0; i < capacityOptions.length; i++) {
    if(capacityMap.get(roomNumber.value).includes(capacityOptions[i].value)) {
      capacityOptions[i].disabled = false;
      if(i === capacityOptions.length - 1) {
        capacityOptions[i].selected = true;
      }
    } else  {
      capacityOptions[i].disabled = true;
      if (capacityOptions[i].selected === true) {
        capacityOptions[i].selected = false;
      }
    }
  }
};

adFormSubmitButton.addEventListener('click', () => {
  const inputs = adForm.querySelectorAll('input');
  for(let i = 0; i < inputs.length; i++) {
    if(inputs[i].checkValidity() === false) {
      inputs[i].style.outline = 'solid red 2px';
    } else {
      inputs[i].style.outline = 'none';
    }
  }
});

export {deactivationAdForm, activationAdForm, setAdress, setAdFormSubmit, resetForm};
