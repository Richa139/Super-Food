// const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealdetailscontent=document.getElementById('meal-details-content');
// event listeners
// searchBtn.addEventListener('click',getMealList);
// var recipebtn=document.getElementById('recipe-btn');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
mealList.addEventListener('click',getmealrecipe);

var inputtext=document.getElementById('input-text');
inputtext.addEventListener("keypress",function(event){
    if(event.key=="Enter"){
        getMealList();
    }
});

recipeCloseBtn.addEventListener('click', () => {
    mealdetailscontent.parentElement.classList.remove('showrecipe');
});

// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('input-text').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}
function getmealrecipe(e){
    console.log("clicked");
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        // console.log(mealItem.innerHtml);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
    //    console.log(men);
    .then(response=>response.json())
    .then(data=>mealRecipeModal(data.meals));
    }
}
function mealRecipeModal(meal){
   console.log(meal);
   meal=meal[0];
   let html=
   `<h2 class = "recipe-title">${meal.strMeal}</h2>
   <p class = "recipe-category">${meal.strCategory}</p>
   <div class = "recipe-instruct">
       <h3>Instructions:</h3>
       <p>${meal.strInstructions}</p>
   </div>`;
   mealdetailscontent.innerHTML=html;
   mealdetailscontent.parentElement.classList.add('showrecipe');
}
