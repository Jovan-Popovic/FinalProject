
let filtersData = [];
let filtersOutput = ``;
let counter = 0;
let mainOutput = ``;
let modalData = []
let modalOutput = ``;
let ingredientsCounter = 1;
let modalIngredients = ``;

function addCategories(){
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`)
  .then(res => res.json())
  .then(data =>{
    filtersData = data;
    for(counter;counter<filtersData.drinks.length;counter++){
      filtersOutput += `<option id="category-${counter}" value="${filtersData.drinks[counter].strCategory}">${filtersData.drinks[counter].strCategory}</option>`;
    }
    document.getElementById("category-select").innerHTML += filtersOutput;
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
    for(counter;counter<30;counter++){
      filtersOutput += `<option id="ingredient-${counter}" value="${filtersData.drinks[counter].strIngredient1}">
      ${filtersData.drinks[counter].strIngredient1}</option>
      `;
    }
    document.getElementById("ingredient-select").innerHTML += filtersOutput;
    counter = 0;
    filtersData = [];
    filtersOutput = ``;
  })
}
addIngredients();

function fetchData(srcOrFil,tabName,filterId){
  document.getElementById("filter-results").innerHTML = ``;
  inputValue = document.getElementById(filterId).value
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/${srcOrFil}.php?${tabName}=${inputValue}`)
  .then(res => res.json())
  .then(data => {
    filtersData = data;
    for(counter;counter<filtersData.drinks.length;counter++){
      filtersOutput += `
      <div class="card col-12 col-sm-6 col-md-6 col-lg-4">
        <img src="${filtersData.drinks[counter].strDrinkThumb}" class="card-img-top" alt="...">
        <div id="card-body${counter}" class="card-body">
        <h5 class="card-title">${filtersData.drinks[counter].strDrink}</h5>
        <button id="modal-button${filtersData.drinks[counter].idDrink}" type="button" class="btn btn-warning" data-toggle="modal" data-target="#listModal${filtersData.drinks[counter].idDrink}">Read More</button>
        <div class="modal fade" id="listModal${filtersData.drinks[counter].idDrink}" tabindex="-1" role="dialog" aria-labelledby="listModalScrollableTitle${counter}" aria-hidden="true"></div>
        </div>
      </div>`;
      document.getElementById("filter-results").innerHTML += filtersOutput;
      filtersOutput = ``;
      document.getElementById(`modal-button${filtersData.drinks[counter].idDrink}`).addEventListener("click",listModal(`${filtersData.drinks[counter].idDrink}`));
    }
    counter = 0;
    filtersData = [];
    inputValue = ``; 
  })
}

function listModal(modalId){
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
  ingredientsCounter = 1;
  modalOutput = ``;
  modalIngredients = ``;
  })
}
document.getElementById("name-search-button").addEventListener("click",function(){fetchData("search","s","search-box")});
document.getElementById("category-search-button").addEventListener("click",function(){fetchData("filter","c","category-select")});
document.getElementById("ingredient-search-button").addEventListener("click",function(){fetchData("filter","i","ingredient-select"/*need to pick checked checkbox*/)});

