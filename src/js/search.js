import { INGREDIENTS, USTENSILS, APPLIANCE, MINQUERYLENGTH, EMPTYSIZE } from './config.js';

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

  filterResultsByKeywords(recipes, keywords) {
    // filter recipes to check if recipe contains every keyword
    const keywordsValues = Array.from(keywords.values());
    return recipes.filter((recipe) => this.verifyKeywordsInRecipe(recipe, keywordsValues));
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

  // search matching results from recipes and add match to results
  launchSearch() {
    const data = this.getSearchData();
    const hasSearchTerms = data.searchTerms.length >= MINQUERYLENGTH;
    const hasKeywords = data.searchKeywords.size > EMPTYSIZE;

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
  displayResults(results = this.recipes) {
    this.resultFuncs.forEach((func) => {
      func(results);
    });
  }
}
