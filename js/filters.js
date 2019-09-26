
let filtersData = [];
let filtersOutput = ``;
let counter = 0;
let maxCount = 100;
let mainOutput = ``;
let modalData = []
let modalOutput = ``;

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
    for(counter;counter<30;counter++){
      filtersOutput += `
      <div id="ingredient-${counter}" name="ingredient" class="item col-12 col- col-sm-6 col-md-4" col-lg-3>
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
      <div class="card col-12 col-sm-6 col-md-6 col-lg-4">
        <img src="${filtersData.drinks[counter].strDrinkThumb}" class="card-img-top" alt="...">
        <div id="card-body${counter}" class="card-body">
        <h5 class="card-title">${filtersData.drinks[counter].strDrink}</h5>
        <button id="modal-button${filtersData.drinks[counter].idDrink}" type="button" class="btn btn-warning" data-toggle="modal" data-target="#listModal${counter}">Read More</button>
        <div class="modal fade" id="listModal${counter}" tabindex="-1" role="dialog" aria-labelledby="listModalScrollableTitle${counter}" aria-hidden="true"></div>
        </div>
      </div>`;
      document.getElementById("filter-results").innerHTML += filtersOutput;
      filtersOutput = ``;
      document.getElementById(`modal-button${filtersData.drinks[counter].idDrink}`).addEventListener("click",listModal(`${filtersData.drinks[counter].idDrink}`))
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
              <h5 class="modal-title" id="listModalScrollableTitle${counter}">${modalData.drinks[counter].strDrink}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
            </div>
            <div class="modal-body">
            <img class="card-img-top" src="${modalData.drinks[counter].strDrinkThumb}">
            <p class="modal-text">Category: ${modalData.drinks[counter].strCategory}</p>
            <p class="modal-text">Glass: ${modalData.drinks[counter].strGlass}</p>
            <p class="modal-text">Instructions: ${modalData.drinks[counter].strInstructions}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>`;
      document.getElementById(`listModal${counter}`).innerHTML += modalOutput;
      modalOutput = ``;
      })
    }
document.getElementById("name-search-button").addEventListener("click",function(){fetchData("search","s","search-box")});
document.getElementById("category-search-button").addEventListener("click",function(){fetchData("filter","c","dropdown")});
document.getElementById("ingredient-search-button").addEventListener("click",function(){fetchData("filter","i","form-check"/*need to pick checked checkbox*/)});

