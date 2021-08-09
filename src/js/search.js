import recipes from './data/recipes.js';
import { MINQUERYLENGTH, INGREDIENTS, APPLIANCE, USTENSILS } from './config.js';

export default class Search {
  constructor(index) {
    this.index = index;
    this.searchTerms = new Set();
    this.keywords = new Map();
    this.recipes = recipes;
    this.results = new Set();
    this.resultsCallbacks = [];
  }

  setSearchKeywords(keywords) {
    this.keywords.clear();
    this.keywords = keywords;
    this.startSearch();
  }

  setSearchTerms(value) {
    this.searchTerms.clear();
    const words = value.toLowerCase().split(' ');
    words.forEach((word) => {
      if (word.length >= MINQUERYLENGTH) this.searchTerms.add(word);
    });
    if (this.searchTerms.size > 0) this.startSearch();
  }

  setResultsByTextSearch() {
    let resultIds = [];
    this.searchTerms.forEach((term) => {
      const match = this.index.find((wordIndex) => wordIndex.substring === term);
      resultIds = [...resultIds, match.recipeIds];
    });
    // filter common occurences in arrays
    const results = resultIds.shift().filter((val) => {
      return resultIds.every((arr) => arr.indexOf(val) !== -1);
    });
    results.forEach((id) => {
      const result = this.recipes.find((recipe) => recipe.id === id);
      this.results.add(result);
    });
  }

  verifyKeywordInRecipe(recipe, keyword) {
    const id = keyword.id;
    const label = keyword.text;
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

  setResultsByKeywords() {
    const keywordsValues = Array.from(this.keywords.values());
    //if results is not empty, filter out results that don't have all keywords
    if (this.results.size > 0) {
      for (const recipe of this.results) {
        const areKeywordsInRecipe = this.verifyKeywordsInRecipe(recipe, keywordsValues);
        if (!areKeywordsInRecipe) this.results.delete(recipe);
      }
      return;
    }
    // if results is empty, add recipes that have all keywords to results
    this.recipes.forEach((recipe) => {
      if (this.verifyKeywordsInRecipe(recipe, keywordsValues)) this.results.add(recipe);
    });
  }

  startSearch() {
    this.results.clear();
    const hasSearchTerms = this.searchTerms.size > 0;
    const hasKeywords = this.keywords.size > 0;
    console.log(this.searchTerms);
    console.log(this.keywords);

    if (hasSearchTerms || hasKeywords) {
      if (hasSearchTerms) {
        this.setResultsByTextSearch();
      }
      if (hasKeywords) {
        this.setResultsByKeywords();
      }
      this.onSearchResults(this.results);
    }
  }

  setResultsCallbacks(callback) {
    this.resultsCallbacks.push(callback);
  }

  onSearchResults(results) {
    this.resultsCallbacks.forEach((cb) => {
      cb(results);
    });
  }
}
