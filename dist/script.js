// DOM Selectors
const DOCBody = document.body;
const randomeMeals = document.querySelector("#randome-meals");
const popularIngredients = document.querySelectorAll(".popular-ingreddients");
const searchForm = document.querySelector("#search-form");
const alphabates = document.querySelector("#alphabates");
const browseByCountry = document.querySelector("#browseCountry");
const randomeIngrds = document.querySelector("#randomeIngr");
// API URLS

let randomeMeal_url = "https://www.themealdb.com/api/json/v1/1/random.php";
let randomeIngredients_url =
  "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
let searchByIngredients_url =
  "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

// controlling the search from
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
      window.location.href = "sorry.html";
    } else {
      // Itrating on the data and making the cards
      data.meals.forEach((meal) => {
        // cretaing HTML elments
        let mealCard = document.createElement("div");
        // ading classes
        mealCard.classList.add("mb-5");
        // adding inerHTML
        mealCard.innerHTML = `
                <div class="w-full max-w-72 min-w-72 sm:max-w-60 rounded-lg m-2 transition duration-300 ease-in-out hover:bg-black hover:shadow-lg hover:shadow-white" data='${meal.strMeal}' >
                        <img class="p-3 rounded" src=${meal.strMealThumb} alt="meal image" data='${meal.strMeal}'/>
                    <div class="px-1 pb-2" data='${meal.strMeal}'>
                            <h5 class="text-lg text-center font-semibold tracking-tight text-neutral-400 transition duration-300 ease-in-out hover:text-white" data='${meal.strMeal}'> ${meal.strMeal} </h5>
                    </div>
                </div>
                `;
        // appemding the card to parent div
        randomeMeals.append(mealCard);
      });
    }
  } catch (error) {
    console.log(error);
  }
}
// Handeling the clicks on the Randome meal cards
document.addEventListener("click", (e) => {
  let elem = e.target;
  let mealName = elem.getAttribute("data");
  if (mealName !== null) {
    console.log(mealName);
    // calling the function "handleClickMealCard"
    handleClickMealCard(mealName);
  }
});
// function to control the clicks on randome meal cards
async function handleClickMealCard(mealName) {
// api url
  let searchByName_url =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealName;
  // fetching the data
  let result = await fetch(searchByName_url);
  let data = await result.json();
  let recipe = JSON.stringify(data);
  // saving the data in local storage
  localStorage.setItem("recipe", recipe);
  localStorage.setItem("recipeName", mealName);
  // redirecting to the recipe page
  window.location.href = "recipe.html";
}
// Handaling clicks on Popular Ingredients 
async function SearchByIngredientsData(ingredients) {
  // api url
  const url = searchByIngredients_url + ingredients;
  // fetching the data
  const result = await fetch(url);
  const data = await result.json();
  const dataAsString = JSON.stringify(data);
  // saving the data in the local storage
  localStorage.setItem("searchByIngredients", dataAsString);
  localStorage.setItem("ingredient", ingredients);
  // redirecting to meal page
  window.location.href = "meal.html";
}
// Handaling the Search btn
async function handleSearchBtn(meal) {
  // api url
  let search_url =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal;
  // fetching data
  let result = await fetch(search_url);
  let data = await result.json();
  // checking the data
  if (data.meals === null) {
    console.log("inside of null!");
    window.location.href = "sorry.html";
  } else {
    let recipe = JSON.stringify(data);
    // saving the data to local storage
    localStorage.setItem("recipe", recipe);
    localStorage.setItem("recipeName", meal);
    // redirecting to the recipe page
    window.location.href = "recipe.html";
  }
}
// handaling the clicking on the Browse Meal section
alphabates.addEventListener("click", (e) => {
  e.preventDefault();
  // colecting the attribute data
  let alphabate = e.target.getAttribute("val");
  // checking the data
  if (alphabate !== null) {
    // calling the handeler function
    searchByAlphabates(alphabate);
  }
});
// function for search by alphabates
async function searchByAlphabates(alphabate) {
  // api url
  let alphabate_url =
    "https://www.themealdb.com/api/json/v1/1/search.php?f=" + alphabate;
  // fetching the data
    let result = await fetch(alphabate_url);
  let data = await result.json();
  // checking the data
  if (data.meals === null) {
    // if null redirecting the sorry page
    window.location.href = "sorry.html";
  } else {
    const dataAsString = JSON.stringify(data);
    // saving the data in loacl storage
    localStorage.setItem("searchByIngredients", dataAsString);
    localStorage.setItem("ingredient", alphabate);
    // redirecting to the meal page
    window.location.href = "meal.html";
  }
}
// handeling the clicks on the country flags
browseByCountry.addEventListener("click", (e) => {
  e.preventDefault();
  // collecting the name of the country from attribute
  let country = e.target.getAttribute("name");
  // checcking the data
  if(country !== null){
    // calling the handeller function
    browseByArea(country);
  }
});
// handeller function for filtered by Country
async function browseByArea(country) {
  // api url
  let country_url =
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + country;
  // fetching the data
    let result = await fetch(country_url);
  let data = await result.json();
  // checking the data
  if (data.meals === null) {
    // if data is null then redirecting to the sorry page
    window.location.href = "sorry.html";
  } else {
    const dataAsString = JSON.stringify(data);
    // saving the data to local storage
    localStorage.setItem("searchByIngredients", dataAsString);
    localStorage.setItem("ingredient", country);
    // redirecting to the meal page
    window.location.href = "meal.html";
  }
}
// Handeling the randome ingredients section
async function randomIngredients() {
  // api url
  let ingrds_url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
  // fetching the data
  let result = await fetch(ingrds_url);
  let data = await result.json();
  let ingredientsList = data.meals;
  // sorting the data in the randome order
  ingredientsList = ingredientsList.sort(() => Math.random() - 0.5);

  // Select the first 10 ingredients from the shuffled list
  let randomIngredients = ingredientsList.slice(0, 10);
  // Itrating on the randomIngredients and making the HTML card
  randomIngredients.forEach(async function (elem) {
    // calling the function to get the igredient img
    let imgResponse = searchIngrdThumb(elem.strIngredient);
    // taking the data from the Promise
    let img = await imgResponse;
    let imgUrl = img.url;
    // creating the HTML elements
    let ingrDiv = document.createElement("div");
    // adding classes
    ingrDiv.classList.add("mb-5", "cursor-pointer");
    // adding attribute to handle latter clicks
    ingrDiv.setAttribute("data", elem.strIngredient);
    // setting up the innerHTML
    ingrDiv.innerHTML = `
    <div
      class="w-full max-w-40 rounded-lg m-2 transition-all duration-300 ease-in-out hover:bg-black hover:shadow-lg hover:shadow-white" data='${elem.strIngredient}'
    >
      <img
        class="p-3 rounded"
        src=${imgUrl}
        alt="ingredients image"
        data='${elem.strIngredient}'
      />
      <div class="px-1 pb-2" data='${elem.strIngredient}'>
        <h5
          class="text-lg text-center font-semibold tracking-tight text-neutral-400 transition-all duration-300 ease-in-out hover:text-white" data='${elem.strIngredient}'
        >
          ${elem.strIngredient}
        </h5>
      </div>
    </div>
    `;
    // appending the card
    randomeIngrds.append(ingrDiv);
  });
}
//  function to seatch the img of ingredients
async function searchIngrdThumb(name) {
  let searchThumbUrl =
    "https://www.themealdb.com/images/ingredients/" + name + ".png";
  let thumbImg = await fetch(searchThumbUrl);
  // let img = await thumbImg.json();
  return thumbImg;
}
// handleing the clicks on the randomeIngredients cards
randomeIngrds.addEventListener('click', (e)=>{
  e.preventDefault();
  // collecting the data from the attribute
  let ingr = e.target.getAttribute('data');
  // cheking the data
  if(ingr !== null){
    // calling the handeller function
    SearchByIngredientsData(ingr);
  }
})


// calling the Fecth functions
randomIngredients();
// calling the randome meal function
for (let i = 1; i <= 10; i++) {
  randomeMealData();
}
// handeling the clicks on the popular ingredient section
popularIngredients.forEach((element) => {
  element.addEventListener("click", (e) => {
    const ingredientName = element.getAttribute("data");
    SearchByIngredientsData(ingredientName);
  });
});