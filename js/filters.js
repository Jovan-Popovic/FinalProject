
let filtersData = [];
let filtersOutput = ``;
let counter = 0;
let maxCount = 100;
let mainOutput = ``;
let ingredientsData = [];
let name = ``;
/*
document.getElementById("filter-search-button").addEventListener("click",searchByName);

function searchByName(){
  name = document.getElementById("search-box").value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
  .then(res => res.json())
  .then(data =>{
    filtersData = data;
    for(counter;counter<filtersData.drinks.length;counter++){
      filtersOutput += `
      <div class="card">
        <img src="${filtersData.drinks[counter].strDrinkThumb}" class="card-img-top" alt="...">
        <div id="card-body${counter}" class="card-body">
        <h5 class="card-title">${filtersData.drinks[counter].strDrink}</h5>
        <p class="card-text">${filtersData.drinks[counter].strInstructions}</p>
        </div>
      </div>`;
    }
    document.getElementById("filter-results").innerHTML += filtersOutput;
    counter = 0;
    filtersData = [];
    filtersOutput = ``;
  })
}
*/
function addCategories(){
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`)
  .then(res => res.json())
  .then(data =>{
    filtersData = data;
    for(counter;counter<filtersData.drinks.length;counter++){
      filtersOutput += `<option id="category-${counter}" value="${filtersData.drinks[counter].strCategory}">${filtersData.drinks[counter].strCategory}</option>`;
    }
    document.getElementById("category-search").innerHTML +=`<select name="category" id="dropdown" class="form-control col-10">` + filtersOutput + `</select>`;
    counter = 0;
    filtersData = [];
    filtersOutput = ``;
  })
}
addCategories();

function addIngredients(){
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`)
  .then(res => res.json())
  .then(data =>{
    filtersData = data;
    for(counter;counter<filtersData.drinks.length;counter++){
      filtersOutput += `<div class="form-checkbox">
                          <input type="checkbox" id="ingredient-${counter}" value="${filtersData.drinks[counter].strCategory}">
                          <label for="${filtersData.drinks[counter].strCategory}">${filtersData.drinks[counter].strIngredient1}</label>
                        </div>  
      `;
    }
    document.getElementById("ingredients-search").innerHTML += filtersOutput;
    counter = 0;
    filtersData = [];
    filtersOutput = ``;
  })
}
addIngredients();


function fetchData(tabName,inputValue){
  //inputValue = document.getElementById(``).value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?${tabName}=${inputValue}`)
  .then(res => res.json())
  .then(data => {
    filtersData = data;
    for(counter;counter<filtersData.drinks.length;counter++){
      filtersOutput += `
      <div class="card">
        <img src="${filtersData.drinks[counter].strDrinkThumb}" class="card-img-top" alt="...">
        <div id="card-body${counter}" class="card-body">
        <h5 class="card-title">${filtersData.drinks[counter].strDrink}</h5>
        <p class="card-text">Instructions: ${filtersData.drinks[counter].strInstructions}</p>
        </div>
      </div>`;      
    }
    document.getElementById("filter-search-button").addEventListener("click",function loadFilterResults(){
      document.getElementById("filter-results").innerHTML += filtersOutput;
      counter = 0;
      filtersData = [];
      filtersOutput = ``;
    })
  })
}

document.getElementById("name-search-tab").addEventListener("click",fetchData("s",/*name.value*/))
document.getElementById("category-search-tab").addEventListener("click",fetchData("c",/*category.value*/))
document.getElementById("ingredient-search-tab").addEventListener("click",fetchData("i",/*ingredients.value*/))
