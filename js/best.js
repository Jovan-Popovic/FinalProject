let bestData = [];//Array for storing data from json

function getBest() {
  for(let counter = 0; counter < 2; counter++){
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then(res => res.json())
      .then(data => {
        let output = new String();
        bestData = data;
        output += `
          <div class="best-drinks">
            <div class="row no-gutters">
              <div class="col-md-6">
                <img src="${bestData.drinks[0].strDrinkThumb}" class="card-img" alt="...">
              </div>
              <div class="col-md-6">
                <div class="card-body">
                  <h5 class="best-titles">${bestData.drinks[0].strDrink}</h5>
                  <figcaption><span>Category</span> ${bestData.drinks[0].strCategory}</figcaption>
                </div>
              </div>
            </div>
          </div>
          `;
      document.getElementById("best").innerHTML += output;  
      });
    }
}
getBest();