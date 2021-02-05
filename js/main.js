//Источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  if (min > max) {
    [min, max] = [max, min]
  }

  if (min < 0) {
    // eslint-disable-next-line no-console
    console.log('Введен не верный диапазон');
    return null;
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomFloatInclusive(min, max, decimalNumber) {
  if (min > max) {
    [min, max] = [max, min]
  }

  if (min < 0) {
    // eslint-disable-next-line no-console
    console.log('Введен не верный диапазон');
    return null;
  }

  return  parseFloat((Math.random() * (max - min + 1) + min).toFixed(decimalNumber));
}

// eslint-disable-next-line no-console
console.log(getRandomIntInclusive(-1.2332, 50.3234));
// eslint-disable-next-line no-console
console.log(getRandomFloatInclusive(100.23434, 100.23434, 3));

const QUNTITY = 10;
const FHOTO_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
const HOUSE_TYPE = ['palace', 'flat', 'house', 'bungalow'];
const X_COORDINATES = {
  min: 35.65000,
  max: 35.70000,
  decimalNumber: 5,
};
const Y_COORDINATES = {
  min: 139.70000,
  max: 35.70000,
  decimalNumber: 5,
}
const ROOMS = [1, 2, 3, 5, 6];
const CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']

let getArrayIndex = function(array) {
  return getRandomIntInclusive(0, array.length-1);
}

let createAuthor = function() {
  return {
    avatar: 'img/avatars/user' + FHOTO_NUMBERS[getArrayIndex(FHOTO_NUMBERS)] + '.png',
  }
};

let createRandomArray = function(array) {
  let randomArray = new Array(getArrayIndex(array) + 1).fill(null);
  for(let i = 0; i < randomArray.length; i++) {
    randomArray[i] = array[i];
  }

  return randomArray;
}
let getLocation = function() {
  return {
    x: getRandomFloatInclusive(X_COORDINATES.min, X_COORDINATES.max, X_COORDINATES.decimalNumber),
    y: getRandomFloatInclusive(Y_COORDINATES.min, Y_COORDINATES.max, Y_COORDINATES.decimalNumber),
  };
}
let createOffer = function() {
  return {
    title: 'Rent out' + this.type,
    location: getLocation(),
    address: '' + this.location.x + ', ' + this.location.y,
    price: Math.random(),
    type: HOUSE_TYPE[getArrayIndex(HOUSE_TYPE)],
    rooms: ROOMS[getArrayIndex(ROOMS)],
    guests: getRandomIntInclusive(0, 100),
    checkin: CHECK_IN_OUT[getArrayIndex(CHECK_IN_OUT)],
    checkout: CHECK_IN_OUT[getArrayIndex(CHECK_IN_OUT)],
    features: createRandomArray(FEATURES),
    description: 'This ' + this.type + ' has all the conditions for a comfortable stay',
    photos: createRandomArray(PHOTOS),
  }
}

const advertisements = new Array(QUNTITY).fill(null).map(() => {
  return {
    author: createAuthor(),
    offer: createOffer(),
  }
});

// eslint-disable-next-line no-console
console.log(advertisements);
