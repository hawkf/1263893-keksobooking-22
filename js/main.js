import {getAdvertisements} from './data.js';
import {loadMap, addMainPin, addPin} from './map.js';


const QUNTITY = 10;
const LATITUDE = 35.68;
const LONGITUDE = 139.69;

const advertisements = getAdvertisements(QUNTITY)

loadMap(LATITUDE, LONGITUDE);
addMainPin();
advertisements.forEach((advertisement) => {
  addPin(advertisement);
})



