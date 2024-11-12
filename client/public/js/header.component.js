import { setIcon } from "./utils/userInteraction.js";
import { logout } from "./utils/common.js";
import { createCards } from "./utils/userInteraction.js";

const logoutBTN = document.getElementById("logout");
const toggleBTN =  document.getElementById("toggler");
const navigationMenu = document.getElementById("toggle-menu");
const searchInput = document.getElementById("search-input");
const cardContainer = document.getElementById("card-container");
const notePadContainer = document.getElementById("notepad-container");
const inputGroup = document.getElementById("input-group");
const searchIcon = document.getElementById("search-icon");

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
});


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
const searchText = urlSearchParams.get("search") || "";
searchInput.value = searchText.trim().toLowerCase();
const records = JSON.parse(localStorage.getItem("records")) || [];

if (records.length > 0) {
  const customerNamesOptionEl = records.map((record) => {
    return `<option value="${record.user.name}">${record.user.name}</option>`;
  }).join("");
  searchInput.nextElementSibling.innerHTML = customerNamesOptionEl;
}

searchIcon.addEventListener("click", () => {
  if (!location.href.includes("/home") && searchInput.value.trim() !== "") {
    location.href = `/home?search=${searchInput.value}`;
  }
});


function sortRecordAndUpdateUI() {
  if (location.href.includes("/home") && cardContainer && records.length > 0) {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const filteredRecords = records.filter(record => 
      record.user && record.user.name.toLowerCase().includes(searchTerm)
    );
    cardContainer.innerHTML = "";

    if (filteredRecords.length > 0) {
      cardContainer.append(...createCards(filteredRecords));
      notePadContainer.classList.add("d-none"); 
    } else {
      notePadContainer.classList.remove("d-none");
    }
  }
}

searchInput.addEventListener("input", sortRecordAndUpdateUI);


inputGroup.addEventListener("click",(e) => {
  searchInput.focus();
});
