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
    console.log(this.results);
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
    if (data.searchKeywords.size > 0) {
      const results = this.filterResultsByKeywords(this.recipes, data.searchKeywords);

      data.searchTerms.length > 0
        ? this.setResults(results, data.searchTerms)
        : (this.results = results);
    } else {
      this.setResults(this.recipes, data.searchTerms);
    }
    this.displayResults(this.results);
  }

  // fires resultFuncs to redo lists of dropdowns and results
  displayResults(results) {
    this.resultFuncs.forEach((func) => {
      func(results);
    });
  }
}
