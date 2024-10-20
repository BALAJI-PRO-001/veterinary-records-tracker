import { setIcon,setType } from "./utils/userInteraction.js";
import { validateEmailAndUpdateEmailInputUI,validatePasswordAndUpdatePasswordInputUI } from "./utils/userInteraction.js";
import { addValidationListenersToInputElement } from "./utils/common.js";

const loginForm = document.forms[0];
const emailInput = loginForm.querySelector("#email-input");  
const passwordInput = loginForm.querySelector("#password-input")
const rememberMe = loginForm.querySelector("#remember-me");
const eyeIcon = loginForm.querySelector("#eye-icon");
const loginBTN = loginForm.querySelector("#login-btn")

loginForm.reset();

const adminLoginInformation = JSON.parse(localStorage.getItem("adminLoginInformation"));
if (adminLoginInformation) {
  emailInput.value = adminLoginInformation.email;
  passwordInput.value = adminLoginInformation.password;
  eyeIcon.setAttribute("hidden", "");
}

eyeIcon.addEventListener("click",() => {
  setIcon(eyeIcon,"fa-eye","fa-eye-slash");
  setType(passwordInput,"password","text");
})


addValidationListenersToInputElement(emailInput,() => validateEmailAndUpdateEmailInputUI(emailInput));
addValidationListenersToInputElement(passwordInput,() => validatePasswordAndUpdatePasswordInputUI(passwordInput));


loginBTN.addEventListener("click", async (e) => {
  e.preventDefault();

  const isValidEmail = validateEmailAndUpdateEmailInputUI(emailInput);
  const isValidPassword = validatePasswordAndUpdatePasswordInputUI(passwordInput);

  if(isValidEmail && isValidPassword) {
    try {
      loginBTN.innerText = "Loading ....";
      const res = await fetch("/api/v1/admin/login",{
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
        if(rememberMe.checked) {
          localStorage.setItem("adminLoginInformation", JSON.stringify({
            email: emailInput.value.trim(),
            password: passwordInput.value.trim()
          }));
        }
        location.href = "/home"
        return;
      }
    } catch(err) {
      console.warn(err);
    }
  }
});


