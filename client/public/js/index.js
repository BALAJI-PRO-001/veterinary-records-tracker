import { setIcon,setType } from "./utils/userInteraction.js";

const emailInput = document.getElementById("email-input");  
const passwordInput = document.getElementById("password-input")
const rememberMe = document.getElementById("remember-me");
const eyeIcon = document.getElementById("eye-icon");
const loginBTN = document.getElementById("login-btn")


eyeIcon.addEventListener("click",() => {
  setIcon(eyeIcon,"fa-eye","fa-eye-slash");
  setType(passwordInput,"password","text");
})