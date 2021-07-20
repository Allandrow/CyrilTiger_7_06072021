export default class Results {
  // create results container
  createDOM() {
    const container = document.createElement('div');
    container.id = 'jsResults';
    container.className = 'results-container';

    return container;
  }

  // return DOM of results container
  getDOM() {
    return this.createDOM();
  }

  // clear list of results and fill with new results
  onChange(results) {}
}

//   getSearchResultsElements(recipes = this.recipes) {
//     const resultsElements = [];
//     recipes.forEach((recipeItem) => {
//       const recipe = new Recipe(recipeItem);
//       resultsElements.push(recipe.getDOM());
//     });
//     return resultsElements;
//   }

//   getDOM() {
//     return this.createDOM();
//   }
// }
