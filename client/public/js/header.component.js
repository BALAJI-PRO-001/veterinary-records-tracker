import { setIcon } from "./utils/userInteraction.js";
import { logout } from "./utils/common.js";

const logoutBTN = document.getElementById("logout");
const toggleBTN =  document.getElementById("toggler");
const navigationMenu = document.getElementById("toggle-menu");
const searchInput = document.getElementById("search-input");
const header = document.getElementById("header");
const cowLogo = header.querySelector(".logo");


window.addEventListener("click",(e) => {
    if(e.target !== toggleBTN && !(navigationMenu.classList.contains("d-none"))) {
        const icon = document.getElementById("bars");
        navigationMenu.classList.add("d-none");  
        setIcon(icon,'fa-bars','fa-times');
    }
})

toggleBTN.addEventListener("click",() => {
    const icon = document.getElementById("bars");
    navigationMenu.classList.toggle("d-none");  
    setIcon(icon,'fa-bars','fa-times');
})


async function logoutUser(e) {
  e.preventDefault();
  try {
    await logout("/api/v1/admin/logout");
    location.href = "/";
  } catch(err) {
     console.warn(err.message);
  }
}

logoutBTN.addEventListener("click",logoutUser);

searchInput.nextElementSibling.addEventListener("click", () => {
  if (!location.href.includes("/home")) {
    location.href = `/home?${searchInput.value}`;
  }
});

searchInput.addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    if (!location.href.includes("/home")) {
      location.href = `/home?${searchInput.value}`;
    }
  }
});



header.addEventListener("click",(e) => {
  if(e.target != toggleBTN && e.target != cowLogo) {
    searchInput.focus();
  }
})



