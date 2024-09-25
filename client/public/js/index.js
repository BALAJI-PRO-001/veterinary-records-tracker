import {setIcon,setType} from "./utils/userInterface.js"

const loginBTN = document.getElementById("login-btn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const icon = document.getElementById("eye-icon");
const rememberMe = document.getElementById("formCheck");

function setBorder(element,errElement) {
  if(element.value == "") {
    element.style.cssText = `border: 1px solid rgba(128, 128, 128, 0.451);`;
    errElement.innerText = "";
  }

}


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

  e.target.innerText = "Loading...";
  e.target.style.opacity = "0.7";
  e.target.setAttribute("disabled",'');
  const res = await fetch("/api/v1/admin/login",{
    method: "POST",
    headers: {"CONTENT-TYPE": "application/json" },
    body: JSON.stringify({
      email: emailInput.value.trim(),
      password: passwordInput.value.trim()
    })
  });

  const data = await res.json();
  e.target.innerText = "Login";
  e.target.style.opacity = "1";
  e.target.removeAttribute("disabled");
  const emailErr = document.getElementById("email-err-element");
  const passwordErr = document.getElementById("password-err-element");

  if(data.statusCode == 404) {
    emailErr.innerHTML = "* Email not found...";
    emailInput.style.cssText = `border: 2px solid red;`;
    emailErr.style.cssText = `color: red;`;
    return;
  }
  else {
    emailInput.style.cssText = `border: 0.01px solid rgba(128, 128, 128, 0.451);`;
    emailErr.innerText = '';
  }
  if(data.statusCode == 401) {
    passwordErr.innerHTML = "* Invalid password..";
    passwordInput.style.cssText = `border: 2px solid red;`
    passwordErr.style.cssText = `color: red;`;
    return;
  }
  else {
    passwordInput.style.cssText = `border: 0.1px solid rgba(128, 128, 128, 0.451);`
    passwordErr.innerText = '';
  }

  location.href = "/home";
}

emailInput.addEventListener("keyup",() => {
  setBorder(emailInput,emailInput.parentElement.querySelector("#email-err-element"));
})

passwordInput.addEventListener("keyup",() => {
  setBorder(passwordInput,passwordInput.parentElement.querySelector("#password-err-element"));
})

icon.addEventListener("click",() => {
  setIcon(icon,"bi-eye-slash","bi-eye");
  setType(passwordInput,"password","text");
})




loginBTN.addEventListener("click",login);
