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

  // filter results based on searchTerms
  setResults(recipeList, searchTerms) {
    this.results.clear();

    recipeList.forEach((recipe) => {
      const { name, description, ingredients } = recipe;
      const isInName = name.includes(searchTerms);
      const isInDescription = description.includes(searchTerms);

      if (isInName || isInDescription) {
        this.results.add(recipe);
        return;
      }
      ingredients.forEach((ingredient) => {
        if (ingredient.ingredient.includes(searchTerms)) {
          this.results.add(recipe);
        }
      });
    });
  }

  // search matching results from recipes and add match to results
  // TODO : handle keywords in search and case with no recipe as result
  launchSearch() {
    const data = this.getSearchData();
    this.setResults(this.recipes, data.searchTerms);
    this.displayResults(this.results);
  }

  // fires resultFuncs to redo lists of dropdowns and results
  displayResults(results) {
    this.resultFuncs.forEach((func) => {
      func(results);
    });
  }
}
