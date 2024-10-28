import { setIcon } from "./utils/userInteraction.js";
import { logout } from "./utils/common.js";

const downloadBTN = document.getElementById("download");
const logoutBTN = document.getElementById("logout");
const toggleBTN =  document.getElementById("toggler");
const navigationMenu = document.getElementById("toggle-menu");



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

downloadBTN.addEventListener("click",() => {
    location.href = "/home"
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






