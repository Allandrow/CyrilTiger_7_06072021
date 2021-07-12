import recipes from './recipes.js';

export default class AuxiliarySearch {
  constructor(name, text) {
    this.name = name;
    this.text = text;
  }

  static setMap(map, key, id) {
    if (map.get(key) === undefined) {
      map.set(key, [id]);
    } else {
      const arr = map.get(key);
      arr.push(id);
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
            AuxiliarySearch.setMap(map, ingredient.ingredient, recipe.id);
          });
          break;
        case 'appliance':
          AuxiliarySearch.setMap(map, recipe.appliance, recipe.id);
          break;
        case 'ustensils':
          recipe.ustensils.forEach((ustensil) => {
            AuxiliarySearch.setMap(map, ustensil, recipe.id);
          });
          break;
        default:
          throw new Error('Not available for auxiliary search');
      }
    });
    return map;
  }

  getDOM() {
    const div = document.createElement('div');
    div.classList.add('auxiliary-search', `${this.name}-color`);

    const label = document.createElement('label');
    label.className = 'select';
    label.setAttribute('for', `${this.name}Search`);
    label.textContent = this.text;

    const img = document.createElement('img');
    img.src = 'dist/img/arrow.svg';
    label.appendChild(img);

    const input = document.createElement('input');
    input.id = `${this.name}Search`;
    input.type = 'text';

    const map = this.getMap();

    const list = document.createElement('ul');

    map.forEach((value, key) => {
      const li = document.createElement('li');
      li.textContent = key;
      list.appendChild(li);
    });

    div.append(label, input, list);

    this.getMap();

    return div;
  }
}
