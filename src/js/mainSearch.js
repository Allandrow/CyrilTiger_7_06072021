// Main Search field
// After 3 caracters in input value,
// Create an empty Set
//filter title, description and ingredients maps to find match values
// for each match, add the recipe to the set to avoid duplicated recipes
// loop through the set values to display recipes
// filter ingredients, appliance and ustensils map to be based off the set recipes
export default class MainSearch {
  constructor(maps) {
    this.input = this.createInput();
    this.container = this.createDOM();
    this.maps = maps;
    this.searchResult = new Set();
    this.callBacks = [];
  }

  createInput() {
    const input = document.createElement('input');
    input.type = 'search';
    input.id = 'mainSearch';
    input.placeholder = 'Rechercher un ingrédient, appareil, ustensiles ou une recette';
    return input;
  }

  getInput() {
    return this.input;
  }

  createDOM() {
    const label = document.createElement('label');
    label.setAttribute('for', 'mainSearch');
    label.className = 'main-search';
    const input = this.input;
    label.appendChild(input);
    return label;
  }

  getDOM() {
    return this.container;
  }

  searchMatchingRecipes(value) {
    // search through maps to find if value is in key
    // TODO : refacto
    const { titleMap, descriptionMap, ingredientMap } = this.maps;
    this.searchResult.clear();
    for (const title of titleMap.keys()) {
      if (title.includes(value)) {
        const [recipe] = titleMap.get(title);
        this.searchResult.add(recipe);
      }
    }
    for (const description of descriptionMap.keys()) {
      if (description.includes(value)) {
        const [recipe] = descriptionMap.get(description);
        this.searchResult.add(recipe);
      }
    }
    for (const ingredient of ingredientMap.keys()) {
      if (ingredient.includes(value)) {
        const recipes = ingredientMap.get(ingredient);
        recipes.forEach((recipe) => {
          this.searchResult.add(recipe);
        });
      }
    }
    return this.searchResult;
  }
}
