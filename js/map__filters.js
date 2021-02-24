const mapFilter = document.querySelector('.map__filters');
const mapFilterElements = mapFilter.children;

const deactivationMapFilters = function() {
  mapFilter.classList.add('map__filters--disabled');

  for (let i = 0; i < mapFilterElements.length; i++) {
    mapFilterElements[i].setAttribute('disabled', 'disabled');
  }
};

const activationMapFilters = function() {
  mapFilter.classList.remove('map__filters--disabled');

  for (let i = 0; i < mapFilterElements.length; i++) {
    mapFilterElements[i].removeAttribute('disabled', 'disabled');
  }
}

export {deactivationMapFilters, activationMapFilters}
