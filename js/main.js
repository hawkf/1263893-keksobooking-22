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
