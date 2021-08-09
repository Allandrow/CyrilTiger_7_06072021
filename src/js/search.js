import recipes from './data/recipes.js';
import { MINQUERYLENGTH } from './config.js';

export default class Search {
  constructor(index) {
    this.index = index;
    this.searchTerms = new Set();
    this.keywords = '';
    this.recipes = recipes;
    this.results = new Set();
    this.resultsCallbacks = [];

    const mainSearchInput = document.getElementById('mainSearch');

    mainSearchInput.addEventListener('input', (e) => {
      this.setSearchTerms(mainSearchInput.value);
      if (this.searchTerms.size > 0) this.startSearch();
    });
  }

  setSearchTerms(value) {
    this.searchTerms.clear();
    const words = value.toLowerCase().split(' ');
    words.forEach((word) => {
      if (word.length >= MINQUERYLENGTH) this.searchTerms.add(word);
    });
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

  startSearch() {
    this.results.clear();
    const hasSearchTerms = this.searchTerms.size > 0;
    const hasKeywords = this.keywords;

    if (hasSearchTerms || hasKeywords) {
      if (this.searchTerms.size > 0) {
        this.setResultsByTextSearch();
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

//#region FUNCTIONS TO DO

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
