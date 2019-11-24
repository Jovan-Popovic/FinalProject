
//Declare all variables
let sliderData = new Array();//Array for storing data from api
let sliderOutput = new String();
let elementCounter = 3;
let sliderLoadCounter = 0;
let sliderCounter = 1;
let modalOutput = new String();

//Function for showing api data on the page
function getSliderData() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=o")
    .then(res => res.json())
    .then(data => {
      sliderData = data;
      for(sliderCounter; sliderCounter < 4; sliderCounter++){
        loadSliderDrinks();
        document.getElementById(`slide${sliderCounter}`).innerHTML = sliderOutput + modalOutput;
        sliderOutput = '';
        modalSliderData = '';
      }        
    });
};
getSliderData();

//Function for load drinks,which will be called inside getSliderData function
function loadSliderDrinks(){
  modalOutput = new String();
  for(sliderLoadCounter; sliderLoadCounter < elementCounter; sliderLoadCounter++){
    let sliderModalCounter = 1;
    let sliderIngredients = new String();
    sliderOutput += `
      <div id="item${sliderLoadCounter}" class="item col-12 col-sm-6 col-md-4 col-lg-4">
        <img src="${sliderData.drinks[sliderLoadCounter].strDrinkThumb}" class="d-block w-100" alt="...">
        <div class="carousel-caption d-md-block">
          <h5>${sliderData.drinks[sliderLoadCounter].strDrink}</h5>
          <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#sliderModal${sliderLoadCounter}">Read More</button>
        </div>
      </div>
          `;
    modalOutput +=`
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
          for(sliderModalCounter; sliderModalCounter < 16; sliderModalCounter++){
            if(sliderData.drinks[sliderLoadCounter]["strIngredient" + sliderModalCounter] !== "" 
            && sliderData.drinks[sliderLoadCounter]["strIngredient" + sliderModalCounter] !== null
            && sliderData.drinks[sliderLoadCounter]["strMeasure" + sliderModalCounter] !== "" 
            && sliderData.drinks[sliderLoadCounter]["strMeasure" + sliderModalCounter] !== null){
               sliderIngredients += `<p class="modal-text">${sliderModalCounter}. ${sliderData.drinks[sliderLoadCounter]["strIngredient" + sliderModalCounter]} ${sliderData.drinks[sliderLoadCounter]["strMeasure" + sliderModalCounter]}</p>`;
            }
          }
          modalOutput += sliderIngredients + 
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
  }
  elementCounter += 3;
}
