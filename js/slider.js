
let sliderData = [];
let sliderOutput = '';
let sliderCounter = 3;
let loadCounter = 0;
let addSliderData = 1;

function getSliderData() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=o")
      .then(res => res.json())
      .then(data => {
        sliderData = data;
      });
};
getSliderData();

function loadDrinks(){
  for(loadCounter;loadCounter<sliderCounter;loadCounter++){
    sliderOutput += `
      <div class="item col-12 col-sm-12 col-lg-4" data-interval="3000">
        <img src="${sliderData.drinks[loadCounter].strDrinkThumb}" class="d-block w-100" alt="...">
        <div class="carousel-caption d-md-block">
          <h5>${sliderData.drinks[loadCounter].strDrink}</h5>
          <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModalScrollable${loadCounter}">Read More</button>
          <div class="modal fade" id="exampleModalScrollable${loadCounter}" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle${loadCounter}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalScrollableTitle${loadCounter}">${sliderData.drinks[loadCounter].strDrink}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
                </div>
                <div class="modal-body">
                <img class="card-img-top" src="${sliderData.drinks[loadCounter].strDrinkThumb}">
                <p class="modal-text">Category:${sliderData.drinks[loadCounter].strCategory}</p>
                <p class="modal-text">Glass:${sliderData.drinks[loadCounter].strGlass}</p>
                <p class="modal-text">Instructions:${sliderData.drinks[loadCounter].strInstructions}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
  sliderCounter += 3;
}

for(addSliderData;addSliderData<4;addSliderData++){
  loadDrinks();
  document.getElementById(`slide${addSliderData}`).innerHTML = sliderOutput;
  sliderOutput = '';
}

