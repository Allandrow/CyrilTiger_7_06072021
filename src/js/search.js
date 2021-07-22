import recipes from './recipes.js';

export default class Search {
  constructor() {
    this.searchTerms = '';
    this.keywords = new Map();
    this.funcs = [];
    this.recipes = recipes;
    this.results = new Set();
  }

  // search matching results from recipes and add match to results
  launchSearch() {
    console.log(`this search terms : ${this.searchTerms}`);
    console.log(`this keywords : ${this.keywords}`);
  }

  // fires funcs to redo lists of dropdowns and results
  displayResults(results) {
    this.funcs.forEach((func) => {
      func(results);
    });
  }
}
