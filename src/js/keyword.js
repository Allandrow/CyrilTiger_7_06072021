export default class Keyword {
  constructor(keyword) {
    this.keyword = keyword;
    this.id = keyword.id;
    this.text = keyword.text;
    this.deletionCallbacks = [];
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
      this.onDeletionTrigger(this.keyword);
    });

    return button;
  }

  getDOM() {
    return this.createDOM();
  }

  onDeletion(cb) {
    this.deletionCallbacks.push(cb);
  }

  onDeletionTrigger(keyword) {
    this.deletionCallbacks.forEach((cb) => cb(keyword));
  }
}
