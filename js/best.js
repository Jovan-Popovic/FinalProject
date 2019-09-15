
let bestData = [];
let bestOutput = '';
let bestCounter = 0;
function getBest() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink")
      .then(res => res.json())
      .then(data => {
        bestData = data;
          for(bestCounter;bestCounter<3;bestCounter++){
            bestOutput += `
            <div class="card mb-3">
            <div class="row no-gutters">
              <div class="col-md-6">
                <img src="${bestData.drinks[bestCounter].strDrinkThumb}" class="card-img" alt="...">
              </div>
              <div class="col-md-6">
                <div class="card-body">
                  <h5 class="card-title">${bestData.drinks[bestCounter].strDrink}</h5>
                </div>
              </div>
            </div>
          </div>
            `
          }
        document.getElementById("best").innerHTML = bestOutput;  
        });
    }
getBest();