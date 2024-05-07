// Selectors
const Main = document.querySelector("main");
const homeBtn = document.querySelectorAll(".home-btn");
// Collecting the data from the local storage
const dataFromStroage = localStorage.getItem("searchByIngredients");
const ingredients = localStorage.getItem("ingredient");
const data = JSON.parse(dataFromStroage);
// Creating HTML elements for the structure of DOM
let mainDiv = document.createElement("div");
let title = document.createElement("h1");
let ingredientsDiv = document.createElement("div");
// adding classes to the HTML elements
mainDiv.classList.add(
  "bg-slate-800",
  "text-neutral-400",
  "font-Ubuntu",
  "fadeIn"
);
title.classList.add(
  "mb-5",
  "p-3",
  "transition-all",
  "text-xl",
  "duration-300",
  "ease-in-out",
  "text-center",
  "hover:text-white"
);
ingredientsDiv.classList.add(
  "flex",
  "flex-row",
  "flex-wrap",
  "justify-center",
  "align-middle"
);
title.innerHTML = `--: The Recipes You can get :--`; // innerHTML of Title
// Appending The elements in the Main Div
mainDiv.append(title);
Main.appendChild(mainDiv);
// Itrating in the DATA and making a HTML element using data
data.meals.forEach((meal) => {
  // creating HTML element for the Meal Card
  let ingredientCard = document.createElement("div");
  // adding innerHTML
  ingredientCard.innerHTML = `
          <div class="w-full max-w-72 min-w-72 sm:max-w-52 m-2 transition duration-300 ease-in-out hover:bg-black hover:shadow-lg hover:shadow-white " data='${meal.strMeal}'>
              <div class="rounded-lg" data='${meal.strMeal}'>
                  <img class="p-2 " src=${meal.strMealThumb} alt="meal image" data='${meal.strMeal}' />
              </div>
              <div class="px-1 pb-2" data='${meal.strMeal}'>
                  <h5 class="text-xs text-center font-semibold tracking-tight text-neutral-400 transition duration-300 ease-in-out hover:text-white" data='${meal.strMeal}'> ${meal.strMeal} </h5>
              </div>
          </div>
      `;
  // Appending the card to the Parent Div
  ingredientsDiv.appendChild(ingredientCard);
});
// Appending the Parent Div to Main Div
mainDiv.append(ingredientsDiv);
// Home Btn Controller
homeBtn.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "../index.html";
  });
});
// Handaling the clicks on the Meal Card
document.addEventListener("click", (e) => {
  console.log(e.target);
  let elem = e.target;
  let mealName = elem.getAttribute("data");
  if (mealName !== null) {
    handleClickMealCard(mealName);
  }
});
// function to control the click on the Meal cards
async function handleClickMealCard(mealName) {
  // api url
  let searchByName_url =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealName;
  // Fetching the data from the API
  let result = await fetch(searchByName_url);
  let data = await result.json();
  let recipe = JSON.stringify(data);
  // Saving the data to lcoal storage
  localStorage.setItem("recipe", recipe);
  localStorage.setItem("recipeName", mealName);
  // redirecting to the recipe page
  window.location.href = "recipe.html";
}
