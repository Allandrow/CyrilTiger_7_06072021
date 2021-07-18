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
  });
};
