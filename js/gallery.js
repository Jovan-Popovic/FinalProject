
let firstCounter = 0;
let secondCounter = 0;
let maxDrinks = 30;
let randomData = [];
let randomOutput = ``;

function loadRandomDrinks(){
    for(firstCounter;firstCounter<maxDrinks;firstCounter++){        
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(data => {
        randomData = data;
        for(secondCounter;secondCounter<1;secondCounter++){
            randomOutput = `
            <div id="item${secondCounter}" class="item col-12 col-sm-12 col-md-6 col-lg-4">
              <img src="${randomData.drinks[secondCounter].strDrinkThumb}" class="d-block w-100" alt="...">
              <div class="carousel-caption d-md-block">
                <h5>${randomData.drinks[secondCounter].strDrink}</h5>
                <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#randomModal${secondCounter}">Read More</button>
              </div>
            </div>
            `;
            randomModal = `
            <div class="modal fade" id="randomModal${secondCounter}" tabindex="-1" role="dialog" aria-labelledby="topRatedModalScrollableTitle${secondCounter}" aria-hidden="true">
              <div class="modal-dialog modal-dialog-scrollable" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="topRatedModalScrollableTitle${secondCounter}">${randomData.drinks[secondCounter].strDrink}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <img class="card-img-top" src="${randomData.drinks[secondCounter].strDrinkThumb}">
                    <p class="modal-text">Category: ${randomData.drinks[secondCounter].strCategory}</p>
                    <p class="modal-text">Glass: ${randomData.drinks[secondCounter].strGlass}</p>
                    <p class="modal-text">Instructions: ${randomData.drinks[secondCounter].strInstructions}</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            `
        }
        document.getElementById("gallery").innerHTML += randomOutput + randomModal;
        secondCounter = 0;
        })
        
    }
}
loadRandomDrinks();

