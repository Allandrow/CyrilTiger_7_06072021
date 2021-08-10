import recipes from './data/recipes.js';
import Result from './result.js';

export default class Results {
  constructor() {
    this.container = '';
    this.recipes = recipes;
  }

  createDOM() {
    const container = document.createElement('div');
    container.id = 'jsResults';
    container.className = 'results-container';
    this.container = container;
    return container;
  }

  getDOM() {
    return this.createDOM();
  }

  displayResults(results = this.recipes) {
    const container = this.container;
    const fragment = new DocumentFragment();

    container.innerHTML = '';

    // TODO : handle case with no results from search
    //     if (results.size === EMPTYSIZE) {
    //       const emptyResult = document.createElement('strong');
    //       emptyResult.className = 'alert';
    //       emptyResult.textContent =
    //         'Aucune recette ne correspond à votre critère ... Vous pouvez chercher "tarte aux pommes", "poisson", etc';
    //       containerFragment.appendChild(emptyResult);

    results.forEach((recipe) => {
      const result = new Result(recipe);
      fragment.appendChild(result.getDOM());
    });
    container.appendChild(fragment);
  }
}
