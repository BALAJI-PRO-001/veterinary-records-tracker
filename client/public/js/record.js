import { addValidationListenersToInputElement } from "./utils/common.js";
import { 
  toggleElementVisibility, 
  validateAddressAndUpdateAddressInputUI, 
  validateNameAndUpdateNameInputUI, 
  validatePhoneNumberAndUpdatePhoneNumberInputUI,
  validateInputAndUpdateUI
} from "./utils/userInteraction.js";

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


/* Update user record modal objects */
const updateUserRecordModal = document.getElementById("update-user-record-modal");
const userNameInput = updateUserRecordModal.querySelector("#name");
const phoneNumberInput = updateUserRecordModal.querySelector("#phone-number");
const addressInput = updateUserRecordModal.querySelector("#address");
const updateUserRecordBTN = updateUserRecordModal.querySelector("#update-btn");
const updateUserRecordModalMessageEl = updateUserRecordModal.querySelector("#message-element");


/* Update user record modal objects */
const updateCowRecordModal = document.getElementById("update-cow-record-modal");
const cowNameInput = updateCowRecordModal.querySelector("#name");
const breedInput = updateCowRecordModal.querySelector("#breed");
const bullNameInput = updateCowRecordModal.querySelector("#bull-name");
const updateCowRecordBTN = updateCowRecordModal.querySelector("#update-btn");
const updateCowRecordModalMessageEl = updateCowRecordModal.querySelector("#message-element");


/* Delete user record modal objects */
const deleteUserRecordModal = document.getElementById("delete-user-record-modal");
const deleteUserRecordOkEl = deleteUserRecordModal.querySelector("#ok-element");


async function getRecordFromServer(id) {
  const res = await fetch(`/api/v1/records/${id}`);
  const data = await res.json();
  if (data.statusCode === 200) {
    return data.data.record;
  }
  return null;
}



function updateUserRecordToUI(user) {
  if (user === null || user === undefined) {
    throw new Error("User is null or undefined.");
  }

  userNameSpan.innerText = user.name;
  phoneNumberSpan.innerText = user.phoneNumber;
  addressSpan.innerText = user.address;
}



function updateCowRecordToUI(cow) {
  if (cow === null || cow === undefined) {
    throw new Error("Cow is null or undefined.")
  }

  cowNameAndBreedSpan.previousElementSibling.classList.remove("d-none");
  bullNameSpan.previousElementSibling.classList.remove("d-none");
  cowNameAndBreedSpan.innerText = cow.name + " - " + cow.breed;
  bullNameSpan.innerText = cow.bullName;
}



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



function resetModalComponents() {
  let components = [userNameInput, phoneNumberInput, addressInput, cowNameInput, breedInput, bullNameInput];
  for (let component of components) {
    component.classList.remove("is-valid", "is-invalid");
    component.parentElement.querySelector("#err-message-element").innerText = "";
  }
  updateUserRecordModalMessageEl.innerText = "";
  updateCowRecordModalMessageEl.innerText = "";
}



async function fetchRecordAndUpdateUI() {
  try {
    toggleElementVisibility(spinner, false, "d-none");

    const id = location.href.split("/").pop(); 
    const record = await getRecordFromServer(Number(id));
    if (!record) {
      toggleAlertBox(true, "Error: Something went wrong while fetching the record.");
      toggleElementVisibility(spinner, true, "d-none");
      return;
    }

    // Update user record to ui.
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
      // Find and update pending amount to ui. 
      let pendingAmount = record.cows.map((cow) => {
        const amounts = cow.injectionInfoAndAiDates.map(({pendingAmount}) => {
          return pendingAmount;
        });
        return amounts.reduce((total, amount) => total + amount, 0);
      });

      pendingAmountSpan.innerText = pendingAmount.reduce((total, amount) => total + amount, 0);

      // Load default cow data. 
      updateCowRecordToUI(record.cows[0]);
      selectedCow = record.cows[0];

      // Load pagination list to ui.
      paginationContainer.appendChild(createCowsPaginationList(record.cows));
      selectedPageLink = paginationContainer.children[0].children[0].children[0];

      // Load default injection info and ai date data to ui. 
      tableContainer.appendChild(createDynamicInjectionInfoAndAiDatesTable(record.cows[0].injectionInfoAndAiDates));
      cowActionsBTNContainer.classList.remove("d-none");

      // Listen pagination links is clicked. also update cow and injection info to ui. 
      const pageLinks = paginationContainer.querySelectorAll("#page-link");
      pageLinks.forEach((pageLink) => {
        pageLink.addEventListener("click", (e) => {
          const cow = record.cows.find((cow) => cow.id === e.target.key);
          updateCowRecordToUI(cow);
          selectedPageLink = e.target;
          tableContainer.innerHTML = "";
          tableContainer.appendChild(createDynamicInjectionInfoAndAiDatesTable(cow.injectionInfoAndAiDates));

          // Update cow record based on pagination item.
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
      resetModalComponents();
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
            updateUserRecordModalMessageEl.innerText = "";
            resetModalComponents();
          }, 1000);
          return;
        }

        // If any possible error.
        updateUserRecordModalMessageEl.classList.remove("text-success");
        updateUserRecordModalMessageEl.classList.add("text-danger");
        updateUserRecordModalMessageEl.innerText = data.message;
      }
    });


    // Update cow modal code
    if (record.cows.length > 0) {
      cowNameInput.value = record.cows[0].name;
      breedInput.value = record.cows[0].breed;
      bullNameInput.value = record.cows[0].bullName;

      addValidationListenersToInputElement(cowNameInput, () => validateInputAndUpdateUI(cowNameInput));
      addValidationListenersToInputElement(breedInput, () => validateInputAndUpdateUI(breedInput));
      addValidationListenersToInputElement(bullNameInput, () => validateInputAndUpdateUI(bullNameInput));      
      
      updateCowRecordModal.addEventListener("hidden.bs.modal", () => {
        resetModalComponents();
        
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

            // Update pagination link content
            if (selectedPageLink) {
              selectedPageLink.innerText = data.data.cow.name;
            }
            
            setTimeout(() => {
              updateCowRecordModalMessageEl.innerText = "";
              resetModalComponents();
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


    // Delete user code
    deleteUserRecordOkEl.addEventListener("click", async () => {
      const mainContentEl = deleteUserRecordModal.querySelector("#main-content");
      deleteUserRecordOkEl.nextElementSibling.nextElementSibling.removeAttribute("hidden");
      deleteUserRecordOkEl.setAttribute("hidden", "");
      deleteUserRecordOkEl.nextElementSibling.setAttribute("hidden", "");
      const res = await fetch("/api/v1/records/" + record.user.id, {method: "DELETE"});

      if (res.status === 401) {
        mainContentEl.classList.add("text-danger");
        mainContentEl.innerText = "Your session has expired. Please log out and log back in to continue.";
        deleteUserRecordOkEl.nextElementSibling.removeAttribute("hidden");
        deleteUserRecordOkEl.nextElementSibling.nextElementSibling.innerText = "";
        return;
      }

      if (res.status === 204) {
        deleteUserRecordModal.querySelector("#danger-icon").classList.add("d-none");
        deleteUserRecordModal.querySelector("#success-icon").classList.remove("d-none");
        mainContentEl.classList.remove("text-danger");
        mainContentEl.innerHTML = "All user and cow records have been successfully deleted.";
        deleteUserRecordOkEl.nextElementSibling.nextElementSibling.setAttribute("hidden", "");
        deleteUserRecordOkEl.nextElementSibling.removeAttribute("hidden");
        deleteUserRecordOkEl.nextElementSibling.innerText = "Go Back";

        deleteUserRecordModal.addEventListener("hidden.bs.modal", () => {
          location.href = "/home";
        });
        return;
      }
    });


  } catch(err) {
    toggleAlertBox(true, "Error: " + err.message);
  }
}


fetchRecordAndUpdateUI();