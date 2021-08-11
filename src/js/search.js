import recipes from './data/recipes.js';
import { MINQUERYLENGTH, INGREDIENTS, APPLIANCE, USTENSILS } from './config.js';

export default class Search {
  constructor(recipes) {
    this.recipes = recipes;
    this.searchTerms = new Set();
    this.keywords = new Map();
    this.results = new Set();
    this.resultsCallbacks = [];
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
    const terms = Array.from(searchTerms);
    let results = new Set();
    recipes.forEach((recipe) => {
      const hasAllTermsInRecipe = terms.every((term) => this.isTermInRecipe(recipe, term));
      if (hasAllTermsInRecipe) results.add(recipe);
    });
    this.results = results;
  }

  setSearchKeywords(keywords) {
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
    this.onSearchTrigger(results);
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

//#region
// verifyKeywordInRecipe(recipe, keyword) {
//   const id = keyword.id;
//   const label = keyword.label;
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

// setResultsByKeywords(keywords) {
//   const keywordsValues = Array.from(keywords.values());

//   //if results is not empty, filter out results that don't have all keywords
//   if (this.results.size > EMPTYSIZE) {
//     for (const recipe of this.results) {
//       const areKeywordsInRecipe = this.verifyKeywordsInRecipe(recipe, keywordsValues);
//       if (!areKeywordsInRecipe) this.results.delete(recipe);
//     }
//     return;
//   }
//   // if resulsts is empty, add recipes that have all keywords to results
//   this.recipes.forEach((recipe) => {
//     if (this.verifyKeywordsInRecipe(recipe, keywordsValues)) this.results.add(recipe);
//   });
// }

// // search matching results from recipes and add match to results
// launchSearch() {
//   this.results.clear();
//   const data = this.getSearchData();
//   // TODO : 0 n'est pas constante
//   const hasSearchTerms = data.searchTerms.size > EMPTYSIZE;
//   const hasKeywords = data.searchKeywords.size > EMPTYSIZE;

//   if (hasSearchTerms) {
//     this.setResultsByTextSearch(this.recipes, data.searchTerms);
//   }
//   if (hasKeywords) {
//     this.setResultsByKeywords(data.searchKeywords);
//   }

//   //
//   if (hasKeywords || hasSearchTerms) {
//     this.displayResults(this.results);
//   } else {
//     this.displayResults();
//   }
// }

// setResultsFunctions(callback) {
//   this.resultFuncs.push(callback);
// }

// // fires resultFuncs to redo lists of dropdowns and results
// displayResults(results = this.recipes) {
//   this.resultFuncs.forEach((func) => {
//     func(results);
//   });
// }
//#endregion
