import {
        removeBorder, 
        setIcon,
        setType,
        setMessage,
        setBorder
      } from "./utils/userInterface.js";
import validator from "./utils/validator.js";
import {addValidationListener} from "./utils/common.js";

const loginBTN = document.getElementById("login-btn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const icon = document.getElementById("eye-icon");
const rememberMe = document.getElementById("formCheck");

window.addEventListener("load", () => {
  const email = localStorage.getItem("email");
  // const password = localStorage.getItem("password");
  emailInput.value = email;
  // passwordInput.value = password;
});

async function login(e) {
  e.preventDefault();

  if(rememberMe.checked) {
    localStorage.setItem("email",emailInput.value);
    localStorage.setItem("password",passwordInput.value);
  }
  e.target.innerHTML = "loading...";
  e.target.style.opacity = "0.7";
  e.target.setAttribute("disabled","");

  try {
    const res = await fetch("/api/v1/admin/login",{
      method: "POST",
      headers: {"CONTENT-TYPE": "application/json" },
      body: JSON.stringify({
        email: emailInput.value.trim(),
        password: passwordInput.value.trim()
      })
    });

    const data = await res.json();
    e.target.innerHTML = "logIn";
    e.target.style.opacity = "1";
    e.target.removeAttribute("disabled","");

    console.log(data);
    if(data.statusCode == 404) {
      setBorder(emailInput,"is-invalid");
      setMessage(emailInput.nextElementSibling,"*invalid Email..")
      return;
    }else {
      removeBorder(emailInput,"is-invalid");
      setMessage(emailInput.nextElementSibling,"");
    }

    if(data.statusCode == 401) {
      setBorder(passwordInput,"is-invalid");
      setMessage(passwordInput.nextElementSibling,"*invalid Password...");
      return;
    }
    else {
     removeBorder(passwordInput,"is-invalid");
     setMessage(passwordInput.nextElementSibling,"");
    }
    if(data.statusCode == 200) {
      location.href = "/home"
    }
    
  }catch(err) {
    console.log(err.message);
  }
}

addValidationListener(emailInput,validator.isAllFieldsValid);
addValidationListener(passwordInput,validator.isAllFieldsValid);

icon.addEventListener("click",() => {
  setIcon(icon,"bi-eye-slash","bi-eye");
  setType(passwordInput,"password","text");
})

loginBTN.addEventListener("click",login);
