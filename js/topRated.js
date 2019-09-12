//Function is not finished
function getTopRatedData() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s")
      .then(res => res.json())
      .then(data => {
        let output = ``;
        let i = 0;
        let n = 3;
        let a = 0;
        //Taking data from API
        function loadDrinks(){
          for(i;i<n;i++){
            output += `
            <div class="card">
            <img src="${data.drinks[i].strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${data.drinks[i].strDrink}</h5>
              <p class="card-text">${data.drinks[i].strInstructions}</p>
              <button type="button" class="btn btn-warning">Read More</button>
            </div>
          </div>
            `
          }
          n += 3;
          a += 1;
          let drinkDeck = ``;
          drinkDeck +=`<div id="deck${a}" class="card-deck">`+ output + `</div>`
          document.getElementById("topRated").innerHTML = drinkDeck;
          output = ``;
        }
        loadDrinks();
        loadDrinks();
});
}
getTopRatedData();
