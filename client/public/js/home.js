import { toggleElementVisibility } from "./utils/userInteraction.js";

const contentContainer = document.getElementById("content-container");
const spinner = document.getElementById("spinner");



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



async function fetchRecordAndUpdateUI() {
  try {
    contentContainer.innerText = "";
    toggleElementVisibility(spinner, false, "d-none");
    const res = await fetch("/api/v1/records/all");
    const data = await res.json();
    toggleElementVisibility(spinner, true, "d-none");
    data.data.records.forEach((data) => {
      console.log(data);
      const details = `
        <a class="rounded-2 bg-white p-2 shadow m-3 d-flex justify-content-around align-items-center text-decoration-none text-black" style="width: 300px; height: 60px; font-weight: 600;" href="/record/${data.user.id}">
          <span>1.</span>
          <span class="text-truncate" style="max-width: 150px;">${data.user.name}</span>
          <span class="text-success">₹${calculatePendingAmount(data.cows)}</span>
        </a>
      `
      contentContainer.innerHTML += details;
    });
  } catch (err) {
    console.log(err);
  }
}

fetchRecordAndUpdateUI();