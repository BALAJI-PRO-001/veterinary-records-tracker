import { addValidationListener} from "./utils/common.js";
import validator from "./utils/validator.js";
import {ValidateNameandUpdateUi, validatePhoneandUpdateUi} from "./utils/userInterface.js";


const addUserForm = document.getElementById("add-user-form");
const nameInput = document.querySelector("#customer-name");
const phoneInput = document.querySelector("#customer-phone");
const addressInput = document.querySelector("#customer-address");
const addAnotherCow = document.querySelector("#another-cow-btn");
const submitButton = document.querySelector("#submit-btn");
const removeCow = document.querySelector("#delete-recent-cow");

alert("welcome");

addAnotherCow.addEventListener("click",()=> {
  const container = document.querySelector(".cow-container");
  const content = document.querySelector(".cow-details").cloneNode(true);
  container.append(content);
});

removeCow.addEventListener("click",() => {
  const container = document.querySelector(".cow-container");
  if(container.lastElementChild && container.childElementCount > 1) {
    container.removeChild(container.lastElementChild);
  }
})





addUserForm.reset();

addValidationListener(phoneInput,validatePhoneandUpdateUi);


submitButton.addEventListener("click",(e) => {
  e.preventDefault();

})