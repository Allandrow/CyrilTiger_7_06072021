import Keyword from './keyword.js';

export default class Keywords {
  constructor() {
    this.container = '';
    this.list = new Map();
    this.listChangeCallbacks = [];
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

  updateKeywordDOMList() {
    const fragment = new DocumentFragment();

    while (this.container.lastElementChild)
      this.container.removeChild(this.container.lastElementChild);

    this.list.forEach((item) => {
      const keyword = new Keyword(item);
      keyword.onDeletion((keyword) => {
        this.tagSelectionTrigger(keyword);
      });
      fragment.appendChild(keyword.getDOM());
    });
    this.container.appendChild(fragment);
  }

  tagSelectionTrigger(keyword) {
    const { id, text } = keyword;
    const hash = `${id}-${text}`;
    if (this.list.has(hash)) {
      this.list.delete(hash);
    } else {
      this.list.set(hash, keyword);
    }
    this.onUpdateTrigger(this.list);
    this.updateKeywordDOMList();
  }

  onListChange(cb) {
    this.listChangeCallbacks.push(cb);
  }

  onUpdateTrigger(keywords) {
    this.listChangeCallbacks.forEach((cb) => cb(keywords));
  }
}
