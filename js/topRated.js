
let topRated=[];
let loadMoreCounter=0;
let drinksCounter = 3;
let divCounter = 0;
document.getElementById("loadBtn").addEventListener("click",loadDrinks);
function getTopRatedData() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s")
      .then(res => res.json())
      .then(data => {
        topRated=data;
        //Taking data from API
        loadDrinks();
        loadDrinks();
});
}
getTopRatedData();
 function loadDrinks(){
    let output = ``;
          for(loadMoreCounter;loadMoreCounter<drinksCounter;loadMoreCounter++){
            output += `
            <div class="card">
            <img src="${topRated.drinks[loadMoreCounter].strDrinkThumb}" class="card-img-top" alt="...">
            <div id="card-body${loadMoreCounter}" class="card-body">
              <h5 class="card-title">${topRated.drinks[loadMoreCounter].strDrink}</h5>
              <p class="card-text">${topRated.drinks[loadMoreCounter].strInstructions}</p>
              <button type="button" class="btn btn-warning">Read More</button>
            </div>
          </div>
            `
          }
          drinksCounter += 3;
          divCounter += 1;
          let drinkDeck = ``;
          drinkDeck +=`<div id="deck${divCounter}" class="card-deck">`+ output + `</div>`
          document.getElementById("topRated").innerHTML += drinkDeck;
          output = ``;
        }