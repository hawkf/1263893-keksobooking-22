//Источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  let result;

  if(min < max) {
    min = Math.ceil(min);
    max = Math.floor(max);
  } else if (min > max) {
    min  = Math.ceil(max);
    max = Math.floor(min);
  }
  result = Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются

  if(min === max) {
    result = Math.floor(min);
  }
  return result;
}

function getRandomFloatInclusive(min, max, decimalNumber) {
  let result;
  if (min > max) {
    let x = min;
    min = max;
    max = x;
  }

  result = Math.random() * (max - min + 1) + min;

  if (min === max) {
    result = min;
  }

  return  result.toFixed(decimalNumber);
}

// eslint-disable-next-line no-console
console.log(getRandomIntInclusive(1.2332, 50.3234));
// eslint-disable-next-line no-console
console.log(getRandomFloatInclusive(100.23434, 100.23434, 3));
