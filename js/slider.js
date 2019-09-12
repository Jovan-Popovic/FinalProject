
function getSliderData() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink")
      .then(res => res.json())
      .then(data => {
        let output = '';
        let i = 0;
        let n = 3;
        //Taking data from API
        function loadDrinks(){
          for(i;i<n;i++){
            output += `
              <div class="item col-12 col-sm-12 col-lg-4" data-interval="3000">
                <img src="${data.drinks[i].strDrinkThumb}" class="d-block w-100" alt="...">
                <div class="carousel-caption d-md-block">
                  <h5>${data.drinks[i].strDrink}</h5>
                  <button type="button" class="btn btn-warning">Read More</button>
                </div>
              </div>
            `
          }
          n += 3;
        }
        //Adding drinks in HTML file
        function addDrinks(){
          let a = 1;
          for(a;a<4;a++){
            loadDrinks();
            document.getElementById(`slide${a}`).innerHTML = output;
            output = '';
          }
        }
        addDrinks();
      });
};
getSliderData();