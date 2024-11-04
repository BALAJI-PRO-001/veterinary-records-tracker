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

const recordModal = document.getElementById("validate-modal");
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



async function handleSubmit(e) {
  e.preventDefault();
  try {
    const user = validateAndExtractUserRecord();
    const cow = validateAndExtractCowRecord();
    const injection = validateAndExtractInjectInfoAndAiDate();

    if(user && cow && injection) {
      record.user = user;
      record.cows = [cow];
      cow.injectionInfoAndAiDates = [injection];

      console.log(record);

      const res = await fetch("/api/v1/records",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body : JSON.stringify(record)
      });

      const data = await res.json();

      if(data.statusCode == 201) {
        location.href = "/home";
      } else {
        record = {};
        alert(data.message);
      } 
    } 
  } catch(err) {
   
  }
  newRecordModal.show();
}


async function sendDataToServer(e) {
  e.preventDefault();
  
}

submitBTN.addEventListener("click",handleSubmit);
modalSubmitBTN.addEventListener("click",sendDataToServer);
