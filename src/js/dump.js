import AuxiliarySearch from './auxiliarySearch.js';
import MainSearch from './mainSearch.js';
import Recipe from './recipe.js';
import recipes from './recipes.js';

// TEMP method to include recipe list in DOM
const getRecipes = () => {
  // const displayedRecipes = [];

  const container = document.createElement('div');
  container.id = 'jsResults';
  container.className = 'result-group';

  recipes.forEach((item) => {
    const recipe = new Recipe(item);
    container.appendChild(recipe.getDOM());
  });

  return container;
};

const createTag = (text) => {
  const button = document.createElement('button');
  // TODO : dynamic value for color
  button.classList.add('tag', 'ingredient-color');

  const span = document.createElement('span');
  span.textContent = text;

  const img = document.createElement('img');
  img.src = 'dist/img/cross.svg';
  button.append(span, img);
  return button;
};

const getDOM = () => {
  const form = document.getElementById('jsForm');
  const mainSearch = new MainSearch();
  const ingredientAuxiliary = new AuxiliarySearch('ingredients', 'Ingrédients');
  const applianceAuxiliary = new AuxiliarySearch('appliance', 'Appareil');
  const ustensilAuiliary = new AuxiliarySearch('ustensils', 'Ustensiles');

  const filterTags = document.createElement('div');
  filterTags.id = 'jsTags';
  filterTags.className = 'filter-tags';

  const auxiliarySearchGroup = document.createElement('div');
  auxiliarySearchGroup.className = 'auxiliary-search-group';
  auxiliarySearchGroup.append(
    ingredientAuxiliary.getDOM(),
    applianceAuxiliary.getDOM(),
    ustensilAuiliary.getDOM(),
  );

  const tagSection = document.createElement('div');
  tagSection.className = 'filter-tags';

  form.append(mainSearch.getDOM(), tagSection, filterTags, auxiliarySearchGroup);

  // TEMP display of results
  form.appendChild(getRecipes());

  // DOM Events

  // open/close of auxiliary search blocks
  const searchLabels = Array.from(document.querySelectorAll('.auxiliary-search label'));
  window.addEventListener('click', (e) => {
    const isTargetLabel = searchLabels.find((label) => label === e.target);
    const openSearch = document.querySelector('.open');
    if (isTargetLabel) {
      const parent = e.target.closest('.auxiliary-search');
      if (openSearch && !parent.classList.contains('open')) {
        openSearch.classList.remove('open');
        parent.classList.add('open');
      } else {
        parent.classList.add('open');
      }
    } else if (!e.target.closest('.auxiliary-search')) {
      if (openSearch) {
        openSearch.classList.remove('open');
      }
    }
  });

  // click of an auxiliary search item to add a tag
  const auxiliaryItems = document.querySelectorAll('.auxiliary-btn');
  auxiliaryItems.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      tagSection.appendChild(createTag(btn.textContent));
    });
  });
};

const onLoad = () => {
  getDOM();
};


// Auxiliary 
import recipes from './recipes.js';

export default class AuxiliarySearch {
  constructor(name, text) {
    this.name = name;
    this.text = text;
    this.label = this.createLabel();
    this.input = this.createInput();
    this.map = this.getMap();
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

  createList() {
    const list = document.createElement('ul');

    this.map.forEach((value, key) => {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.className = 'auxiliary-btn';
      button.textContent = key;
      li.appendChild(button);
      list.appendChild(li);
    });

    return list;
  }

  getDOM() {
    const div = document.createElement('div');
    div.classList.add('auxiliary-search', `${this.name}-color`);

    const img = document.createElement('img');
    img.src = 'dist/img/arrow.svg';
    this.label.appendChild(img);

    const list = this.createList();

    div.append(this.label, this.input, list);

    return div;
  }
}

// Recipe
export default class Recipe {
  constructor(recipe) {
    this.recipe = recipe;
  }

  getDOM() {
    const { description, ingredients, name, time } = this.recipe;
    const containerBEM = 'result-card';
    const contentBEM = `${containerBEM}__content`;
    const bodyBEM = `${contentBEM}__body`;

    const article = document.createElement('article');
    article.className = containerBEM;

    const content = document.createElement('div');
    content.className = contentBEM;

    const contentHead = document.createElement('div');
    contentHead.className = `${contentBEM}__head`;

    const title = document.createElement('h2');
    title.textContent = name;

    const timer = document.createElement('div');
    timer.className = 'timer';

    const img = document.createElement('img');
    img.src = 'dist/img/timer.svg';

    const timerText = document.createElement('span');
    timerText.textContent = `${time} min`;
    timer.append(img, timerText);
    contentHead.append(title, timer);

    const contentBody = document.createElement('div');
    contentBody.className = bodyBEM;

    const list = document.createElement('ul');
    list.className = 'ingredients';
    ingredients.forEach((item) => {
      const { ingredient, quantity, unit } = item;

      const li = document.createElement('li');
      const ingredientName = document.createElement('strong');
      if (quantity) {
        ingredientName.textContent = `${ingredient} : `;
        const quantityElement = document.createElement('span');
        let quantityText;

        if (unit !== undefined) {
          quantityText = `${quantity} ${unit}`;
        } else {
          quantityText = `${quantity}`;
        }
        quantityElement.textContent = quantityText;
        li.append(ingredientName, quantityElement);
      } else {
        ingredientName.textContent = ingredient;
        li.appendChild(ingredientName);
      }

      list.appendChild(li);
    });

    // TODO : clamp description past a certain number of lines/characters
    const paragraph = document.createElement('p');
    paragraph.className = 'description';
    paragraph.textContent = description;

    contentBody.append(list, paragraph);
    content.append(contentHead, contentBody);
    article.appendChild(content);
    return article;
  }
}
