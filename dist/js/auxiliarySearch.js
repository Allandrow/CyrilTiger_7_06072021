export default class AuxiliarySearch {
  constructor(name, text) {
    this.name = name;
    this.text = text;
  }

  getDOM() {
    const div = document.createElement('div');
    div.classList.add('auxiliary-search', `${this.name}-color`);

    const button = document.createElement('button');
    button.className = 'select';

    const span = document.createElement('span');
    span.textContent = this.text;

    const arrow = document.createElement('img');
    arrow.src = 'dist/img/arrow.svg';

    button.append(span, arrow);
    div.appendChild(button);

    return div;
  }
}
