import {loadMap, addMainPin, addPins} from './map.js';
import {getData} from './api.js';
import {showAlert, showSuccessMessage} from './util.js';
import {resetMapFilters} from './map__filters.js';
import {resetForm, setAdFormSubmit} from './ad-form.js';



const LATITUDE = 35.68;
const LONGITUDE = 139.69;

loadMap(LATITUDE, LONGITUDE);
addMainPin();
getData((advertisments) => {
  addPins(advertisments);
}, (message) => {
  showAlert(message);
});


resetForm(resetMapFilters);
setAdFormSubmit(showSuccessMessage);
//showSuccessMessage();



