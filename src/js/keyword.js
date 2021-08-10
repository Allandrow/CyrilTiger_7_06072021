export default class Keyword {
  constructor(id, text) {
    this.id = id;
    this.text = text;
    this.keywordDeletionCallbacks = [];
  }

  createDOM() {
    const button = document.createElement('button');
    button.classList.add('keyword', `${this.id}-color`);
    button.setAttribute('data-id', this.id);
    button.textContent = this.text;

    const img = document.createElement('img');
    img.src = 'dist/img/cross.svg';

    button.appendChild(img);

    button.addEventListener('click', (e) => {
      e.preventDefault();
      const tag = {
        id: this.id,
        text: this.text
      };
      this.onKeywordDeletionTrigger(tag);
    });

    return button;
  }

  getDOM() {
    return this.createDOM();
  }

  // onChange(cb) {
  //   this.keywordDeletionCallbacks.push(cb);
  // }

  // onKeywordDeletionTrigger(tag) {
  //   this.keywordDeletionCallbacks.forEach((cb) => cb(tag));
  // }
}
