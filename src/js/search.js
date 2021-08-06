/*
  handles search
  return results
*/

import { MINQUERYLENGTH } from './config.js';

export default class Search {
  constructor(index) {
    this.index = index;
    this.searchTerms = new Set();
    this.keywords = '';

    const mainSearchInput = document.getElementById('mainSearch');

    mainSearchInput.addEventListener('input', (e) => {
      this.setSearchTerms(mainSearchInput.value);
      if (this.searchTerms.size > 0) this.launchSearch();
    });
  }

  setSearchTerms(value) {
    this.searchTerms.clear();
    const words = value.toLowerCase().split(' ');
    words.forEach((word) => {
      if (word.length >= MINQUERYLENGTH) this.searchTerms.add(word);
    });
  }

  launchSearch() {
    console.log('YALLA');
  }
}

//#region FUNCTIONS TO DO
// import { INGREDIENTS, APPLIANCE, USTENSILS, EMPTYSIZE } from './config.js';

// export default class Search {
//   constructor(recipes, index) {
//     this.dataFuncs = [];
//     this.resultFuncs = [];
//     this.results = new Set();
//     this.recipes = recipes;
//     this.index = index;
//   }

//   setSearchData(callback) {
//     this.dataFuncs.push(callback);
//   }

//   getSearchData() {
//     let searchTerms;
//     let searchKeywords;
//     this.dataFuncs.forEach((func) => {
//       if (func() instanceof Set) {
//         searchTerms = func();
//       }
//       if (func() instanceof Map) {
//         searchKeywords = func();
//       }
//     });
//     return {
//       searchTerms,
//       searchKeywords
//     };
//   }

//   verifyKeywordInRecipe(recipe, keyword) {
//     const id = keyword.id;
//     const label = keyword.label;
//     switch (id) {
//       case INGREDIENTS:
//         return recipe.ingredients.some((text) => text.ingredient === label);
//       case APPLIANCE:
//         return recipe.appliance === label;
//       case USTENSILS:
//         return recipe.ustensils.some((text) => text === label);
//     }
//   }

//   verifyKeywordsInRecipe(recipe, keywords) {
//     return keywords.every((keyword) => this.verifyKeywordInRecipe(recipe, keyword));
//   }

//   setResultsByKeywords(keywords) {
//     const keywordsValues = Array.from(keywords.values());

//     //if results is not empty, filter out results that don't have all keywords
//     if (this.results.size > EMPTYSIZE) {
//       for (const recipe of this.results) {
//         const areKeywordsInRecipe = this.verifyKeywordsInRecipe(recipe, keywordsValues);
//         if (!areKeywordsInRecipe) this.results.delete(recipe);
//       }
//       return;
//     }
//     // if resulsts is empty, add recipes that have all keywords to results
//     this.recipes.forEach((recipe) => {
//       if (this.verifyKeywordsInRecipe(recipe, keywordsValues)) this.results.add(recipe);
//     });
//   }

//   // filter results based on searchTerms
//   setResultsByTextSearch(recipes, searchTerms) {
//     const terms = Array.from(searchTerms);
//     let results = new Set();
//     recipes.forEach((recipe) => {
//       const hasAllTermsInRecipe = terms.every((term) => this.isTermInRecipe(recipe, term));
//       if (hasAllTermsInRecipe) results.add(recipe);
//     });
//     this.results = results;
//   }

//   // search matching results from recipes and add match to results
//   launchSearch() {
//     this.results.clear();
//     const data = this.getSearchData();
//     // TODO : 0 n'est pas constante
//     const hasSearchTerms = data.searchTerms.size > EMPTYSIZE;
//     const hasKeywords = data.searchKeywords.size > EMPTYSIZE;

//     if (hasSearchTerms) {
//       this.setResultsByTextSearch(this.recipes, data.searchTerms);
//     }
//     if (hasKeywords) {
//       this.setResultsByKeywords(data.searchKeywords);
//     }

//     if (hasKeywords || hasSearchTerms) {
//       this.displayResults(this.results);
//     } else {
//       this.displayResults();
//     }
//   }

//   setResultsFunctions(callback) {
//     this.resultFuncs.push(callback);
//   }

//   // fires resultFuncs to redo lists of dropdowns and results
//   displayResults(results = this.recipes) {
//     this.resultFuncs.forEach((func) => {
//       func(results);
//     });
//   }
// }
//#endregion
