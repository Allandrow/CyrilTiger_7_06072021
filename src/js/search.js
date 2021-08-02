import { INGREDIENTS, APPLIANCE, USTENSILS, EMPTYSIZE } from './config.js';

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
      if (func() instanceof Set) {
        searchTerms = func();
      }
      if (func() instanceof Map) {
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

  isTermInRecipe(recipe, term) {
    const { name, description, ingredients } = recipe;
    const nameLower = name.toLowerCase();
    const descriptionLower = description.toLowerCase();
    let recipeTexts = [nameLower, descriptionLower];

    ingredients.forEach((ingredient) => {
      const ingredientLower = ingredient.ingredient.toLowerCase();
      recipeTexts = [...recipeTexts, ingredientLower];
    });
    return recipeTexts.some((text) => text.includes(term));
  }

  // filter results based on searchTerms
  setResultsByTextSearch(recipes, searchTerms) {
    const terms = Array.from(searchTerms);
    let results = new Set();
    recipes.forEach((recipe) => {
      const hasAllTermsInRecipe = terms.every((term) => this.isTermInRecipe(recipe, term));
      if (hasAllTermsInRecipe) results.add(recipe);
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
    const hasSearchTerms = data.searchTerms.size > EMPTYSIZE;
    const hasKeywords = data.searchKeywords.size > EMPTYSIZE;

    if (hasKeywords) {
      this.setResultsByKeywords(this.recipes, data.searchKeywords);
    }
    if (hasSearchTerms) {
      const results = this.getResultsOrRecipes();
      this.setResultsByTextSearch(results, data.searchTerms);
    }

    if (hasKeywords || hasSearchTerms) {
      this.displayResults(this.results);
    } else {
      this.displayResults();
    }
  }

  setResultsFunctions(callback) {
    this.resultFuncs.push(callback);
  }

  // fires resultFuncs to redo lists of dropdowns and results
  displayResults(results = this.recipes) {
    this.resultFuncs.forEach((func) => {
      func(results);
    });
  }
}
