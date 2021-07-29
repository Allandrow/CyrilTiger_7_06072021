export default class MainSearchBar {
  constructor() {
    this.searchTerms = '';
  }
  // Create search bar
  createDOM() {
    const label = document.createElement('label');
    label.setAttribute('for', 'mainSearch');
    label.className = 'main-search';

    const input = document.createElement('input');
    input.type = 'search';
    input.id = 'mainSearch';
    input.placeholder = 'Rechercher un ingrédient, appareil, ustensiles ou une recette';

    label.appendChild(input);
    return label;
  }

  // return DOM of searchBar
  getDOM() {
    return this.createDOM();
  }

  setSearchTerms(value) {
    this.searchTerms = value.toLowerCase();
  }

  getSearchTerms() {
    return this.searchTerms;
  }
}
