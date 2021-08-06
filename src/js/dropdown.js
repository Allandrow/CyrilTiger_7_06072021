// TODO : handle tag selection to make a keyword

import { APPLIANCE, dropdownTexts, INGREDIENTS, USTENSILS } from './config.js';

export default class Dropdown {
  constructor(id) {
    this.id = id;
    this.summaryText = dropdownTexts[id].summaryText;
    this.placeholder = dropdownTexts[id].placeholder;
    this.list = '';
    this.input = '';
  }

  createArrowIMG() {
    const img = document.createElement('img');
    img.src = 'dist/img/arrow.svg';
    return img;
  }

  setDOM() {
    const details = document.createElement('details');
    details.classList.add('dropdown', `${this.id}-color`);

    const summary = document.createElement('summary');
    summary.textContent = this.summaryText;
    summary.append(this.createArrowIMG());

    const inputDiv = document.createElement('div');
    inputDiv.className = 'inputGroup';

    const input = document.createElement('input');
    input.id = `${this.id}Search`;
    input.type = 'text';
    input.placeholder = `Recherche un ${this.placeholder}`;
    this.input = input;
    inputDiv.append(input, this.createArrowIMG());

    const list = document.createElement('ul');
    list.id = `${this.id}List`;
    this.list = list;

    details.append(summary, inputDiv, list);

    //filter keywords from list
    input.addEventListener('input', () => {
      Array.from(list.childNodes).forEach((listItem) => {
        const itemText = listItem.textContent.toLowerCase();
        if (!itemText.includes(input.value)) {
          listItem.style.display = 'none';
        } else {
          listItem.style.display = 'block';
        }
      });
    });

    return details;
  }

  getDOM() {
    return this.setDOM();
  }

  createListItem(keyword) {
    const btn = document.createElement('button');
    btn.setAttribute('data-id', this.id);
    btn.textContent = keyword;

    const li = document.createElement('li');
    li.appendChild(btn);
    return li;
  }

  updateList(results) {
    const keywordSet = new Set();
    const fragment = new DocumentFragment();
    this.list.innerHTML = '';

    results.forEach((result) => {
      switch (this.id) {
        case INGREDIENTS:
          result.ingredients.forEach((ingredientItem) => keywordSet.add(ingredientItem.ingredient));
          break;
        case APPLIANCE:
          keywordSet.add(result.appliance);
          break;
        case USTENSILS:
          result.ustensils.every((ustensil) => keywordSet.add(ustensil));
          break;
      }
    });

    keywordSet.forEach((keyword) => {
      fragment.appendChild(this.createListItem(keyword));
    });
    this.list.appendChild(fragment);
  }
}
