const map = document.querySelector('#map-canvas');
const advertisementTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');
const typeMap = new Map();
typeMap.set('flat', 'Квартира');
typeMap.set('bungalow', 'Бунгало')
typeMap.set('house', 'Дом');
typeMap.set('palace', 'Дворец');

//const advertisements = getAdvertisements(1);

//const advertisementFragment = document.createDocumentFragment();

/*advertisements.forEach(({author, offer, location}) => {
  const advertisementElement = advertisementTemplate.cloneNode(true);
  advertisementElement.querySelector('.popup__title').textContent = offer.title;
  advertisementElement.querySelector('.popup__text--address').textContent = offer.address;
  advertisementElement.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
  let type = '';
  switch(offer.type) {
    case 'flat':
      type = 'Квартира';
      break;
    case 'bungalow':
      type = 'Бунгало';
      break;
    case 'house':
      type = 'Дом';
      break;
    case 'palace':
      type = 'Дворец';
  }
  //advertisementElement.querySelector('.popup__type').textContent = type;
 // advertisementElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей'
  //advertisementElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  const featuresList = advertisementElement.querySelector('.popup__features');
  featuresList.innerHTML = '';
  for(let i = 0; i < offer.features.length; i++) {
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add('popup__feature--' + offer.features[i]);
    featuresList.appendChild(featureItem);
  }
  advertisementElement.querySelector('.popup__description').textContent = offer.description;
  const photos= advertisementElement.querySelector('.popup__photos');
  const photoElement = photos.querySelector('.popup__photo');
  photos.removeChild(photoElement);
  for(let i = 0; i < offer.photos.length; i++) {
    photoElement.src = offer.photos[i];
    photos.appendChild(photoElement.cloneNode(true));
  }
  advertisementElement.querySelector('.popup__avatar').src = author.avatar;


  advertisementFragment.appendChild(advertisementElement);
});*/
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


