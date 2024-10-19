import { setIcon,setType } from "./utils/userInteraction.js";
import { validateEmailAndUpdateEmailInputUI,validatePasswordAndUpdatePasswordInputUI } from "./utils/userInteraction.js";
import { addValidationListenersToInputElement } from "./utils/common.js";

const loginForm = document.forms[0];
const emailInput = document.getElementById("email-input");  
const passwordInput = document.getElementById("password-input")
const rememberMe = document.getElementById("remember-me");
const eyeIcon = document.getElementById("eye-icon");
const loginBTN = document.getElementById("login-btn")


loginForm.reset();

eyeIcon.addEventListener("click",() => {
  setIcon(eyeIcon,"fa-eye","fa-eye-slash");
  setType(passwordInput,"password","text");
})


addValidationListenersToInputElement(emailInput,() => validateEmailAndUpdateEmailInputUI(emailInput));
addValidationListenersToInputElement(passwordInput,() => validatePasswordAndUpdatePasswordInputUI(passwordInput));


