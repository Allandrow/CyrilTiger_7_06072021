import { WEIGHTUNIT, LITERUNITS } from './config.js';

export default class Recipe {
  constructor(recipe) {
    this.recipe = recipe;
  }
  // return text for quantity depending of presence and content of unit
  handleQuantityText(quantity, unit) {
    if (unit) {
      if (unit === WEIGHTUNIT) return `${quantity} g`;
      if (LITERUNITS.some((item) => item === unit)) return `${quantity} L`;
      return `${quantity} ${unit}`;
    }
    return `${quantity}`;
  }

  createIngredientListItem(recipeIngredient) {
    const { ingredient, quantity, unit } = recipeIngredient;
    const li = document.createElement('li');
    const ingredientName = document.createElement('strong');

    // Change textContent of ingredient depending of if it has a quantity and quantity unit
    if (quantity) {
      ingredientName.textContent = `${ingredient} : `;
      const quantityElement = document.createElement('span');
      const quantityText = this.handleQuantityText(quantity, unit);
      quantityElement.textContent = quantityText;
      li.append(ingredientName, quantityElement);
    } else {
      ingredientName.textContent = ingredient;
      li.appendChild(ingredientName);
    }
    return li;
  }

  createDOM() {
    const { description, ingredients, name, time } = this.recipe;

    // classNames
    const containerBEM = 'result-card';
    const contentBEM = `${containerBEM}__content`;
    const headBEM = `${contentBEM}__head`;
    const bodyBEM = `${contentBEM}__body`;

    // DOM generation
    const article = document.createElement('article');
    article.className = containerBEM;

    const content = document.createElement('div');
    content.className = contentBEM;

    const contentHead = document.createElement('div');
    contentHead.className = headBEM;

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
    ingredients.forEach((recipeIngredient) => {
      const li = this.createIngredientListItem(recipeIngredient);
      list.appendChild(li);
    });

    const paragraph = document.createElement('p');
    paragraph.className = 'description';
    paragraph.textContent = description;

    contentBody.append(list, paragraph);
    content.append(contentHead, contentBody);
    article.appendChild(content);
    return article;
  }

  getDOM() {
    return this.createDOM();
  }
}
