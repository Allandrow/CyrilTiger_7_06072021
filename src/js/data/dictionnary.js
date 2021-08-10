const fs = require('fs');
const recipes = require('./recipes.js');

const dictionnary = [];

const createWordSet = (string) => {
  const wordSet = new Set();
  const regex = /[!"' ,.?()]/g;
  const words = string
    .toLowerCase()
    .split(regex)
    .filter((word) => word.length >= 3);

  words.forEach((word) => wordSet.add(word));
  return wordSet;
};

const createWordSubstrings = (word) => {
  const len = word.length;
  let arr = [];

  for (let i = 0; i <= len - 3; i++) {
    for (let j = 0; j <= i; j++) {
      const substr = word.slice(j, len - i + j);
      arr.push(substr);
    }
  }
  return arr;
};

recipes.forEach((recipe) => {
  const { name, description, ingredients } = recipe;
  let recipeTexts = [name, description];

  ingredients.forEach((ingredient) => {
    recipeTexts = [...recipeTexts, ingredient.ingredient];
  });
  recipeTexts = recipeTexts.join(' ');
  const words = createWordSet(recipeTexts);
  words.forEach((word) => {
    const substrings = createWordSubstrings(word);
    substrings.forEach((str) => {
      const objInDictionnary = dictionnary.find((obj) => obj.s === str);
      // substring is already in dictionnary, add recipe id to set of object
      if (objInDictionnary) {
        if (!objInDictionnary.r.includes(recipe.id)) {
          objInDictionnary.r.push(recipe.id);
        }
        return;
      }
      // substring is not in dictionnary, create object with substring: substring and recipeIdds: set
      dictionnary.push({
        s: str,
        r: [recipe.id]
      });
    });
  });
});

fs.writeFile('src/js/data/index.json', JSON.stringify(dictionnary), function (err) {
  if (err) throw err;
  console.log('complete');
});
