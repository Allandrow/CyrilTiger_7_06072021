// Main Search field
// After 3 caracters in input value,
// Create an empty Set
//filter title, description and ingredients maps to find match values
// for each match, add the recipe to the set to avoid duplicated recipe
export default class MainSearch {
  constructor(maps) {
    this.input = this.createInput();
    this.container = this.createDOM();
    this.maps = maps;
    this.searchResult = new Set();
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

  // look if value is found inside keys of map
  // if match, add recipes stored in value associated to key in Set searchResults
  addMatchingResultToSet(value, map) {
    for (const item of map.keys()) {
      if (item.includes(value)) {
        const recipes = map.get(item);
        recipes.forEach((recipe) => {
          this.searchResult.add(recipe);
        });
      }
    }
  }

  getMatchingRecipes(value) {
    const { titleMap, descriptionMap, ingredientMap } = this.maps;
    this.searchResult.clear();
    this.addMatchingResultToSet(value, titleMap);
    this.addMatchingResultToSet(value, descriptionMap);
    this.addMatchingResultToSet(value, ingredientMap);
    return this.searchResult;
  }
}
