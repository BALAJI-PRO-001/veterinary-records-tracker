import { toggleElementVisibility } from "./utils/userInteraction.js";


const alertBox = document.getElementById("alert-box");
const userNameSpan = document.getElementById("user-name");
const phoneNumberSpan = document.getElementById("phone-number");
const addressSpan = document.getElementById("address");
const pendingAmountSpan = document.getElementById("pending-amount");
const paginationList = document.getElementById("pagination-list");
const mainContainer = document.getElementById("main-container");
const spinner = document.getElementById("spinner");


async function getRecordFromServer(id) {
  const res = await fetch(`/api/v1/records/${id}`);
  const data = await res.json();
  if (data.statusCode === 200) {
    return data.data.record;
  }
}


async function updateUI() {
  try {
    const id = location.href.split("/").pop();
    toggleElementVisibility(mainContainer, true);
    const record = await getRecordFromServer(id);
    
    userNameSpan.innerText = record.user.name;
    phoneNumberSpan.innerText = record.user.phoneNumber;
    addressSpan.innerText = record.user.address;
    
    let pendingAmount = record.cows.map((cow) => {
      paginationList.innerHTML += `<li class="page-item c-fs-f-srp-p"><a id="page-link" class="page-link" href="">${cow.name}</a></li>`;

      const amounts = cow.injectionInfoAndAiDates.map(({pendingAmount}) => {
        return pendingAmount;
      });
      return amounts.reduce((total, amount) => total + amount, 0);
    });

    pendingAmountSpan.innerText = pendingAmount.reduce((total, amount) => total + amount, 0);

    toggleElementVisibility(spinner, false, "d-none")
    toggleElementVisibility(mainContainer, false);

  } catch(err) {
    alertBox.classList.toggle("d-none");
    alertBox.innerText = "Error :" + err.message;
  }
}

updateUI();

