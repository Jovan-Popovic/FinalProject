
let mainData = [];
let mainCounter = 0;
let maxCount = 100;
let mainOutput = ``;

document.getElementById("dropdown").addEventListener('change',addMainData);

function addMainData(e){
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${e.value}`)
    .then(res => res.json())
    .then(data =>{
      mainData = data;
      loadMainData();
    })
}

function loadMainData(){
  for(mainCounter;mainCounter<maxCount;mainCounter++){
    mainOutput = `<div class="card mb-3" style="max-width: 540px;">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="${mainData.drinks[mainCounter].strDrinkThumb}" class="card-img" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${mainData.drinks[mainCounter].strDrink}</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
      </div>
    </div>
    </div>`
  }
  document.getElementById("main").innerHTML += mainOutput;
  mainOutput = ``;
}
