//const ALERT_SHOW_TIME = 4000;

const getRandomIntInclusive = function (min, max) {
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

const getRandomFloatInclusive = function (min, max, decimalNumber) {
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

const getRandomArrayElement = function(arrayElements) {
  return arrayElements[getRandomIntInclusive(0, arrayElements.length - 1)];
}

const shuffle = function (arrayElements) {
  const results  = arrayElements.slice();
  for (let i = results.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [results[i], results[j]] = [results[j], results[i]];
  }
  return results;
}

const arrayCompare = function (offerArray, features) {
  if(offerArray.length === 0 & features.length > 0) {
    return false;
  }
  for(let i  = 0; i < features.length; i++) {
    for(let j = 0; j < offerArray.length; j++) {
      if(offerArray.indexOf(features[i]) === -1) {
        return false;
      }
    }
  }
  return true;
}

const isEscEvent = function (evt) {
  return evt.key === ('Escape' || 'Esc');
}


export {getRandomIntInclusive, shuffle, getRandomArrayElement, getRandomFloatInclusive, isEscEvent, arrayCompare};
