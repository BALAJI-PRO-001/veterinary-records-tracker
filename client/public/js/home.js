import { showAllRecords } from "./utils/common.js";

const addUserBtn = document.getElementById("add-user-btn");
const mainContainer = document.getElementById("main-container");


async function loadContent(e) {
    try {
        const res = await fetch("/api/v1/records/all",{
            method: "GET"
        });
        const data = await res.json();
        if(data.success == true) {
            // console.log(data.data.records.length);
            showAllRecords(data.data.records,mainContainer);
        }
    } catch(err) {
        console.log(err);
    }
}


window.addEventListener("load",loadContent);



addUserBtn.addEventListener("click",() => {
    location.href = "/add-new-record";
})

