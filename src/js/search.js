import recipes from './recipes.js';

export default class Search {
  constructor() {
    this.funcs = [];
    this.recipes = recipes;
    this.results = new Set();
  }

  // search matching results from recipes and add match to results
  launchSearch(searchTerms, keywords) {}

  // fires funcs to redo lists of dropdowns and results
  displayResults(results) {
    this.funcs.forEach((func) => {
      func(results);
    });
  }
}
