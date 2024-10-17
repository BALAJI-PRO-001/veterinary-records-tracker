
const toggleBtn =  document.getElementById("toggler");
const navigationMenu = document.getElementById("toggle-menu");

toggleBtn.addEventListener("click",() => {
    navigationMenu.classList.toggle("d-none");  
})

