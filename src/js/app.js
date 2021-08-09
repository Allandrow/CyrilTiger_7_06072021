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

  window.addEventListener('click', (e) => {
    const details = document.querySelector('details[open]');
    const dropdownButtons = document.querySelectorAll('.dropdown li button');
    const isTargetDropdownButton = Array.from(dropdownButtons).find((btn) => e.target === btn);
    const isTargetKeyword = e.target.closest('.keyword');
    const target = isTargetDropdownButton || isTargetKeyword;

    if (!details || e.target.closest('[open]') === details || isTargetKeyword) {
      if (target) {
        e.preventDefault();
        if (isTargetDropdownButton) details.removeAttribute('open');
        const btnId = e.target.getAttribute('data-id');
        const keyword = {
          id: btnId,
          text: e.target.textContent
        };
        keywords.toggleKeyword(keyword);
      }
      return;
    }
    details.removeAttribute('open');
  });
};

const onLoad = async () => {
  const [index, err] = await getIndex();
  const DOMObjectInstances = initDOMObjects();
  if (!err) {
    displayPage(DOMObjectInstances);
    const search = initSearch(DOMObjectInstances, index);
  }
};

window.addEventListener('DOMContentLoaded', onLoad);

//#region FUNCTIONS TO DO

// const handleMainSearchBarSearch = (mainSearchBar, search) => {
//   const input = document.getElementById('mainSearch');

//   input.addEventListener('input', (e) => {
//     mainSearchBar.setSearchTerms(input.value);
//     search.launchSearch();
//   });
// };

// const onLoad = () => {

//   // Push functions that will get search Terms and keywords for search
//   // TODO : setSearchData change name
//   // TODO : passer par des arrow functions
//   search.setSearchData(() => {
//     mainSearchBar.getSearchTerms();
//   });
//   search.setSearchData(keywords.getKeywords.bind(keywords));

//   // Push functions that will generate lists and results in DOM to search
//   dropdowns.forEach((dropdown) => search.setResultsFunctions(dropdown.onChange.bind(dropdown)));
//   search.setResultsFunctions(results.onChange.bind(results));

//   // Handle click event on keyword from dropdown list to add to keyword selection and search
//   handleKeywordsSelection(keywords, search);
//   handleMainSearchBarSearch(mainSearchBar, search);
// };

//#endregion
