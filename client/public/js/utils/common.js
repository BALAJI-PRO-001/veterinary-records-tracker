import { 
       setBorder,
       setMessage,removeBorder
      } from "./userInterface.js";

export function addValidationListener(inputElement,validationfunction) {
  if(inputElement == null ||
    inputElement == undefined ||
    validationfunction == null ||
    validationfunction == undefined
  ) {
    throw new Error("Element or function is null or undefined...");
  }

  inputElement.addEventListener("keyup",validationfunction);
  inputElement.addEventListener("change",validationfunction);
}


export function removeInjectionDetails(e) {
  const recentInjection =e.target.parentElement.parentElement.querySelectorAll(".injection-details");
  if (recentInjection.length > 1) {
    recentInjection[recentInjection.length - 1].remove();
  }
}

export function addInjectionDetails(e) {
  const injectionDetails = e.target.parentElement.parentElement.querySelector(".injection-details").cloneNode(true);
  injectionDetails.querySelectorAll("input").forEach((input) => {
    input.value = "";
    removeBorder(input,"is-invalid");
    setMessage(input.nextElementSibling,"");
  })
  e.target.parentElement.parentElement.insertBefore(injectionDetails,e.target.parentElement);
}


export function addAnotherCow(e){
  const data = e.target.parentElement.parentElement.querySelector(".cow-container").querySelectorAll(".cow-details");
  const cowContent = data[data.length-1].cloneNode(true);
  const inputs = cowContent.querySelectorAll("input");
  inputs.forEach((input) => {
    input.value = "";
    removeBorder(input,"is-invalid");
    setMessage(input.nextElementSibling,"");
  })
  const unwantedChilds = cowContent.querySelectorAll(".injection-details");
  for(let i=1;i<unwantedChilds.length;i++) {
    unwantedChilds[i].remove();
  }
  
  const cowContainer = e.target.parentElement.parentElement.querySelector(".cow-container");
  console.log(cowContent);
  cowContainer.appendChild(cowContent);
  const injectionBtn = cowContent.querySelector("#add-injection");
  injectionBtn.addEventListener("click",addInjectionDetails);
  const removeInjectionBtn = cowContent.querySelector("#delete-recent-injection");
  removeInjectionBtn.addEventListener("click",removeInjectionDetails);
}


export function removeCow(e) {
  const container = e.target.parentElement.parentElement.querySelector(".cow-container");
  if(container.lastElementChild && container.childElementCount > 1) {
    container.removeChild(container.lastElementChild);
  }
}


export function createJson(e) {
  const button = e.target;
  
}