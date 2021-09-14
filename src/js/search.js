import recipes from './data/recipes.js';
import { MINQUERYLENGTH, INGREDIENTS, APPLIANCE, USTENSILS } from './config.js';

export default class Search {
  constructor() {
    this.recipes = recipes;
    this.searchTerms = new Set();
    this.keywords = new Map();
    this.results = new Set();
    this.triggerCallbacks = [];
  }

  updateSearchTerms(value) {
    const previousSearchSize = this.searchTerms.size;
    this.searchTerms.clear();

    const words = value.toLowerCase().split(' ');
    words.forEach((word) => {
      if (word.length >= MINQUERYLENGTH) this.searchTerms.add(word);
    });
    const newSearchSize = this.searchTerms.size;
    const hasSearchTerms = newSearchSize > 0;
    const isSearchReset = newSearchSize !== previousSearchSize;

    if (hasSearchTerms || isSearchReset) this.doSearch();
  }

  isTermInRecipe(recipe, term) {
    const { name, description, ingredients } = recipe;
    const nameLowerCase = name.toLowerCase();
    const descriptionLowerCase = description.toLowerCase();
    let recipeTexts = [nameLowerCase, descriptionLowerCase];

    ingredients.forEach((ingredient) => {
      const ingredientLowerCase = ingredient.ingredient.toLowerCase();
      recipeTexts = [...recipeTexts, ingredientLowerCase];
    });
    return recipeTexts.some((text) => text.includes(term));
  }

  searchByTerms() {
    const terms = Array.from(this.searchTerms);
    this.recipes.forEach((recipe) => {
      const hasAllTermsInRecipe = terms.every((term) => this.isTermInRecipe(recipe, term));
      if (hasAllTermsInRecipe) this.results.add(recipe);
    });
  }

  updateSearchKeywords(keywords) {
    this.keywords = keywords;
    this.doSearch();
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

  searchByKeywords() {
    const keywordsValues = Array.from(this.keywords.values());
    if (this.searchTerms.size > 0) {
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

  doSearch() {
    this.results.clear();
    const hasSearchTerms = this.searchTerms.size > 0;
    const hasKeywords = this.keywords.size > 0;

    if (hasSearchTerms || hasKeywords) {
      if (hasSearchTerms) {
        this.searchByTerms();
      }
      if (hasKeywords) {
        this.searchByKeywords();
      }
    }
    const results = hasSearchTerms || hasKeywords ? this.results : this.recipes;
    this.triggerEvents(results);
  }

  onResult(callback) {
    this.triggerCallbacks.push(callback);
  }

  triggerEvents(results) {
    this.triggerCallbacks.forEach((cb) => {
      cb(results);
    });
  }
}
