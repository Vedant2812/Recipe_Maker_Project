// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  let recipesString = localStorage.getItem('recipes');
  let recipes = JSON.parse(recipesString);

  if (recipes == null) {
    return []; // return new empty array
  }
  else {
    return recipes;
  }
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  const mainRef = document.querySelector('main');

  for (let i = 0; i < recipes.length; i++) {
      let recipeCard = document.createElement('recipe-card');
      recipeCard.data = recipes[i];
      mainRef.append(recipeCard);
  }
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {

  let formRef = document.querySelector('form');
  
  document.querySelector('button').addEventListener('click', (event) => {
    event.preventDefault();

    let formData = new FormData(formRef);

    let recipeObject = {};
    for (const key of formData.keys()) {
      recipeObject[key] = formData.get(key);
    }
  
    let recipeCard = document.createElement('recipe-card');

    recipeCard.data = recipeObject;

    document.querySelector('main').append(recipeCard);
    
    let recipes = getRecipesFromStorage();

    // Note that recipes can be an empty array
    recipes.push(recipeObject);
    saveRecipesToStorage(recipes);
  });
  let clearRef = document.getElementsByClassName('danger')[0];

  clearRef.addEventListener('click', (e) => {
    localStorage.clear();

    document.querySelector('main').innerHTML = "";
  });
}
