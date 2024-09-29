export default {
  userDataToTest: {
    nameData: {
      message: "Bad Request: User name is required and cannot be (empty, null, or undefined).",
      data: [
        {user: {}, cows: []},
        {user: {name: ""}, cows: []},
        {user: {name: null}, cows: []},
        {user: {name: undefined}, cows: []}
      ]
    },
    phoneNumberData: {
      message: "Bad Request: User phoneNumber is required and cannot be (empty, null, or undefined).",
      data: [
        {user: {name: "<name>"}, cows: []},
        {user: {name: "<name>", phoneNumber: ""}, cows: []},
        {user: {name: "<name>", phoneNumber: null}, cows: []},
        {user: {name: "<name>", phoneNumber: undefined}, cows: []}
      ]
    },
    addressData: {
      message: "Bad Request: User address is required and cannot be (empty, null, or undefined).",
      data: [
        {user: {name: "<name>", phoneNumber: 123}, cows: []},
        {user: {name: "<name>", phoneNumber: 123, address: ""}, cows: []},
        {user: {name: "<name>", phoneNumber: 123, address: null}, cows: []},
        {user: {name: "<name>", phoneNumber: 123, address: undefined}, cows: []}
      ]
    }
  },
  cowDataToTest: {
    
  }
}