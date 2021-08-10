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
  search.setResultsCallbacks((recipes) => dropdowns.updateDropdownsLists(recipes));
  search.setResultsCallbacks((recipes) => results.displayResults(recipes));
  return search;
};

const displayPage = (DOMComponents) => {
  const container = document.getElementById('jsForm');
  const fragment = new DocumentFragment();
  const { dropdowns, results } = DOMComponents;
  for (const component of Object.values(DOMComponents)) {
    fragment.appendChild(component.getDOM());
  }
  dropdowns.updateDropdownsLists();
  results.displayResults();
  container.appendChild(fragment);
};

// TODO : put events in their instances and attach callbacks to fire when triggered
const handleSearchDataChange = (DOMComponents, search) => {
  const mainSearchInput = document.getElementById('mainSearch');
  const { keywords } = DOMComponents;

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
  const DOMObjectInstances = initDOMComponents();

  if (!err) {
    displayPage(DOMObjectInstances);
    const search = initSearch(DOMObjectInstances, index);
    handleSearchDataChange(DOMObjectInstances, search);
  }
};

window.addEventListener('DOMContentLoaded', onLoad);
