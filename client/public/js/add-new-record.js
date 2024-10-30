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

const showRecordsModal = document.getElementById("show-record-modal");

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

const record = {};

function handleSubmit(e) {
  e.preventDefault();
  if(Object.keys(record).length === 0) {
    const user = {};
    const cow = {};
    const injection = {}
    const isValidName = validateNameAndUpdateNameInputUI(userNameInput);
    const isValidPhoneNumber = validatePhoneNumberAndUpdatePhoneNumberInputUI(userPhoneNumberInput);
    const isValidAddress = validateAddressAndUpdateAddressInputUI(userAddressInput);
    if(isValidName && isValidPhoneNumber && isValidAddress) {
      user.name = userNameInput.value,
      user.phoneNo = userPhoneNumberInput.value,
      user.address = userAddressInput.value
      record.user = user;
    }

    const isValidCowName = validateNameAndUpdateNameInputUI(cowNameInput);
    const isValidBreed = validateInputAndUpdateUI(cowBreedInput);
    const isValidBullName = validateInputAndUpdateUI(bullNameInput);

    if(isValidCowName && isValidBreed && isValidBullName) {
      cow.name = cowNameInput.value,
      cow.breed = cowBreedInput.value,
      cow.bullName = bullNameInput.value
      record.cows = [cow];
    }
    
    const isValidInjectionName = validateInputAndUpdateUI(injectionNameInput);
    const isValidInjectionPrice = validateInputAndUpdateUI(injectionPriceInput);
    const isValidGivenAmount = validateInputAndUpdateUI(givenAmountInput);
    const isValidPendingAmount = validateInputAndUpdateUI(pendingAmountInput);
    const isValidInjectionDate = validateDateAndUpdateDateInputUI(injectionDateInput);

    if(isValidInjectionName && isValidInjectionPrice && isValidGivenAmount && isValidPendingAmount && isValidInjectionDate) {
      injection.name = injectionNameInput.value,
      injection.price = injectionPriceInput.value,
      injection.givenAmount = givenAmountInput.value,
      injection.pendingAmount = pendingAmountInput.value,
      injection.date = injectionDateInput.value
      cow.injectionInfoAndAiDates = [injection];
    }
    const prettyJson = JSON.stringify(record,null,2).replace(/"/g, ' ');    
    showRecordsModal.querySelector(".modal-body").innerText = prettyJson;
  }
  

}

submitBTN.addEventListener("click",handleSubmit);

addNewCowBTN.addEventListener("click",() => {

});

