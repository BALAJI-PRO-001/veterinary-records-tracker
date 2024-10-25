
const NUMERIC_CHARACTER_REGEX_PATTERN = /\d/;
const PHONE_NUMBER_REGEX_PATTERN = /\d{10}/;
const EMAIL_REGEX_PATTERN = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const SPECIAL_CHARACTER_REGEX_PATTERN = /[^a-zA-Z0-9\s]/;
const UPPERCASE_REGEX_PATTERN = /[A-Z]/;
const SPACE_REGEX_PATTERN = /\s/;
const AMOUNT_REGEX_PATTERN = /^\d+(\.\d+)?$/;
const DATE_REGEX_PATTERN = /^(0[1-9]|[12][0-9]|3[01])(\/|-)(0[1-9]|1[0-2])(\/|-)(19|20)\d{2}$/;


export function isValidEmail(email) {
  if (email === undefined || email === null) {
    throw new Error("Email is null or undefined.");
  }

  if (!EMAIL_REGEX_PATTERN.test(email)) {
    return { isValid: false, message: "Invalid email address. Please enter a valid email." }
  }

  return { isValid: true };
}



export function isValidPassword(password) {
  if (password === undefined || password === null) {
    throw new Error("Email is null or undefined.");
  }

  if (password === "") {
    return { isValid: false, message: "Required." };
  }

  if (!UPPERCASE_REGEX_PATTERN.test(password)) {
    return { isValid: false, message: "Password must contain at least one uppercase letter." };
  }

  if (!NUMERIC_CHARACTER_REGEX_PATTERN.test(password)) {
    return { isValid: false, message: "Password must contain at least one numeric character." };
  }

  if (!SPECIAL_CHARACTER_REGEX_PATTERN.test(password)) {
    return { isValid: false, message: "Password must contain at least one special character." };
  }

  if (SPACE_REGEX_PATTERN.test(password)) {
    return { isValid: false, message: "Password cannot contain spaces."};
  }

  if (password.length < 8) {
    return { isValid: false, message: "Password must be 8 characters or longer." };
  }

  return { isValid: true };
}



export function isValidName(name) {
  if (name === undefined || name === null) {
    throw new Error("Name is null or undefined.");
  }

  if (name === "") {
    return { isValid: false, message: "Required."};
  }

  return { isValid: true };
}



export function isValidPhoneNumber(phoneNumber) {
  if (phoneNumber === null || phoneNumber === undefined) {
    throw new Error("PhoneNumber is null or undefined.");
  }

  phoneNumber = String(phoneNumber);
  if (phoneNumber == "") {
    return { isValid: false, message: "Required."};
  }

  if (!PHONE_NUMBER_REGEX_PATTERN.test(phoneNumber)) {
    return { isValid: false, message: "Invalid phone number."};
  }

  if (phoneNumber.length != 10) {
    return { isValid: false, message: "Phone number must be exactly 10 digits."};
  }

  return { isValid: true };
}



export function isValidAddress(address) {
  if (address === undefined || address === null) {
    throw new Error("Address is null or undefined.");
  }

  if (address === "") {
    return { isValid: false, message: "Required."};
  }

  return { isValid: true };
}



export function isEmpty(string) {
  if (string === undefined || string === null) {
    throw new Error("String is null or undefined.");
  }

  if (string === "") {
    return { isValid: false, message: "Required."};
  }

  return { isValid: true };
}



export function isValidAmount(amount) {
  if (amount === undefined || amount === null) {
    throw new Error("Amount is null or undefined.");
  }

  if (amount === "") {
    return { isValid: false, message: "Required."};
  }

  if (!AMOUNT_REGEX_PATTERN.test(amount)) {
    return { isValid: false, message: "Invalid amount."};
  } 

  return { isValid: true };
}



export function isValidDate(date) {
  if (date === undefined || date === null) {
    throw new Error("Date is null or undefined.");
  }

  if (date === "") {
    return { isValid: false, message: "Required." };
  }

  if (!DATE_REGEX_PATTERN.test(date)) {
    return { isValid: false, message: "Invalid Date."};
  }

  return { isValid: true };
}