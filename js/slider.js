
let sliderData = [];
let sliderOutput = '';
let modalSliderOutput = '';
let sliderCounter = 3;
let sliderLoadCounter = 0;
let addSliderData = 1;
let sliderModalCounter = 1;
let sliderIngredients = ``;

function getSliderData() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=o")
    .then(res => res.json())
    .then(data => {
      sliderData = data;
      for(addSliderData;addSliderData<4;addSliderData++){
        loadSliderDrinks();
        document.getElementById(`slide${addSliderData}`).innerHTML = sliderOutput;
        document.getElementById('slider-best').innerHTML += modalSliderOutput;
        sliderOutput = '';
        modalSliderData = '';
      }        
    });
};
getSliderData();

function loadSliderDrinks(){
  for(sliderLoadCounter;sliderLoadCounter<sliderCounter;sliderLoadCounter++){
    sliderOutput += `
      <div id="item${sliderLoadCounter}" class="item col-sm-6 col-md-6 col-lg-4" data-interval="3000">
        <img src="${sliderData.drinks[sliderLoadCounter].strDrinkThumb}" class="d-block w-100" alt="...">
        <div class="carousel-caption d-md-block">
          <h5>${sliderData.drinks[sliderLoadCounter].strDrink}</h5>
          <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#sliderModal${sliderLoadCounter}">Read More</button>
        </div>
      </div>
          `;
    modalSliderOutput +=`
      <div class="modal fade" id="sliderModal${sliderLoadCounter}" tabindex="-1" role="dialog" aria-labelledby="sliderModalScrollableTitle${sliderLoadCounter}" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="sliderModalScrollableTitle${sliderLoadCounter}">${sliderData.drinks[sliderLoadCounter].strDrink}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <img class="card-img-top" src="${sliderData.drinks[sliderLoadCounter].strDrinkThumb}">
              <h4 class="modal-title">Category</h4>
                  <p class="modal-text">${sliderData.drinks[sliderLoadCounter].strCategory}</p>
                  <h4 class="modal-title">Glass</h5>
                  <p class="modal-text">${sliderData.drinks[sliderLoadCounter].strGlass}</p>
                  <h4 class="modal-title">Ingredients</h4>`
                  for(sliderModalCounter;sliderModalCounter<16;sliderModalCounter++){
                    if(sliderData.drinks[sliderLoadCounter]["strIngredient" + sliderModalCounter] !== "" 
                    && sliderData.drinks[sliderLoadCounter]["strIngredient" + sliderModalCounter] !== null
                    && sliderData.drinks[sliderLoadCounter]["strMeasure" + sliderModalCounter] !== "" 
                    && sliderData.drinks[sliderLoadCounter]["strMeasure" + sliderModalCounter] !== null){
                       sliderIngredients += `<p class="modal-text">${sliderModalCounter}. ${sliderData.drinks[sliderLoadCounter]["strIngredient" + sliderModalCounter]} ${sliderData.drinks[sliderLoadCounter]["strMeasure" + sliderModalCounter]}</p>`;
                       }
                  }
                  modalSliderOutput += sliderIngredients + 
           `<h4 class="modal-title">Instructions</h4>
            <p class="modal-text">${sliderData.drinks[sliderLoadCounter].strInstructions}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
    sliderIngredients = ``;
    sliderModalCounter = 1;
  }
  sliderCounter += 3;
}
