import { createCards } from "./utils/userInteraction.js";

const alertBox = document.getElementById("alert-box");
const spinner = document.getElementById("spinner");
const customersImgContainer = document.getElementById("customers-img-container");
const mainContainer = document.getElementById("main-container");
const cardContainer = mainContainer.querySelector("#card-container");
const searchInput = document.getElementById("search-input");

const deleteAllRecordsModal = document.getElementById("delete-all-records-modal");
const deleteAllRecordsModalOkEl = deleteAllRecordsModal.querySelector("#ok-element");


async function fetchRecordAndUpdateUI() {
  try {
    mainContainer.classList.add("d-none");
    spinner.classList.remove("d-none");

    const res = await fetch("/api/v1/records/all");
    const data = await res.json();
    spinner.classList.add("d-none");

    if (data.statusCode === 200) {
      if (searchInput.value.trim().length > 0) {
        return;
      }

      if (data.data.records.length > 0) {
        localStorage.setItem("records", JSON.stringify(data.data.records));
        cardContainer.append(...createCards(data.data.records));
        return mainContainer.classList.remove("d-none");
      } else {
        localStorage.setItem("records", JSON.stringify([]));
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
