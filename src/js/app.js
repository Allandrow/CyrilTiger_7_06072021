import MainSearchBar from './mainSearchBar.js';
import Dropdowns from './dropdowns.js';
import Keywords from './keywords.js';
import Results from './results.js';
import Search from './search.js';

const initDOMComponents = () => {
  return {
    mainSearchBar: new MainSearchBar(),
    keywords: new Keywords(),
    dropdowns: new Dropdowns(),
    results: new Results()
  };
};

const displayPage = (DOMComponents) => {
  const container = document.getElementById('jsForm');
  const { dropdowns, results } = DOMComponents;
  const fragment = new DocumentFragment();
  for (const component in DOMComponents) {
    fragment.appendChild(DOMComponents[component].getDOM());
  }
  dropdowns.updateDropdownsLists();
  results.displayResults();
  container.appendChild(fragment);
};

const initSearch = (DOMComponents) => {
  const { dropdowns, results } = DOMComponents;
  const search = new Search();
  search.onResult((recipes) => dropdowns.updateDropdownsLists(recipes));
  search.onResult((recipes) => results.displayResults(recipes));
  return search;
};

const onSearchDataChange = (DOMComponents, search) => {
  const { mainSearchBar, keywords, dropdowns } = DOMComponents;
  mainSearchBar.onInputValueChange((value) => search.updateSearchTerms(value));
  dropdowns.onTagSelection((keyword) => keywords.tagSelectionTrigger(keyword));
  keywords.onListChange((list) => search.updateSearchKeywords(list));
};

const onLoad = () => {
  const DOMComponents = initDOMComponents();
  displayPage(DOMComponents);
  const search = initSearch(DOMComponents);
  onSearchDataChange(DOMComponents, search);
};

window.addEventListener('DOMContentLoaded', onLoad);
