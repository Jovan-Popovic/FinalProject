
//Declare gallery element
const gallery = document.getElementById("row");

//Declare all variables
let counter = 0;
let maxDrinks = 30;
let output = new String();

//Function for making gallery with random generated drinks
function loadRandomDrinks(){
  for(counter; counter < maxDrinks; counter++){        
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(data => {
        output = `
        <div class="random-drink col-12 col-sm-12 col-md-6 col-lg-4">
          <div class="card">
            <img src="${data.drinks[0].strDrinkThumb}" alt="..." class="card-img-top">
          </div>
        </div>`;
        gallery.innerHTML += output;
    });
  }
}
loadRandomDrinks();