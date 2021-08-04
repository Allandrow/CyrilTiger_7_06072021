import Dropdown from './dropdown.js';
import Keywords from './keywords.js';
import MainSearchBar from './mainSearchBar.js';
import Results from './results.js';
import Search from './search.js';
import recipes from './recipes.js';
import { INGREDIENTS, APPLIANCE, USTENSILS } from './config.js';

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

const handleKeywordsSelection = (keywords, search) => {
  window.addEventListener('click', (e) => {
    const isTargetInDropdown = e.target.closest('.dropdown button');
    const isTargetKeyword = e.target.closest('.keyword');
    const target = isTargetInDropdown || isTargetKeyword;
    if (target) {
      e.preventDefault();
      if (isTargetInDropdown) target.closest('details').removeAttribute('open');

      const targetId = target.getAttribute('data-id');
      keywords.onChange(targetId, target.textContent);
      search.launchSearch();
    }
  });
};

const handleMainSearchBarSearch = (mainSearchBar, search) => {
  const input = document.getElementById('mainSearch');

  input.addEventListener('input', (e) => {
    mainSearchBar.setSearchTerms(input.value);
    search.launchSearch();
  });
};

const onLoad = () => {
  // init objects
  const mainSearchBar = new MainSearchBar();
  const ingredientsDropdown = new Dropdown(INGREDIENTS);
  const applianceDropdown = new Dropdown(APPLIANCE);
  const ustensilsDropdown = new Dropdown(USTENSILS);
  const results = new Results();
  const keywords = new Keywords();
  const search = new Search(recipes);
  const dropdowns = [ingredientsDropdown, applianceDropdown, ustensilsDropdown];

  // Display DOM with empty list and results
  displayPage(mainSearchBar, keywords, dropdowns, results);

  // Push functions that will get search Terms and keywords for search
  search.setSearchData(mainSearchBar.getSearchTerms.bind(mainSearchBar));
  search.setSearchData(keywords.getKeywords.bind(keywords));

  // Push functions that will generate lists and results in DOM to search
  dropdowns.forEach((dropdown) => search.setResultsFunctions(dropdown.onChange.bind(dropdown)));
  search.setResultsFunctions(results.onChange.bind(results));

  // Fill lists and results on load based off all recipes
  search.displayResults();

  // Handle click event on keyword from dropdown list to add to keyword selection and search
  handleKeywordsSelection(keywords, search);
  handleMainSearchBarSearch(mainSearchBar, search);
};

window.addEventListener('DOMContentLoaded', onLoad);
