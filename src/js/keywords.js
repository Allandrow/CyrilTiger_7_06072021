export default class Keywords {
  constructor() {
    this.selectedKeywords = [];
  }

  // create keywords container
  createDOM() {
    const container = document.createElement('div');
    container.className = 'keywords-container';
    return container;
  }

  // return DOM of keywords container
  getDOM() {
    return this.createDOM();
  }

  // add a keyword to the list and display it inside container
  onChange(keyword) {}
}
