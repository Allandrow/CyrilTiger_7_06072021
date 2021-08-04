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
    container.innerHTML = '';
    container.remove();

    if (results.size === EMPTYSIZE) {
      const emptyResult = document.createElement('strong');
      emptyResult.textContent =
        'Aucune recette ne correspond à votre critère ... Vous pouvez chercher "tarte aux pommes", "poisson", etc';
      emptyResult.className = 'alert';
      container.appendChild(emptyResult);
      return;
    }

    results.forEach((result) => {
      const resultObj = new Recipe(result);
      const resultDOM = resultObj.getDOM();
      container.appendChild(resultDOM);
    });

    document.body.append(container);
  }
}
