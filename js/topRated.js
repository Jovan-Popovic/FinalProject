
let topRatedData=[];
let loadMoreCounter=0;
let cardCounter = 3;
let divCounter = 0;
let topRatedOutput = ``;
let drinkDeck = ``;
let topRatedCounter = 1;
let topRatedIngredients = ``

document.getElementById("loadBtn").addEventListener("click",loadDrinks);

function getTopRatedData() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s")
      .then(res => res.json())
      .then(data => {
        topRatedData=data;        
        loadDrinks();
        loadDrinks();
   });
};
getTopRatedData();
function loadDrinks(){
    for(loadMoreCounter;loadMoreCounter<cardCounter;loadMoreCounter++){
      topRatedOutput += `
      <div class="card col-12 col-sm-6 col-md-6 col-lg-4">
        <img src="${topRatedData.drinks[loadMoreCounter].strDrinkThumb}" class="card-img-top" alt="...">
        <div id="card-body${loadMoreCounter}" class="card-body">
          <h5 class="card-title">${topRatedData.drinks[loadMoreCounter].strDrink}</h5>
          <p class="card-text">${topRatedData.drinks[loadMoreCounter].strInstructions}</p>
          <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#topRatedModal${loadMoreCounter}">Read More</button>
          <div class="modal fade" id="topRatedModal${loadMoreCounter}" tabindex="-1" role="dialog" aria-labelledby="topRatedModalScrollableTitle${loadMoreCounter}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" id="topRatedModalScrollableTitle${loadMoreCounter}">${topRatedData.drinks[loadMoreCounter].strDrink}</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <img class="card-img-top" src="${topRatedData.drinks[loadMoreCounter].strDrinkThumb}">
                  <h4 class="modal-title">Category</h4>
                  <p class="modal-text">${topRatedData.drinks[loadMoreCounter].strCategory}</p>
                  <h4 class="modal-title">Glass</h5>
                  <p class="modal-text">${topRatedData.drinks[loadMoreCounter].strGlass}</p>
                  <h4 class="modal-title">Instructions</h4>
                  <p class="modal-text">${topRatedData.drinks[loadMoreCounter].strInstructions}</p>
                  <h4 class="modal-title">Ingredients</h4>`;
        //This loop should load all ingredients and measures
        for(topRatedCounter;topRatedCounter<16;topRatedCounter++){
          topRatedIngredients += `<p class="modal-text">${topRatedData.drinks[loadMoreCounter].strIngredient + topRatedCounter} : ${topRatedData.drinks[loadMoreCounter].strMeasure + topRatedCounter}</p>`;
          if(topRatedData.drinks[loadMoreCounter].strIngredient1 === '' && topRatedData.drinks[loadMoreCounter].strMeasure1 === ''){
            //If there's no ingredient,don't show it on page 
          }
        }
        topRatedOutput += topRatedIngredients + `
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
        topRatedIngredients = ``;
        topRatedCounter = 1
    }
    drinkDeck +=`<div id="deck${divCounter}" class="card-deck">`+ topRatedOutput + `</div>`
    document.getElementById("topRated").innerHTML += drinkDeck;
    topRatedOutput = ``;
    drinkDeck = ``;
    cardCounter += 3;
    divCounter += 1;
};