import { addValidationListenersToInputElement } from "./utils/common.js";
import { 
  toggleElementVisibility, 
  validateAddressAndUpdateAddressInputUI, 
  validateNameAndUpdateNameInputUI, 
  validatePhoneNumberAndUpdatePhoneNumberInputUI,
  validateInputAndUpdateUI
} from "./utils/userInteraction.js";


/* Global Objects */
const userNameSpan = document.getElementById("user-name");
const phoneNumberSpan = document.getElementById("phone-number");
const addressSpan = document.getElementById("address");
const cowNameAndBreedSpan = document.getElementById("cow-name-and-breed");
const bullNameSpan = document.getElementById("bull-name");


const alertBox = document.getElementById("alert-box");
const pendingAmountSpan = document.getElementById("pending-amount");
const paginationContainer = document.getElementById("pagination-container");
const mainContainer = document.getElementById("main-container");
const spinner = document.getElementById("spinner");
const tableContainer = document.getElementById("table-container");
const cowActionsBTNContainer = document.getElementById("cow-action-btn-container");
const cowImgContainer = document.getElementById("cow-img-container");
const cowInfoContainer = document.getElementById("cow-info-container");


const updateUserRecordModal = document.getElementById("update-user-record-modal");
const userNameInput = updateUserRecordModal.querySelector("#name");
const phoneNumberInput = updateUserRecordModal.querySelector("#phone-number");
const addressInput = updateUserRecordModal.querySelector("#address");
const updateUserRecordBTN = updateUserRecordModal.querySelector("#update-btn");
const updateUserRecordModalMessageEl = updateUserRecordModal.querySelector("#message-element");


const updateCowRecordModal = document.getElementById("update-cow-record-modal");
const cowNameInput = updateCowRecordModal.querySelector("#name");
const breedInput = updateCowRecordModal.querySelector("#breed");
const bullNameInput = updateCowRecordModal.querySelector("#bull-name");
const updateCowRecordBTN = updateCowRecordModal.querySelector("#update-btn");
const updateCowRecordModalMessageEl = updateCowRecordModal.querySelector("#message-element");

const deleteUserRecordModal = document.getElementById("delete-user-record-modal");
const deleteUserRecordOkEl = deleteUserRecordModal.querySelector("#ok-element");

const deleteCowRecordModal = document.getElementById("delete-cow-record-modal");
const deleteCowRecordOkEl = deleteCowRecordModal.querySelector("#ok-element");


/* This function used to reset the update user record modal components to old state */
function updateUserRecordToUI(user) {
  if (user === null || user === undefined) {
    throw new Error("User is null or undefined.");
  }

  userNameSpan.innerText = user.name;
  phoneNumberSpan.innerText = user.phoneNumber;
  addressSpan.innerText = user.address;
}


/* This function used to reset the update cow record modal components to old state */
function updateCowRecordToUI(cow) {
  if (cow === null || cow === undefined) {
    throw new Error("Cow is null or undefined.")
  }

  cowNameAndBreedSpan.previousElementSibling.classList.remove("d-none");
  bullNameSpan.previousElementSibling.classList.remove("d-none");
  cowNameAndBreedSpan.innerText = cow.name + " - " + cow.breed;
  bullNameSpan.innerText = cow.bullName;
}


/* Create a dynamic inject info and ai dates table based on records */
function createDynamicInjectionInfoAndAiDatesTable(injectionInfoAndAiDates) {
  if (injectionInfoAndAiDates === null || injectionInfoAndAiDates === undefined) {
    throw new Error("Injection info and ai dates is null or undefined.");
  }

  const table = document.createElement("table");
  table.className = "table table-bordered table-sm table-hover c-fs-f-srp-t";
  
  const theadString = `
    <thead>
      <tr class="text-nowrap position-sticky bg-white" style="top: -1px;">
        <th>Name</th>
          <th>Cost</th>
          <th>G-Amount</th>
          <th>P-Amount</th>     
          <th>Ai-Date</th> 
        </tr>
    </thead>
  `;

  let tRowsString = "";
  for (let { id, name, price, givenAmount, pendingAmount, date } of injectionInfoAndAiDates) {
    const trString = `
      <tr id="table-row" key="${id}">
        <td>${name}</td>
        <td>${price}</td>
        <td>${givenAmount}</td>
        <td>${pendingAmount}</td>
        <td>${date}</td>
      </tr>
    `;
    tRowsString += trString;
  }

  table.innerHTML = `${theadString} <tbody> ${tRowsString} </tbody>`;
  return table;
}


/* Create Dynamic paginationList based by cow record */
function createCowsPaginationList(cows) {
  if (cows === null || cows === undefined) {
    throw new Error("Cows is null or undefined.");
  }

  const ul = document.createElement("ul");
  ul.className = "pagination mt-3 mb-0 text-nowrap";
  ul.id = "pagination-list";

  for (let cow of cows) {
    const li = document.createElement("li");
    li.className = "page-item c-fs-f-srp-p";
    li.id = "page-item";

    const a = document.createElement("a");
    a.className = "page-link cursor-pointer";
    a.id = "page-link";
    a.key = cow.id;
    a.innerText = cow.name;

    li.appendChild(a);
    ul.appendChild(li);
  }
  return ul;
}



function toggleAlertBox(show, message) {
  if (show) {
    alertBox.classList.remove("d-none");
    alertBox.innerText = message;
  } else {
    alertBox.classList.add("d-none");
    alertBox.innerText = "";
  }
}



function resetUserUpdateModalComponents() {
  let components = [userNameInput, phoneNumberInput, addressInput];
  for (let component of components) {
    component.classList.remove("is-valid", "is-invalid");
    component.parentElement.querySelector("#err-message-element").innerText = "";
  }
  updateUserRecordModalMessageEl.innerText = "";
}



function resetUpdateCowModalComponents() {
  let components = [cowNameInput, breedInput, bullNameInput];
  for (let component of components) {
    component.classList.remove("is-valid", "is-invalid");
    component.parentElement.querySelector("#err-message-element").innerText = "";
  }
  updateCowRecordModalMessageEl.innerText = "";
}



function resetDeleteCowModalComponents() {
  deleteCowRecordModal.querySelector("#danger-icon").classList.remove("d-none");
  deleteCowRecordModal.querySelector("#success-icon").classList.add("d-none");
  deleteCowRecordModal.querySelector("#main-content").innerText = "Are you sure you want to delete this cow record, including the injection information and AI (Artificial Insemination) dates?";
  deleteCowRecordOkEl.removeAttribute("hidden");
}


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
    toggleElementVisibility(spinner, false, "d-none");

    const id = location.href.split("/").pop(); 
    const res = await fetch("/api/v1/records/" + Number(id));
    if (res.status === 401) {
      toggleAlertBox(true, "Warning: Your session has expired. Please log out and log back in to continue.");
      toggleElementVisibility(spinner, true, "d-none");
      return;
    }

    if (res.status === 404) {
      toggleAlertBox(true, "Not Found: Record not found for the specific id: " + id + ".");
      toggleElementVisibility(spinner, true, "d-none");
      return;
    }

    const data = await res.json();
    const record = data.data.record;

    // Render user record to ui.
    updateUserRecordToUI(record.user);

    if (record.cows.length <= 0) {
      cowImgContainer.classList.remove("d-none");
      pendingAmountSpan.innerText = "0";
    } else {
      cowImgContainer.classList.add("d-none");
    }


    let selectedCow = null;
    let selectedPageLink = null;

    if (record.cows.length > 0) {
      // Calculate pending amount and update pending amount to ui. 
      pendingAmountSpan.innerText = calculatePendingAmount(record.cows);

      // Render first cow record to ui.
      updateCowRecordToUI(record.cows[0]);
      selectedCow = record.cows[0];

      // Render pagination list to ui.
      paginationContainer.appendChild(createCowsPaginationList(record.cows));
      selectedPageLink = paginationContainer.children[0].children[0].children[0];

      // Render first injection info and ai date data to ui. 
      tableContainer.appendChild(createDynamicInjectionInfoAndAiDatesTable(record.cows[0].injectionInfoAndAiDates));
      cowActionsBTNContainer.classList.remove("d-none");

      // Listen pagination click event and update cow record based by which link is clicked. 
      const pageLinks = paginationContainer.querySelectorAll("#page-link");
      pageLinks.forEach((pageLink) => {
        pageLink.addEventListener("click", (e) => {
          const cow = record.cows.find((cow) => cow.id === e.target.key);
          updateCowRecordToUI(cow);
          selectedPageLink = e.target;
          tableContainer.innerHTML = "";
          tableContainer.appendChild(createDynamicInjectionInfoAndAiDatesTable(cow.injectionInfoAndAiDates));

          // Reassign cow records by pagination link clicked.
          selectedCow = cow;
          cowNameInput.value = cow.name;
          breedInput.value = cow.breed;
          bullNameInput.value = cow.bullName;
        });
      });
    }

    toggleElementVisibility(spinner, false, "d-none");
    toggleElementVisibility(mainContainer, false, "d-none");

    // Update user record code implementation.
    userNameInput.value = record.user.name;
    phoneNumberInput.value = record.user.phoneNumber;
    addressInput.value = record.user.address;

    addValidationListenersToInputElement(userNameInput, () => validateNameAndUpdateNameInputUI(userNameInput));
    addValidationListenersToInputElement(phoneNumberInput, () => validatePhoneNumberAndUpdatePhoneNumberInputUI(phoneNumberInput));
    addValidationListenersToInputElement(addressInput, () => validateAddressAndUpdateAddressInputUI(addressInput));

    updateUserRecordModal.addEventListener("hidden.bs.modal", () => {
      resetUserUpdateModalComponents();
      // Update user record code implementation.
      userNameInput.value = record.user.name;
      phoneNumberInput.value = record.user.phoneNumber;
      addressInput.value = record.user.address;
    });

    updateUserRecordBTN.addEventListener("click", async (e) => {
      e.preventDefault();
      const isValidName = validateNameAndUpdateNameInputUI(userNameInput);
      const isValidPhoneNumber = validatePhoneNumberAndUpdatePhoneNumberInputUI(phoneNumberInput);
      const isValidAddress = validateAddressAndUpdateAddressInputUI(addressInput);

      if (isValidName && isValidPhoneNumber && isValidAddress) {
        updateUserRecordModalMessageEl.innerText = "Saving Changes ...."
        updateUserRecordBTN.setAttribute("disabled", "");
        updateUserRecordBTN.nextElementSibling.setAttribute("disabled", "");

        const res = await fetch("/api/v1/records/users/" + record.user.id, {
          headers: { "Content-Type": "application/json" },
          method: "PATCH",
          body: JSON.stringify({
            name: userNameInput.value.trim(),
            phoneNumber: Number(phoneNumberInput.value.trim()),
            address: addressInput.value.trim()
          })
        });
        const data = await res.json();
        updateUserRecordBTN.removeAttribute("disabled");
        updateUserRecordBTN.nextElementSibling.removeAttribute("disabled");
        
        if (data.statusCode === 401) {
          updateUserRecordModalMessageEl.classList.remove("text-success");
          updateUserRecordModalMessageEl.classList.add("text-danger");
          return updateUserRecordModalMessageEl.innerText = "Your session has expired. Please log out and log back in to continue.";
        }

        if (data.statusCode === 409) {
          phoneNumberInput.classList.remove("is-valid");
          phoneNumberInput.classList.add("is-invalid");
          phoneNumberInput.nextElementSibling.innerText = "Phone number is already in use.";
          updateUserRecordModalMessageEl.innerText = "";
          return;
        }

        if (data.statusCode === 200) {
          updateUserRecordModalMessageEl.classList.remove("text-danger");
          updateUserRecordModalMessageEl.classList.add("text-success");
          updateUserRecordModalMessageEl.innerText = "Changes saved successfully.";
          updateUserRecordToUI(data.data.user);
          record.user.name = data.data.user.name;
          record.user.phoneNumber = data.data.user.phoneNumber;
          record.user.address = data.data.user.address;
          
          setTimeout(() => {
            resetUserUpdateModalComponents();
          }, 1000);
          return;
        }

        // If any possible error.
        updateUserRecordModalMessageEl.classList.remove("text-success");
        updateUserRecordModalMessageEl.classList.add("text-danger");
        updateUserRecordModalMessageEl.innerText = data.message;
      }
    });


    // Update cow record code implementation.
    if (record.cows.length > 0) {
      cowNameInput.value = record.cows[0].name;
      breedInput.value = record.cows[0].breed;
      bullNameInput.value = record.cows[0].bullName;

      addValidationListenersToInputElement(cowNameInput, () => validateInputAndUpdateUI(cowNameInput));
      addValidationListenersToInputElement(breedInput, () => validateInputAndUpdateUI(breedInput));
      addValidationListenersToInputElement(bullNameInput, () => validateInputAndUpdateUI(bullNameInput));      
      
      updateCowRecordModal.addEventListener("hidden.bs.modal", () => {
        resetUpdateCowModalComponents();
        
        cowNameInput.value = selectedCow.name;
        breedInput.value = selectedCow.breed;
        bullNameInput.value = selectedCow.bullName;
      });

      updateCowRecordBTN.addEventListener("click", async (e) => {
        e.preventDefault();

        const isValidCowName = validateInputAndUpdateUI(cowNameInput);
        const isValidBreed = validateInputAndUpdateUI(breedInput);
        const isValidBullName = validateInputAndUpdateUI(bullNameInput);

        if (isValidCowName && isValidBreed && isValidBullName) {
          updateCowRecordModalMessageEl.innerText = "Saving Changes ....";
          updateCowRecordBTN.setAttribute("disabled", "");
          updateCowRecordBTN.nextElementSibling.setAttribute("disabled", "");

          const res = await fetch(`/api/v1/records/${record.user.id}/cows/${selectedCow.id}`, {
            headers: { "Content-Type": "application/json" },
            method: "PATCH",
            body: JSON.stringify({
              name: cowNameInput.value.trim(),
              breed: breedInput.value.trim(),
              bullName: bullNameInput.value.trim()
            })
          });
          const data = await res.json();
          updateCowRecordBTN.removeAttribute("disabled");
          updateCowRecordBTN.nextElementSibling.removeAttribute("disabled");

          if (data.statusCode === 401) {
            updateCowRecordModalMessageEl.classList.remove("text-success");
            updateCowRecordModalMessageEl.classList.add("text-danger");
            return updateCowRecordModalMessageEl.innerText = "Your session has expired. Please log out and log back in to continue.";
          }
          
          if (data.statusCode === 200) {
            updateCowRecordModalMessageEl.classList.remove("text-danger");
            updateCowRecordModalMessageEl.classList.add("text-success");
            updateCowRecordModalMessageEl.innerText = "Changes saved successfully.";
            updateCowRecordToUI(data.data.cow);
            selectedCow.name = data.data.cow.name;
            selectedCow.breed = data.data.cow.breed;
            selectedCow.bullName = data.data.cow.bullName;

            // Update pagination link content when current cow name updated.
            if (selectedPageLink) {
              selectedPageLink.innerText = data.data.cow.name;
            }
            
            setTimeout(() => {
              resetUpdateCowModalComponents();
            }, 1000);
            return;
          }

          // If any possible error.
          updateCowRecordModalMessageEl.classList.remove("text-success");
          updateCowRecordModalMessageEl.classList.add("text-danger");
          updateCowRecordModalMessageEl.innerText = data.message;
        }
      });
    }


    // Delete user record code implementation.
    deleteUserRecordOkEl.addEventListener("click", async () => {
      const mainContentEl = deleteUserRecordModal.querySelector("#main-content");
      deleteUserRecordOkEl.nextElementSibling.nextElementSibling.classList.remove("d-none");
      deleteUserRecordOkEl.setAttribute("hidden", "");
      deleteUserRecordOkEl.nextElementSibling.setAttribute("hidden", "");
      const res = await fetch("/api/v1/records/" + record.user.id, {method: "DELETE"});

      if (res.status === 401) {
        mainContentEl.classList.add("text-danger");
        mainContentEl.innerText = "Your session has expired. Please log out and log back in to continue.";
        deleteUserRecordOkEl.nextElementSibling.nextElementSibling.classList.add("d-none");
        deleteUserRecordOkEl.nextElementSibling.removeAttribute("hidden");
        return;
      }

      if (res.status === 204) {
        deleteUserRecordModal.querySelector("#danger-icon").classList.add("d-none");
        deleteUserRecordModal.querySelector("#success-icon").classList.remove("d-none");
        mainContentEl.classList.remove("text-danger");
        mainContentEl.innerHTML = "All user and cow records have been successfully deleted.";
        deleteUserRecordOkEl.nextElementSibling.nextElementSibling.classList.add("d-none");
        deleteUserRecordOkEl.nextElementSibling.removeAttribute("hidden");
        deleteUserRecordOkEl.nextElementSibling.innerText = "Go Back";

        deleteUserRecordModal.addEventListener("hidden.bs.modal", () => {
          location.href = "/home";
        });
        return;
      }

      // If possible error while deleting user record.
      mainContentEl.classList.add("text-danger");
      mainContentEl.innerText = "Error: " + data.message;
      deleteUserRecordOkEl.nextElementSibling.nextElementSibling.classList.add("d-none");
      deleteUserRecordOkEl.nextElementSibling.removeAttribute("hidden");
      return;
    });


    // Delete cow record code implementation.
    deleteCowRecordModal.addEventListener("hidden.bs.modal", () => {
      resetDeleteCowModalComponents();
    });

    deleteCowRecordOkEl.addEventListener("click", async () => {
      const mainContentEl = deleteCowRecordModal.querySelector("#main-content");
      deleteCowRecordOkEl.nextElementSibling.nextElementSibling.classList.remove("d-none");
      deleteCowRecordOkEl.setAttribute("hidden", "");
      deleteCowRecordOkEl.nextElementSibling.setAttribute("hidden", "");
      const res = await fetch(`/api/v1/records/${record.user.id}/cows/${selectedCow.id}`, {method: "DELETE"});

      if (res.status === 401) {
        mainContentEl.classList.add("text-danger");
        mainContentEl.innerText = "Your session has expired. Please log out and log back in to continue.";
        deleteCowRecordOkEl.nextElementSibling.nextElementSibling.classList.add("d-none");
        deleteCowRecordOkEl.nextElementSibling.removeAttribute("hidden");
        return;
      }

      if (res.status === 204) {
        deleteCowRecordModal.querySelector("#danger-icon").classList.add("d-none");
        deleteCowRecordModal.querySelector("#success-icon").classList.remove("d-none");
        mainContentEl.classList.remove("text-danger");
        mainContentEl.innerText = "The cow record, including injection information and AI (Artificial Insemination) dates, has been successfully deleted.";
        // Switch to another cow record when current cow is deleted.
        const currentPageLink = selectedPageLink;
        record.cows.splice(record.cows.indexOf(selectedCow), 1);
        
        if (record.cows.length <= 0) {
          location.reload();
        }

        currentPageLink.remove();
        deleteCowRecordOkEl.nextElementSibling.nextElementSibling.classList.add("d-none");
        deleteCowRecordOkEl.nextElementSibling.removeAttribute("hidden");
        return;
      }

      // If possible error while deleting cow record.
      mainContentEl.classList.add("text-danger");
      mainContentEl.innerText = "Error: " + data.message;
      deleteCowRecordOkEl.nextElementSibling.nextElementSibling.classList.add("d-none");
      deleteCowRecordOkEl.nextElementSibling.removeAttribute("hidden");
    });


  } catch(err) {
    toggleAlertBox(true, "Error: " + err.message);
    toggleElementVisibility(spinner, false, "d-none");
  }
}


fetchRecordAndUpdateUI();
