import { addValidationListenersToInputElement } from "./utils/common.js";
import { validateEmailAndUpdateEmailInputUI, validatePasswordAndUpdatePasswordInputUI } from "./utils/userInteraction.js";


const superUserLoginForm = document.forms[0];
const emailInput = superUserLoginForm.querySelector("#email");
const passwordInput = superUserLoginForm.querySelector("#password");
const loginBTN = superUserLoginForm.querySelector("button");
const globalErrElement = document.getElementById("global-err-element");

/* Reset the form whenever page is reloaded. */
superUserLoginForm.reset();

addValidationListenersToInputElement(emailInput, () => validateEmailAndUpdateEmailInputUI(emailInput));
addValidationListenersToInputElement(passwordInput, () => validatePasswordAndUpdatePasswordInputUI(passwordInput));


loginBTN.addEventListener("click", async (e) => {
  e.preventDefault();

  const isValidEmail = validateEmailAndUpdateEmailInputUI(emailInput);
  const isValidPassword = validatePasswordAndUpdatePasswordInputUI(passwordInput);

  if (isValidEmail && isValidPassword) {
    try {
      loginBTN.innerText = "Loading ....";
      const res = await fetch("/api/v1/super-user/login", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          email: emailInput.value.trim(),
          password: passwordInput.value.trim()
        })
      });

      const data = await res.json();
      loginBTN.innerText = "Login"; 

      if (data.statusCode === 404) {
        emailInput.classList.remove("is-valid");
        emailInput.classList.add("is-invalid");
        emailInput.nextElementSibling.textContent = "Email address does not exist. Please try another email ....";
        return;
      }

      if (data.statusCode === 401) {
        passwordInput.classList.remove("is-valid");
        passwordInput.classList.add("is-invalid");
        passwordInput.nextElementSibling.textContent = "Please enter a valid password for this account ....";
        return;
      }

      if (data.statusCode === 200) {
        location.href = "/super-user/dashboard"
        return;
      }
      
    } catch(err) {
      globalErrElement.innerText = "Error: " + err.message;
    }
  } 
});