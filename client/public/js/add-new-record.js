import { addValidationListenersToInputElement } from "./utils/common.js";
import { 
        isEmpty,
        isValidPhoneNumber,
        isValidAmount,
        isValidDate 
      } from "./utils/validator.js";

const userForm = document.getElementById("user-form")
const cowForm = document.getElementById("cow-form");
const injectionForm = document.getElementById("injection-form");

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


