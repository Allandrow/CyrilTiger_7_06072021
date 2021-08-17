export default class MainSearchBar {
  constructor() {
    this.triggerCallbacks = [];
  }

  createDOM() {
    const label = document.createElement('label');
    label.setAttribute('for', 'mainSearch');
    label.className = 'main-search';

    const input = document.createElement('input');
    input.type = 'search';
    input.id = 'mainSearch';
    input.placeholder = 'Rechercher un ingrédient, appareil, ustensiles ou une recette';

    label.appendChild(input);

    input.addEventListener('input', (e) => {
      this.triggerEvents(e.target.value);
    });

    return label;
  }

  getDOM() {
    return this.createDOM();
  }

  onInputValueChange(cb) {
    this.triggerCallbacks.push(cb);
  }

  triggerEvents(value) {
    this.triggerCallbacks.forEach((cb) => cb(value));
  }
}
