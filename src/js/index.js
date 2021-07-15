import MainSearch from './mainSearch.js';
import AuxiliarySearch from './auxiliarySearch.js';
import recipes from './recipes.js';

// Set key/value pair in a map, if key exists, push new value into array associated with key
const setMap = (map, key, value) => {
  if (map.get(key) === undefined) {
    map.set(key, [value]);
  } else {
    const arr = map.get(key);
    arr.push(value);
  }
};

// Set 5 different maps, each with a specific type of key and an array of recipe objects as value
// keys are : title, description, ingredient, appliance, ustensil
const initMaps = () => {
  const titleMap = new Map();
  const descriptionMap = new Map();
  const ingredientMap = new Map();
  const applianceMap = new Map();
  const ustensilMap = new Map();

  recipes.forEach((recipe) => {
    const { name, ingredients, description, appliance, ustensils } = recipe;

    setMap(titleMap, name, recipe);
    setMap(descriptionMap, description, recipe);
    setMap(applianceMap, appliance, recipe);
    ingredients.forEach((ingredient) => setMap(ingredientMap, ingredient.ingredient, recipe));
    ustensils.forEach((ustensil) => setMap(ustensilMap, ustensil, recipe));
  });

  return {
    titleMap,
    descriptionMap,
    applianceMap,
    ingredientMap,
    ustensilMap,
  };
};

const displayPage = (mainSearch, auxiliaries) => {
  // DOM Elements
  const container = document.getElementById('jsForm');
  const auxiliaryContainer = document.createElement('div');
  auxiliaryContainer.id = 'jsAuxiliaryGroup';
  auxiliaryContainer.className = 'auxiliary-search-group';

  auxiliaries.forEach((element) => auxiliaryContainer.appendChild(element.getDOM()));

  container.append(mainSearch.getDOM(), auxiliaryContainer);
};

const onLoad = () => {
  const maps = initMaps();
  const { ingredientMap, applianceMap, ustensilMap } = maps;

  // Objects instances
  const mainSearch = new MainSearch(maps);
  const ingredientAuxiliary = new AuxiliarySearch('ingredients', 'Ingrédients', ingredientMap);
  const applianceAuxiliary = new AuxiliarySearch('appliance', 'Appareil', applianceMap);
  const ustensilAuiliary = new AuxiliarySearch('ustensils', 'Ustensiles', ustensilMap);

  // Objects DOMs
  const auxiliaries = [ingredientAuxiliary, applianceAuxiliary, ustensilAuiliary];

  displayPage(mainSearch, auxiliaries);

  // close open details on click outside
  window.addEventListener('click', (e) => {
    auxiliaries.forEach((auxiliary) => {
      auxiliary.closeOpenDetails(e);
    });
  });
};

window.addEventListener('DOMContentLoaded', onLoad);
