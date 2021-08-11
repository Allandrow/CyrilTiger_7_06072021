import Keyword from './keyword.js';

export default class Keywords {
  constructor() {
    this.container = '';
    this.list = new Map();
  }

  createDOM() {
    const container = document.createElement('div');
    container.className = 'keywords-container';
    container.id = 'jsKeywords';
    this.container = container;
    return container;
  }

  getDOM() {
    return this.createDOM();
  }

  updateKeywordList() {
    const fragment = new DocumentFragment();
    this.container.innerHTML = '';

    this.list.forEach((item) => {
      const keyword = new Keyword(item);
      fragment.appendChild(keyword.getDOM());
    });
    this.container.appendChild(fragment);
  }

  tagSelectionTrigger(keyword) {
    const { id, text } = keyword;
    const hash = `${id}-${text}`;
    if (this.list.has(hash)) {
      console.log('hash already in map');
      this.list.delete(hash);
    } else {
      console.log('hash not in map');
      this.list.set(hash, keyword);
    }
    console.log('MAP UPDATED ', this.list);
    this.updateKeywordList();
  }
}
