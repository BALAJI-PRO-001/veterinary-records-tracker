import { isEmpty, isValidAddress, isValidAmount, isValidDate, isValidEmail, isValidName, isValidPassword, isValidPhoneNumber } from "./validator.js";



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
    throw new Error(`Password Input: Expected an HTMLInputElement, but got (${typeof passwordInputElement}).`);
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
    nameInputElement.classList.add("is-invalid");
    errMessageElement.textContent = message;
    return false;
  }

  nameInputElement.classList.remove("is-invalid");
  nameInputElement.classList.add("is-valid");
  errMessageElement.textContent = "";
  return true;
}



export function validatePhoneNumberAndUpdatePhoneNumberInputUI(phoneNumberInput) {
  if (phoneNumberInput === undefined || phoneNumberInput === null) {
    throw new Error("Name is null or undefined.");
  }

  if (!(phoneNumberInput instanceof HTMLInputElement)) {
    throw new Error(`PhoneNumber Input: Expected an HTMLInputElement, but got (${typeof passwordInputElement}).`);
  }

  const { isValid, message } = isValidPhoneNumber(phoneNumberInput.value.trim());
  const errMessageElement = phoneNumberInput.parentElement.querySelector("#err-message-element");

  if (!isValid) {
    phoneNumberInput.classList.add("is-invalid");
    errMessageElement.textContent = message;
    return false;
  }

  phoneNumberInput.classList.remove("is-invalid");
  phoneNumberInput.classList.add("is-valid");
  errMessageElement.textContent = "";
  return true;
}



export function validateAddressAndUpdateAddressInputUI(addressInputElement) {
  if (addressInputElement === undefined || addressInputElement === null) {
    throw new Error("A is null or undefined.");
  }

  if (!(addressInputElement instanceof HTMLInputElement)) {
    throw new Error(`Address Input: Expected an HTMLInputElement, but got (${typeof passwordInputElement}).`);
  }

  const { isValid, message } = isValidAddress(addressInputElement.value.trim());
  const errMessageElement = addressInputElement.parentElement.querySelector("#err-message-element");

  if (!isValid) {
    addressInputElement.classList.add("is-invalid");
    errMessageElement.textContent = message;
    return false;
  }

  addressInputElement.classList.remove("is-invalid");
  addressInputElement.classList.add("is-valid");
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



export function validateInputAndUpdateUI(inputElement) {
  if (inputElement === null || inputElement === undefined) {
    throw new Error("Element is null or undefined.");
  }

  if (!(inputElement instanceof HTMLInputElement)) {
    throw new Error(`Expected an HTMLElement, but got (${typeof element}).`);
  }

  const { isValid, message } = isEmpty(inputElement.value.trim());
  const errMessageElement = inputElement.parentElement.querySelector("#err-message-element");

  if (!isValid) {
    inputElement.classList.add("is-invalid");
    errMessageElement.textContent = message;
    return false;
  }

  inputElement.classList.remove("is-invalid");
  inputElement.classList.add("is-valid");
  errMessageElement.textContent = "";
  return true;
}



export function validateAmountAndUpdateAmountInputUI(amountInputElement) {
  if (amountInputElement === null || amountInputElement === undefined) {
    throw new Error("Element is null or undefined.");
  }

  if (!(amountInputElement instanceof HTMLInputElement)) {
    throw new Error(`Expected an HTMLElement, but got (${typeof element}).`);
  }

  const { isValid, message } = isValidAmount(amountInputElement.value.trim());
  const errMessageElement = amountInputElement.parentElement.querySelector("#err-message-element");

  if (!isValid) {
    amountInputElement.classList.add("is-invalid");
    errMessageElement.textContent = message;
    return false;
  }

  amountInputElement.classList.remove("is-invalid");
  amountInputElement.classList.add("is-valid");
  errMessageElement.textContent = "";
  return true;
}



export function validateDateAndUpdateDateInputUI(dateInputElement) {
  if (dateInputElement === null || dateInputElement === undefined) {
    throw new Error("Element is null or undefined.");
  }

  if (!(dateInputElement instanceof HTMLInputElement)) {
    throw new Error(`Expected an HTMLElement, but got (${typeof element}).`);
  }

  const date = dateInputElement.value.split("-").reverse().join("/").trim();
  const { isValid, message } = isValidDate(date);
  const errMessageElement = dateInputElement.parentElement.querySelector("#err-message-element");

  if (!isValid) {
    dateInputElement.classList.add("is-invalid");
    errMessageElement.textContent = message;
    return false;
  }

  dateInputElement.classList.remove("is-invalid");
  dateInputElement.classList.add("is-valid");
  errMessageElement.textContent = "";
  return true;
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
