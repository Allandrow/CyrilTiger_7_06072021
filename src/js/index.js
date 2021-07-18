import AuxiliarySearch from './auxiliarySearch.js';
import MainSearch from './mainSearch.js';
import SearchResults from './searchResults.js';
import recipes from './recipes.js';
import * as search from './tmpSearch.js';

const createAuxiliaryGroup = (auxiliaries) => {
  const container = document.createElement('div');
  container.id = 'jsAuxiliaryGroup';
  container.className = 'auxiliary-search-group';
  auxiliaries.forEach((auxiliary) => container.appendChild(auxiliary.getDOM()));
  return container;
};

const displayDOM = (mainSearch, auxiliaryContainer, searchResults) => {
  const container = document.getElementById('jsForm');
  const mainSearchDOM = mainSearch.getDOM();
  const searchResultsDOM = searchResults.getDOM();
  container.append(mainSearchDOM, auxiliaryContainer, searchResultsDOM);
};

const onLoad = () => {
  // Objects instances
  const mainSearch = new MainSearch();
  const ingredientAuxiliary = new AuxiliarySearch('ingredients', recipes);
  const applianceAuxiliary = new AuxiliarySearch('appliance', recipes);
  const ustensilAuiliary = new AuxiliarySearch('ustensils', recipes);
  const searchResults = new SearchResults(recipes);
  // DOM generation
  const auxiliaries = [ingredientAuxiliary, applianceAuxiliary, ustensilAuiliary];
  const auxiliaryContainer = createAuxiliaryGroup(auxiliaries);

  displayDOM(mainSearch, auxiliaryContainer, searchResults);
  search.searchRecipesByMainInput(recipes);
};

window.addEventListener('DOMContentLoaded', onLoad);
