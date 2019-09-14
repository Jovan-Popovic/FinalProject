
let modalData = [];
let loadCounter = 0;

function getData() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s")
    .then(res => res.json())
    .then(data => {
      modalData=data;
});
}
getData();

function modalWindow(){
  let modalContent = ``;
  for(loadCounter;loadCounter<modalData.drinks;loadCounter++){
  modalContent += `
    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModalScrollable${loadCounter}">Read More</button>
    <div class="modal fade" id="exampleModalScrollable${loadCounter}" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle${loadCounter}" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalScrollableTitle${loadCounter}">${modalData.drinks[loadCounter].strDrink}</h5>
          </div>
          <div class="modal-body">
          <img class="modal-img" src="${modalData.drinks[loadCounter].strDrinkThumb}">
          <p class="modal-text">Category:${modalData.drinks[loadCounter].strCategory}</p>
          <p class="modal-text">Glass:${modalData.drinks[loadCounter].strGlass}</p>
          <p class="modal-text">Instructions:${modalData.drinks[loadCounter].strInstructions}</p>
          </div>
        </div>
      </div>
    </div>`;
    document.getElementById(`card-body${loadCounter}`).innerHTML += modalContent;
    modal = ``;
  }
}
modalWindow();