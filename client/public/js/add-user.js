import validator from "./utils/validator.js";
import { 
        addValidationListener,
        removeInjectionDetails,
        addInjectionDetails,
        addAnotherCow,
        removeCow 
      } from "./utils/common.js";
import { 
        validatePhoneandUpdateUi,
        setBorder,
        removeBorder,
        setMessage
      } from "./utils/userInterface.js";

const addUserForm = document.getElementById("add-user-form");
const phoneInput = document.querySelector("#customer-phone");
const addAnotherInjection = document.querySelector("#add-injection");
const addAnotherCowBtn = document.querySelector("#another-cow-btn");
const submitButton = document.querySelector("#submit-btn");
const removeCowBtn = document.querySelector("#delete-recent-cow");
const inputs = Array.from(document.querySelectorAll("input"));
const removeInjection = document.getElementById("delete-recent-injection");
const nameInput = document.getElementById("customer-name");
const addressInput = document.getElementById("customer-address");

addUserForm.reset();

inputs.splice(0,1);


addAnotherInjection.addEventListener("click",addInjectionDetails);
removeInjection.addEventListener("click",removeInjectionDetails);


addAnotherCowBtn.addEventListener("click",addAnotherCow);
removeCowBtn.addEventListener("click",removeCow);

addValidationListener(phoneInput,validatePhoneandUpdateUi);




async function submit(e) {
  e.preventDefault();
  const inputs = Array.from(document.querySelectorAll("input"));
  inputs.splice(0,1);
    

  inputs.forEach((input) => {
    if(input.value == "") {
      setBorder(input,"is-invalid");
      setMessage(input.nextElementSibling,"*must enter this column...");
    }
    else {
      removeBorder(input,"is-invalid");
      setMessage(input.nextElementSibling,"");
    }
  })

  inputs.splice(1,1);

  inputs.forEach((input) => {
    addValidationListener(input,validator.isAllFieldsValid);
  })
  
  if(validator.isFieldValid(inputs) == true) {
    const cows = document.querySelectorAll(".cow-details");
    const userDetails = {
      name : nameInput.value,
      phoneNumber : Number(phoneInput.value),
      address : addressInput.value
    }
  
    const cowsRecords = [];
    console.log(userDetails);
  
    for(let i=0; i<cows.length;i++) {
     
      const injecitonDetails = [];
      const injections = cows[i].querySelectorAll(".injection-details");
      for(let i=0; i<injections.length; i++) {
        const injectionObject = {
          name: injections[i].querySelector("#injection-name").value,
          cost: injections[i].querySelector("#injection-cost").value,
          date: injections[i].querySelector("#ai-date").value
        }
        injecitonDetails.push(injectionObject);
      }
      // const cowRecord = Object.assign(cow,{injectionInfoAndAiDates: injecitonDetails});
      const cowRecord = {
        name: cows[i].querySelector("#cow-name").value,
        breed: cows[i].querySelector("#cow-breed").value,
        bullName: cows[i].querySelector("#bull-name").value,
        injectionInfoAndAiDates : injecitonDetails
      }
      cowsRecords.push(cowRecord);
    }
  
    console.log(cowsRecords);
    // location.href = "/home"; 

    try {
      const res = await fetch("/api/v1/records",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body : JSON.stringify({
          user: userDetails,
          cows: cowsRecords
        })
      });

      const data = await res.json();
      console.log(data);

      if(data.statusCode == 201) {
        location.href = "/home";
      } 

    }catch(err) {
      console.log(err);
    }

  } 

}


submitButton.addEventListener("click",submit)

