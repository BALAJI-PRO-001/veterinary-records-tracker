import { setIcon } from "./utils/userInteraction.js";
import { logout } from "./utils/common.js";
import { createCards } from "./utils/userInteraction.js";

const logoutBTN = document.getElementById("logout");
const toggleBTN =  document.getElementById("toggler");
const navigationMenu = document.getElementById("toggle-menu");
const searchInput = document.getElementById("search-input");
const header = document.getElementById("header");
const cowLogo = header.querySelector(".logo");
const cardContainer = document.getElementById("card-container");
const notePadContainer = document.getElementById("notepad-container");



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
const urlSearchParams = new URLSearchParams(location.search);
// const searchText = urlSearchParams.get("search") || "";
// searchInput.value = searchText.toLowerCase();
const records = JSON.parse(localStorage.getItem("records")) || [];
// const filteredRecords = records.filter(record => record.user && record.user.name.includes(searchText));

// if (cardContainer && filteredRecords.length > 0) {
//   cardContainer.innerHTML = "";
//   cardContainer.append(...createCards(filteredRecords));
// }

searchInput.nextElementSibling.addEventListener("click", () => {
  if (!location.href.includes("/home")) {
    location.href = `/home?search=${searchInput.value}`;
  }
});

const cards = createCards(records);
searchInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter" && !location.href.includes("/home")) {
    location.href = `/home?search=${searchInput.value}`;
  }

  if (location.href.includes("/home") && cardContainer && records.length > 0) {
    const filteredRecords = records.filter(record => record.user && record.user.name.includes(searchInput.value.trim()));
    console.log(filteredRecords.length);
    cardContainer.innerHTML = "";
    notePadContainer.classList.add("d-none");
    filteredRecords.length > 0 ? 
      cardContainer.append(...createCards(filteredRecords)) :
      notePadContainer.classList.remove("d-none");
  }
});



header.addEventListener("click",(e) => {
  if(e.target != toggleBTN && e.target != cowLogo) {
    searchInput.focus();
  }
})



