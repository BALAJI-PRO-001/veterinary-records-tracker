const userDataForCow = {name: "<name>", phoneNumber: 123, address: "<address>"};

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
    nameData: {
      message: "Bad Request: Cow[0] name is required and cannot be (empty, null, or undefined).",
      data: [
        {user: userDataForCow, cows: [{}]},
        {user: userDataForCow, cows: [{name: ""}]},
        {user: userDataForCow, cows: [{name: null}]},
        {user: userDataForCow, cows: [{name: undefined}]},
      ]
    },
    breedData: {
      message: "Bad Request: Cow[0] breed is required and cannot be (empty, null, or undefined).",
      data: [
        {user: userDataForCow, cows: [{name: "<cowName>"}]},
        {user: userDataForCow, cows: [{name: "<cowName>", breed: ""}]},
        {user: userDataForCow, cows: [{name: "<cowName>", breed: null}]},
        {user: userDataForCow,cows: [{name: "<cowName>", breed: undefined}]},
      ]
    },
    bullNameData: {
      message: "Bad Request: Cow[0] bullName is required and cannot be (empty, null, or undefined).",
      data: [
        {user: userDataForCow, cows: [{name: "<cowName>", breed: "<breed>"}]},
        {user: userDataForCow, cows: [{name: "<cowName>", breed: "<breed>", bullName: ""}]},
        {user: userDataForCow, cows: [{name: "<cowName>", breed: "<breed>", bullName: null}]},
        {user: userDataForCow,cows: [{name: "<cowName>", breed: "<breed>", bullName: undefined}]},
      ]
    }
  }
}