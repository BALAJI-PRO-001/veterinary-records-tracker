import { toggleElementVisibility } from "./utils/userInteraction.js";

const contentContainer = document.getElementById("content-container");
const spinner = document.getElementById("spinner");
const cowImageContainer = document.getElementById("cow-img-container");
const addUserBTN = document.getElementById("add-user-btn")

function calculatePendingAmount(cows) {
  if (cows === null || cows === undefined) {
    throw new Error("Cows is null or undefined.");
  }
  const pendingAmount = cows.map((cow) => {
    const amounts = cow.injectionInfoAndAiDates.map(({pendingAmount}) => {
      return pendingAmount;
    });
    return amounts.reduce((total, amount) => total + amount, 0);
  });
  return pendingAmount.reduce((total, amount) => total + amount, 0)
}

addUserBTN.addEventListener("click",() => {
  location.href = "/add-new-record"
}) 

async function fetchRecordAndUpdateUI() {
  try {
    let index = 0;
    contentContainer.innerText = "";
    toggleElementVisibility(spinner, false, "d-none");
    const res = await fetch("/api/v1/records/all");
    const data = await res.json();
    toggleElementVisibility(spinner, true, "d-none");
    if(data.data.records.length == 0) {
      toggleElementVisibility(cowImageContainer,false,"d-none");
    } else {
      cowImageContainer.classList.add("d-none");
    }
    data.data.records.forEach((data) => {
      const details = `
        <a class="rounded-2 bg-white p-2 shadow mt-3 ms-sm-4 d-flex justify-content-between align-items-center text-decoration-none text-black" style="min-width: 300px; width: 320px; height: 60px; font-weight: 600;" href="/record/${data.user.id}">
          <span class="ms-3">${++index}</span>
          <span class="text-truncate" style="max-width: 150px;">${data.user.name}</span>
          <span class="text-success me-3">₹${calculatePendingAmount(data.cows)}</span>
        </a>
      `
      contentContainer.innerHTML += details;
    });
  } catch (err) {
    throw err;
  }
}



fetchRecordAndUpdateUI();