const searchBtn = document.getElementById("search__btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".content__wrapper");
const closeBtn = document.querySelector(".close-btn");

//event listener
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
closeBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});

function getMealList() {
  let searchInputTxt = document.getElementById("search__input").value.trim();
  console.log(searchInputTxt);
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.meals);
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `<div class="meal-item" data-id = ${meal.idMeal}>
          <div class="meal-img">
            <img src="${meal.strMealThumb}" alt="food" class="food--image" />
          </div>
          <div class="meal__name">
            <h3>${meal.strMeal}</h3>
          </div>
          <div class="meal__btn">
            <a href="#" class="recipe-btn">Get recipe</a>
          </div>
        </div>`;
        });
      } else {
        html = "Sorry we didn't find any meal";
      }
      mealList.innerHTML = html;
    });
}

function getMealRecipe(e) {
  e.preventDefault();

  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        mealRecipeModal(data.meals);
      });
  }
}

function mealRecipeModal(meal) {
  console.log(meal);
  meal = meal[0];

  let html = `
 
    <div class="content__text">
    <h2 class="content__header">${meal.strMeal}</h2>
    <p class="category">${meal.strCategory}</p>
    <p class="instructions">Instructions:</p>
    <p class="content__desc">${meal.strInstructions}</p>
    <div class = "recipe-link">
    <a class="watchmore" href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
    </div>
    </div>
    <div class="content__image__box">
    <img src="${meal.strMealThumb}" alt="foodimg" class="content__image" />
    </div>
    
   `;

  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
}
