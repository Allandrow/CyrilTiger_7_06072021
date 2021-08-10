import recipes from './data/recipes.js';
import { MINQUERYLENGTH, INGREDIENTS, APPLIANCE, USTENSILS } from './config.js';

export default class Search {
  constructor(index) {
    this.index = index;
    this.recipes = recipes;
    this.searchTerms = new Set();
    // this.keywords = new Map();
    this.results = new Set();
    this.resultsCallbacks = [];
  }

  // TODO : start search when size changes
  setSearchTerms(value) {
    this.searchTerms.clear();
    const words = value.toLowerCase().split(' ');
    words.forEach((word) => {
      if (word.length >= MINQUERYLENGTH) this.searchTerms.add(word);
    });
    if (this.searchTerms.size > 0) this.doSearch();
  }

  searchByTerms() {
    let resultIds = [];
    this.searchTerms.forEach((term) => {
      const match = this.index.find((wordIndex) => wordIndex.substring === term);
      resultIds = [...resultIds, match.recipeIds];
    });
    // filter common occurences in arrays
    // TODO : change algorithm
    const results = resultIds.shift().filter((val) => {
      return resultIds.every((arr) => arr.indexOf(val) !== -1);
    });
    results.forEach((id) => {
      const result = this.recipes.find((recipe) => recipe.id === id);
      this.results.add(result);
    });
  }

  //#region KEYWORDS FUNCTIONS

  // setSearchKeywords(keywords) {
  //   this.keywords.clear();
  //   this.keywords = keywords;
  //   this.startSearch();
  // }

  // verifyKeywordInRecipe(recipe, keyword) {
  //   const id = keyword.id;
  //   const label = keyword.text;
  //   switch (id) {
  //     case INGREDIENTS:
  //       return recipe.ingredients.some((text) => text.ingredient === label);
  //     case APPLIANCE:
  //       return recipe.appliance === label;
  //     case USTENSILS:
  //       return recipe.ustensils.some((text) => text === label);
  //   }
  // }

  // verifyKeywordsInRecipe(recipe, keywords) {
  //   return keywords.every((keyword) => this.verifyKeywordInRecipe(recipe, keyword));
  // }

  // setResultsByKeywords() {
  //   const keywordsValues = Array.from(this.keywords.values());
  //   //if results is not empty, filter out results that don't have all keywords
  //   if (this.results.size > 0) {
  //     for (const recipe of this.results) {
  //       const areKeywordsInRecipe = this.verifyKeywordsInRecipe(recipe, keywordsValues);
  //       if (!areKeywordsInRecipe) this.results.delete(recipe);
  //     }
  //     return;
  //   }
  //   // if results is empty, add recipes that have all keywords to results
  //   this.recipes.forEach((recipe) => {
  //     if (this.verifyKeywordsInRecipe(recipe, keywordsValues)) this.results.add(recipe);
  //   });
  // }
  //#endregion

  doSearch() {
    this.results.clear();
    const hasSearchTerms = this.searchTerms.size > 0;
    // const hasKeywords = this.keywords.size > 0;

    // if (hasSearchTerms || hasKeywords) {
    if (hasSearchTerms) {
      this.searchByTerms();
    }
    // if (hasKeywords) {
    //   this.setResultsByKeywords();
    // }
    this.onSearchTrigger(this.results);
    // }
  }

  onResult(callback) {
    this.resultsCallbacks.push(callback);
  }

  onSearchTrigger(results) {
    this.resultsCallbacks.forEach((cb) => {
      cb(results);
    });
  }
}
