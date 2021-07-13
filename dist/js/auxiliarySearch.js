export default class AuxiliarySearch {
  constructor(name, text, map) {
    this.name = name;
    this.text = text;
    this.label = this.createLabel();
    this.input = this.createInput();
    this.map = map;
  }

  createLabel() {
    const label = document.createElement('label');
    label.setAttribute('for', `${this.name}Search`);
    label.textContent = this.text;

    const img = document.createElement('img');
    img.src = 'dist/img/arrow.svg';

    label.appendChild(img);
    return label;
  }

  createInput() {
    const input = document.createElement('input');
    input.id = `${this.name}Search`;
    input.type = 'text';
    input.placeholder = `Recherche un ${this.text}`;
    return input;
  }

  createMapElementsList(map) {
    const list = document.createElement('ul');
    const keys = map.keys();

    for (const key of keys) {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.className = 'auxiliary-btn';
      button.textContent = key;
      li.appendChild(button);
      list.appendChild(li);
    }
    return list;
  }

  createDOM() {
    const div = document.createElement('div');
    div.classList.add('auxiliary-search', `${this.name}-color`);

    const label = this.label;

    const openedBlock = document.createElement('div');
    const input = this.input;
    const list = this.createMapElementsList(this.map);
    openedBlock.append(input, list);
    div.append(label, openedBlock);
    return div;
  }

  getDOM() {
    return this.createDOM();
  }
}
