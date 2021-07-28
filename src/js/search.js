export default class Search {
  constructor(recipes) {
    this.dataFuncs = [];
    this.resultFuncs = [];
    this.recipes = recipes;
    this.results = new Set();
  }

  setSearchData(callback) {
    this.dataFuncs.push(callback);
  }

  getSearchData() {
    let searchTerms = '';
    let searchKeywords;
    this.dataFuncs.forEach((func) => {
      typeof func() === 'string' ? (searchTerms = func()) : (searchKeywords = func());
    });
    return {
      searchTerms,
      searchKeywords
    };
  }

  // filter results based on searchTerms
  setResults(recipeList, searchTerms) {
    let results = new Set();
    recipeList.forEach((recipe) => {
      const { name, description, ingredients } = recipe;
      const isInName = name.includes(searchTerms);
      const isInDescription = description.includes(searchTerms);

      if (isInName || isInDescription) {
        results.add(recipe);
        return;
      }
      ingredients.forEach((ingredient) => {
        if (ingredient.ingredient.includes(searchTerms)) {
          results.add(recipe);
        }
      });
    });
    this.results = results;
  }

  verifyKeywordInRecipe(recipe, keyword) {
    const id = keyword.id;
    const label = keyword.label;
    switch (id) {
      case 'ingredients':
        return recipe.ingredients.some((text) => text.ingredient === label);
      case 'appliance':
        return recipe.appliance === label;
      case 'ustensils':
        return recipe.ustensils.some((text) => text === label);
    }
  }

  verifyKeywordsInRecipe(recipe, keywords) {
    return keywords.every((keyword) => this.verifyKeywordInRecipe(recipe, keyword));
  }

  filterResultsByKeywords(recipes, keywords) {
    // filter recipes to check if recipe contains every keyword
    const keywordsValues = Array.from(keywords.values());
    return recipes.filter((recipe) => this.verifyKeywordsInRecipe(recipe, keywordsValues));
  }

  // search matching results from recipes and add match to results
  launchSearch() {
    const data = this.getSearchData();
    const hasSearchTerms = data.searchTerms.length >= 3;
    const hasKeywords = data.searchKeywords.size > 0;

    if (!hasSearchTerms && !hasKeywords) {
      this.displayResults(this.recipes);
      return;
    }
    if (hasKeywords) {
      const results = this.filterResultsByKeywords(this.recipes, data.searchKeywords);
      hasSearchTerms ? this.setResults(results, data.searchTerms) : (this.results = results);
      this.displayResults(this.results);
      return;
    }
    this.setResults(this.recipes, data.searchTerms);
    this.displayResults(this.results);
  }

  setResultsFunctions(callback) {
    this.resultFuncs.push(callback);
  }

  // fires resultFuncs to redo lists of dropdowns and results
  displayResults(results) {
    this.resultFuncs.forEach((func) => {
      func(results);
    });
  }
}
