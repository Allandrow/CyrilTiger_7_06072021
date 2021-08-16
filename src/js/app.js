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

const initDOMComponents = () => {
  return {
    mainSearchBar: new MainSearchBar(),
    keywords: new Keywords(),
    dropdowns: new Dropdowns(),
    results: new Results()
  };
};

const initSearch = (DOMInstances, index) => {
  const { dropdowns, results } = DOMInstances;
  const search = new Search(index);
  search.onResult((recipes) => dropdowns.updateDropdownsLists(recipes));
  search.onResult((recipes) => results.displayResults(recipes));
  return search;
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

const onSearchDataChange = (DOMComponents, search) => {
  const { mainSearchBar, keywords, dropdowns } = DOMComponents;
  mainSearchBar.onInputValueChange((value) => search.updateSearchTerms(value));
  dropdowns.onTagSelection((keyword) => keywords.tagSelectionTrigger(keyword));
  keywords.onListChange((list) => search.updateSearchKeywords(list));
};

const onLoad = async () => {
  const [index, err] = await getIndex();
  const DOMComponents = initDOMComponents();

  if (!err) {
    displayPage(DOMComponents);
    const search = initSearch(DOMComponents, index);
    onSearchDataChange(DOMComponents, search);
  }
};

window.addEventListener('DOMContentLoaded', onLoad);
