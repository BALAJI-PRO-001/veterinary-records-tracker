import { isValidEmail, isValidName, isValidPassword } from "./validator.js";



export function validateEmailAndUpdateEmailInputUI(emailInputElement) {
  if (emailInputElement === null || emailInputElement === undefined) {
    throw new Error("Email input element is null or undefined.");
  }

  if (!(emailInputElement instanceof HTMLInputElement)) {
    throw new Error(`Email Input: Expected an HTMLInputElement, but got (${typeof emailInputElement}).`);
  }

  const { isValid, message } = isValidEmail(emailInputElement.value.trim())
  const errMessageElement = emailInputElement.parentElement.querySelector("#err-message-element");

  if (!isValid) {
    emailInputElement.classList.add("is-invalid");
    errMessageElement.textContent = message;
    return false;
  }

  emailInputElement.classList.remove("is-invalid")
  emailInputElement.classList.add("is-valid");
  errMessageElement.textContent = "";
  return true;
}



export function validatePasswordAndUpdatePasswordInputUI(passwordInputElement) {
  if (passwordInputElement === null || passwordInputElement === undefined) {
    throw new Error("Email input element is null or undefined.");
  }

  if (!(passwordInputElement instanceof HTMLInputElement)) {
    throw new Error(`Email Input: Expected an HTMLInputElement, but got (${typeof passwordInputElement}).`);
  }

  const { isValid, message } = isValidPassword(passwordInputElement.value.trim());
  const errMessageElement = passwordInputElement.parentElement.querySelector("#err-message-element");

  if (!isValid) {
    passwordInputElement.classList.add("is-invalid");
    errMessageElement.textContent = message;
    return false;
  }

  passwordInputElement.classList.remove("is-invalid")
  passwordInputElement.classList.add("is-valid");
  errMessageElement.textContent = "";
  return true;
}



export function validateNameAndUpdateNameInputUI(nameInputElement) {
  if (nameInputElement === undefined || nameInputElement === null) {
    throw new Error("Name is null or undefined.");
  }

  if (!(nameInputElement instanceof HTMLInputElement)) {
    throw new Error(`Name Input: Expected an HTMLInputElement, but got (${typeof passwordInputElement}).`);
  }

  const { isValid, message } = isValidName(nameInputElement.value.trim());
  const errMessageElement = nameInputElement.parentElement.querySelector("#err-message-element");

  if (!isValid) {
    nameInputElement.classList.remove("is-invalid");
    errMessageElement.textContent = message;
    return false;
  }

  nameInputElement.classList.remove("is-invalid");
  nameInputElement.classList.add("is-valid");
  errMessageElement.textContent = "";
  return true;
}



export function toggleElementVisibility(element, hide, toggleClassName) {
  if (element === null || element === undefined) {
    throw new Error("Element is null or undefined.");
  }

  if (!(element instanceof HTMLElement)) {
    throw new Error(`Expected an HTMLElement, but got (${typeof element}).`);
  }

  if (typeof hide !== "boolean") {
    throw new Error(`Expected a boolean value, but received (${typeof hide})`);
  }

  if (toggleClassName) {
    element.classList.toggle(toggleClassName);
  }

  element.style.display = "";
  hide ? element.style.display = "none" : element.style.display = "block";
}




export function setIcon(element, oldClass, newClass) {

  if(!element) {
    throw new Error("Element not found")
  }

  if(element.classList.contains(oldClass)) {
    element.classList.remove(oldClass);
    element.classList.add(newClass);
  }
  else {
    element.classList.remove(newClass);
    element.classList.add(oldClass);
  }
}


export function setType(element,oldType,newType) {
  if(!element) {
    throw new Error("Element not found")
  }

  if(element.type == "password") {
    element.type = "text";
  }
  else {
    element.type = "password";
  }

}
