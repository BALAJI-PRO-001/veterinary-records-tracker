import { addValidationListenersToInputElement } from "./utils/common.js";
import { 
  validateNameAndUpdateNameInputUI,
  validateAddressAndUpdateAddressInputUI,
  validateAmountAndUpdateAmountInputUI,
  validateDateAndUpdateDateInputUI,
  validateInputAndUpdateUI,
  validatePhoneNumberAndUpdatePhoneNumberInputUI
} from "./utils/userInteraction.js";
    
const userForm = document.forms[0];
const cowForm = document.forms[1];
const injectionForm = document.forms[2];

const userNameInput = userForm.querySelector("#user-name");
const userPhoneNumberInput = userForm.querySelector("#user-phone-number");
const userAddressInput = userForm.querySelector("#user-address");

const cowNameInput = cowForm.querySelector("#cow-name");
const cowBreedInput = cowForm.querySelector("#cow-breed");
const bullNameInput = cowForm.querySelector("#bull-name");

const injectionNameInput = injectionForm.querySelector("#injection-name");
const injectionPriceInput = injectionForm.querySelector("#injection-price");
const givenAmountInput = injectionForm.querySelector("#given-amount");
const pendingAmountInput = injectionForm.querySelector("#pending-amount");
const injectionDateInput = injectionForm.querySelector("#injection-date");

const submitBTN = document.getElementById("submit");
const addNewCowBTN = document.getElementById("add-new-cow");
const addNewInjectionBTN = document.getElementById("add-new-injection");

const recordModal = document.getElementById("record-modal");
const recordModalBody =  recordModal.querySelector(".modal-body");
const modalSubmitBTN = recordModal.querySelector("#modal-submit");
const newRecordModal = new bootstrap.Modal(recordModal);

userForm.reset();
cowForm.reset();
injectionForm.reset();

addValidationListenersToInputElement(userNameInput, () => validateNameAndUpdateNameInputUI(userNameInput));
addValidationListenersToInputElement(userPhoneNumberInput, () => validatePhoneNumberAndUpdatePhoneNumberInputUI(userPhoneNumberInput));
addValidationListenersToInputElement(userAddressInput, () => validateAddressAndUpdateAddressInputUI(userAddressInput));

addValidationListenersToInputElement(cowNameInput, () => validateInputAndUpdateUI(cowNameInput));
addValidationListenersToInputElement(cowBreedInput, () => validateInputAndUpdateUI(cowBreedInput));
addValidationListenersToInputElement(bullNameInput, () => validateInputAndUpdateUI(bullNameInput));

addValidationListenersToInputElement(injectionNameInput, () => validateInputAndUpdateUI(injectionNameInput));
addValidationListenersToInputElement(injectionPriceInput, () => validateAmountAndUpdateAmountInputUI(injectionPriceInput));
addValidationListenersToInputElement(givenAmountInput, () => validateAmountAndUpdateAmountInputUI(givenAmountInput));
addValidationListenersToInputElement(pendingAmountInput, () => validateAmountAndUpdateAmountInputUI(pendingAmountInput));
addValidationListenersToInputElement(injectionDateInput, () => validateDateAndUpdateDateInputUI(injectionDateInput));

let addCowBTNIsClicked = false;
let addInjectionBTNIsClicked = false;
let record = {};

function resetUserForm() {
  const elements = [
    userNameInput,userPhoneNumberInput,userAddressInput,
    cowNameInput, cowBreedInput, bullNameInput,
    injectionNameInput, injectionPriceInput, givenAmountInput,
    pendingAmountInput, injectionDateInput
  ];
  for(let element of elements) {
    element.classList.remove("is-invalid","is-valid");
  }
  userForm.reset();
  cowForm.reset();
  injectionForm.reset();
  userNameInput.focus();
}

function resetCowForm() {
  const elements = [
    cowNameInput, cowBreedInput, bullNameInput,
    injectionNameInput, injectionPriceInput, givenAmountInput,
    pendingAmountInput, injectionDateInput
  ];

  for (let element of elements) {
    element.classList.remove("is-invalid","is-valid");
  }
  cowForm.reset();
  injectionForm.reset();
  cowNameInput.focus();
}



function resetInjectionInfoForm() {
  const elements = [
    injectionNameInput, injectionPriceInput, givenAmountInput,
    pendingAmountInput, injectionDateInput
  ];
  
  for (let element of elements) {
    element.classList.remove("is-invalid","is-valid");
  }
  injectionForm.reset();
  injectionNameInput.focus();
}



function validateAndExtractUserRecord() {
  const user = {};
  const isValidName = validateNameAndUpdateNameInputUI(userNameInput);
  const isValidPhoneNumber = validatePhoneNumberAndUpdatePhoneNumberInputUI(userPhoneNumberInput);
  const isValidAddress = validateAddressAndUpdateAddressInputUI(userAddressInput);

  if(isValidName && isValidPhoneNumber && isValidAddress) {
    return {
      name : userNameInput.value.trim(),
      phoneNumber : Number(userPhoneNumberInput.value.trim()),
      address : userAddressInput.value.trim()
    };
  } 
  return null;
}



function validateAndExtractCowRecord() {
  const isValidCowName = validateNameAndUpdateNameInputUI(cowNameInput);
  const isValidBreed = validateInputAndUpdateUI(cowBreedInput);
  const isValidBullName = validateInputAndUpdateUI(bullNameInput);

  if(isValidCowName && isValidBreed && isValidBullName) {
    return {
      name : cowNameInput.value.trim(),
      breed : cowBreedInput.value.trim(),
      bullName : bullNameInput.value.trim(),
    };
  }
  return null;
}



function validateAndExtractInjectInfoAndAiDate() {
  const isValidInjectionName = validateInputAndUpdateUI(injectionNameInput);
  const isValidInjectionPrice = validateInputAndUpdateUI(injectionPriceInput);
  const isValidGivenAmount = validateInputAndUpdateUI(givenAmountInput);
  const isValidPendingAmount = validateInputAndUpdateUI(pendingAmountInput);
  const isValidInjectionDate = validateDateAndUpdateDateInputUI(injectionDateInput);

  if (
    isValidInjectionName && isValidInjectionPrice && isValidGivenAmount && 
    isValidPendingAmount && isValidInjectionDate
  ) {
    return {
      name: injectionNameInput.value.trim(),
      price: Number(injectionPriceInput.value.trim()),
      givenAmount: Number(givenAmountInput.value.trim()),
      pendingAmount: Number(pendingAmountInput.value.trim()),
      date: injectionDateInput.value.split("-").reverse().join("/").trim()
    };
  }
  return null;
}



function convertRecordToUserInterface(data) {
  let div = document.createElement("div");
  const header = `
    <header class="position-relative" style="height: 70px;">
      <h2>${data.user.name}</h2>
      <p class="position-absolute" style="bottom: 0; right: 0;">${data.user.address}</p>
      <pre class="position-absolute" style="top: 0; right: 0;">${data.user.phoneNo}</pre>
    </header>
  `;
  div.innerHTML += header; 
  data.cows.forEach((cow) => {
    const cowDetail = `
      <h3>cow-1</h3>
        <div class="cow-details w-100 d-flex flex-row justify-content-between">
          <h5>${cow.name}</h5>
          <h5>${cow.breed}</h5>
          <h5>${cow.bullName}</h5>
        </div>
        <h3>Injections for Cow</h3>
      `;
  div.innerHTML += cowDetail; 
  let table = document.createElement("table");
  table.className = "w-100 table table-bordered";
  const tableHeader = `
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Given</th>
        <th>Pending</th>
        <th>Date</th>
      </tr>
    </thead>
  `;
  table.innerHTML = tableHeader; 
  const tbody = document.createElement("tbody");    
    cow.injectionInfoAndAiDates.forEach((injection) => {
      const injectionDetail = `
        <tr>
          <td>${injection.name}</td>
          <td>${injection.price}</td>
          <td>${injection.givenAmount}</td>
          <td>${injection.pendingAmount}</td>
          <td>${injection.date}</td>
        </tr>
      `;
      tbody.innerHTML += injectionDetail; 
    });
    table.appendChild(tbody);
    div.appendChild(table); 
  });
  return div; 
}



function handleSubmit() {
  addNewCowBTN.setAttribute("disabled","");
  addNewInjectionBTN.setAttribute("disabled","");
  if(Object.keys(record).length === 0) {
    const user = validateAndExtractUserRecord();
    const cow = validateAndExtractCowRecord();
    const injection = validateAndExtractInjectInfoAndAiDate();

    if(user && cow && injection) {
      record.user = user;
      record.cows = [cow];
      cow.injectionInfoAndAiDates = [injection];
      const prettyJson = convertRecordToUserInterface(record);
      recordModalBody.innerHTML = "";
      recordModalBody.appendChild(prettyJson);
      newRecordModal.show();
      console.log(record);
    } 
    
  }

  if(addCowBTNIsClicked) {
    const cow = validateAndExtractCowRecord();
    const injection = validateAndExtractInjectInfoAndAiDate();

    if(cow && injection) {
      record.cows.push(cow);
      cow.injectionInfoAndAiDates = [injection];
      addCowBTNIsClicked = false;
      const prettyJson = convertRecordToUserInterface(record);
      recordModalBody.innerHTML = "";
      recordModalBody.appendChild(prettyJson);
      newRecordModal.show();
    }
  }

  if(addInjectionBTNIsClicked) {
    const injection = validateAndExtractInjectInfoAndAiDate();
    const lastCowInjectionDetails = record.cows[record.cows.length-1].injectionInfoAndAiDates;
    
    if(injection) {
      lastCowInjectionDetails.push(injection);
      addInjectionBTNIsClicked = false;
      const prettyJson = convertRecordToUserInterface(record);
      recordModalBody.innerHTML = "";
      recordModalBody.appendChild(prettyJson);
      newRecordModal.show();
    }
  }
  addNewCowBTN.removeAttribute("disabled");
  addNewInjectionBTN.removeAttribute("disabled");
  newRecordModal.show();
}



function addNewCowDetails(e) {
  if(addInjectionBTNIsClicked) {
    alert("injection action going on..");
    return;
  }

  if(Object.keys(record).length === 0) {
    alert("Save the previous cow details before new cow.");
    return;
  }

  resetCowForm();

  addCowBTNIsClicked = true;
  addInjectionBTNIsClicked = false;
}

function addNewInjectionDetails(e) {
  if(addCowBTNIsClicked) {
    alert("Cow action going on");
    return;
  }

  if(Object.keys(record).length === 0) {
    alert("Save the previous cow and injection details before add new injection.");
    return;
  }

  resetInjectionInfoForm();
  addInjectionBTNIsClicked = true;
  addCowBTNIsClicked = false;

}


async function sendDataToServer(e) {
  e.preventDefault();
  try {
    const res = await fetch("/api/v1/records",{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body : JSON.stringify(record)
    });
    const data = await res.json();
    if(data.statusCode == 201) {
      recordModalBody.innerHTML = "";
      recordModalBody.innerHTML = "successfully added record...";
      newRecordModal.show();
      location.href = "/home";
    } else {
      record = {};
      resetUserForm();
    } 
    resetUserForm();
  } catch(err) {
    record = {};
    resetUserForm();
  }
}

submitBTN.addEventListener("click",handleSubmit);
addNewCowBTN.addEventListener("click",addNewCowDetails);
addNewInjectionBTN.addEventListener("click",addNewInjectionDetails);
modalSubmitBTN.addEventListener("click",sendDataToServer);
