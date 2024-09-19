export function addValidationListener(inputElement,validationfunction) {
  if(inputElement == null ||
    inputElement == undefined ||
    validationfunction == null ||
    validationfunction == undefined
  ) {
    throw new Error("Element or function is null or undefined...");
  }
  
  inputElement.addEventListener("keyup",validationfunction);
  inputElement.addEventListener("change",validationfunction);
}