import recipes from './recipes.js';

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

// set maps for searches
// init object instances
// display DOM from header function + objects
const onLoad = () => {
  const maps = initMaps();
  // console.log('onLoad ~ maps', maps);
  // console.log(maps.ustensilMap);
};

window.addEventListener('DOMContentLoaded', onLoad);
