import { MINQUERYLENGTH } from './config.js';

export default class MainSearchBar {
  constructor() {
    this.searchTerms = new Set();
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

  getDOM() {
    return this.createDOM();
  }

  setSearchTerms(value) {
    this.searchTerms.clear();
    const words = value.toLowerCase().split(' ');

    words.forEach((word) => {
      if (word.length >= MINQUERYLENGTH) this.searchTerms.add(word);
    });
  }

  getSearchTerms() {
    return this.searchTerms;
  }
}
