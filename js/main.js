import {loadMap, addMainPin, addPins} from './map.js';
import {getData} from './api.js';
import {showAlert, showSuccessMessage, showErrorMessage} from './message.js';
import {setAdFormSubmit} from './ad-form.js';



const LATITUDE = 35.68;
const LONGITUDE = 139.69;

loadMap(LATITUDE, LONGITUDE);
addMainPin();
getData((advertisments) => {
  addPins(advertisments);
}, (message) => {
  showAlert(message);
});

setAdFormSubmit(showSuccessMessage, showErrorMessage);
