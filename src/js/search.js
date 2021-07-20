import recipes from './recipes.js';

export default class Search {
  constructor() {
    this.callBacks = [];
    this.recipes = recipes;
    this.results = new Set();
  }

  // search matching results from recipes and add match to results
  launchSearch(searchTerms, keywords) {}

  // fires callbacks to redo lists of dropdowns and results
  getResults() {}
}
