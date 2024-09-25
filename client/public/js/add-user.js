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


async function submit(e) {
  e.preventDefault();
  const inputs = Array.from(document.querySelectorAll("input"));
  inputs.splice(0,1);
  inputs.splice(1,1);
  // inputs.forEach((input) => {
  //   addValidationListener(input,fieldIsValid);
  // })

  inputs.forEach((input) => {
    if(input.value ==  "") {
      setBorder(input,"is-invalid");
    }
  })
  
  if(isFieldValid(inputs) == true) {
    const cows = document.querySelectorAll(".cow-details");
    const userDetails = {
      name : document.querySelector("#user-details").querySelector("#customer-name").value,
      phoneNumber : Number(document.querySelector("#user-details").querySelector("#customer-phone").value),
      address : document.querySelector("#user-details").querySelector("#customer-address").value
    }
  
    const cowsRecords = [];
    console.log(userDetails);
  
    for(let i=0; i<cows.length;i++) {
      const cow = {
        name: cows[i].querySelector("#cow-name").value,
        breed: cows[i].querySelector("#cow-breed").value,
        bullName: cows[i].querySelector("#bull-name").value
      }
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
      const cowRecord = Object.assign(cow,{injectionInfoAndAiDates: injecitonDetails});
      cowsRecords.push(cowRecord);
    }
  
    console.log(cowsRecords);
    // location.href = "/home"; 


    try{
      const res = await fetch("/api/v1/records",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body : JSON.stringify({
          user: {
            name: "Ram",
            phoneNumber: 1231231233,
            address: "address"
          },
          cows: [
            {
              name: "cow 1",
              breed: "breed",
              bullName: "bullName",
              injectionInfoAndAiDates: [
                {
                  name: "injection 1",
                  cost: 100,
                  date: "12/2/2004"
                }
              ]
            }
          ]
        })
      });

      const data = await res.json();
      console.log(data);


    } catch(err) {
      console.log(err);
    }

  } 

}


submitButton.addEventListener("click",submit)

