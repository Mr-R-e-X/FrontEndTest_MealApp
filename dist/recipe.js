// Home Button controller
const homeBtn = document.querySelectorAll(".home-btn");
homeBtn.forEach((elem) => {
  // console.log(elem)
  elem.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "../index.html";
  });
});
// Selectors
let Main = document.querySelector("main");
// Collecting the data from the local storage
let meal = localStorage.getItem("recipe");
let mealName = localStorage.getItem("recipeName");
let recipe = JSON.parse(meal);
// Making an array store the Ingredient Img, Name and Measurements
let procedureArray = [];
// Creating the HTML elements for DOM structure
let title = document.createElement("h1");
let area = document.createElement("p");
let catagory = document.createElement("h3");
let instructions = document.createElement("p");
let MealthumbImg = document.createElement("img");
title.innerHTML = mealName; // innerHTML if title
// adding classes
title.classList.add(
  "text-2xl",
  "text-center",
  "tracking-tight",
  "text-neutral-400",
  "transition-all",
  "duration-300",
  "ease-in-out",
  "hover:text-white"
);
area.classList.add(
  "text-lg",
  "tracking-tight",
  "text-neutral-300",
  "transition-all",
  "duration-300",
  "ease-in-out",
  "hover:text-white",
  "pl-3",
  "pt-3"
);
catagory.classList.add(
  "text-lg",
  "tracking-tight",
  "text-neutral-300",
  "transition-all",
  "duration-300",
  "ease-in-out",
  "hover:text-white",
  "pl-3"
);
// Setting up the innerHTML
catagory.innerHTML = `Type : ${recipe.meals[0].strCategory}`;
instructions.innerHTML = recipe.meals[0].strInstructions;
area.innerHTML = `Origin : ${recipe.meals[0].strArea}`;
MealthumbImg.src = recipe.meals[0].strMealThumb;
// appending to the Main
Main.append(title);
Main.append(area);
// Pushing the Ingredient Img, Name and Measurements Data in Procedure Array
for (let i = 0; i < 20; i++) {
  let ingredients = "strIngredient" + (i + 1);
  let measurements = "strMeasure" + (i + 1);
  let msmrnt = null;
  let thumb = null;
  let ingrdnt = null;
  if (
    recipe.meals[0][measurements] !== null &&
    recipe.meals[0][measurements] !== ""
  ) {
    msmrnt = recipe.meals[0][measurements];
  }
  if (
    recipe.meals[0][ingredients] !== null &&
    recipe.meals[0][ingredients] !== ""
  ) {
    let name = recipe.meals[0][ingredients];
    thumb = searchIngrdThumb(name);
    ingrdnt = name;
  }
  if (msmrnt !== null && ingrdnt !== null && thumb !== null) {
    procedureArray.push({
      measurement: msmrnt,
      ingradinet: ingrdnt,
      thumbImg: thumb,
    });
    msmrnt = null;
    thumb = null;
    ingrdnt = null;
  }
}
// Function to Search the Ingredient Image
async function searchIngrdThumb(name) {
  //  api url
  let searchThumbUrl =
    "https://www.themealdb.com/images/ingredients/" + name + ".png";
  let thumbImg = await fetch(searchThumbUrl);
  return thumbImg;
}
// Function to make the HTML card
async function processProcedureArray() {
  // Parent div of cards
  let parentDiv = document.createElement("div");
  // Adding classes
  parentDiv.classList.add("flex", "flex-row", "flex-wrap", "justify-evenly");
  // Itrating in procedureArray to make the HTML card
  for (const elem of procedureArray) {
    // Creating HTML element for card structure
    let ingrDiv = document.createElement("div");
    let imgDiv = document.createElement("div");
    let img = document.createElement("img");
    // collencting the img url of ingredient from the "Promise"
    try {
      const res = await elem.thumbImg;
      const url = res.url;

      img.src = url;
      img.alt = "meal image";
      img.classList.add("p-2");
      // img card
      imgDiv.appendChild(img);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
    // innerHTML of Card
    ingrDiv.innerHTML = `
      <div class="w-full max-w-32 m-2 transition duration-300 ease-in-out hover:bg-black hover:shadow-lg hover:shadow-white ">
          <div class="rounded-lg">
              ${imgDiv.innerHTML}
          </div>
          <div class="px-1 pb-2">
              <h5 class="text-xs text-center font-semibold tracking-tight text-neutral-400 transition duration-300 ease-in-out hover:text-white">
                  <span>${elem.measurement}</span>
                  <span>${elem.ingradinet}</span>
              </h5>
          </div>
      </div>
    `;
    // appendign the card to Parent Div
    parentDiv.append(ingrDiv);
  }
  // HTML for Meal Img
  let flexDiv = document.createElement("div");
  // defining the HTML structure for Meal
  flexDiv.innerHTML = `
    <div class="m-5 flex flex-col justify-between sm:flex-row sm: ">
      <div>
        <h3 class="text-xl text-center p-3"> Meal Image </h3>
        <div class="min-w-72 max-w-72 mx-auto flex items-center">
          <img src=${MealthumbImg.src} />
        </div>
        <h3 class="text-xl text-center p-3"> ${catagory.innerHTML} </h3>
      </div>
      <div>
        <h3 class="text-xl text-center p-3">Ingredients</h3>
        <div class="flex flex-row flex-wrap justify-center">
          ${parentDiv.innerHTML}
        </div>
      </div>
    </div>
  `;
  // appending to the Main
  Main.append(flexDiv);
  let istructionsWraper = document.createElement("div");
  istructionsWraper.innerHTML = `
    <div class='flex flex-col p-5'>
      <h3 class="text-xl text-center p-3">Instructions</h3>
      <div class='tracking-wide text-justify'>
        ${instructions.innerHTML}
      </div>
    </div>
  `;
  Main.append(istructionsWraper);
}
//  calling of the function
processProcedureArray();
