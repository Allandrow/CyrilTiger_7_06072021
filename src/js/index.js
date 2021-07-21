/* 
  on load :
    - create instance of mainSearchBar
    - create instance of keywords
    - create 3 instances of dropdown
    - create instance of results
    - create instance of search

    - display page
    - fill dropdown lists and results list based on recipes

    - push onChanges callbacks to search
    
    - mainSearchBar input value modification event :        
      - input.js
        - mainSearchBar.setSearchTerms()
        - mainSearchBar.getSearchTerms()
        - keywords.getKeywords()
        - search.launchSearch(searchTerms, keywords)
        - search.getResults()

    - dropdown input value modification event :
      - dropdown.js
        - filterKeywords()

    - dropdown keyword selection event :
      - index.js
        - keywords.onChange(add, selectedKeyword)
        - mainSearchBar.getSearchTerms()
        - keywords.getKeywords()
        - search.launchSearch(searchTerms, keywords)
        - search.getResults()

    - keyword deletion event :
      - index.js
        - onChange(remove, clickedKeyword)
        - mainSearchBar.getSearchTerms()
        - keywords.getKeywords()
        - search.launchSearch(searchTerms, keywords)
        - search.getResults()
*/

import Dropdown from './dropdown.js';
import Keywords from './keywords.js';
import MainSearchBar from './mainSearchBar.js';
import Results from './results.js';
import Search from './search.js';
import recipes from './recipes.js';

const displayPage = (mainSearch, keywords, ingredientsDD, applianceDD, ustensilsDD, results) => {
  const container = document.getElementById('jsForm');
  const dropdownsContainer = document.createElement('div');
  dropdownsContainer.className = 'dropdowns-container';

  const mainSearchDOM = mainSearch.getDOM();
  const keywordsDOM = keywords.getDOM();

  const ingredientsListDOM = ingredientsDD.getDOM();
  const applianceListDOM = applianceDD.getDOM();
  const ustensilsListDOM = ustensilsDD.getDOM();

  dropdownsContainer.append(ingredientsListDOM, applianceListDOM, ustensilsListDOM);
  const resultsDOM = results.getDOM();

  container.append(mainSearchDOM, keywordsDOM, dropdownsContainer, resultsDOM);
};

const onLoad = () => {
  // init objects
  const mainSearchBar = new MainSearchBar();
  const ingredientsDropdown = new Dropdown('ingredients');
  const applianceDropdown = new Dropdown('appliance');
  const ustensilsDropdown = new Dropdown('ustensils');
  const recipeResults = new Results();
  const keywords = new Keywords();
  const search = new Search();

  // Display DOM with empty list and results
  displayPage(
    mainSearchBar,
    keywords,
    ingredientsDropdown,
    applianceDropdown,
    ustensilsDropdown,
    recipeResults,
  );

  // Push functions that will generate lists and results in DOM to search
  search.funcs = [
    ingredientsDropdown.onChange.bind(ingredientsDropdown),
    applianceDropdown.onChange.bind(applianceDropdown),
    ustensilsDropdown.onChange.bind(ustensilsDropdown),
    recipeResults.onChange.bind(recipeResults),
  ];

  // Fill lists and results on load based off all recipes
  search.displayResults(recipes);
};

window.addEventListener('DOMContentLoaded', onLoad);

// import AuxiliarySearch from './auxiliarySearch.js';
// import MainSearch from './mainSearch.js';
// import SearchResults from './searchResults.js';
// import recipes from './recipes.js';
// import * as search from './tmpSearch.js';

// const createAuxiliaryGroup = (auxiliaries) => {
//   const container = document.createElement('div');
//   container.id = 'jsAuxiliaryGroup';
//   container.className = 'auxiliary-search-group';
//   auxiliaries.forEach((auxiliary) => container.appendChild(auxiliary.getDOM()));
//   return container;
// };

// const displayDOM = (mainSearch, auxiliaryContainer, searchResults) => {
//   const container = document.getElementById('jsForm');
//   const mainSearchDOM = mainSearch.getDOM();
//   const searchResultsDOM = searchResults.getDOM();
//   container.append(mainSearchDOM, auxiliaryContainer, searchResultsDOM);
// };

// const onLoad = () => {
//   // Objects instances
//   const mainSearch = new MainSearch();
//   const ingredientAuxiliary = new AuxiliarySearch('ingredients', recipes);
//   const applianceAuxiliary = new AuxiliarySearch('appliance', recipes);
//   const ustensilAuiliary = new AuxiliarySearch('ustensils', recipes);
//   const searchResults = new SearchResults(recipes);
//   // DOM generation
//   const auxiliaries = [ingredientAuxiliary, applianceAuxiliary, ustensilAuiliary];
//   const auxiliaryContainer = createAuxiliaryGroup(auxiliaries);

//   displayDOM(mainSearch, auxiliaryContainer, searchResults);
//   search.searchRecipesByMainInput(recipes);
// };
