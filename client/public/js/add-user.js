import { addValidationListener} from "./utils/common.js";
import {
        ValidateNameandUpdateUi, 
        validatePhoneandUpdateUi,
        setBorder,
        removeBorder
      } from "./utils/userInterface.js";

const addUserForm = document.getElementById("add-user-form");
const nameInput = document.querySelector("#customer-name");
const phoneInput = document.querySelector("#customer-phone");
const addressInput = document.querySelector("#customer-address");
const addAnotherInjection = document.querySelector("#add-injection");
const addAnotherCow = document.querySelector("#another-cow-btn");
const submitButton = document.querySelector("#submit-btn");
const removeCow = document.querySelector("#delete-recent-cow");
const inputs = Array.from(document.querySelectorAll("input"));

inputs.splice(0,1);

inputs.forEach((input) => {
  input.addEventListener("keyup",() => {
    if(input.value != "") {
      removeBorder(input,"is-invalid");
    }
  })
})

addUserForm.reset();

addAnotherInjection.addEventListener("click",() => {
const cowContainer = document.querySelector(".cow-container");
const injectionContainer = cowContainer.querySelector(".injection-container");
const injectionContent = injectionContainer.querySelector(".injection-details").cloneNode(true);
const referChild = injectionContainer.querySelector("#add-injection-container");
injectionContainer.insertBefore(injectionContent,referChild);

  
});

addAnotherCow.addEventListener("click",()=> {
  const cowContent = document.querySelector(".cow-details").cloneNode(true);
  const cowContainer = document.querySelector(".cow-container");
  cowContainer.appendChild(cowContent);
});

removeCow.addEventListener("click",() => {
  const container = document.querySelector(".cow-container");
  if(container.lastElementChild && container.childElementCount > 1) {
    container.removeChild(container.lastElementChild);
  }
})

addValidationListener(phoneInput,validatePhoneandUpdateUi);

function isFieldValid(inputs) {
  for (let input of inputs) {
    if (input.value === "") {
      return false;
    }
  }
  return true;
}

submitButton.addEventListener("click",(e) => {
  e.preventDefault();

  const cows = document.querySelectorAll(".cow-details");
  const user1 = document.querySelector("#user-details").querySelectorAll("input");
  const user = {
    name : document.querySelector("#user-details").querySelector("#customer-name").value,
    phone : document.querySelector("#user-details").querySelector("#customer-phone").value,
    address : document.querySelector("#user-details").querySelector("#customer-address").value
  }
  const cowsRecords = [];
  console.log(cows);

  for(let i=0; i<cows.length;i++) {
    const cow = {
      cowName: cows[i].querySelector("#cow-name").value,
      cowBreed: cows[i].querySelector("#cow-breed").value,
      bullName: cows[i].querySelector("#bull-name").value
    }
    cowsRecords.push(cow);
  }

  console.log(cowsRecords);
  console.log(inputs);
  

  inputs.forEach((input) => {
    if(input.value ===  "") {
      setBorder(input,"is-invalid");
    }
  })
  
  if(isFieldValid(inputs) == true) {
    // location.href = "/home"; 
  }

})

