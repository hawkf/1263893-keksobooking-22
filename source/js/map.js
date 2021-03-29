/*global L:readonly*/
import {deactivationAdForm, activationAdForm, setAdress} from './ad-form.js';
import {deactivationMapFilters, activationMapFilters} from './map-filters.js';
import {makeAdvertisement} from './popup.js';

const LATITUDE = 35.68;
const LONGITUDE = 139.69;
const SCALE = 10;
const ICON_WIDTH = 52;
const ICON_HEIGHT = 52;
const ICON_ANCHOR_X = 26;
const ICON_ANCHOR_Y = 52;
const PINS_COUNT = 10;

const map = L.map('map-canvas');
const mapFilter = document.querySelector('.map__filters');


const arrayCompare = function (offerElements, features) {
  if(offerElements.length === 0 && features.length > 0) {
    return false;
  }
  for(let i  = 0; i < features.length; i++) {
    for(let j = 0; j < offerElements.length; j++) {
      if(offerElements.indexOf(features[i]) === -1) {
        return false;
      }
    }
  }
  return true;
}

const filterAdvertisment = function (offer) {
  const housingType = mapFilter.querySelector('#housing-type');
  const housingPrice = mapFilter.querySelector('#housing-price');
  const housingRoom = mapFilter.querySelector('#housing-rooms');
  const housingGuests = mapFilter.querySelector('#housing-guests')
  const housingFeatures = Array.from(mapFilter.querySelectorAll('[name="features"]:checked')).map(cb => cb.value);

  return (housingType.value === offer.type || housingType.value === 'any') &&
    (housingPrice.value === getPriceRange(offer.price) || housingPrice.value === 'any') &&
    (housingRoom.value === String(offer.rooms) || housingRoom.value === 'any') &&
    (housingGuests.value === String(offer.guests) || housingGuests.value === 'any') &&
    arrayCompare(offer.features, housingFeatures);
}

const getPriceRange = function (price) {
  let priceRange;
  if(price < 10000) {
    priceRange = 'low';
  } else if (price >= 10000 && price <= 50000) {
    priceRange = 'middle'
  } else {
    priceRange = 'high'
  }
  return priceRange;
}

const loadMap = function (latValue, lngValue) {
  deactivationAdForm();
  deactivationMapFilters()
  map.on('load', () => {
    activationAdForm();
    activationMapFilters();
  })
    .setView({
      lat: latValue,
      lng: lngValue,
    }, SCALE);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

}

const mainPinMarker = L.marker (
  {
    lat: LATITUDE,
    lng: LONGITUDE,
  },
  {
    draggable: true,
  },
);

const addMainPin = function () {
  const mainPinIcon = L.icon({
    iconUrl: '/img/main-pin.svg',
    iconSize: [ICON_WIDTH, ICON_HEIGHT],
    iconAnchor: [ICON_ANCHOR_X, ICON_ANCHOR_Y],
  });

  mainPinMarker.setIcon(mainPinIcon);
  mainPinMarker.addTo(map);

  setAdress({lat: LATITUDE, lng: LONGITUDE});
  mainPinMarker.on('move', (evt) => {
    setAdress(evt.target.getLatLng());
  })
}

const setDefaultMainPinMarker  = () => {
  mainPinMarker.setLatLng({lat: LATITUDE, lng: LONGITUDE});
  setAdress({lat: LATITUDE, lng: LONGITUDE});
}
let markers = [];

const addPins = function (advertisments) {
  advertisments.filter((element) => filterAdvertisment(element.offer))
    .slice(0, PINS_COUNT)
    .forEach(({author, offer, location}) => {
      const pinIcon = L.icon(
        {
          iconUrl: '/img/pin.svg',
          iconSize: [ICON_WIDTH, ICON_HEIGHT],
          iconAnchor: [ICON_ANCHOR_X, ICON_ANCHOR_Y],
        });

      const pinMarker = L.marker(
        {
          lat: location.lat,
          lng: location.lng,
        },
        {
          draggable: true,
          icon: pinIcon,
        });

      markers.push(pinMarker);

      pinMarker
        .addTo(map)
        .bindPopup(
          makeAdvertisement({author, offer}),
          {
            keepInView: true,
          });
    });
}

const clearPinMarkers = function () {
  markers.forEach((marker) => {
    marker.remove();
  })
  markers = [];
}

export {loadMap, addMainPin, setDefaultMainPinMarker, addPins, clearPinMarkers}
