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
    },
    injectionInfoAndAiDates: {
      message: [
        "Bad Request: Cow[0] injectionInfoAndAiDates is required and cannot be (empty, null, or undefined).",
        `Bad Request: Cow[0] injectionInfoAndAiDates must contain at least one entry for each cow.`,
        `Bad Request: Cow[0] InjectionInfoAndAiDates[0] injection name is required and cannot be (empty, null or undefined).`,
        `Bad Request: Cow[0] InjectionInfoAndAiDates[0] injection cost is required and cannot be (empty, null or undefined).`,
        `Bad Request: Cow[0] InjectionInfoAndAiDates[0] ai date is required and cannot be (empty, null or undefined).`
      ],
      data: [
        [
          {user: userDataForCow, cows: [{name: "<cowName>", breed: "<breed>", bullName: "<bullName>"}]},
          {user: userDataForCow, cows: [{name: "<cowName>", breed: "<breed>", bullName: "<bullName>", injectionInfoAndAiDates: ""}]},
          {user: userDataForCow, cows: [{name: "<cowName>", breed: "<breed>", bullName: "<bullName>", injectionInfoAndAiDates: null}]},
          {user: userDataForCow,cows: [{name: "<cowName>", breed: "<breed>", bullName: "<bullName>", injectionInfoAndAiDates: undefined}]},
        ],
        [
          {user: userDataForCow, cows: [{name: "<cowName>", breed: "<breed>", bullName: "<bullName>", injectionInfoAndAiDates: []}]},
        ],
        [
          {user: userDataForCow, cows: [{name: "<cowName>", breed: "<breed>", bullName: "<bullName>", injectionInfoAndAiDates: [{}]}]},
          {user: userDataForCow, cows: [{name: "<cowName>", breed: "<breed>", bullName: "<bullName>", injectionInfoAndAiDates: [{name: ""}]}]},
          {user: userDataForCow, cows: [{name: "<cowName>", breed: "<breed>", bullName: "<bullName>", injectionInfoAndAiDates: [{name: null}]}]},
          {user: userDataForCow, cows: [{name: "<cowName>", breed: "<breed>", bullName: "<bullName>", injectionInfoAndAiDates: [{name: undefined}]}]},
        ],
        [
          {user: userDataForCow, cows: [{name: "<cowName>", breed: "<breed>", bullName: "<bullName>", injectionInfoAndAiDates: [{name: "<name>"}]}]},
          {user: userDataForCow, cows: [{name: "<cowName>", breed: "<breed>", bullName: "<bullName>", injectionInfoAndAiDates: [{name: "<name>", cost: ""}]}]},
          {user: userDataForCow, cows: [{name: "<cowName>", breed: "<breed>", bullName: "<bullName>", injectionInfoAndAiDates: [{name: "<name>", cost: null}]}]},
          {user: userDataForCow, cows: [{name: "<cowName>", breed: "<breed>", bullName: "<bullName>", injectionInfoAndAiDates: [{name: "<name>", cost: undefined}]}]},
        ],
        [
          {user: userDataForCow, cows: [{name: "<cowName>", breed: "<breed>", bullName: "<bullName>", injectionInfoAndAiDates: [{name: "<name>", cost: "<cost>"}]}]},
          {user: userDataForCow, cows: [{name: "<cowName>", breed: "<breed>", bullName: "<bullName>", injectionInfoAndAiDates: [{name: "<name>", cost: "<cost>", date: ""}]}]},
          {user: userDataForCow, cows: [{name: "<cowName>", breed: "<breed>", bullName: "<bullName>", injectionInfoAndAiDates: [{name: "<name>", cost: "<cost>", date: null}]}]},
          {user: userDataForCow, cows: [{name: "<cowName>", breed: "<breed>", bullName: "<bullName>", injectionInfoAndAiDates: [{name: "<name>", cost: "<cost>", date: undefined}]}]},
        ],
      ]
    }
  },


  newRecordDataToTest: [
    {
      message: "Phone number must be a valid number with exactly 10 digits.",
      data:     {
        user: {
          name: "name",
          phoneNumber: 123,
          address: "address"
        }, 
        cows: [
          {
            name: "cow 1",
            breed: "breed",
            bullName: "bullName",
            injectionInfoAndAiDates: [
              {
                name: "injection 1",
                cost: 100,
                date: "12/2/2004"
              }
            ]
          }
        ]
      }  
    },
    {
      message: "New record created successfully.",
      data:     {
        user: {
          name: "name",
          phoneNumber: 1231231233,
          address: "address"
        }, 
        cows: [
          {
            name: "cow 1",
            breed: "breed",
            bullName: "bullName",
            injectionInfoAndAiDates: [
              {
                name: "injection 1",
                cost: 100,
                date: "12/2/2004"
              }
            ]
          }
        ]
      }  
    }
  ]
}