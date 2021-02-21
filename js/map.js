/*global L:readonly*/
import {deactivationAdForm, activationAdForm, setAdress} from './ad-form.js';
import {deactivationMapFilters, activationMapFilters} from './map__filters.js';
import {makeAdvertisement} from './popup.js';

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
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker (
    {
      lat: 35.68,
      lng: 139.69,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  setAdress({lat: 35.68, lng: 139.69});
  mainPinMarker.on('moveend', (evt) => {
    setAdress(evt.target.getLatLng());
  })
}

const addPin = function ({author, offer, location}) {
  const pinIcon = L.icon(
    {
      iconUrl: '/img/pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52],
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

