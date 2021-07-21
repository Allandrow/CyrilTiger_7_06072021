export default class Keywords {
  constructor() {
    this.selectedKeywords = new Set();
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

  // create and append keyword tag
  updateKeywordList() {
    const container = document.getElementById('jsKeywords');

    while (container.lastElementChild) container.removeChild(container.lastElementChild);

    this.selectedKeywords.forEach((selection) => {
      const selectionObj = JSON.parse(selection);
      const keywordTag = document.createElement('button');
      keywordTag.classList.add('keyword', `${selectionObj.id}-color`);
      keywordTag.textContent = selectionObj.keyword;

      const img = document.createElement('img');
      img.src = 'dist/img/cross.svg';
      keywordTag.appendChild(img);
      container.appendChild(keywordTag);
    });
  }

  // add a keyword to the list and display it inside container
  onChange(method, id, keyword) {
    if (method === 'add') {
      this.selectedKeywords.add(JSON.stringify({ id, keyword }));
      this.updateKeywordList();
    } else {
      // remove tag
    }
  }
}
