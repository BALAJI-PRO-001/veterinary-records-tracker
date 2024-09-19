import {setIcon,setType} from "./utils/userInterface.js"

const loginBTN = document.getElementById("login-btn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const icon = document.getElementById("eye-icon");
const rememberMe = document.getElementById("formCheck");

async function login(e) {
  e.preventDefault();

  if(rememberMe.checked) {
    localStorage.setItem("email",emailInput.value);
    localStorage.setItem("password",passwordInput.value);
  }
  
  const res = await fetch("/api/v1/admin/login",{
    method: "POST",
    headers: {"CONTENT-TYPE": "application/json" },
    body: JSON.stringify({
      email: emailInput.value.trim(),
      password: passwordInput.value.trim()
    })
  });

  const data = await res.json();
  const emailErr = document.getElementById("email-err-element");
  const passwordErr = document.getElementById("password-err-element");

  if(data.statusCode == 404) {
    emailErr.innerHTML = "* Email not found...";
    emailInput.style.cssText = `border: 2px solid red;`;
    emailErr.style.cssText = `color: red;`;
    return;
  }
  else {
    emailInput.style.cssText = `border: 2px solid gray;`;
    emailErr.innerText = '';
  }
  if(data.statusCode == 401) {
    passwordErr.innerHTML = "* Invalid password..";
    passwordInput.style.cssText = `border: 2px solid red;`
    passwordErr.style.cssText = `color: red;`;
    return;
  }
  else {
    passwordInput.style.cssText = `border: 2px solid transparent;`
    passwordErr.innerText = '';
  }
  location.href = "/home";
}

icon.addEventListener("click",() => {
  setIcon(icon,"bi-eye-slash","bi-eye");
  setType(passwordInput,"password","text");
})




loginBTN.addEventListener("click",login);
