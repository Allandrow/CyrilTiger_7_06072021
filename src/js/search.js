import { INGREDIENTS, APPLIANCE, USTENSILS, MINQUERYLENGTH, EMPTYSIZE } from './config.js';

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
    let searchTerms;
    let searchKeywords;
    this.dataFuncs.forEach((func) => {
      if (typeof func() === 'string') {
        searchTerms = func();
      } else {
        searchKeywords = func();
      }
    });
    return {
      searchTerms,
      searchKeywords
    };
  }

  verifyKeywordInRecipe(recipe, keyword) {
    const id = keyword.id;
    const label = keyword.label;
    switch (id) {
      case INGREDIENTS:
        return recipe.ingredients.some((text) => text.ingredient === label);
      case APPLIANCE:
        return recipe.appliance === label;
      case USTENSILS:
        return recipe.ustensils.some((text) => text === label);
    }
  }

  verifyKeywordsInRecipe(recipe, keywords) {
    return keywords.every((keyword) => this.verifyKeywordInRecipe(recipe, keyword));
  }

  setResultsByKeywords(recipes, keywords) {
    // filter recipes to check if recipe contains every keyword
    const keywordsValues = Array.from(keywords.values());
    this.results = recipes.filter((recipe) => this.verifyKeywordsInRecipe(recipe, keywordsValues));
  }

  // filter results based on searchTerms
  setResultsByTextSearch(recipeList, searchTerms) {
    let results = new Set();
    const searchTermsLower = searchTerms.toLowerCase();
    recipeList.forEach((recipe) => {
      const { name, description, ingredients } = recipe;
      const nameLower = name.toLowerCase();
      const descriptionLower = description.toLowerCase();
      const isInName = nameLower.includes(searchTermsLower);
      const isInDescription = descriptionLower.includes(searchTermsLower);

      if (isInName || isInDescription) {
        results.add(recipe);
        return;
      }
      ingredients.forEach((ingredient) => {
        const ingredientLower = ingredient.ingredient.toLowerCase();
        if (ingredientLower.includes(searchTermsLower)) {
          results.add(recipe);
        }
      });
    });
    this.results = results;
  }

  getResultsOrRecipes() {
    const isResultsEmpty = this.results.size === EMPTYSIZE;
    return isResultsEmpty ? this.recipes : this.results;
  }

  // search matching results from recipes and add match to results
  launchSearch() {
    this.results = new Set();
    const data = this.getSearchData();
    const hasSearchTerms = data.searchTerms.length >= MINQUERYLENGTH;
    const hasKeywords = data.searchKeywords.size > EMPTYSIZE;

    if (hasKeywords) {
      this.setResultsByKeywords(this.recipes, data.searchKeywords);
    }
    if (hasSearchTerms) {
      const results = this.getResultsOrRecipes();
      this.setResultsByTextSearch(results, data.searchTerms);
    }
    this.displayResults();
  }

  setResultsFunctions(callback) {
    this.resultFuncs.push(callback);
  }

  // fires resultFuncs to redo lists of dropdowns and results
  displayResults() {
    const results = this.getResultsOrRecipes();
    this.resultFuncs.forEach((func) => {
      func(results);
    });
  }
}
