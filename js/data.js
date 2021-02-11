import {getRandomIntInclusive, shuffle, getRandomArrayElement, getRandomFloatInclusive} from './util.js';

const QUNTITY = 10;
const HOUSE_TYPE = ['palace', 'flat', 'house', 'bungalow'];
const X_COORDINATES = {
  min: 35.65000,
  max: 35.70000,
  decimalNumber: 5,
};
const Y_COORDINATES = {
  min: 139.70000,
  max: 139.80000,
  decimalNumber: 5,
}
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']



const createAuthor = function() {
  return {
    avatar: 'img/avatars/user0' + getRandomIntInclusive(1, 8) + '.png',
  }
};

const createLocation = function() {
  return {
    x: getRandomFloatInclusive(X_COORDINATES.min, X_COORDINATES.max, X_COORDINATES.decimalNumber),
    y: getRandomFloatInclusive(Y_COORDINATES.min, Y_COORDINATES.max, Y_COORDINATES.decimalNumber),
  };
};

const createOffer = function() {
  return {
    title: 'Посуточная оренда жилья',
    address: '',
    price: getRandomIntInclusive(1, 1000000),
    type: getRandomArrayElement(HOUSE_TYPE),
    rooms: getRandomIntInclusive(1, 6),
    guests: getRandomIntInclusive(0, 100),
    checkin: getRandomArrayElement(TIMES),
    checkout: getRandomArrayElement(TIMES),
    features: shuffle(FEATURES).slice(getRandomIntInclusive(0, FEATURES.length - 1)),
    description: 'Есть все удобства. Прекрасная транспортная развязка',
    photos: shuffle(PHOTOS).slice(getRandomIntInclusive(0, PHOTOS.length - 1)),
  }
}

const createAdvertisement = function() {
  let offer = createOffer();
  let location = createLocation();
  offer.address = location.x + ', ' + location.y;
  return {
    author: createAuthor(),
    offer: offer,
    location: location,
  }
}

const getAdvertisements = function(quantity) {
  return new Array(quantity).fill(null).map(createAdvertisement);
};

// eslint-disable-next-line no-console
console.log(getAdvertisements(QUNTITY));

export {getAdvertisements}
