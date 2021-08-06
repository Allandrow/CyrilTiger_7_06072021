import { APPLIANCE, INGREDIENTS, USTENSILS } from './config.js';
import Dropdown from './dropdown.js';

export default class Dropdowns {
  constructor() {
    this.container = '';
  }

  initDropdowns() {
    const ingredientDD = new Dropdown(INGREDIENTS);
    const applianceDD = new Dropdown(APPLIANCE);
    const ustensilsDD = new Dropdown(USTENSILS);
    return [ingredientDD, applianceDD, ustensilsDD];
  }

  setDOM() {
    const container = document.createElement('div');
    container.className = 'dropdowns-container';
    this.container = container;

    const dropdowns = this.initDropdowns();
    dropdowns.forEach((dropdown) => container.appendChild(dropdown.getDOM()));

    return container;
  }

  getDOM() {
    return this.setDOM();
  }
}
