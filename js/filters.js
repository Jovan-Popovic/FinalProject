
let filtersData = [];
let filtersOutput = ``;
let counter = 0;
let maxCount = 100;
let mainOutput = ``;
let ingredientsData = [];
let name = document.getElementById("search-box").value;
let fetchData = function(tabName,id){
  tabName = document.querySelector(".tab-pane.active");
  id = document.getElementById(``).target.value;
}

document.getElementById("filter-search-button"),addEventListener("click",searchByName);

function searchByName(){
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
function addCategories(){
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`)
  .then(res => res.json())
  .then(data =>{
    filtersData = data;
    for(counter;counter<filtersData.drinks.length;counter++){
      filtersOutput += `<option value="${filtersData.drinks[counter].strCategory}">${filtersData.drinks[counter].strCategory}</option>`;
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
                          <input type="checkbox" id="${filtersData.drinks[counter].strCategory}" value="${filtersData.drinks[counter].strCategory}">
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
