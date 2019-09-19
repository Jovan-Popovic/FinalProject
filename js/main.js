
let mainData = [];
let mainCounter = 0;
let maxCount = 100;
let mainOutput = ``;
let ingredientsData = [];
let ingredientsOutput = ``;

document.getElementById("dropdown").addEventListener('change',addMainData);

function loadCheckbox(){
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`)
  .then(res => res.json())
  .then(data => {
    ingredientsData = data;
    console.log(ingredientsData);
    loadIngredients();
  })
}

function loadIngredients(){
  for(let counter=0;counter<ingredientsData.drinks.length;counter++){
    ingredientsOutput =`
    <div class="form-check">
      <input id="ingredient-${counter}" type="checkbox" value="${ingredientsData.drink[counter].strIngredient1}">
      <label for="ingredient-${counter}">${ingredientsData.drink[counter].strIngredient1}</label>
    </div>
    `
  }
  document.getElementById("ingredients").innerHTML += ingredientsOutput;
  ingredientsOutput = ``;
}

loadCheckbox();

function addMainData(e){
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${e.target.value}`)
    .then(res => res.json())
    .then(data =>{
      mainData = data;
      loadMainData();
    })
}

function loadMainData(){
  console.log(mainData);

  for(mainCounter;mainCounter<maxCount;mainCounter++){
    mainOutput = `
    <div class="card">
      <img src="${mainData.drinks[mainCounter].strDrinkThumb}" class="card-img-top" alt="...">
      <div id="card-body${mainCounter}" class="card-body">
        <h5 class="card-title">${mainData.drinks[mainCounter].strDrink}</h5>
      </div>
    </div>`;
    document.getElementById("results").innerHTML += mainOutput;
    mainOutput = ``;
  }
}
