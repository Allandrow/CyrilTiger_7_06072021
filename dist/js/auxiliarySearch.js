import recipes from './recipes.js';

export default class AuxiliarySearch {
  constructor(name, text) {
    this.name = name;
    this.text = text;
  }

  getSet() {
    const set = new Set();
    recipes.forEach((recipe) => {
      switch (this.name) {
        case 'ingredients':
          recipe.ingredients.forEach((ingredient) => {
            set.add(ingredient.ingredient);
          });
          break;
        case 'appliance':
          set.add(recipe.appliance);
          break;
        case 'ustensils':
          recipe.ustensils.forEach((ustensil) => {
            set.add(ustensil);
          });
          break;
        default:
          console.log('Not available for auxiliary search');
      }
    });
    return set;
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

    const listSet = this.getSet();
    const list = document.createElement('ul');

    listSet.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });

    div.append(label, input, list);

    return div;
  }
}
