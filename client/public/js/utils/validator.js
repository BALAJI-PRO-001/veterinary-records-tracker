import {setBorder,removeBorder,setMessage} from "./userInterface.js";

class Validator {
  NUMERIC_CHARACTER_REGEX_PATTERN = /^\d+$/;
  SPECIAL_CHARACTER_REGEX_PATTERN = /[^a-zA-Z0-9\s]/;
  EMAIL_REGEX_PATTERN = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  UPPERCASE_REGEX_PATTERN = /[A-Z]/;
  ALPHABET_REGEX_PATTERN = /^[A-Za-z]+$/;

  isTrue(value) {
    if(value == "") {
      return false;
    }
    return true;
  }

  isValidName(name) {
    if(name == "") {
      return {isValid : false, message: "name cannot be Empty..."};
    }
    return {isValid: true}; 
  }



  isValidPhoneNo(phoneNo) {
    
    if(phoneNo == "") {
      return {isValid : false,message : "phone no cannot be empty"};
    }
    if(!this.NUMERIC_CHARACTER_REGEX_PATTERN.test(phoneNo)) {
      return {isValid : false,message : "use only numeric values..."};
    }
    if(this.SPECIAL_CHARACTER_REGEX_PATTERN.test(phoneNo)) {
      return {isValid : false,message : "use only numeric values..."};
    }
    if(this.ALPHABET_REGEX_PATTERN.test(phoneNo)) {
      return {isValid : false,message : "use only numeric values..."};
    }
    else {
      return{isValid: true};
    }
  }

  isAllFieldsValid(e) {
    const element = e.target;
    const value = element.value;
    const errElement = element.nextElementSibling;
    console.log(value);
    if(value == "") {
      
      setBorder(element,"is-invalid");
      setMessage(errElement,"* must Enter this...")
    }
    if(value != "") {
      removeBorder(element,"is-invalid");
      setMessage(errElement,"");
    }

  }


  isFieldValid(inputs) {
    for (let input of inputs) {
      if (input.value === "") {
        return false;
      }
    }
    return true;
  }
  
}




const validator = new Validator();

export default validator;
