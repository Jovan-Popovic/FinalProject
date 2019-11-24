//Declare all html elements
const nameBtn = document.getElementById("name-search-button");
const categoryBtn = document.getElementById("category-search-button");
const ingredientBtn = document.getElementById("ingredient-search-button");
const categorySelect = document.getElementById("category-select");
const ingredentSelect = document.getElementById("ingredient-select");
const filterResults = document.getElementById("filter-results");

//Declare all other variables
let filtersData = new Array();
let filtersOutput = new String();
let counter = 0;
let modalData = new Array();

//Add aevent listeners for all search buttons
nameBtn.addEventListener("click",function(){fetchData("search", "s", "search-box")});
categoryBtn.addEventListener("click",function(){fetchData("filter", "c", "category-select")});
ingredientBtn.addEventListener("click",function(){fetchData("filter", "i", "ingredient-select")});

//Load all categories in category select element
function addCategories(){
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`)
  .then(res => res.json())
  .then(data =>{
    filtersData = data;
    for(counter;counter<filtersData.drinks.length;counter++){
      filtersOutput += `<option id="category-${counter}" value="${filtersData.drinks[counter].strCategory}">${filtersData.drinks[counter].strCategory}</option>`;
    }
    categorySelect.innerHTML += filtersOutput;
    counter = 0;
    filtersData = [];
    filtersOutput = ``;
  })
}
addCategories();

//Load all ingredients in ingredient select element
function addIngredients(){
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`)
  .then(res => res.json())
  .then(data =>{
    filtersData = data;
    for(counter; counter < 30; counter++){
      filtersOutput += `<option id="ingredient-${counter}" value="${filtersData.drinks[counter].strIngredient1}">
      ${filtersData.drinks[counter].strIngredient1}</option>
      `;
    }
    ingredentSelect.innerHTML += filtersOutput;
    counter = 0;
    filtersData = [];
    filtersOutput = ``;
  })
}
addIngredients();

//Callback function for loading data (depending on whish filter is chosen)
function fetchData(srcOrFil, tabName, filterId){
  filterResults.innerHTML = ``;
  inputValue = document.getElementById(filterId).value
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/${srcOrFil}.php?${tabName}=${inputValue}`)
  .then(res => res.json())
  .then(data => {
    filtersData = data;
    for(counter; counter < filtersData.drinks.length; counter++){
      filtersOutput += `
      <div id="card${counter}" class="col-12 col-sm-6 col-md-4 col-lg-4">
        <div class="card">
          <img src="${filtersData.drinks[counter].strDrinkThumb}" class="card-img-top" alt="...">
          <div id="card-body${counter}" class="card-body">
            <h5 class="card-title">${filtersData.drinks[counter].strDrink}</h5>
            <button id="modal-button${filtersData.drinks[counter].idDrink}" type="button" class="btn btn-warning" data-toggle="modal" data-target="#listModal${filtersData.drinks[counter].idDrink}">Read More</button>
            <div class="modal fade" id="listModal${filtersData.drinks[counter].idDrink}" tabindex="-1" role="dialog" aria-labelledby="listModalScrollableTitle${counter}" aria-hidden="true"></div>
          </div>
        </div>
      </div> `;
      filterResults.innerHTML += filtersOutput;
      filtersOutput = ``;
      document.getElementById(`modal-button${filtersData.drinks[counter].idDrink}`).addEventListener("click",listModal(`${filtersData.drinks[counter].idDrink}`));
    }
    counter = 0;
    filtersData = [];
    inputValue = ``; 
  })
}

function listModal(modalId){
  let modalOutput = new String();
  let modalIngredients = new String();
  let ingredientsCounter = 1;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${modalId}`)
  .then(res => res.json())
  .then(data => {
    modalData = data;
    modalOutput += ` 
    <div class="modal-dialog modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="listModalScrollableTitle${modalData.drinks[counter].idDrink}">${modalData.drinks[counter].strDrink}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      <div class="modal-body">
        <img class="card-img-top" src="${modalData.drinks[counter].strDrinkThumb}">
        <h4 class="modal-title">Category</h4>
        <p class="modal-text">${modalData.drinks[counter].strCategory}</p>
        <h4 class="modal-title">Glass</h4>
        <p class="modal-text">${modalData.drinks[counter].strGlass}</p>
        <h4 class="modal-title">Ingredients</h4>`
        for(ingredientsCounter;ingredientsCounter<16;ingredientsCounter++){
          if(modalData.drinks[counter]["strIngredient" + ingredientsCounter] !== "" 
          && modalData.drinks[counter]["strIngredient" + ingredientsCounter] !== null
          && modalData.drinks[counter]["strMeasure" + ingredientsCounter] !== "" 
          && modalData.drinks[counter]["strMeasure" + ingredientsCounter] !== null){
           modalIngredients += `<p class="modal-text">${ingredientsCounter}. ${modalData.drinks[counter]["strIngredient" + ingredientsCounter]} ${modalData.drinks[counter]["strMeasure" + ingredientsCounter]}</p>`;
             }
        }
        modalOutput += modalIngredients + `
          <h4 class="modal-title">Instructions</h4>
          <p class="modal-text">${modalData.drinks[counter].strInstructions}</p>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`;
  document.getElementById(`listModal${modalData.drinks[counter].idDrink}`).innerHTML += modalOutput;
  })
}
