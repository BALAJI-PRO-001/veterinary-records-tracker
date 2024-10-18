import { setIcon } from "./utils/userInteraction.js";

const home = document.getElementById("home");
const about = document.getElementById("about");
const download = document.getElementById("download");
const logout = document.getElementById("logout");
const toggleBtn =  document.getElementById("toggler");

const navigationMenu = document.getElementById("toggle-menu");

toggleBtn.addEventListener("click",() => {
    const icon = document.getElementById("bars");
    navigationMenu.classList.toggle("d-none");  
    setIcon(icon,'fa-bars','fa-times')
})


