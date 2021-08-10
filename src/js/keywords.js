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

  toggleKeyword(keyword) {
    const { id, text } = keyword;
    const keywordHash = `${id}-${text}`;
    if (this.list.get(keywordHash)) {
      this.list.delete(keywordHash);
    } else {
      this.list.set(keywordHash, { id, text });
    }
    this.triggerListChange();
    this.updateKeywordList();
  }

  updateKeywordList() {
    const fragment = new DocumentFragment();
    this.container.innerHTML = '';

    this.list.forEach((tag) => {
      const keyword = new Keyword(tag.id, tag.text);
      keyword.onChange((tag) => this.toggleKeyword(tag));
      fragment.appendChild(keyword.getDOM());
    });
    this.container.appendChild(fragment);
  }

  // getKeywords() {
  //   return this.list;
  // }

  // onKeywordChange(cb) {
  //   this.listChangeCallbacks.push(cb);
  // }

  // triggerListChange() {
  //   this.listChangeCallbacks.forEach((cb) => cb(this.list));
  // }
}
