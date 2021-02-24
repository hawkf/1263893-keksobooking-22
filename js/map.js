/*global L:readonly*/
import {deactivationAdForm, activationAdForm, setAdress} from './ad-form.js';
import {deactivationMapFilters, activationMapFilters} from './map__filters.js';
import {makeAdvertisement} from './popup.js';

const LATITUDE = 35.68;
const LONGITUDE = 139.69;
const ICON_WIDTH = 52;
const ICON_HEIGHT = 52;
const ICON_ANCHOR_X = 26;
const ICON_ANCHOR_Y = 52;

const map = L.map('map-canvas');

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
    }, 10);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

}



const addMainPin = function () {
  const mainPinIcon = L.icon({
    iconUrl: '/img/main-pin.svg',
    iconSize: [ICON_WIDTH, ICON_HEIGHT],
    iconAnchor: [ICON_ANCHOR_X, ICON_ANCHOR_Y],
  });

  const mainPinMarker = L.marker (
    {
      lat: LATITUDE,
      lng: LONGITUDE,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  setAdress({lat: LATITUDE, lng: LONGITUDE});
  mainPinMarker.on('move', (evt) => {
    setAdress(evt.target.getLatLng());
  })
}

const addPin = function ({author, offer, location}) {
  const pinIcon = L.icon(
    {
      iconUrl: '/img/pin.svg',
      iconSize: [ICON_WIDTH, ICON_HEIGHT],
      iconAnchor: [ICON_ANCHOR_X, ICON_ANCHOR_Y],
    });

  const pinMarker = L.marker(
    {
      lat: location.x,
      lng: location.y,
    },
    {
      draggable: true,
      icon: pinIcon,
    });

  pinMarker
    .addTo(map)
    .bindPopup(
      makeAdvertisement({author, offer}),
      {
        keepInView: true,
      });
}

export {loadMap, addMainPin, addPin}

