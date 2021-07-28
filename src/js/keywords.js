export default class Keywords {
  constructor() {
    this.selectedKeywords = new Map();
    this.container = '';
  }

  // create keywords container
  createDOM() {
    const container = document.createElement('div');
    container.className = 'keywords-container';
    container.id = 'jsKeywords';
    this.container = container;
    return container;
  }

  // return DOM of keywords container
  getDOM() {
    return this.createDOM();
  }

  // return keywords selection
  getKeywords() {
    return this.selectedKeywords;
  }

  // create keyword DOM element
  createKeywordButton(mapKeyword) {
    const button = document.createElement('button');
    button.classList.add('keyword', `${mapKeyword.id}-color`);
    button.setAttribute('data-id', mapKeyword.id);
    button.textContent = mapKeyword.label;

    const img = document.createElement('img');
    img.src = 'dist/img/cross.svg';

    button.appendChild(img);
    return button;
  }

  // create and append keyword tag or delete from displayed list
  updateKeywordList() {
    const container = this.container;

    container.innerHTML = '';

    this.selectedKeywords.forEach((keyword) => {
      const btn = this.createKeywordButton(keyword);
      container.appendChild(btn);
    });
  }

  // add keyword to map if not in it already, delete keyword if present, then updates the displayed list
  onChange(id, label) {
    const keywordHash = `${id}-${label}`;
    if (this.selectedKeywords.get(keywordHash)) {
      this.selectedKeywords.delete(keywordHash);
    } else {
      this.selectedKeywords.set(keywordHash, { id, label });
    }
    this.updateKeywordList();
  }
}
