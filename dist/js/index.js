import AuxiliarySearch from './auxiliarySearch.js';
import MainSearch from './mainSearch.js';

const getDOM = () => {
  const form = document.getElementById('jsForm');
  const ingredientAuxiliary = new AuxiliarySearch('ingredients', 'Ingrédients');
  const applianceAuxiliary = new AuxiliarySearch('appliance', 'Appareil');
  const ustensilAuiliary = new AuxiliarySearch('ustensils', 'Ustensiles');

  const filterTags = document.createElement('div');
  filterTags.id = 'jsTags';
  filterTags.className = 'filter-tags';

  const auxiliarySearchGroup = document.createElement('div');
  auxiliarySearchGroup.className = 'auxiliary-search-group';
  auxiliarySearchGroup.append(
    ingredientAuxiliary.getDOM(),
    applianceAuxiliary.getDOM(),
    ustensilAuiliary.getDOM(),
  );

  form.append(MainSearch.getDOM(), filterTags, auxiliarySearchGroup);
};

const onLoad = () => {
  getDOM();
};

window.addEventListener('DOMContentLoaded', onLoad);
