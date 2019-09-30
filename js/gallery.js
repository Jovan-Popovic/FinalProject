
let counter = 0;
let maxDrinks = 30;
let randomData = [];
let randomOutput = ``;
let randomModal = ``;
let randomDiv = ``;

function loadRandomDrinks(){
    for(counter;counter<maxDrinks;counter++){        
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(data => {
        randomData = data;
        randomOutput = `
        <div class="random-drink col-12 col-sm-12 col-md-6 col-lg-4">
          <div class="card">
            <img src="${randomData.drinks[0].strDrinkThumb}" alt="..." class="card-img-top">
          </div>
        </div>`;
        randomDiv = randomOutput;
        document.getElementById("gallery-row").innerHTML += randomDiv;
        })
    }
}
loadRandomDrinks();