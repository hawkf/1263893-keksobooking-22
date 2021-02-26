const ALERT_SHOW_TIME = 4000;

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

const showAlert = function(message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.right = 0;
  alertContainer.style.top = 0;
  alertContainer.style.padding = '10px, 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;
  document.querySelector('body').appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

const showSuccessMessage = () => {
  const successMessage = document.querySelector('#success')
    .content
    .querySelector('.success');
  document.querySelector('main').appendChild(successMessage.cloneNode(true));
}

export {getRandomIntInclusive, shuffle, getRandomArrayElement, getRandomFloatInclusive, showAlert, showSuccessMessage};
