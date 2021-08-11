import { APPLIANCE, INGREDIENTS, USTENSILS } from './config.js';
import Dropdown from './dropdown.js';
import recipes from './data/recipes.js';

export default class Dropdowns {
  constructor() {
    this.container = '';
    this.dropdowns = this.initDropdowns();
    this.recipes = recipes;
  }

  initDropdowns() {
    const ingredientDD = new Dropdown(INGREDIENTS);
    const applianceDD = new Dropdown(APPLIANCE);
    const ustensilsDD = new Dropdown(USTENSILS);
    return [ingredientDD, applianceDD, ustensilsDD];
  }

  createDOM() {
    const container = document.createElement('div');
    container.className = 'dropdowns-container';
    this.dropdowns.forEach((dropdown) => container.appendChild(dropdown.getDOM()));
    this.container = container;
    return container;
  }

  getDOM() {
    return this.createDOM();
  }

  updateDropdownsLists(results = this.recipes) {
    this.dropdowns.forEach((dropdown) => dropdown.updateList(results));
  }

  onTagSelection(cb) {
    this.dropdowns.forEach((dropdown) => dropdown.onTagSelection(cb));
  }
}
