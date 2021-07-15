import MainSearch from './mainSearch.js';
import AuxiliarySearch from './auxiliarySearch.js';
import recipes from './recipes.js';
import Recipe from './recipe.js';

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

const debounce = (func, timeout = 500) => {
  // debounce a search to avoid query stacking
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

const searchRecipesByMainSearch = (mainSearch) => {
  const mainInput = mainSearch.getInput();

  const displayRecipes = debounce(() => {
    if (mainInput.value.length < 3) {
      return;
    }
    //
    const matchingRecipes = mainSearch.searchMatchingRecipes(mainInput.value);

    // for each recipe in
    matchingRecipes.forEach((recipeResult) => {
      const recipe = new Recipe(recipeResult);
      recipe.container.appendChild(recipe.getDOM());
    });

    return matchingRecipes;
  });

  // prevent form submission and page refresh when using enter
  mainInput.addEventListener('keydown', (e) => {
    if (e.code === 13 || e.key === 'Enter') e.preventDefault();
  });
  mainInput.addEventListener('keyup', displayRecipes);
};

const displayPage = (mainSearch, auxiliaries) => {
  // DOM Elements
  const container = document.getElementById('jsForm');
  const auxiliaryContainer = document.createElement('div');
  auxiliaryContainer.id = 'jsAuxiliaryGroup';
  auxiliaryContainer.className = 'auxiliary-search-group';
  const resultsContainer = document.createElement('div');
  resultsContainer.id = 'jsResults';
  resultsContainer.className = 'result-group';

  auxiliaries.forEach((element) => auxiliaryContainer.appendChild(element.getDOM()));

  container.append(mainSearch.getDOM(), auxiliaryContainer, resultsContainer);

  // DOM Events
  closeDetailsOnOutsideClick(auxiliaries);
  const recipeResults = searchRecipesByMainSearch(mainSearch);
};

const closeDetailsOnOutsideClick = (auxiliaries) => {
  window.addEventListener('click', (e) => {
    auxiliaries.forEach((auxiliary) => {
      auxiliary.closeOpenDetails(e);
    });
  });
};

const onLoad = () => {
  const maps = initMaps();
  const { ingredientMap, applianceMap, ustensilMap } = maps;

  // Objects instances
  const mainSearch = new MainSearch(maps);
  const ingredientAuxiliary = new AuxiliarySearch('ingredients', 'Ingrédients', ingredientMap);
  const applianceAuxiliary = new AuxiliarySearch('appliance', 'Appareil', applianceMap);
  const ustensilAuiliary = new AuxiliarySearch('ustensils', 'Ustensiles', ustensilMap);
  const auxiliaries = [ingredientAuxiliary, applianceAuxiliary, ustensilAuiliary];

  displayPage(mainSearch, auxiliaries);
};

window.addEventListener('DOMContentLoaded', onLoad);
