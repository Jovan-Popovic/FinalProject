//Declare variable for load more button
const loadBtn = document.getElementById("loadBtn");

//Declare other variables
let topRatedData = [];//Array for storing data from api
let cardCounter = 3;
let counter = 0

//Add event listener on Load More button
loadBtn.addEventListener("click", loadDrinks);

function getTopRatedData() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s")
      .then(res => res.json())
      .then(data => {
        topRatedData = data;        
        loadDrinks();
        loadDrinks();
   });
};

getTopRatedData();
//Load drinks
function loadDrinks(){
  let output = new String();
    for(counter; counter < cardCounter; counter++){
      let ingredients = new String();
      let ingredientCounter = 1;
      output += `
      <div id="card${counter}" class="col-12 col-sm-6 col-md-4 col-lg-4">
        <div class="card">
          <img src="${topRatedData.drinks[counter].strDrinkThumb}" class="card-img-top" alt="...">
          <div id="card-body${counter}" class="card-body">
            <h5 class="card-title">${topRatedData.drinks[counter].strDrink}</h5>
            <p class="card-text">${topRatedData.drinks[counter].strInstructions}</p>
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#topRatedModal${counter}">Read More</button>
            <div class="modal fade" id="topRatedModal${counter}" tabindex="-1" role="dialog" aria-labelledby="topRatedModalScrollableTitle${counter}" aria-hidden="true">
              <div class="modal-dialog modal-dialog-scrollable" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title" id="topRatedModalScrollableTitle${counter}">${topRatedData.drinks[counter].strDrink}</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <img class="card-img-top" src="${topRatedData.drinks[counter].strDrinkThumb}">
                    <h4 class="modal-title">Category</h4>
                    <p class="modal-text">${topRatedData.drinks[counter].strCategory}</p>
                    <h4 class="modal-title">Glass</h4>
                    <p class="modal-text">${topRatedData.drinks[counter].strGlass}</p>
                    <h4 class="modal-title">Ingredients</h4>`;
      for(ingredientCounter; ingredientCounter < 16; ingredientCounter++){
        if(topRatedData.drinks[counter]["strIngredient" + ingredientCounter] !== "" 
        && topRatedData.drinks[counter]["strIngredient" + ingredientCounter] !== null
        && topRatedData.drinks[counter]["strMeasure" + ingredientCounter] !== "" 
        && topRatedData.drinks[counter]["strMeasure" + ingredientCounter] !== null){
           ingredients += `<p class="modal-text">${ingredientCounter}. ${topRatedData.drinks[counter]["strIngredient" + ingredientCounter]} ${topRatedData.drinks[counter]["strMeasure" + ingredientCounter]}</p>`;
           }
      }
      output += ingredients + `
                    <h4 class="modal-title">Instructions</h4>
                    <p class="modal-text">${topRatedData.drinks[counter].strInstructions}</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
    }
    document.getElementById("top-rated-results").innerHTML += output;
    cardCounter += 3;
};