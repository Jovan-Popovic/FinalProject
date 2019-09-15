
let topRatedData=[];
let loadMoreCounter=0;
let cardCounter = 3;
let divCounter = 0;
let topRatedOutput = ``;
let drinkDeck = ``;

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
            <div class="card">
            <img src="${topRatedData.drinks[loadMoreCounter].strDrinkThumb}" class="card-img-top" alt="...">
            <div id="card-body${loadMoreCounter}" class="card-body">
              <h5 class="card-title">${topRatedData.drinks[loadMoreCounter].strDrink}</h5>
              <p class="card-text">${topRatedData.drinks[loadMoreCounter].strInstructions}</p>
              <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#topRatedModal${loadMoreCounter}">Read More</button>
        <div class="modal fade" id="topRatedModal${loadMoreCounter}" tabindex="-1" role="dialog" aria-labelledby="topRatedModalScrollableTitle${loadMoreCounter}" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="topRatedModalScrollableTitle${loadMoreCounter}">${topRatedData.drinks[loadMoreCounter].strDrink}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
              </div>
              <div class="modal-body">
              <img class="card-img-top" src="${topRatedData.drinks[loadMoreCounter].strDrinkThumb}">
              <p class="modal-text">Category:${topRatedData.drinks[loadMoreCounter].strCategory}</p>
              <p class="modal-text">Glass:${topRatedData.drinks[loadMoreCounter].strGlass}</p>
              <p class="modal-text">Instructions:${topRatedData.drinks[loadMoreCounter].strInstructions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`
          }
          drinkDeck +=`<div id="deck${divCounter}" class="card-deck">`+ topRatedOutput + `</div>`
          document.getElementById("topRated").innerHTML += drinkDeck;
          topRatedOutput = ``;
          drinkDeck = ``;
          cardCounter += 3;
          divCounter += 1;
};