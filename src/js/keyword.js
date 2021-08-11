export default class Keyword {
  constructor(keyword) {
    this.id = keyword.id;
    this.text = keyword.text;
  }

  createDOM() {
    const button = document.createElement('button');
    button.classList.add('keyword', `${this.id}-color`);
    button.setAttribute('data-id', this.id);
    button.textContent = this.text;

    const img = document.createElement('img');
    img.src = 'dist/img/cross.svg';

    button.appendChild(img);
    return button;
  }

  getDOM() {
    return this.createDOM();
  }
}
