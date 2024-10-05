const anchors = document.querySelectorAll("a");

const toggleBtn = document.querySelector(".navbar-toggler");
function addClass() {
    const items = document.querySelector(".items");
    items.classList.toggle("items1")
    items.classList.toggle("show");
} 
toggleBtn.addEventListener("click",addClass);

async function logOut(e) {
    e.preventDefault();
    const data = await fetch("/api/v1/admin/logout",{
        method: "GET"
    });
    if(data.status === 200) {
        window.location.href = "/";
    }
}

anchors[0].addEventListener("click",() => {
    window.location.href = "/home";
})
anchors[3].addEventListener("click",logOut)