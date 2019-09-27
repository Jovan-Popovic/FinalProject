
let counter = 0;
let maxDrinks = 30;
let randomData = [];
let randomOutput = ``;
let randomModal = ``;

function loadRandomDrinks(){
    for(counter;counter<maxDrinks;counter++){        
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(data => {
        randomData = data;
        randomOutput = `
            <div id="item${randomData.drinks[0].idDrink}" class="item col-12 col-sm-12 col-md-6 col-lg-4" data-toggle="modal" data-target="#randomModal${randomData.drinks[0].idDrink}">
              <img src="${randomData.drinks[0].strDrinkThumb}" class="d-block w-100" alt="...">
              <div class="carousel-caption d-md-block">
                <h5>${randomData.drinks[0].strDrink}</h5>
              </div>
            </div>
            `;
            randomModal = `
            <div class="modal fade" id="randomModal${randomData.drinks[0].idDrink}" tabindex="-1" role="dialog" aria-labelledby="randomModalScrollableTitle${randomData.drinks[0].idDrink}" aria-hidden="true">
              <div class="modal-dialog modal-dialog-scrollable" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="randomModalScrollableTitle${randomData.drinks[0].idDrink}">${randomData.drinks[0].strDrink}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <img class="card-img-top" src="${randomData.drinks[0].strDrinkThumb}">
                    <p class="modal-text">Category: ${randomData.drinks[0].strCategory}</p>
                    <p class="modal-text">Glass: ${randomData.drinks[0].strGlass}</p>
                    <p class="modal-text">Instructions: ${randomData.drinks[0].strInstructions}</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            `
            document.getElementById("gallery").innerHTML += randomOutput + randomModal;
        })
    }
}
loadRandomDrinks();

