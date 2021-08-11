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

// TODO : put events in their instances and attach callbacks to fire when triggered
const onSearchDataChange = (DOMComponents, search) => {
  const { mainSearchBar, keywords, dropdowns } = DOMComponents;
  mainSearchBar.onInputValueChange((value) => search.setSearchTerms(value));

  // on dropdown tag selection, fire event from keywords to create/delete a keyword
  dropdowns.onTagSelection((keyword) => keywords.tagSelectionTrigger(keyword));

  //#region KEYWORD STUFF
  // keywords.onKeywordChange((keywords) => search.setSearchKeywords(keywords));
  // dropdowns.onTagSelection((tag) => keywords.toggleKeyword(tag));
  // window.addEventListener('click', (e) => {
  //   const isTargetInDropdown = e.target.closest('.dropdown button');
  //   const isTargetKeyword = e.target.closest('.keyword');
  //   const target = isTargetInDropdown || isTargetKeyword;
  //   if (target) {
  //     e.preventDefault();
  //     if (isTargetInDropdown) target.closest('details').removeAttribute('open');
  //     const btnId = e.target.getAttribute('data-id');
  //
  //     keywords.toggleKeyword(keyword);
  //   }
  // });
  //#endregion
};

const onLoad = async () => {
  const [index, err] = await getIndex();
  const DOMObjectInstances = initDOMComponents();

  if (!err) {
    displayPage(DOMObjectInstances);
    const search = initSearch(DOMObjectInstances, index);
    onSearchDataChange(DOMObjectInstances, search);
  }
};

window.addEventListener('DOMContentLoaded', onLoad);
