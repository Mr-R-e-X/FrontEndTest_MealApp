// DOM Selectors
const DOCBody = document.body;
const randomeMeals = document.querySelector("#randome-meals");
const popularIngredients = document.querySelectorAll(".popular-ingreddients");
const searchForm = document.querySelector("#search-form");
// API URLS

let randomeMeal_url = "https://www.themealdb.com/api/json/v1/1/random.php";
let randomeIngredients_url =
  "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
let searchByIngredients_url =
  "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchedMeal = document.querySelector("#search-recipes");
  let searchedMealData = searchedMeal.value;
  console.log(searchedMealData);
  handleSearchBtn(searchedMealData);
});

// Functions for Fetch Requests
// Randome Meal function.
async function randomeMealData() {
  try {
    const results = await fetch(randomeMeal_url);
    const data = await results.json();
    if (data === null) {
      alert("wait");
    } else {
      // console.log(data);
      data.meals.forEach((meal) => {
        let mealCard = document.createElement("div");
        mealCard.classList.add("mb-5");
        mealCard.innerHTML = `
                <div class="w-full max-w-72 min-w-72 sm:max-w-60 rounded-lg m-2 transition duration-300 ease-in-out hover:bg-black hover:shadow-lg hover:shadow-white" data='${meal.strMeal}' >
                        <img class="p-3 rounded" src=${meal.strMealThumb} alt="meal image" data='${meal.strMeal}'/>
                    <div class="px-1 pb-2" data='${meal.strMeal}'>
                            <h5 class="text-lg text-center font-semibold tracking-tight text-neutral-400 transition duration-300 ease-in-out hover:text-white" data='${meal.strMeal}'> ${meal.strMeal} </h5>
                    </div>
                </div>
                `;
        randomeMeals.append(mealCard);
      });
    }
  } catch (error) {
    console.log(error);
  }
}
document.addEventListener("click", (e) => {
  //   console.log(e.target);
  let elem = e.target;
  let mealName = elem.getAttribute("data");
  if (mealName !== null) {
    console.log(mealName);
    handleClickMealCard(mealName);
  }
});
async function handleClickMealCard(mealName) {
  // console.log(mealName)
  let searchByName_url =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealName;
  // console.log(searchByName_url);
  let result = await fetch(searchByName_url);
  let data = await result.json();
  let recipe = JSON.stringify(data);
  localStorage.setItem("recipe", recipe);
  localStorage.setItem("recipeName", mealName);
  window.location.href = "recipe.html";
}

async function SearchByIngredientsData(ingredients) {
  const url = searchByIngredients_url + ingredients;
  const result = await fetch(url);
  const data = await result.json();
  const dataAsString = JSON.stringify(data);
  localStorage.setItem("searchByIngredients", dataAsString);
  localStorage.setItem("ingredient", ingredients);
  window.location.href = "page2.html";
}

async function handleSearchBtn(meal) {
  console.log('inside of handle Search!')
  let search_url =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal;
  let result = await fetch(search_url);
  let data = await result.json();
  console.log(data)
  if(data.meals===null){
    console.log('inside of null!');
    window.location.href = 'sorry.html';
  }else{
    let recipe = JSON.stringify(data);
    localStorage.setItem("recipe", recipe);
    localStorage.setItem("recipeName", meal);
    window.location.href = "recipe.html";
  }
}

// calling the Fecth functions

for (let i = 1; i <= 10; i++) {
  randomeMealData();
}
popularIngredients.forEach((element) => {
  element.addEventListener("click", (e) => {
    const ingredientName = element.getAttribute("data");
    SearchByIngredientsData(ingredientName);
  });
});
