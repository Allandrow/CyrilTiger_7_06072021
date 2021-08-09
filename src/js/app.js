import MainSearchBar from './mainSearchBar.js';
import Dropdowns from './dropdowns.js';
import Keywords from './keywords.js';
import Results from './results.js';
import Search from './search.js';

const getIndex = async () => {
  try {
    const index = await fetch('src/js/data/index.json');
    const indexJSON = await index.json();
    return [indexJSON, null];
  } catch (err) {
    return [null, err];
  }
};

const initDOMObjects = () => {
  const mainSearchBar = new MainSearchBar();
  const keywords = new Keywords();
  const dropdowns = new Dropdowns();
  const results = new Results();
  return [mainSearchBar, keywords, dropdowns, results];
};

const initSearch = (DOMInstances, index) => {
  const [, , dropdowns, results] = DOMInstances;
  const search = new Search(index);
  search.setResultsCallbacks(dropdowns.updateDropdownsLists.bind(dropdowns));
  search.setResultsCallbacks(results.displayResults.bind(results));
  return search;
};

const displayPage = (DOMObjects) => {
  const container = document.getElementById('jsForm');
  const fragment = new DocumentFragment();
  const [, keywords, dropdowns, results] = DOMObjects;

  DOMObjects.forEach((object) => fragment.appendChild(object.getDOM()));
  dropdowns.updateDropdownsLists();
  results.displayResults();
  container.appendChild(fragment);
};

const handleSearchDataChange = (DOMInstances, search) => {
  const mainSearchInput = document.getElementById('mainSearch');
  const [, keywords, ,] = DOMInstances;

  mainSearchInput.addEventListener('input', (e) => {
    search.setSearchTerms(mainSearchInput.value);
  });

  window.addEventListener('click', (e) => {
    const isTargetInDropdown = e.target.closest('.dropdown button');
    const isTargetKeyword = e.target.closest('.keyword');
    const target = isTargetInDropdown || isTargetKeyword;
    if (target) {
      e.preventDefault();
      if (isTargetInDropdown) target.closest('details').removeAttribute('open');
      const btnId = e.target.getAttribute('data-id');
      const keyword = {
        id: btnId,
        text: e.target.textContent
      };
      keywords.toggleKeyword(keyword);
    }
  });
};

const onLoad = async () => {
  const [index, err] = await getIndex();
  const DOMObjectInstances = initDOMObjects();

  if (!err) {
    displayPage(DOMObjectInstances);
    const search = initSearch(DOMObjectInstances, index);
    handleSearchDataChange(DOMObjectInstances, search);
  }
};

window.addEventListener('DOMContentLoaded', onLoad);
