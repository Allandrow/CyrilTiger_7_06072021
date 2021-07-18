// Temp file for search algorithm implementation

const generateAuxiliaryListItems = (container, list) => {
  while (container.lastElementChild) container.removeChild(container.lastElementChild);

  list.forEach((item) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = 'auxiliary-btn';
    btn.textContent = item;
    li.appendChild(btn);
    container.appendChild(li);
  });
};

const generateAuxiliaryLists = (recipes) => {
  const ingredientsList = document.getElementById('ingredientsList');
  const applianceList = document.getElementById('applianceList');
  const ustensilsList = document.getElementById('ustensilsList');

  const ingredientSet = new Set();
  const applianceSet = new Set();
  const ustensilSet = new Set();

  recipes.forEach((recipe) => {
    const { ingredients, appliance, ustensils } = recipe;

    ingredients.forEach((ingredient) => ingredientSet.add(ingredient.ingredient));
    applianceSet.add(appliance);
    ustensils.forEach((ustensil) => ustensilSet.add(ustensil));
  });

  generateAuxiliaryListItems(ingredientsList, ingredientSet);
  generateAuxiliaryListItems(applianceList, applianceSet);
  generateAuxiliaryListItems(ustensilsList, ustensilSet);
};

const createResultArticle = (recipe) => {
  const { description, ingredients, name, time } = recipe;

  const containerBEM = 'result-card';
  const contentBEM = `${containerBEM}__content`;
  const headBEM = `${contentBEM}__head`;
  const bodyBEM = `${contentBEM}__body`;

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
    const { ingredient, quantity, unit } = recipeIngredient;

    const li = document.createElement('li');
    const ingredientName = document.createElement('strong');

    // Change textContent of ingredient depending of if it has a quantity and quantity unit
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

  const paragraph = document.createElement('p');
  paragraph.className = 'description';
  paragraph.textContent = description;

  contentBody.append(list, paragraph);
  content.append(contentHead, contentBody);
  article.appendChild(content);
  return article;
};

const generateResults = (recipes) => {
  const container = document.getElementById('jsResults');

  while (container.lastElementChild) container.removeChild(container.lastElementChild);

  recipes.forEach((recipe) => {
    const article = createResultArticle(recipe);
    container.appendChild(article);
  });
};

export const searchRecipesByMainInput = (recipes) => {
  const input = document.getElementById('mainSearch');
  input.addEventListener('input', (e) => {
    // return if value is less than 3 characters
    if (input.value.length < 3) return;

    // Create an empty Set and add recipes that include value in title, description or ingredient
    const recipeSet = new Set();

    recipes.forEach((recipe) => {
      // Check lowercase in name ?
      const { name, description, ingredients } = recipe;
      const isInName = name.includes(input.value);
      const isInDescription = description.includes(input.value);

      if (isInName || isInDescription) {
        recipeSet.add(recipe);
        return;
      }
      ingredients.forEach((ingredient) => {
        if (ingredient.ingredient.includes(input.value)) {
          recipeSet.add(recipe);
          return;
        }
      });
    });
    generateAuxiliaryLists(recipeSet);
    generateResults(recipeSet);
  });
};
