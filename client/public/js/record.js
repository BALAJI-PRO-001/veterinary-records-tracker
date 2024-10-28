import { addValidationListenersToInputElement } from "./utils/common.js";
import { 
  toggleElementVisibility, 
  validateAddressAndUpdateAddressInputUI, 
  validateNameAndUpdateNameInputUI, 
  validatePhoneNumberAndUpdatePhoneNumberInputUI,
  validateInputAndUpdateUI,
  validateAmountAndUpdateAmountInputUI,
  validateDateAndUpdateDataInputUI
} from "./utils/userInteraction.js";


/* Global Objects */
const userNameSpan = document.getElementById("user-name");
const phoneNumberSpan = document.getElementById("phone-number");
const addressSpan = document.getElementById("address");
const cowNameAndBreedSpan = document.getElementById("cow-name-and-breed");
const bullNameSpan = document.getElementById("bull-name");


const alertBox = document.getElementById("alert-box");
const totalPendingAmountSpan = document.getElementById("total-pending-amount");
const pendingAmountSpan = document.getElementById("pending-amount");
const paginationContainer = document.getElementById("pagination-container");
const mainContainer = document.getElementById("main-container");
const spinner = document.getElementById("spinner");
const tableContainer = document.getElementById("table-container");
const cowActionsBTNContainer = document.getElementById("cow-action-btn-container");
const cowImgContainer = document.getElementById("cow-img-container");
const doctorImgContainer = document.getElementById("doctor-img-container");
const popupMenu = document.getElementById("popup-menu");

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
const deleteCowRecordModalOkEl = deleteCowRecordModal.querySelector("#ok-element");
const deleteCowRecordModalCheckBox = deleteCowRecordModal.querySelector("#checkbox");

const createNewCowRecordModal = document.getElementById("create-cow-record-modal");
const createCowRecordBTN = createNewCowRecordModal.querySelector("#create-btn");
const newCowNameInput = createNewCowRecordModal.querySelector("#name");
const newBreedInput = createNewCowRecordModal.querySelector("#breed");
const newBullNameInput = createNewCowRecordModal.querySelector("#bull-name");
const injectNameInput = createNewCowRecordModal.querySelector("#inject-name");
const injectPriceInput = createNewCowRecordModal.querySelector("#inject-price");
const givenAmountInput = createNewCowRecordModal.querySelector("#given-amount");
const pendingAmountInput = createNewCowRecordModal.querySelector("#pending-amount");
const dateInput = createNewCowRecordModal.querySelector("#date");
const createNewCowRecordModalMessageEl = createNewCowRecordModal.querySelector("#message-element");

const createNewInjectInfoAndAiDateModal = document.getElementById("create-inject-info-and-ai-date-modal");
const newInjectNameInput = createNewInjectInfoAndAiDateModal.querySelector("#inject-name");
const newInjectPriceInput = createNewInjectInfoAndAiDateModal.querySelector("#inject-price");
const newGivenAmountInput = createNewInjectInfoAndAiDateModal.querySelector("#given-amount");
const newPendingAmountInput = createNewInjectInfoAndAiDateModal.querySelector("#pending-amount");
const newDateInput = createNewInjectInfoAndAiDateModal.querySelector("#date");
const createNewInjectInfoAndAiDateModalMessageEl = createNewInjectInfoAndAiDateModal.querySelector("#message-element");
const createNewInjectInfoAndAiDateBTN = createNewInjectInfoAndAiDateModal.querySelector("#create-btn");


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
  pendingAmountSpan.parentElement.classList.remove("d-none");
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
  deleteCowRecordModalOkEl.removeAttribute("hidden");
  deleteCowRecordModalCheckBox.checked = false;
}



function resetCreateNewCowRecordModal() {
  let components = [
    newCowNameInput, newBreedInput, newBullNameInput, 
    injectNameInput, injectPriceInput, givenAmountInput, 
    pendingAmountInput, dateInput
  ];
  for (let component of components) {
    component.classList.remove("is-valid", "is-invalid");
    component.parentElement.querySelector("#err-message-element").innerText = "";
  }
  createNewCowRecordModalMessageEl.innerText = ""
}



function resetCreateNewInjectInfoAndAiDateModalComponents() {
  let components = [newInjectNameInput, newInjectPriceInput, newGivenAmountInput, newPendingAmountInput, newDateInput];
  for (let component of components) {
    component.classList.remove("is-valid", "is-invalid");
    component.parentElement.querySelector("#err-message-element").innerText = "";
  }
  createNewInjectInfoAndAiDateModalMessageEl.innerText = ""
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
      totalPendingAmountSpan.innerText = "0";
    } else {
      cowImgContainer.classList.add("d-none");
    }


    let selectedCow = null;
    let selectedPageLink = null;

    if (record.cows.length > 0) {
      // Calculate pending amount and update pending amount to ui. 
      totalPendingAmountSpan.innerText = calculatePendingAmount(record.cows);
      pendingAmountSpan.innerText = calculatePendingAmount([record.cows[0]]);

      // Render first cow record to ui.
      updateCowRecordToUI(record.cows[0]);
      selectedCow = record.cows[0];
      cowActionsBTNContainer.classList.remove("d-none");

      // Render pagination list to ui.
      paginationContainer.appendChild(createCowsPaginationList(record.cows));
      paginationContainer.children[0].children[0].classList.add("active");
      selectedPageLink = paginationContainer.children[0].children[0].children[0];


      // Render first injection info and ai date data to ui. 
      doctorImgContainer.classList.remove("d-none");
      if (record.cows[0].injectionInfoAndAiDates.length > 0) {
        tableContainer.appendChild(createDynamicInjectionInfoAndAiDatesTable(record.cows[0].injectionInfoAndAiDates));
        doctorImgContainer.classList.add("d-none");
      }

      // Listen pagination click event and update cow record based by which link is clicked. 
      const pageLinks = paginationContainer.querySelectorAll("#page-link");
      pageLinks.forEach((pageLink) => {
        pageLink.addEventListener("click", (e) => {
          e.target.parentElement.classList.add("active");
          const cow = record.cows.find((cow) => cow.id === e.target.key);
          updateCowRecordToUI(cow);
          pendingAmountSpan.innerText = calculatePendingAmount([cow]);
          selectedPageLink = e.target;
          
          tableContainer.innerHTML = "";
          tableContainer.appendChild(doctorImgContainer);
          doctorImgContainer.classList.remove("d-none");
          if (cow.injectionInfoAndAiDates.length > 0) {
            tableContainer.appendChild(createDynamicInjectionInfoAndAiDatesTable(cow.injectionInfoAndAiDates));
            doctorImgContainer.classList.add("d-none");
          }

          // Reassign cow records by pagination link clicked.
          selectedCow = cow;
          cowNameInput.value = cow.name;
          breedInput.value = cow.breed;
          bullNameInput.value = cow.bullName;
        });
      });


      // Remove active state from another page links.
      let activePageItemEl = paginationContainer.children[0].children[0];
      activePageItemEl.classList.add("active");
      paginationContainer.addEventListener("click", (e) => {
        if (e.target.id === "page-link") {
          if (activePageItemEl !== e.target.parentElement) {
            activePageItemEl.classList.remove("active");
            e.target.parentElement.classList.add("active");
            activePageItemEl = e.target.parentElement;
          }
        }
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
      deleteCowRecordModalOkEl.nextElementSibling.innerText = "Cancel";
    });

    deleteCowRecordModalCheckBox.addEventListener("change", (e) => {
      const mainContentEl = deleteCowRecordModal.querySelector("#main-content");
      if (e.target.checked) {
        mainContentEl.innerHTML = "Are you sure you want to delete <span class='text-danger'>All Cow Records</span>, including injection information and AI (Artificial Insemination) dates?";
      } else {
        mainContentEl.innerText = "Are you sure you want to delete this cow record, including the injection information and AI (Artificial Insemination) dates?";
      }
    });

    deleteCowRecordModalOkEl.addEventListener("click", async () => {
      const mainContentEl = deleteCowRecordModal.querySelector("#main-content");
      deleteCowRecordModalOkEl.nextElementSibling.nextElementSibling.classList.remove("d-none");
      deleteCowRecordModalOkEl.setAttribute("hidden", "");
      deleteCowRecordModalOkEl.nextElementSibling.setAttribute("hidden", "");
      const requestURL = deleteCowRecordModalCheckBox.checked ? `/api/v1/records/${record.user.id}/cows/all` : `/api/v1/records/${record.user.id}/cows/${selectedCow.id}`;

      const res = await fetch(requestURL, {method: "DELETE"});

      if (res.status === 401) {
        mainContentEl.classList.add("text-danger");
        mainContentEl.innerText = "Your session has expired. Please log out and log back in to continue.";
        deleteCowRecordModalOkEl.nextElementSibling.nextElementSibling.classList.add("d-none");
        deleteCowRecordModalOkEl.nextElementSibling.removeAttribute("hidden");
        return;
      }

      if (res.status === 204 && deleteCowRecordModalCheckBox.checked) {
        return location.reload();
      }

      if (res.status === 204) {
        deleteCowRecordModal.querySelector("#danger-icon").classList.add("d-none");
        deleteCowRecordModal.querySelector("#success-icon").classList.remove("d-none");
        mainContentEl.classList.remove("text-danger");
        mainContentEl.innerText = "The cow record, including injection information and AI (Artificial Insemination) dates, has been successfully deleted.";
        // Switch to another cow record when current cow is deleted.
        const currentPageLink = selectedPageLink
        record.cows.splice(record.cows.indexOf(selectedCow), 1);
        totalPendingAmountSpan.innerText = calculatePendingAmount(record.cows);
        
        if (record.cows.length <= 0) {
          location.reload();
        }
  
        if (selectedPageLink.parentElement.previousElementSibling) {
          selectedPageLink.parentElement.previousElementSibling.children[0].click();
        } else if (selectedPageLink.parentElement.nextElementSibling) {
          selectedPageLink.parentElement.nextElementSibling.children[0].click();
        }

        currentPageLink.parentElement.remove();
        deleteCowRecordModalOkEl.nextElementSibling.nextElementSibling.classList.add("d-none");
        deleteCowRecordModalOkEl.nextElementSibling.removeAttribute("hidden");
        deleteCowRecordModalOkEl.nextElementSibling.innerText = "Go Back";
        return;
      }

      // If possible error while deleting cow record.
      mainContentEl.classList.add("text-danger");
      mainContentEl.innerText = "Error: " + data.message;
      deleteCowRecordModalOkEl.nextElementSibling.nextElementSibling.classList.add("d-none");
      deleteCowRecordModalOkEl.nextElementSibling.removeAttribute("hidden");
    });


    // Create cow record code implementation.
    createNewCowRecordModal.querySelector("form").reset();

    createNewCowRecordModal.addEventListener("hidden.bs.modal", () => {
      resetCreateNewCowRecordModal();
    });

    createNewCowRecordModal.addEventListener('shown.bs.modal', () => {
      newCowNameInput.focus();
    });

    addValidationListenersToInputElement(newCowNameInput, () => validateInputAndUpdateUI(newCowNameInput));
    addValidationListenersToInputElement(newBreedInput, () => validateInputAndUpdateUI(newBreedInput));
    addValidationListenersToInputElement(newBullNameInput, () => validateInputAndUpdateUI(newBullNameInput));
    addValidationListenersToInputElement(injectNameInput, () => validateInputAndUpdateUI(injectNameInput));
    addValidationListenersToInputElement(injectPriceInput, () => validateAmountAndUpdateAmountInputUI(injectPriceInput));
    addValidationListenersToInputElement(givenAmountInput, () => validateAmountAndUpdateAmountInputUI(givenAmountInput));
    addValidationListenersToInputElement(pendingAmountInput, () => validateAmountAndUpdateAmountInputUI(pendingAmountInput));
    addValidationListenersToInputElement(dateInput, () => validateDateAndUpdateDataInputUI(dateInput));


    createCowRecordBTN.addEventListener("click", async (e) => {
      e.preventDefault();
      const isValidCowName = validateInputAndUpdateUI(newCowNameInput);
      const isValidBreedName = validateInputAndUpdateUI(newBreedInput);
      const isValidBullName = validateInputAndUpdateUI(newBullNameInput);
      const isValidInjectName = validateInputAndUpdateUI(injectNameInput);
      const isValidInjectPrice = validateAmountAndUpdateAmountInputUI(injectPriceInput);
      const isValidGivenAmount = validateAmountAndUpdateAmountInputUI(givenAmountInput);
      const isValidPendingAmount = validateAmountAndUpdateAmountInputUI(pendingAmountInput);
      const isValidDate = validateDateAndUpdateDataInputUI(dateInput);

      if (
        isValidCowName && isValidBreedName && isValidBullName && 
        isValidInjectName && isValidInjectPrice && isValidGivenAmount &&
        isValidPendingAmount && isValidDate
      ) {
        createNewCowRecordModalMessageEl.innerText = "Creating new cow record ....";
        const res = await fetch(`/api/v1/records/${record.user.id}/cows`, {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            name: newCowNameInput.value.trim(),
            breed: newBreedInput.value.trim(),
            bullName: newBullNameInput.value.trim(),
            injectionInfoAndAiDates: [
              {
                name: injectNameInput.value.trim(),
                price: Number(injectPriceInput.value.trim()),
                givenAmount: Number(givenAmountInput.value.trim()),
                pendingAmount: Number(pendingAmountInput.value.trim()),
                date: dateInput.value.split("-").reverse().join("/").trim()
              }
            ]
          })
        });
        const data = await res.json();

        if (data.statusCode === 401) {
          createNewCowRecordModalMessageEl.classList.remove("text-success");
          createNewCowRecordModalMessageEl.classList.add("text-danger");
          return createNewCowRecordModalMessageEl.innerText = "Your session has expired. Please log out and log back in to continue.";
        }
  
        if (data.statusCode === 201) {
          createNewCowRecordModalMessageEl.innerText = "Cow record created successfully.";
          setTimeout(() => {
            location.reload();
          }, 1000);
          return;
        }
  
        // If any possible error while create cow record
        createNewCowRecordModalMessageEl.classList.remove("text-success");
        createNewCowRecordModalMessageEl.classList.add("text-danger");
        createNewCowRecordModalMessageEl.innerText = "Error: " + data.message;
      }
    });


    // Popup code implementation
    tableContainer.addEventListener("click", (e) => {
      if (e.target.parentElement.id === "table-row") {
        popupMenu.classList.remove("d-none");
        popupMenu.style.left = `${e.clientX - 100}px`;
        popupMenu.style.top = `${e.clientY - 60}px`;
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target.nodeName !== "TD") {
        popupMenu.classList.add("d-none");
      }
    });


    // Add new injection record code implementation
    createNewInjectInfoAndAiDateModal.querySelector("form").reset();

    createNewInjectInfoAndAiDateModal.addEventListener("hidden.bs.modal", () => {
      resetCreateNewInjectInfoAndAiDateModalComponents();
    });

    createNewInjectInfoAndAiDateModal.querySelector("#reset-btn").addEventListener("click", () => {
      resetCreateNewInjectInfoAndAiDateModalComponents();
    });

    addValidationListenersToInputElement(newInjectNameInput, () => validateInputAndUpdateUI(newInjectNameInput));
    addValidationListenersToInputElement(newInjectPriceInput, () => validateAmountAndUpdateAmountInputUI(newInjectPriceInput));
    addValidationListenersToInputElement(newGivenAmountInput, () => validateAmountAndUpdateAmountInputUI(newGivenAmountInput));
    addValidationListenersToInputElement(newPendingAmountInput, () => validateAmountAndUpdateAmountInputUI(newPendingAmountInput));
    addValidationListenersToInputElement(newDateInput, () => validateDateAndUpdateDataInputUI(newDateInput));

    createNewInjectInfoAndAiDateBTN.addEventListener("click", async (e) => {
      e.preventDefault();
      const isValidInjectName = validateInputAndUpdateUI(newInjectNameInput);
      const isValidInjectPrice = validateAmountAndUpdateAmountInputUI(newInjectPriceInput);
      const isValidGivenAmount = validateAmountAndUpdateAmountInputUI(newGivenAmountInput);
      const isValidPendingAmount = validateAmountAndUpdateAmountInputUI(newPendingAmountInput);
      const isValidDate = validateDateAndUpdateDataInputUI(newDateInput);

      if (
        isValidInjectName && isValidInjectPrice && isValidGivenAmount &&
        isValidPendingAmount && isValidDate
      ) {
        createNewInjectInfoAndAiDateModalMessageEl.innerText = "Creating new injection record ....";
        const newInjectionInfoAndAiDates = {
          name: newInjectNameInput.value,
          price: Number(newInjectPriceInput.value),
          givenAmount: Number(newGivenAmountInput.value),
          pendingAmount: Number(newPendingAmountInput.value),
          date: newDateInput.value.split("-").reverse().join("/")
        };

        const res = await fetch(`/api/v1/records/${record.user.id}/cows/${selectedCow.id}/inject-info-ai-dates`, {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(newInjectionInfoAndAiDates)
        });
        const data = await res.json();
        
        if (data.statusCode === 401) {
          createNewInjectInfoAndAiDateModalMessageEl.classList.remove("text-success");
          createNewInjectInfoAndAiDateModalMessageEl.classList.add("text-danger");
          return createNewInjectInfoAndAiDateModalMessageEl.innerText = "Your session has expired. Please log out and log back in to continue.";
        }

        if (data.statusCode === 201) {
          createNewInjectInfoAndAiDateModalMessageEl.classList.remove("text-danger");
          createNewInjectInfoAndAiDateModalMessageEl.classList.add("text-success");
          createNewInjectInfoAndAiDateModalMessageEl.innerText = "New injection record created successfully.";

          return setTimeout(() => {
            createNewInjectInfoAndAiDateModalMessageEl.innerText = "";
            resetCreateNewInjectInfoAndAiDateModalComponents();
            doctorImgContainer.classList.add("d-none");
            const injectionInfoAndAiDatesTable = tableContainer.children[1];
            const newInjectionInfoAndAiDatesTable = createDynamicInjectionInfoAndAiDatesTable([newInjectionInfoAndAiDates]);
            record.cows.find((cow) => cow.id === selectedCow.id).injectionInfoAndAiDates.push(newInjectionInfoAndAiDates);

            if (!injectionInfoAndAiDatesTable) {
              tableContainer.appendChild(newInjectionInfoAndAiDatesTable);
            } else {
              tableContainer.children[1].children[1].append(...newInjectionInfoAndAiDatesTable.children[1].children);
            }
          }, 1500);
        }

        // If any possible error while creating record.
        createNewInjectInfoAndAiDateModalMessageEl.classList.remove("text-success");
        createNewInjectInfoAndAiDateModalMessageEl.classList.add("text-danger");
        createNewInjectInfoAndAiDateModalMessageEl.innerText = "Error: " + data.message;
      }
    });

  } catch(err) {
    toggleAlertBox(true, "Error: " + err.message);
    toggleElementVisibility(spinner, false, "d-none");
  }
}


fetchRecordAndUpdateUI();