
const contentContainer = document.getElementById("content-container");
const alertBox = document.getElementById("alert-box");
const spinner = document.getElementById("spinner");
const customersImgContainer = document.getElementById("customers-img-container");
const mainContainer = document.getElementById("main-container");
const cardContainer = mainContainer.querySelector("#card-container");

const deleteAllRecordsModal = document.getElementById("delete-all-records-modal");
const deleteAllRecordsModalOkEl = deleteAllRecordsModal.querySelector("#ok-element");


function countInjectionAndCalculatePendingAmount(cows) {
  if (cows === null || cows === undefined) {
    throw new Error("Cows is null or undefined.");
  }
  let totalInjection = 0;
  const pendingAmount = cows.map((cow) => {
    totalInjection += cow.injectionInfoAndAiDates.length;
    const amounts = cow.injectionInfoAndAiDates.map(({pendingAmount}) => {
      return pendingAmount;
    });
    return amounts.reduce((total, amount) => total + amount, 0);
  });
  return { 
    totalPendingAmount: pendingAmount.reduce((total, amount) => total + amount, 0),
    totalInjection: totalInjection
  };
}



function createCards(records) {
  if (records === null || records === undefined) {
    throw new Error("Records is null or undefined.");
  }

  const cards = [];
  for (let record of records) {
    const { totalPendingAmount, totalInjection } = countInjectionAndCalculatePendingAmount(record.cows);

    const card = document.createElement("a");
    card.href = "/records/" + record.user.id;
    card.classList = "d-flex text-decoration-none text-dark flex-column gap-3 p-2 fs-5 shadow rounded border mx-2 overflow-auto c-w-f-hp-card";
    card.style.cssText = "min-height: 60px; max-height: 200px;";
    card.innerHTML = `
      <div class="d-flex gap-2 w-100 flex-wrap">
         <span style="font-size: 18px;" class="text-truncate" style="max-width: 100px;"><i class="fa-solid fa-user text-primary"></i> ${record.user.name}</span>
         <span style="font-size: 18px;"><i class="fa-solid fa-phone text-primary"></i> ${record.user.phoneNumber}</span>
         <span style="font-size: 18px;" style="max-width: 200px;" class="text-truncate"><i class="fa-solid fa-location-dot text-primary"></i> ${record.user.address}</span>  
       </div>
       <hr class="m-0">
       <div class="d-flex gap-3 w-100 flex-wrap">
         <span style="font-size: 18px;"><i class="fa-solid fa-cow text-primary"></i> ${record.cows.length}</span> 
         <span style="font-size: 18px;"><i class="fas fa-syringe text-primary"></i> ${totalInjection}</span> 
         <span style="font-size: 18px;" class="text-success fw-bold"><i class="ms-1 fa-sharp fa-solid text-success fa-indian-rupee-sign"></i> ${totalPendingAmount}</span> 
       </div>
    `;
    cards.push(card);
  }
  return cards;
}


async function fetchRecordAndUpdateUI() {
  try {
    mainContainer.classList.add("d-none");
    spinner.classList.remove("d-none");

    const res = await fetch("/api/v1/records/all");
    const data = await res.json();
    spinner.classList.add("d-none");

    if (data.statusCode === 200) {
      if (data.data.records.length > 0) {
        cardContainer.append(...createCards(data.data.records));
        return mainContainer.classList.remove("d-none");
      } else {
        return customersImgContainer.classList.remove("d-none");
      }
    }

    alertBox.classList.remove("d-none");
    alertBox.innerText = "Error: " + data.message;
  } catch (err) {
    alertBox.classList.remove("d-none");
    alertBox.innerText = "Error: " + err.message;
  }
}


fetchRecordAndUpdateUI();



deleteAllRecordsModalOkEl.addEventListener("click", async () => {
  const mainContentEl = deleteAllRecordsModal.querySelector("#main-content");
  deleteAllRecordsModalOkEl.nextElementSibling.nextElementSibling.classList.remove("d-none");
  deleteAllRecordsModalOkEl.setAttribute("hidden", "");
  deleteAllRecordsModalOkEl.nextElementSibling.setAttribute("hidden", "");
  const res = await fetch("/api/v1/records/all", {method: "DELETE"});

  if (res.status === 401) {
    mainContentEl.classList.add("text-danger");
    mainContentEl.innerText = "Your session has expired. Please log out and log back in to continue.";
    deleteAllRecordsModalOkEl.nextElementSibling.nextElementSibling.classList.add("d-none");
    deleteAllRecordsModalOkEl.nextElementSibling.removeAttribute("hidden");
    return;
  }

  if (res.status === 204) {
    deleteAllRecordsModal.querySelector("#danger-icon").classList.add("d-none");
    deleteAllRecordsModal.querySelector("#success-icon").classList.remove("d-none");
    mainContentEl.classList.remove("text-danger");
    mainContentEl.innerHTML = "All records have been deleted successfully, including user records, cow records, and injection information.";
    deleteAllRecordsModalOkEl.nextElementSibling.nextElementSibling.classList.add("d-none");
    deleteAllRecordsModalOkEl.nextElementSibling.removeAttribute("hidden");
    deleteAllRecordsModalOkEl.nextElementSibling.innerText = "Go Back";

    deleteAllRecordsModal.addEventListener("hidden.bs.modal", () => {
      location.reload();
    });
    return;
  }

  // If possible error while deleting all user record.
  mainContentEl.classList.add("text-danger");
  mainContentEl.innerText = "Error: " + data.message;
  deleteAllRecordsModalOkEl.nextElementSibling.nextElementSibling.classList.add("d-none");
  deleteAllRecordsModalOkEl.nextElementSibling.removeAttribute("hidden");
  return;
});
