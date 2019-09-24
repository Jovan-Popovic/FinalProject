
let filtersData = [];
let filtersOutput = ``;
let counter = 0;
let maxCount = 100;
let mainOutput = ``;
let ingredientsData = [];

function addCategories(){
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`)
  .then(res => res.json())
  .then(data =>{
    filtersData = data;
    for(counter;counter<filtersData.drinks.length;counter++){
      filtersOutput += `<option id="category-${counter}" value="${filtersData.drinks[counter].strCategory}">${filtersData.drinks[counter].strCategory}</option>`;
    }
    document.getElementById("dropdown").innerHTML += filtersOutput;
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
      filtersOutput += `
      <div id="ingredient-${counter}" class="form-checkbox">
        <input type="checkbox" value="${filtersData.drinks[counter].strCategory}">
        <label for="${filtersData.drinks[counter].strCategory}">${filtersData.drinks[counter].strIngredient1}</label>
      </div>  
      `;
    }
    document.getElementById("form-check").innerHTML += filtersOutput;
    counter = 0;
    filtersData = [];
    filtersOutput = ``;
  })
}
addIngredients();

function fetchData(srcOrFil,tabName,filterId){
  inputValue = document.getElementById(filterId).value
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/${srcOrFil}.php?${tabName}=${inputValue}`)
  .then(res => res.json())
  .then(data => {
    filtersData = data;
    for(counter;counter<filtersData.drinks.length;counter++){
      filtersOutput += `
      <div class="card">
        <img src="${filtersData.drinks[counter].strDrinkThumb}" class="card-img-top" alt="...">
        <div id="card-body${counter}" class="card-body">
        <h5 class="card-title">${filtersData.drinks[counter].strDrink}</h5>
        </div>
      </div>`;      
    }
    document.getElementById("filter-results").innerHTML += filtersOutput;
    counter = 0;
    filtersData = [];
    filtersOutput = ``;
    inputValue = ``;
  })
}

document.getElementById("name-search-button").addEventListener("click",fetchData("search","s","search-box"));
document.getElementById("category-search-button").addEventListener("click",fetchData("filter","c","dropdown"/*bad id*/));
document.getElementById("ingredient-search-button").addEventListener("click",fetchData("filter","i","form-check"/*bad id*/));

