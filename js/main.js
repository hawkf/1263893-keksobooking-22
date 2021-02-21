import {getAdvertisements} from './data.js';
import {loadMap, addMainPin, addPin} from './map.js';


const QUNTITY = 10;
const advertisements = getAdvertisements(QUNTITY)

loadMap(35.68, 139.69);
addMainPin();
advertisements.forEach((advertisement) => {
  addPin(advertisement);
})



