import {getAdvertisements} from './data.js';
import {makeAdvertisement} from './popup.js';

const QUNTITY = 10;

// eslint-disable-next-line no-console
console.log(getAdvertisements(QUNTITY));
const advertisment = getAdvertisements(QUNTITY)[0];
makeAdvertisement(advertisment);
