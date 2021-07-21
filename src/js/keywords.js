export default class Keywords {
  constructor() {
    this.selectedKeywords = new Map();
  }

  // create keywords container
  createDOM() {
    const container = document.createElement('div');
    container.className = 'keywords-container';
    container.id = 'jsKeywords';
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

  createKeywordButton(mapKeyword, mapHash) {
    const button = document.createElement('button');
    button.classList.add('keyword', `${mapKeyword.id}-color`);
    button.textContent = mapKeyword.keyword;

    const img = document.createElement('img');
    img.src = 'dist/img/cross.svg';
    button.appendChild(img);

    button.addEventListener('click', (e) => {
      e.preventDefault();
      this.selectedKeywords.delete(mapHash);
      button.remove();
    });
    return button;
  }

  // create and append keyword tag or delete from displayed list
  updateKeywordList(mapHash) {
    const container = document.getElementById('jsKeywords');
    const mapKeyword = this.selectedKeywords.get(mapHash);

    const btn = this.createKeywordButton(mapKeyword, mapHash);
    container.appendChild(btn);
  }

  // add a keyword to the list and display it inside container
  onChange(id, keyword) {
    const keywordHash = `${id}-${keyword}`;
    if (this.selectedKeywords.get(keywordHash)) return;
    this.selectedKeywords.set(keywordHash, { id, keyword });
    this.updateKeywordList(keywordHash);
  }
}
