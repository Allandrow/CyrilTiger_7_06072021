/*
  display specific dropdown
  handle tag click
  filter tag list
*/

import { dropdownTexts } from './config.js';

export default class Dropdown {
  constructor(id) {
    this.id = id;
    this.summaryText = dropdownTexts[id].summaryText;
    this.placeholder = dropdownTexts[id].placeholder;
    this.list = '';
    this.input = '';

    // filter list via input here
  }

  createArrowIMG() {
    const img = document.createElement('img');
    img.src = 'dist/img/arrow.svg';
    return img;
  }

  setDOM() {
    const details = document.createElement('details');
    details.classList.add('dropdown', `${this.id}-color`);

    const summary = document.createElement('summary');
    summary.textContent = this.summaryText;
    summary.append(this.createArrowIMG());

    const inputDiv = document.createElement('div');
    inputDiv.className = 'inputGroup';

    const input = document.createElement('input');
    input.id = `${this.id}Search`;
    input.type = 'text';
    input.placeholder = `Recherche un ${this.placeholder}`;
    this.input = input;
    inputDiv.append(input, this.createArrowIMG());

    const list = document.createElement('ul');
    list.id = `${this.id}List`;
    this.list = list;

    details.append(summary, inputDiv, list);

    // click outside of an open details closes it
    window.addEventListener('click', (e) => {
      if (!details.open || e.target.closest('[open]' === details)) return;
      details.removeAttribute('open');
    });

    return details;
  }

  getDOM() {
    return this.setDOM();
  }
}

// createDOM() {
//   this.filterKeywords(input, list);
// }

//   // filter list of displayed keywords based on search terms from dropdown input
//   filterKeywords(input, list) {
//     input.addEventListener('input', () => {
//       Array.from(list.childNodes).forEach((listItem) => {
//         const itemText = listItem.textContent.toLowerCase();
//         if (!itemText.includes(input.value)) {
//           listItem.style.display = 'none';
//         } else {
//           listItem.style.display = 'block';
//         }
//       });
//     });
//   }

//   // clear list and fill with new results
//   onChange(results) {
//     const keywordSet = new Set();
//     const list = this.list;
//     const listFragment = new DocumentFragment();
//     list.innerHTML = '';

//     // fill set for each dropdown
//     results.forEach((result) => {
//       switch (this.id) {
//         case INGREDIENTS:
//           result.ingredients.forEach((ingredientItem) => keywordSet.add(ingredientItem.ingredient));
//           break;
//         case APPLIANCE:
//           keywordSet.add(result.appliance);
//           break;
//         case USTENSILS:
//           result.ustensils.every((ustensil) => keywordSet.add(ustensil));
//           break;
//       }
//     });

//     // display new list
//     keywordSet.forEach((keyword) => {
//       const btn = document.createElement('button');
//       btn.setAttribute('data-id', this.id);
//       btn.textContent = keyword;

//       const li = document.createElement('li');
//       li.appendChild(btn);
//       listFragment.appendChild(li);
//     });
//     list.appendChild(listFragment);
//   }
// }
