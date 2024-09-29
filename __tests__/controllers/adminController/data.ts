export default {
  emailDataToTest: [
    {
      data: {email: ""},
      message: "Bad Request: Email is required and cannot be (empty, null, or undefined)."
    },
    {
      data: {email: null},
      message: "Bad Request: Email is required and cannot be (empty, null, or undefined)."
    },
    {
      data: {email: undefined, password: "<password>"},
      message: "Bad Request: Email is required and cannot be (empty, null, or undefined)."
    }
  ],
  passwordDataToTest: [
    {
      data: {email: "<email>"},
      message: "Bad Request: Password is required and cannot be (empty, null, or undefined)."
    },
    {
      data: {email: "<email>", password: null},
      message: "Bad Request: Password is required and cannot be (empty, null, or undefined)."
    },
    {
      data: {email: "<email>", password: undefined},
      message: "Bad Request: Password is required and cannot be (empty, null, or undefined)."
    }
  ]
};


