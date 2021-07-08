export default class Recipe {
  constructor(recipe) {
    this.recipe = recipe;
  }

  getDOM() {
    const { description, ingredients, name, time } = this.recipe;
    const containerBEM = 'result-card';
    const contentBEM = `${containerBEM}__content`;
    const bodyBEM = `${contentBEM}__body`;

    const article = document.createElement('article');
    article.className = containerBEM;

    const content = document.createElement('div');
    content.className = contentBEM;

    const contentHead = document.createElement('div');
    contentHead.className = `${contentBEM}__head`;

    const title = document.createElement('h2');
    title.appendChild(document.createTextNode(name));

    const timer = document.createElement('div');
    timer.className = 'timer';

    const img = document.createElement('img');
    img.src = 'dist/img/timer.svg';

    const timerText = document.createElement('span');
    timerText.appendChild(document.createTextNode(`${time} min`));
    timer.append(img, timerText);
    contentHead.append(title, timer);

    const contentBody = document.createElement('div');
    contentBody.className = bodyBEM;

    const list = document.createElement('ul');
    list.className = 'ingredients';
    ingredients.forEach((item) => {
      const { ingredient, quantity, unit } = item;

      const li = document.createElement('li');
      const ingredientName = document.createElement('strong');
      ingredientName.appendChild(document.createTextNode(`${ingredient}: `));

      const quantityElement = document.createElement('span');
      // TODO : filter display according to if quantity is undefined or not
      console.log(quantity);
      let quantityText;
      if (unit !== undefined) {
        quantityText = `${quantity} ${unit}`;
      } else {
        quantityText = `${quantity}`;
      }
      quantityElement.appendChild(document.createTextNode(quantityText));
      li.append(ingredientName, quantityElement);
      list.appendChild(li);
    });

    const paragraph = document.createElement('p');
    paragraph.className = 'description';
    paragraph.appendChild(document.createTextNode(description));

    contentBody.append(list, paragraph);
    content.append(contentHead, contentBody);
    article.appendChild(content);
    return article;
  }

  //   <article class="result-card">
  //   <div class="result-card__content">

  //     <div class="result-card__content__body">
  //       <ul class="ingredients">
  //         <li>
  //           <strong>Lait de coco:</strong>
  //           <span>400ml</span>
  //         </li>
  //       </ul>
  //       <p class="description">
  //         Mettre les glaçons à votre goût dans le blender, ajouter le lait, la
  //         crème de coco, le jus de 2 citrons et le surcre. Mixer jusqu'à avoir la
  //         consistence désirée.
  //       </p>
  //     </div>
  //   </div>
  // </article>
}
