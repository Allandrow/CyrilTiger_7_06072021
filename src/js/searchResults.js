// import Recipe from './recipe.js';

// export default class SearchResults {
//   constructor(recipes) {
//     this.recipes = recipes;
//   }

//   getSearchResultsElements(recipes = this.recipes) {
//     const resultsElements = [];
//     recipes.forEach((recipeItem) => {
//       const recipe = new Recipe(recipeItem);
//       resultsElements.push(recipe.getDOM());
//     });
//     return resultsElements;
//   }

//   createDOM() {
//     const container = document.createElement('div');
//     container.id = 'jsResults';
//     container.className = 'result-group';

//     // display all recipes at first
//     const resultsElements = this.getSearchResultsElements();
//     resultsElements.forEach((result) => {
//       container.appendChild(result);
//     });

//     return container;
//   }

//   getDOM() {
//     return this.createDOM();
//   }
// }
