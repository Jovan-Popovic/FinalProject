
function getBest() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
      .then(res => res.json())
      .then(data => {
        let output = '';
        let i = 0;
          for(i;i<3;i++){
            output += `
            <div class="card mb-3">
            <div class="row no-gutters">
              <div class="col-md-6">
                <img src="${data.drinks[i].strDrinkThumb}" class="card-img" alt="...">
              </div>
              <div class="col-md-6">
                <div class="card-body">
                  <h5 class="card-title">${data.drinks[i].strDrink}</h5>
                </div>
              </div>
            </div>
          </div>
            `
          }
        document.getElementById("best").innerHTML = output;  
        });
    }
getBest();