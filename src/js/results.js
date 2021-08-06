import recipes from './data/recipes.js';
import Result from './result.js';

export default class Results {
  constructor() {
    this.container = '';
    this.recipes = recipes;
  }

  setDOM() {
    const container = document.createElement('div');
    container.id = 'jsResults';
    container.className = 'results-container';
    this.container = container;
    return container;
  }

  getDOM() {
    return this.setDOM();
  }

  displayResults(results = this.recipes) {
    const container = this.container;
    const fragment = new DocumentFragment();

    container.innerHTML = '';

    // TODO : handle case with no results from search
    results.forEach((recipe) => {
      const result = new Result(recipe);
      fragment.appendChild(result.getDOM());
    });
    container.appendChild(fragment);
  }
}

// export default class Results {

//   // clear list of results and fill with new results
//   onChange(results) {
//   // display a message if search returns no result, display results if search find matches, display all recipes if no search
//     if (results.size === EMPTYSIZE) {
//       const emptyResult = document.createElement('strong');
//       emptyResult.className = 'alert';
//       emptyResult.textContent =
//         'Aucune recette ne correspond à votre critère ... Vous pouvez chercher "tarte aux pommes", "poisson", etc';
//       containerFragment.appendChild(emptyResult);
//     } else {
//       results.forEach((result) => {
//         const recipe = new Recipe(result);
//         const resultDOM = recipe.getDOM();
//         containerFragment.appendChild(resultDOM);
//       });
//     }
//     container.appendChild(containerFragment);
//   }
// }
