import { isValidEmail, isValidPassword } from "./validator.js";

export function validateEmailAndUpdateEmailInputUI(emailInputElement) {
  if (emailInputElement === null || emailInputElement === undefined) {
    throw new Error("Email input element is null or undefined.");
  }

  if (!(emailInputElement instanceof HTMLInputElement)) {
    throw new Error(`Email Input: Expected an HTMLInputElement, but got (${typeof emailInputElement}).`);
  }

  const { isValid, message } = isValidEmail(emailInputElement.value.trim())
  if (!isValid) {
    emailInputElement.classList.add("is-invalid");
    emailInputElement.nextElementSibling.textContent = message;
    return false;
  }

  emailInputElement.classList.remove("is-invalid")
  emailInputElement.classList.add("is-valid");
  emailInputElement.nextElementSibling.textContent = "";
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
  if (!isValid) {
    passwordInputElement.classList.add("is-invalid");
    passwordInputElement.nextElementSibling.textContent = message;
    return false;
  }

  passwordInputElement.classList.remove("is-invalid")
  passwordInputElement.classList.add("is-valid");
  passwordInputElement.nextElementSibling.textContent = "";
  return true;
}