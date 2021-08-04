import { EMPTYSIZE } from './config.js';
import Recipe from './recipe.js';

export default class Results {
  constructor() {
    this.container = '';
  }
  // create results container
  createDOM() {
    const container = document.createElement('div');
    container.id = 'jsResults';
    container.className = 'results-container';
    this.container = container;
    return container;
  }

  // return DOM of results container
  getDOM() {
    return this.createDOM();
  }

  // clear list of results and fill with new results
  onChange(results) {
    const container = this.container;
    const containerFragment = new DocumentFragment();
    container.innerHTML = '';

    if (results.size === EMPTYSIZE) {
      const emptyResult = document.createElement('strong');
      emptyResult.className = 'alert';
      emptyResult.textContent =
        'Aucune recette ne correspond à votre critère ... Vous pouvez chercher "tarte aux pommes", "poisson", etc';
      containerFragment.appendChild(emptyResult);
    } else {
      results.forEach((result) => {
        const recipe = new Recipe(result);
        const resultDOM = recipe.getDOM();
        containerFragment.appendChild(resultDOM);
      });
    }
    container.appendChild(containerFragment);
  }
}
