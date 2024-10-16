
const toggleBtn =  document.getElementById("toggler");
const navigationMenu = document.getElementById("toggle-menu");


console.log(toggleBtn);



toggleBtn.addEventListener("click",() => {
    navigationMenu.classList.toggle("d-none");
})