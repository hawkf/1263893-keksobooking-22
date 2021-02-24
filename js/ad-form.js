const adForm = document.querySelector('.ad-form');
const formElements = adForm.querySelectorAll('fieldset');
const adresInput = document.querySelector('#address');


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

const setAdress = function ({lat, lng}) {
  adresInput.value = lat.toFixed(5) + ', ' + lng.toFixed(5);
}




export {deactivationAdForm, activationAdForm, setAdress};
