/* global _:readonly */

import {loadMap, addMainPin, addPins, clearPinMarkers} from './map.js';
import {getData} from './api.js';
import {showAlert, showSuccessMessage, showErrorMessage} from './message.js';
import {setAdFormSubmit} from './ad-form.js';
import {setMapFiltersChange} from './map-filters.js';
import './prewiev.js';


const LATITUDE = 35.68;
const LONGITUDE = 139.69;
const RERENDER_DELAY = 500;

loadMap(LATITUDE, LONGITUDE);
addMainPin();
getData((advertisments) => {
  addPins(advertisments);
  setMapFiltersChange(_.debounce(
    () => {
      clearPinMarkers();
      addPins(advertisments);
    }, RERENDER_DELAY));
}, (message) => {
  showAlert(message);
});

setAdFormSubmit(showSuccessMessage, showErrorMessage);
