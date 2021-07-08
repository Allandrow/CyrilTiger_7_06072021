export default class MainSearch {
  static getDOM() {
    const label = document.createElement('label');
    label.setAttribute('for', 'mainSearch');
    label.className = 'main-search';

    const input = document.createElement('input');
    input.type = 'search';
    input.name = 'mainSearch';
    input.placeholder = 'Rechercher un ingrédient, appareil, ustensiles ou une recette';

    label.appendChild(input);
    return label;
  }
}
