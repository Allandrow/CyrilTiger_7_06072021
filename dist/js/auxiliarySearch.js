import recipes from './recipes.js';

export default class AuxiliarySearch {
  constructor(name, text) {
    this.name = name;
    this.text = text;
    this.label = this.createLabel();
    this.input = this.createInput();
  }

  static setMap(map, key, recipe) {
    if (map.get(key) === undefined) {
      map.set(key, [recipe]);
    } else {
      const arr = map.get(key);
      arr.push(recipe);
    }
  }

  getMap() {
    const map = new Map();
    // Generate a map associating each ingredient, appliance or ustensil as key
    // if key isn't in map, set key with an array containing recipe id
    // if key is in map, get value of key and push recipe id in it
    recipes.forEach((recipe) => {
      switch (this.name) {
        case 'ingredients':
          recipe.ingredients.forEach((ingredient) => {
            AuxiliarySearch.setMap(map, ingredient.ingredient, recipe);
          });
          break;
        case 'appliance':
          AuxiliarySearch.setMap(map, recipe.appliance, recipe);
          break;
        case 'ustensils':
          recipe.ustensils.forEach((ustensil) => {
            AuxiliarySearch.setMap(map, ustensil, recipe);
          });
          break;
        default:
          throw new Error('Not available for auxiliary search');
      }
    });
    return map;
  }

  createLabel() {
    const label = document.createElement('label');
    label.setAttribute('for', `${this.name}Search`);
    label.textContent = this.text;
    return label;
  }

  createInput() {
    const input = document.createElement('input');
    input.id = `${this.name}Search`;
    input.type = 'text';
    // TODO : create prop to use for placeholder with correct text
    input.placeholder = `Recherche un ${this.text}`;
    return input;
  }

  getDOM() {
    const div = document.createElement('div');
    div.classList.add('auxiliary-search', `${this.name}-color`);

    const img = document.createElement('img');
    img.src = 'dist/img/arrow.svg';
    this.label.appendChild(img);

    const map = this.getMap();

    const list = document.createElement('ul');

    map.forEach((value, key) => {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.textContent = key;
      li.appendChild(button);
      list.appendChild(li);
    });

    div.append(this.label, this.input, list);
    this.getMap();

    return div;
  }
}
