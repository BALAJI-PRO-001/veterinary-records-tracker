import { 
        addValidationListener,
        removeInjectionDetails,
        addInjectionDetails,
        getContainerClone,
        getContainer,
        addAnotherCow,
        removeCow 
      } from "./utils/common.js";
import { 
        validatePhoneandUpdateUi,
        setBorder,
        removeBorder,
        fieldIsValid
      } from "./utils/userInterface.js";

const addUserForm = document.getElementById("add-user-form");
const phoneInput = document.querySelector("#customer-phone");
const addAnotherInjection = document.querySelector("#add-injection");
const addAnotherCowBtn = document.querySelector("#another-cow-btn");
const submitButton = document.querySelector("#submit-btn");
const removeCowBtn = document.querySelector("#delete-recent-cow");
const inputs = Array.from(document.querySelectorAll("input"));
const removeInjection = document.getElementById("delete-recent-injection");

addUserForm.reset();

inputs.splice(0,1);

// inputs.forEach((input) => {
//   input.addEventListener("keyup",() => {
//     if(input.value != "") {
//       removeBorder(input,"is-invalid");
//     }
//   })
// })


addAnotherInjection.addEventListener("click",addInjectionDetails);
removeInjection.addEventListener("click",removeInjectionDetails);


addAnotherCowBtn.addEventListener("click",addAnotherCow);
removeCowBtn.addEventListener("click",removeCow);

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
  const inputs = Array.from(document.querySelectorAll("input"));
  inputs.splice(0,1);
  inputs.splice(1,1);
  inputs.forEach((input) => {
    addValidationListener(input,fieldIsValid);
  })
  const cows = document.querySelectorAll(".cow-details");
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
    if(input.value ==  "") {
      setBorder(input,"is-invalid");
    }
  })




  
  if(isFieldValid(inputs) == true) {
    // location.href = "/home"; 
  }

})

