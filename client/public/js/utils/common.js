

export function addValidationListenersToInputElement(inputElement, validationFunction) {
  if (inputElement === null || inputElement === undefined) {
    throw new Error("Input element is null or undefined.");
  }

  if (!(inputElement instanceof HTMLInputElement)) {
    throw new Error(`Expected an HTMLInputElement, but got (${typeof inputElement}).`);
  }

  if (validationFunction === null || validationFunction === undefined) {
    throw new Error("Validation function is null or undefined.");
  }

  if (typeof validationFunction !== 'function') {
    throw new Error(`Expected a function, but got (${typeof validationFunction}).`);
  }

  inputElement.addEventListener("change", validationFunction);
  inputElement.addEventListener("keyup", validationFunction);
}