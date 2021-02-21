const advertisementTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');
const typeMap = new Map();
typeMap.set('flat', 'Квартира');
typeMap.set('bungalow', 'Бунгало')
typeMap.set('house', 'Дом');
typeMap.set('palace', 'Дворец');

const getHousingName = function(type) {
  return typeMap.get(type);
};

const createFeaturesItems = function (features) {
  const featuresFragment = document.createDocumentFragment();
  features.forEach((feature) => {
    const featureItem = document.createElement('li');
    featureItem.className = 'popup__feature popup__feature--' + feature;
    featuresFragment.appendChild(featureItem);
  });
  return featuresFragment;
}
const createPhotosElements = function (photos, photoElement) {
  const photosFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    photoElement.src = photo;
    photosFragment.appendChild(photoElement.cloneNode(true));
  });
  return photosFragment;
}
const makeAdvertisement = function ({author, offer}) {
  const advertisementElement = advertisementTemplate.cloneNode(true);
  advertisementElement.querySelector('.popup__title').textContent = offer.title;
  advertisementElement.querySelector('.popup__text--address').textContent = offer.address;
  advertisementElement.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
  advertisementElement.querySelector('.popup__type').textContent = getHousingName(offer.type);
  advertisementElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей'
  advertisementElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  const featuresList = advertisementElement.querySelector('.popup__features');
  featuresList.innerHTML = '';
  featuresList.appendChild(createFeaturesItems(offer.features));
  advertisementElement.querySelector('.popup__description').textContent = offer.description;
  const photos= advertisementElement.querySelector('.popup__photos');
  const photoElement = advertisementElement.querySelector('.popup__photo');
  photos.removeChild(photoElement);
  photos.appendChild(createPhotosElements(offer.photos, photoElement));
  advertisementElement.querySelector('.popup__avatar').src = author.avatar;
  return advertisementElement;
};

export {makeAdvertisement};


