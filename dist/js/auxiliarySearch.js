export default class AuxiliarySearch {
  constructor(name, text, map) {
    this.name = name;
    this.text = text;
    this.input = this.createInput();
    this.map = map;
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
    const details = document.createElement('details');
    details.classList.add('auxiliary-search', `${this.name}-color`);

    const summary = document.createElement('summary');
    summary.textContent = this.text;

    const div = document.createElement('div');
    const input = this.input;
    const list = this.createMapElementsList(this.map);
    div.append(input, list);
    details.append(summary, div);

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
