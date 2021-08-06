export default class Keywords {
  constructor() {
    this.container = '';
  }

  setDOM() {
    const container = document.createElement('div');
    container.className = 'keywords-container';
    container.id = 'jsKeywords';
    this.container = container;
    return container;
  }

  getDOM() {
    return this.setDOM();
  }
}

//#region FUNCTION TO DO
// export default class Keywords {
//   constructor() {
//     this.selectedKeywords = new Map();
//     this.container = '';
//   }

//   // return keywords selection
//   getKeywords() {
//     return this.selectedKeywords;
//   }

//   // create keyword DOM element
//   createKeywordButton(mapKeyword) {
//     const button = document.createElement('button');
//     button.classList.add('keyword', `${mapKeyword.id}-color`);
//     button.setAttribute('data-id', mapKeyword.id);
//     button.textContent = mapKeyword.label;

//     const img = document.createElement('img');
//     img.src = 'dist/img/cross.svg';

//     button.appendChild(img);
//     return button;
//   }

//   // empty current list and append a new one
//   updateKeywordList() {
//     const container = this.container;
//     const containerFragment = new DocumentFragment();
//     container.innerHTML = '';

//     this.selectedKeywords.forEach((keyword) => {
//       const btn = this.createKeywordButton(keyword);
//       containerFragment.appendChild(btn);
//     });

//     container.appendChild(containerFragment);
//   }

//   // add keyword to map if not in it already, delete keyword if present, then updates the displayed list
//   onChange(id, label) {
//     const keywordHash = `${id}-${label}`;
//     if (this.selectedKeywords.get(keywordHash)) {
//       this.selectedKeywords.delete(keywordHash);
//     } else {
//       this.selectedKeywords.set(keywordHash, { id, label });
//     }
//     this.updateKeywordList();
//   }
// }
//#endregion
