export default class AuxiliarySearch {
  constructor(name, text, map) {
    this.name = name;
    this.text = text;
    this.input = this.createInput();
    this.map = map;
  }

  createInput() {
    const div = document.createElement('div');
    div.className = 'inputRow';

    const input = document.createElement('input');
    input.id = `${this.name}Search`;
    input.type = 'text';
    input.placeholder = `Recherche un ${this.text}`;

    const img = document.createElement('img');
    img.src = 'dist/img/arrow.svg';

    div.append(input, img);
    return div;
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
    const details = document.createElement('details');
    details.classList.add('auxiliary-search', `${this.name}-color`);

    const summary = document.createElement('summary');
    summary.textContent = this.text;

    const img = document.createElement('img');
    img.src = 'dist/img/arrow.svg';
    summary.appendChild(img);

    const input = this.input;
    const list = this.createMapElementsList(this.map);
    details.append(summary, input, list);

    //toggle events
    details.addEventListener('toggle', (e) => {
      if (!e.target.open) return;
      const openDropdowns = document.querySelectorAll('.auxiliary-search[open]');
      openDropdowns.forEach((dropdown) => {
        if (dropdown === e.target) return;
        dropdown.removeAttribute('open');
      });
    });

    return details;
  }

  getDOM() {
    return this.createDOM();
  }
}
