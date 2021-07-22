export default class Search {
  constructor(recipes) {
    this.dataFuncs = [];
    this.resultFuncs = [];
    this.recipes = recipes;
    this.results = new Set();
  }

  getSearchData() {
    let searchTerms = '';
    let searchKeywords;
    this.dataFuncs.forEach((func) => {
      typeof func() === 'string' ? (searchTerms = func()) : (searchKeywords = func());
    });
    return {
      searchTerms,
      searchKeywords,
    };
  }

  // search matching results from recipes and add match to results
  launchSearch() {
    const data = this.getSearchData();
  }

  // fires resultFuncs to redo lists of dropdowns and results
  displayResults(results) {
    this.resultFuncs.forEach((func) => {
      func(results);
    });
  }
}
