
const NUMERIC_CHARACTER_REGEX_PATTERN = /\d/;
const EMAIL_REGEX_PATTERN = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const SPECIAL_CHARACTER_REGEX_PATTERN = /[^a-zA-Z0-9\s]/;
const UPPERCASE_REGEX_PATTERN = /[A-Z]/;
const SPACE_REGEX_PATTERN = /\s/;


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
    return { isValid: false, message: "Password field is required." };
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