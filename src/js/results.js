export default class Results {
  // create results container
  createDOM() {
    const container = document.createElement('div');
    container.id = 'jsResults';
    container.className = 'results-container';

    return container;
  }

  // return DOM of results container
  getDOM() {
    return this.createDOM();
  }

  createResult(result) {
    const { description, ingredients, name, time } = result;

    const containerBEM = 'result-card';
    const contentBEM = `${containerBEM}__content`;
    const headBEM = `${contentBEM}__head`;
    const bodyBEM = `${contentBEM}__body`;

    const article = document.createElement('article');
    article.className = containerBEM;

    const content = document.createElement('div');
    content.className = contentBEM;

    const contentHead = document.createElement('div');
    contentHead.className = headBEM;

    const title = document.createElement('h2');
    title.textContent = name;

    const timer = document.createElement('div');
    timer.className = 'timer';

    const img = document.createElement('img');
    img.src = 'dist/img/timer.svg';

    const timerText = document.createElement('span');
    timerText.textContent = `${time} min`;
    timer.append(img, timerText);
    contentHead.append(title, timer);

    const contentBody = document.createElement('div');
    contentBody.className = bodyBEM;

    const list = document.createElement('ul');
    list.className = 'ingredients';
    ingredients.forEach((recipeIngredient) => {
      const { ingredient, quantity, unit } = recipeIngredient;

      const li = document.createElement('li');
      const ingredientName = document.createElement('strong');

      // Change textContent of ingredient depending of if it has a quantity and quantity unit
      if (quantity) {
        ingredientName.textContent = `${ingredient} : `;
        const quantityElement = document.createElement('span');
        let quantityText;

        if (unit !== undefined) {
          switch (unit) {
            case 'grammes':
              quantityText = `${quantity} g`;
              break;
            case 'litre':
            case 'litres':
            case 'Litres':
              quantityText = `${quantity} L`;
              break;
            default:
              quantityText = `${quantity} ${unit}`;
          }
        } else {
          quantityText = `${quantity}`;
        }
        quantityElement.textContent = quantityText;
        li.append(ingredientName, quantityElement);
      } else {
        ingredientName.textContent = ingredient;
        li.appendChild(ingredientName);
      }

      list.appendChild(li);
    });

    const paragraph = document.createElement('p');
    paragraph.className = 'description';
    paragraph.textContent = description;

    contentBody.append(list, paragraph);
    content.append(contentHead, contentBody);
    article.appendChild(content);
    return article;
  }

  // clear list of results and fill with new results
  onChange(results) {
    // TODO : find a way to get rid of searching DOM for container
    const container = document.getElementById('jsResults');

    while (container.lastElementChild) container.removeChild(container.lastElementChild);

    results.forEach((result) => {
      const resultDOM = this.createResult(result);
      container.appendChild(resultDOM);
    });
  }
}
