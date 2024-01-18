// DOM Selectors
const DOCBody = document.body;
const randomeMeals = document.querySelector('#randome-meals');
const popularIngredients = document.querySelectorAll('.popular-ingreddients');
// API URLS

let randomeMeal_url = 'https://www.themealdb.com/api/json/v1/1/random.php'
let randomeIngredients_url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
let searchByIngredients_url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='
// Functions for Fetch Requests 
// Randome Meal function.
async function randomeMealData(){
    try {      
        const results = await fetch(randomeMeal_url);
        const data = await results.json();
        if(data=== null){
            alert('wait')
        }else{
            // console.log(data);
            data.meals.forEach(meal => {
                let mealCard = document.createElement('div');
                mealCard.classList.add('mb-5')
                mealCard.innerHTML =  `
                <div class="w-full max-w-72 bg-slate-900 rounded-lg m-2 transition duration-300 ease-in-out hover:bg-black hover:shadow-lg hover:shadow-white">
                        <img class="p-3 rounded" src=${meal.strMealThumb} alt="meal image" />
                    <div class="px-1 pb-2">
                            <h5 class="text-xl text-center font-semibold tracking-tight text-neutral-400 transition duration-300 ease-in-out hover:text-white"> ${meal.strMeal} </h5>
                    </div>
                </div>
                `
                randomeMeals.append(mealCard)
            });
        }
    } catch (error) {
        console.log(error);
    }
}

// Search By Popular Infgredients
async function SearchByIngredientsData(ingredients) {
    const url = searchByIngredients_url + ingredients;
    const result = await fetch(url);
    const data = await result.json();
    console.log(data);

    // Create the main ingredientsDiv container
    let mainDiv = document.createElement('div')
    mainDiv.classList.add('popup-container', 'bg-slate-800', 'text-neutral-400', 'font-Ubuntu', 'fadeIn')
    let title = document.createElement('h1');
    title.classList.add('transition-all', 'duration-300', 'ease-in-out', 'hover:text-white')
    title.innerHTML = `The Meals You can get with ${ingredients}`;
    title.classList.add('text-4xl','mb-5', 'text-center', 'p-3')
    let closingButton = document.createElement('button');
    closingButton.innerHTML = `Close`;
    closingButton.classList.add('closing-button', 'bg-red-600', 'p-3', 'border-2', 'border-black', 'text-base');
    mainDiv.append(title);
    mainDiv.append(closingButton)
    DOCBody.appendChild(mainDiv)
    let ingredientsDiv = document.createElement('table');
    ingredientsDiv.classList.add('flex', 'flex-row', 'flex-wrap', 'justify-center')
    data.meals.forEach((meal) => {
        let ingredientCard = document.createElement('div');
        ingredientCard.innerHTML = `
        <tr>
            <div class="w-full max-w-72 bg-slate-900 rounded-lg m-2 transition duration-300 ease-in-out hover:bg-black hover:shadow-lg hover:shadow-white " data=${meal.strMeal}>
                <a href="#" class="rounded">
                    <img class="p-3 rounded" src=${meal.strMealThumb} alt="meal image" />
                </a>
                <div class="px-1 pb-2">
                    <a href="#">
                        <h5 class="text-xl text-center font-semibold tracking-tight text-neutral-400 transition duration-300 ease-in-out hover:text-white"> ${meal.strMeal} </h5>
                    </a>
                </div>
            </div>
        </tr>
        `;
        ingredientsDiv.appendChild(ingredientCard);
    });
    mainDiv.append(ingredientsDiv);
    closingButton.addEventListener('click', (e) => {
        mainDiv.classList.remove('fadeIn');
        mainDiv.classList.add('fadeOut');
        setTimeout(() => {
            mainDiv.remove();
        }, 500);
    });
}
// calling the Fecth functions

for(let i = 1; i <= 10; i++){
    randomeMealData();
}
popularIngredients.forEach((element)=>{
    element.addEventListener('click', (e)=>{
        const ingredientName = element.getAttribute('data');
        SearchByIngredientsData(ingredientName)
    })
})
