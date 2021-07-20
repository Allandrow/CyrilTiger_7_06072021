export default class Dropdown {
  constructor(id) {
    this.id = id;

    // Create text and placeholder based on id
    switch (id) {
      case 'ingredients':
        this.summaryText = 'Ingrédients';
        this.placeholder = 'ingrédient';
        break;
      case 'appliance':
        this.summaryText = 'Appareil';
        this.placeholder = 'appareil';
        break;
      case 'ustensils':
        this.summaryText = 'Ustensiles';
        this.placeholder = 'ustensile';
        break;
    }
  }

  createArrowIMG() {
    const img = document.createElement('img');
    img.src = 'dist/img/arrow.svg';
    return img;
  }

  attachDropdownEvents(details) {
    // toggle events
    details.addEventListener('toggle', (e) => {
      if (!e.target.open) return;
      const openDropdowns = document.querySelectorAll('.auxiliary-search[open]');
      openDropdowns.forEach((dropdown) => {
        if (dropdown === e.target) return;
        dropdown.removeAttribute('open');
      });
    });

    // click outside of an open details closes it
    window.addEventListener('click', (e) => {
      if (!details.open || e.target.closest('[open]') === details) return;
      details.removeAttribute('open');
    });
  }

  // create a dropdown
  createDOM() {
    const details = document.createElement('details');
    details.classList.add('dropdown', `${this.id}-color`);

    const summary = document.createElement('summary');
    summary.textContent = this.summaryText;
    summary.appendChild(this.createArrowIMG());

    const inputDiv = document.createElement('div');
    inputDiv.className = 'inputGroup';

    const input = document.createElement('input');
    input.id = `${this.id}Search`;
    input.type = 'text';
    input.placeholder = `Recherche un ${this.placeholder}`;
    inputDiv.append(input, this.createArrowIMG());

    const list = document.createElement('ul');
    list.id = `${this.id}List`;

    details.append(summary, inputDiv, list);

    this.attachDropdownEvents(details);

    return details;
  }

  // return DOM of dropdown
  getDOM() {
    return this.createDOM();
  }

  // clear list and fill with new results
  onChange(results) {
    const keywordSet = new Set();
    // TODO : find a way to get rid of searching DOM for container
    const listDOM = document.getElementById(`${this.id}List`);

    // fill set for each dropdown
    results.forEach((result) => {
      switch (this.id) {
        case 'ingredients':
          result.ingredients.forEach((ingredientItem) => {
            keywordSet.add(ingredientItem.ingredient);
          });
          break;
        case 'appliance':
          keywordSet.add(result.appliance);
          break;
        case 'ustensils':
          result.ustensils.forEach((ustensil) => keywordSet.add(ustensil));
          break;
      }
    });

    // clear displayed list
    while (listDOM.lastElementChild) listDOM.removeChild(listDOM.lastElementChild);

    // display new list
    keywordSet.forEach((keyword) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.textContent = keyword;
      li.appendChild(btn);
      listDOM.appendChild(li);
    });
  }

  // filter list of displayed keywords based on search terms from dropdown input
  filterKeywords(dropdownSearchTerms) {}
}
