
import validator from "./validator.js"

export function setMessage(element,message) {
  if(!element) {
    throw new Error("given element is null");
  } 
  element.innerText = message;
}

export function setType(element,oldType,newType) {
  if(!element) {
    throw new Error("given element is null");
  }
  
  if(element.type == oldType) {
    element.type = newType;
  }
  else {
    element.type = oldType;
  }
}

export function isEmpty(value) {
  if(!value) {
    return false;
  }
  return true;
}

export function setIcon(element,oldClass,newClass) {
  if(!element) {
    throw new Error("Element not found...");
  }
  element.classList.toggle(oldClass);
  element.classList.toggle(newClass);
}

export function setBorder(element,className) {
  if(!element) {
    throw new Error("given element is null");
  } 
  element.classList.add(className);
}

export function removeBorder(element,className) {
  if(!element) {
    throw new Error("given element is null");
  } 
  element.classList.remove(className);
}

export function ValidateNameandUpdateUi(e) {
  const name = e.target.value;
  const {isValid,message} = validator.isValidName(name);
  const errElement = e.target.parentElement.querySelector("#Err-element");
  if(name == "") {
    removeBorder(e.target,"is-invalid")
    setMessage(errElement,"");
  }
  if(!isValid) {
    setBorder(e.target,"is-invalid");
    setMessage(errElement,message);
  }
}

export function validatePhoneandUpdateUi(e) {
  const phoneNo = e.target.value;
  const {isValid,message} = validator.isValidPhoneNo(phoneNo);
  const errElement = e.target.parentElement.querySelector("#Err-element");
  if(phoneNo == "") {
    removeBorder(e.target,"is-invalid");
    setMessage(errElement,"");
    return;
  } 
  if(!isValid) {
    setBorder(e.target,"is-invalid");
    setMessage(errElement,message);
  } 
}

