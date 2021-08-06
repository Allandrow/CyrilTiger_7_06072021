/*
  onLoad
    fetch index
    init objects
    setup callbacks launched on change from search/keywords selections
    
    display DOM elements
    handle events and sens callbacks to objects
    
    */

// fetch index of substrings
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
  // initialize objects
  // mainSearchBar
  // dropdowns
  // keywords
  // results
  // return objects instances
};

const initSearch = (json) => {
  // initialize search
  // return object instance
};

const displayPage = () => {
  // call getDOM() of objects
};

// fetch index
// display DOM
// init search
// handle events
const onLoad = async () => {
  const [index, err] = await getIndex();
};

window.addEventListener('DOMContentLoaded', onLoad);

// const displayPage = (mainSearchBar, keywords, dropdowns, results) => {
//   const container = document.getElementById('jsForm');

//   const mainSearchDOM = mainSearchBar.getDOM();
//   const keywordsDOM = keywords.getDOM();

//   const dropdownsContainer = document.createElement('div');
//   dropdownsContainer.className = 'dropdowns-container';
//   dropdowns.forEach((dropdown) => dropdownsContainer.appendChild(dropdown.getDOM()));

//   const resultsDOM = results.getDOM();

//   container.append(mainSearchDOM, keywordsDOM, dropdownsContainer, resultsDOM);
// };

// const handleKeywordsSelection = (keywords, search) => {
//   window.addEventListener('click', (e) => {
//     const isTargetInDropdown = e.target.closest('.dropdown button');
//     const isTargetKeyword = e.target.closest('.keyword');
//     const target = isTargetInDropdown || isTargetKeyword;
//     if (target) {
//       e.preventDefault();
//       if (isTargetInDropdown) target.closest('details').removeAttribute('open');

//       const targetId = target.getAttribute('data-id');
//       // TODO : change name to toggle
//       keywords.onChange(targetId, target.textContent);
//       search.launchSearch();
//     }
//   });
// };

// const handleMainSearchBarSearch = (mainSearchBar, search) => {
//   const input = document.getElementById('mainSearch');

//   input.addEventListener('input', (e) => {
//     mainSearchBar.setSearchTerms(input.value);
//     search.launchSearch();
//   });
// };

// const onLoad = () => {
//   // init objects
//   const mainSearchBar = new MainSearchBar();
//   const ingredientsDropdown = new Dropdown(INGREDIENTS);
//   const applianceDropdown = new Dropdown(APPLIANCE);
//   const ustensilsDropdown = new Dropdown(USTENSILS);
//   const dropdowns = [ingredientsDropdown, applianceDropdown, ustensilsDropdown];
//   const keywords = new Keywords();
//   const search = new Search(recipes);
//   const results = new Results();

//   // Display DOM with empty list and results
//   displayPage(mainSearchBar, keywords, dropdowns, results);

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

//   // Fill lists and results on load based off all recipes
//   search.displayResults();

//   // Handle click event on keyword from dropdown list to add to keyword selection and search
//   handleKeywordsSelection(keywords, search);
//   handleMainSearchBarSearch(mainSearchBar, search);
// };
