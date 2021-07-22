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
        - keywords.onChange(remove, clickedKeyword)
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

const displayPage = (mainSearch, keywords, dropdowns, results) => {
  const container = document.getElementById('jsForm');

  const mainSearchDOM = mainSearch.getDOM();
  const keywordsDOM = keywords.getDOM();

  const dropdownsContainer = document.createElement('div');
  dropdownsContainer.className = 'dropdowns-container';
  dropdowns.forEach((dropdown) => dropdownsContainer.appendChild(dropdown.getDOM()));

  const resultsDOM = results.getDOM();

  container.append(mainSearchDOM, keywordsDOM, dropdownsContainer, resultsDOM);
};

const handleDropdownKeywordSelection = (keywords, search) => {
  const buttons = document.querySelectorAll('.dropdown button');

  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parentList = e.target.closest('ul');
      const parentId = parentList.id;
      const keywordId = parentId.substring(0, parentId.length - 4);
      keywords.onChange(keywordId, btn.textContent);
      e.target.closest('details').removeAttribute('open');
    });
  });
};

// remove element from dom and keyword list then search with updated list
const handleKeywordDeletion = (keywords, search) => {
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('keyword')) {
      e.preventDefault();
      const keywordSelection = keywords.selectedKeywords;
      const btn = e.target;
      const btnId = e.target.getAttribute('data-id');
      const btnText = e.target.textContent;
      const hashKeyword = keywordSelection.get(`${btnId}-${btnText}`);
      keywordSelection.delete(hashKeyword);
      btn.remove();

      search.keywords = keywordSelection;
      search.launchSearch();
    }
  });
};

const handleMainSearchBarSearch = (search) => {
  const input = document.getElementById('mainSearch');

  input.addEventListener('input', (e) => {
    if (input.value.length < 3) return;
    search.searchTerms = input.value;
    search.launchSearch();
  });
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
  const dropdowns = [ingredientsDropdown, applianceDropdown, ustensilsDropdown];

  // Display DOM with empty list and results
  displayPage(mainSearchBar, keywords, dropdowns, recipeResults);

  // Push functions that will generate lists and results in DOM to search
  dropdowns.forEach((dropdown) => search.funcs.push(dropdown.onChange.bind(dropdown)));
  search.funcs.push(recipeResults.onChange.bind(recipeResults));

  // Fill lists and results on load based off all recipes
  search.displayResults(recipes);

  // Handle click event on keyword from dropdown list to add to keyword selection and search

  handleDropdownKeywordSelection(keywords, search);
  handleKeywordDeletion(keywords, search);
  handleMainSearchBarSearch(search);
};

window.addEventListener('DOMContentLoaded', onLoad);
