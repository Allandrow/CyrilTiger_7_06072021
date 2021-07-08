import AuxiliarySearch from './auxiliarySearch.js';
import MainSearch from './mainSearch.js';
import Recipe from './recipe.js';
import recipes from './recipes.js';

// TEMP method to include recipe list in DOM
const getRecipes = () => {
  const displayedRecipes = [];

  const container = document.createElement('div');
  container.id = 'jsResults';
  container.className = 'result-group';

  recipes.forEach((item) => {
    const recipe = new Recipe(item);
    container.appendChild(recipe.getDOM());
  });

  return container;
};

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

  // TEMP display of results
  form.appendChild(getRecipes());
};

const onLoad = () => {
  getDOM();
};

window.addEventListener('DOMContentLoaded', onLoad);
