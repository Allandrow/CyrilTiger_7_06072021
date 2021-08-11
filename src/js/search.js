import recipes from './data/recipes.js';
import { MINQUERYLENGTH, INGREDIENTS, APPLIANCE, USTENSILS } from './config.js';

export default class Search {
  constructor(index) {
    this.index = index;
    this.recipes = recipes;
    this.searchTerms = new Set();
    this.keywords = new Map();
    this.results = new Set();
    this.resultsCallbacks = [];
    this.recipeMap = this.createRecipeMap();
  }

  createRecipeMap() {
    const map = new Map();
    this.recipes.forEach((recipe) => {
      map.set(recipe.id, recipe);
    });
    return map;
  }

  setSearchTerms(value) {
    const previousSearchSize = this.searchTerms.size;
    this.searchTerms.clear();
    const words = value.toLowerCase().split(' ');
    words.forEach((word) => {
      if (word.length >= MINQUERYLENGTH) this.searchTerms.add(word);
    });
    const newSearchSize = this.searchTerms.size;
    if (newSearchSize > 0 || newSearchSize !== previousSearchSize) {
      this.doSearch();
    }
  }

  searchByTerms() {
    const termNumbers = this.searchTerms.size;
    const occurenceCounts = new Map();
    let resultIds = [];

    // for each term, find matching substring in index and add recipe ids to resultIds
    this.searchTerms.forEach((term) => {
      const match = this.index.find((wordIndex) => wordIndex.s === term);
      if (match) {
        resultIds = [...resultIds, ...match.r];
      }
    });

    // count occurence of each id
    resultIds.forEach((id) => {
      if (occurenceCounts.has(id)) {
        const occurenceCount = occurenceCounts.get(id);
        occurenceCounts.set(id, { id: id, count: occurenceCount.count + 1 });
      } else {
        occurenceCounts.set(id, { id: id, count: 1 });
      }
    });

    // if total number of occurences matches number of search terms, add recipe to results
    occurenceCounts.forEach((occurence) => {
      if (occurence.count === termNumbers) {
        const recipe = this.recipeMap.get(occurence.id);
        this.results.add(recipe);
      }
    });
  }

  setSearchKeywords(keywords) {
    this.keywords = keywords;
    // this.doSearch();
  }

  //#region KEYWORDS FUNCTIONS

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
    // TODO : handle keywords here
    const results = hasSearchTerms ? this.results : this.recipes;
    this.onSearchTrigger(results);
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
