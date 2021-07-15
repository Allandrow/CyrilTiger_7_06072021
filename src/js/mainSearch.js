// Main Search field
// After 3 caracters in input value,
// Create an empty Set
//filter title, description and ingredients maps to find match values
// for each match, add the recipe to the set to avoid duplicated recipes
// loop through the set values to display recipes
// filter ingredients, appliance and ustensils map to be based off the set recipes
export default class MainSearch {
  constructor(maps) {
    this.container = this.createDOM();
    this.maps = maps;
  }

  createDOM() {
    const label = document.createElement('label');
    label.setAttribute('for', 'mainSearch');
    label.className = 'main-search';

    const input = document.createElement('input');
    input.type = 'search';
    input.name = 'mainSearch';
    input.placeholder = 'Rechercher un ingrédient, appareil, ustensiles ou une recette';
    label.appendChild(input);
    return label;
  }

  getDOM() {
    return this.container;
  }

  searchRecipes() {}
}
