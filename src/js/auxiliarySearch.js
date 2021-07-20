// export default class AuxiliarySearch {
//   constructor(name, recipes) {
//     this.name = name;
//     this.recipes = recipes;

//     // Create text and placeholder based on name
//     switch (name) {
//       case 'ingredients':
//         this.summaryText = 'Ingrédients';
//         this.placeholder = 'ingrédient';
//         break;
//       case 'appliance':
//         this.summaryText = 'Appareil';
//         this.placeholder = 'appareil';
//         break;
//       case 'ustensils':
//         this.summaryText = 'Ustensiles';
//         this.placeholder = 'ustensile';
//         break;
//     }
//   }

//   getAuxiliaryListElements(recipes = this.recipes) {
//     const auxiliarySet = new Set();
//     recipes.forEach((recipe) => {
//       switch (this.name) {
//         case 'ingredients':
//           recipe.ingredients.forEach((ingredientItem) => {
//             auxiliarySet.add(ingredientItem.ingredient);
//           });
//           break;
//         case 'appliance':
//           auxiliarySet.add(recipe.appliance);
//           break;
//         case 'ustensils':
//           recipe.ustensils.forEach((ustensil) => auxiliarySet.add(ustensil));
//           break;
//       }
//     });
//     return auxiliarySet;
//   }

//   createDOM() {
//     const details = document.createElement('details');
//     details.classList.add('auxiliary-search', `${this.name}-color`);

//     const summary = document.createElement('summary');
//     summary.textContent = this.summaryText;

//     const arrow = document.createElement('img');
//     arrow.src = 'dist/img/arrow.svg';
//     summary.appendChild(arrow);

//     const div = document.createElement('div');
//     div.className = 'inputRow';

//     const input = document.createElement('input');
//     input.id = `${this.name}Search`;
//     input.type = 'text';
//     input.placeholder = `Recherche un ${this.placeholder}`;

//     const img = document.createElement('img');
//     img.src = 'dist/img/arrow.svg';

//     div.append(input, img);

//     const list = document.createElement('ul');
//     list.id = `${this.name}List`;

//     const listItems = this.getAuxiliaryListElements();
//     listItems.forEach((item) => {
//       const li = document.createElement('li');
//       const btn = document.createElement('button');
//       btn.className = 'auxiliary-btn';
//       btn.textContent = item;
//       li.appendChild(btn);
//       list.appendChild(li);
//     });

//     details.append(summary, div, list);

//     //toggle events
//     details.addEventListener('toggle', (e) => {
//       if (!e.target.open) return;
//       const openDropdowns = document.querySelectorAll('.auxiliary-search[open]');
//       openDropdowns.forEach((dropdown) => {
//         if (dropdown === e.target) return;
//         dropdown.removeAttribute('open');
//       });
//     });

//     // click outside of an open details closes it
//     window.addEventListener('click', (e) => {
//       if (!details.open || e.target.closest('[open]') === details) return;
//       details.removeAttribute('open');
//     });

//     return details;
//   }

//   getDOM() {
//     return this.createDOM();
//   }
// }
