/*global L:readonly*/
import {deactivationAdForm, activationAdForm, setAdress} from './ad-form.js';
import {deactivationMapFilters, activationMapFilters} from './map__filters.js';
import {makeAdvertisement} from './popup.js';

const LATITUDE = 35.68;
const LONGITUDE = 139.69;
const SCALE = 10;
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

const addPins = function (advertisments) {
  // eslint-disable-next-line no-console
  console.log(advertisments);
  advertisments.forEach(({author, offer, location}) =>
  {
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

    pinMarker
      .addTo(map)
      .bindPopup(
        makeAdvertisement({author, offer}),
        {
          keepInView: true,
        });
  });
}

export {loadMap, addMainPin, setDefaultMainPinMarker, addPins}
