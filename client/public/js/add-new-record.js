import { addValidationListenersToInputElement } from "./utils/common.js";
import { 
  validateNameAndUpdateNameInputUI,
  validateAddressAndUpdateAddressInputUI,
  validateAmountAndUpdateAmountInputUI,
  validateDateAndUpdateDateInputUI,
  validateInputAndUpdateUI,
  validatePhoneNumberAndUpdatePhoneNumberInputUI
} from "./utils/userInteraction.js";
    
const container = document.getElementById("main-container");

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
const cowModal = document.getElementById("cow-modal");
const injectionModal = document.getElementById("injection-modal");

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
const record = {};

function handleSubmit(e) {
  const recordModalBody =  recordModal.querySelector(".modal-body > pre");
  const newRecordModal = new bootstrap.Modal(recordModal);
  addNewCowBTN.setAttribute("disabled","");
  addNewInjectionBTN.setAttribute("disabled","");
  if(Object.keys(record).length === 0) {
    const user = {};
    const cow = {};
    const injection = {};
    const isValidName = validateNameAndUpdateNameInputUI(userNameInput);
    const isValidPhoneNumber = validatePhoneNumberAndUpdatePhoneNumberInputUI(userPhoneNumberInput);
    const isValidAddress = validateAddressAndUpdateAddressInputUI(userAddressInput);
    if(isValidName && isValidPhoneNumber && isValidAddress) {
      user.name = userNameInput.value.trim();
      user.phoneNo = userPhoneNumberInput.value.trim();
      user.address = userAddressInput.value.trim();
      record.user = user;
    } else {
      return;
    }

    const isValidCowName = validateNameAndUpdateNameInputUI(cowNameInput);
    const isValidBreed = validateInputAndUpdateUI(cowBreedInput);
    const isValidBullName = validateInputAndUpdateUI(bullNameInput);

    if(isValidCowName && isValidBreed && isValidBullName) {
      cow.name = cowNameInput.value.trim();
      cow.breed = cowBreedInput.value.trim();
      cow.bullName = bullNameInput.value.trim();
      record.cows = [cow];
    } else {
      return;
    }
    
    const isValidInjectionName = validateInputAndUpdateUI(injectionNameInput);
    const isValidInjectionPrice = validateInputAndUpdateUI(injectionPriceInput);
    const isValidGivenAmount = validateInputAndUpdateUI(givenAmountInput);
    const isValidPendingAmount = validateInputAndUpdateUI(pendingAmountInput);
    const isValidInjectionDate = validateDateAndUpdateDateInputUI(injectionDateInput);

    if(isValidInjectionName && isValidInjectionPrice && isValidGivenAmount && isValidPendingAmount && isValidInjectionDate) {
      injection.name = injectionNameInput.value.trim();
      injection.price = injectionPriceInput.value.trim();
      injection.givenAmount = givenAmountInput.value.trim();
      injection.pendingAmount = pendingAmountInput.value.trim();
      injection.date = injectionDateInput.value.trim();
      cow.injectionInfoAndAiDates = [injection];
    } else {
      return;
    }
    const prettyJson = JSON.stringify(record,null,2).replace(/"/g, ' ');
    recordModalBody.innerText = prettyJson;
    newRecordModal.show();
  }

  if(addCowBTNIsClicked) {
    const cow = {};
    const injection = {}
    const isValidCowName = validateNameAndUpdateNameInputUI(cowNameInput);
    const isValidBreed = validateInputAndUpdateUI(cowBreedInput);
    const isValidBullName = validateInputAndUpdateUI(bullNameInput);

    if(isValidCowName && isValidBreed && isValidBullName) {
      cow.name = cowNameInput.value.trim();
      cow.breed = cowBreedInput.value.trim();
      cow.bullName = bullNameInput.value.trim();
      record.cows.push(cow)
    }
    
    const isValidInjectionName = validateInputAndUpdateUI(injectionNameInput);
    const isValidInjectionPrice = validateInputAndUpdateUI(injectionPriceInput);
    const isValidGivenAmount = validateInputAndUpdateUI(givenAmountInput);
    const isValidPendingAmount = validateInputAndUpdateUI(pendingAmountInput);
    const isValidInjectionDate = validateDateAndUpdateDateInputUI(injectionDateInput);

    if(isValidInjectionName && isValidInjectionPrice && isValidGivenAmount && isValidPendingAmount && isValidInjectionDate) {
      injection.name = injectionNameInput.value.trim();
      injection.price = injectionPriceInput.value.trim();
      injection.givenAmount = givenAmountInput.value.trim();
      injection.pendingAmount = pendingAmountInput.value.trim();
      injection.date = injectionDateInput.value.trim();
      cow.injectionInfoAndAiDates = [injection];
    }
    addCowBTNIsClicked = false;
    const prettyJson = JSON.stringify(record,null,2).replace(/"/g, ' ');
    recordModalBody.innerText = prettyJson; 
    newRecordModal.show();
  }

  if(addInjectionBTNIsClicked) {
    const injection = {};
    const lastCowInjectionDetails = record.cows[record.cows.length-1].injectionInfoAndAiDates;
    console.log(lastCowInjectionDetails);
    const isValidInjectionName = validateInputAndUpdateUI(injectionNameInput);
    const isValidInjectionPrice = validateInputAndUpdateUI(injectionPriceInput);
    const isValidGivenAmount = validateInputAndUpdateUI(givenAmountInput);
    const isValidPendingAmount = validateInputAndUpdateUI(pendingAmountInput);
    const isValidInjectionDate = validateDateAndUpdateDateInputUI(injectionDateInput);

    if(isValidInjectionName && isValidInjectionPrice && isValidGivenAmount && isValidPendingAmount && isValidInjectionDate) {
      injection.name = injectionNameInput.value.trim();
      injection.price = injectionPriceInput.value.trim();
      injection.givenAmount = givenAmountInput.value.trim();
      injection.pendingAmount = pendingAmountInput.value.trim();
      injection.date = injectionDateInput.value.trim();
      lastCowInjectionDetails.push(injection);
    }    
    addInjectionBTNIsClicked = false;
    const prettyJson = JSON.stringify(record,null,2).replace(/"/g, ' ');
    recordModalBody.innerText = prettyJson; 
    newRecordModal.show();

  }
  addNewCowBTN.removeAttribute("disabled");
  addNewInjectionBTN.removeAttribute("disabled");

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

  cowNameInput.classList.remove("is-invalid","is-valid");
  cowBreedInput.classList.remove("is-invalid","is-valid");
  bullNameInput.classList.remove("is-invalid","is-valid");
  injectionNameInput.classList.remove("is-invalid","is-valid");
  injectionPriceInput.classList.remove("is-invalid","is-valid");
  givenAmountInput.classList.remove("is-invalid","is-valid");
  pendingAmountInput.classList.remove("is-invalid","is-valid");
  injectionDateInput.classList.remove("is-invalid","is-valid");
  cowForm.reset();
  injectionForm.reset();
  cowNameInput.focus();

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

  injectionNameInput.classList.remove("is-invalid","is-valid");
  injectionPriceInput.classList.remove("is-invalid","is-valid");
  givenAmountInput.classList.remove("is-invalid","is-valid");
  pendingAmountInput.classList.remove("is-invalid","is-valid");
  injectionDateInput.classList.remove("is-invalid","is-valid");
  injectionForm.reset();
  injectionNameInput.focus();

  addInjectionBTNIsClicked = true;
  addCowBTNIsClicked = false;

}

submitBTN.addEventListener("click",handleSubmit);
addNewCowBTN.addEventListener("click",addNewCowDetails);
addNewInjectionBTN.addEventListener("click",addNewInjectionDetails);

