const createTag = (text) => {
  const button = document.createElement('button');
  // TODO : dynamic value for color
  button.classList.add('tag', 'ingredient-color');

  const span = document.createElement('span');
  span.textContent = text;

  const img = document.createElement('img');
  img.src = 'dist/img/cross.svg';
  button.append(span, img);
  return button;
};
