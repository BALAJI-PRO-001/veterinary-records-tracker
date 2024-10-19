import { toggleElementVisibility, validateAddressAndUpdateAddressInputUI, validateNameAndUpdateNameInputUI, validatePhoneNumberAndUpdatePhoneNumberInputUI } from "./utils/userInteraction.js";
import { addValidationListenersToInputElement } from "./utils/common.js";

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
const updateMessageElementForUser = updateUserRecordModal.querySelector("#update-message-element");


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
  userNameInput.classList.remove("is-valid");
  phoneNumberInput.classList.remove("is-valid");
  addressInput.classList.remove("is-valid");
}



async function fetchRecordAndUpdateUI() {
  try {
    toggleElementVisibility(spinner, false, "d-none");

    const id = location.href.split("/").pop(); 
    const record = await getRecordFromServer(Number(id));
    if (!record) {
      toggleAlertBox(true, "Error: No record found for the specified ID: " + id + ". Please verify the ID and try again.");
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

    if (record.cows.length > 0) {
      // Find and update pending amount to ui. 
      let pendingAmount = record.cows.map((cow) => {
        const amounts = cow.injectionInfoAndAiDates.map(({pendingAmount}) => {
          return pendingAmount;
        });
        return amounts.reduce((total, amount) => total + amount, 0);
      });

      pendingAmountSpan.innerText = pendingAmount.reduce((total, amount) => total + amount, 0);
      // Load default cow data to ui. 
      updateCowRecordToUI(record.cows[0]);

      paginationContainer.appendChild(createCowsPaginationList(record.cows));

      // Load default injection info and ai date data to ui. 
      tableContainer.appendChild(createDynamicInjectionInfoAndAiDatesTable(record.cows[0].injectionInfoAndAiDates));
      cowActionsBTNContainer.classList.remove("d-none");

      // Listen pagination links is clicked. also update cow and injection info to ui. 
      const pageLinks = paginationContainer.querySelectorAll("#page-link");
      pageLinks.forEach((pageLink) => {
        pageLink.addEventListener("click", (e) => {
          const cow = record.cows.find((cow) => cow.id === e.target.key);
          updateCowRecordToUI(cow);
          tableContainer.innerHTML = "";
          tableContainer.appendChild(createDynamicInjectionInfoAndAiDatesTable(cow.injectionInfoAndAiDates));
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

    updateUserRecordBTN.addEventListener("click", async (e) => {
      e.preventDefault();
      const isValidName = validateNameAndUpdateNameInputUI(userNameInput);
      const isValidPhoneNumber = validatePhoneNumberAndUpdatePhoneNumberInputUI(phoneNumberInput);
      const isValidAddress = validateAddressAndUpdateAddressInputUI(addressInput);

      if (isValidName && isValidPhoneNumber && isValidAddress) {
        updateMessageElementForUser.innerText = "Saving Changes ...."

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
        
        if (data.statusCode === 401) {
          updateMessageElementForUser.classList.remove("text-success");
          updateMessageElementForUser.classList.add("text-danger");
          return updateMessageElementForUser.innerText = "Your session has expired. Please log out and log back in to continue.";
        }

        if (data.statusCode === 200) {
          updateMessageElementForUser.classList.remove("text-danger");
          updateMessageElementForUser.classList.add("text-success");
          updateMessageElementForUser.innerText = "Changes saved successfully.";
          
          setTimeout(() => {
            updateMessageElementForUser.innerText = "";
            resetModalComponents();
          }, 2500);
          return;
        }

        // If any possible error.
        updateMessageElementForUser.classList.remove("text-success");
        updateMessageElementForUser.classList.add("text-danger");
        updateMessageElementForUser.innerText = data.message;
      }
    });

  } catch(err) {
    toggleAlertBox(true, "Error: " + err.message);
  }
}


fetchRecordAndUpdateUI();