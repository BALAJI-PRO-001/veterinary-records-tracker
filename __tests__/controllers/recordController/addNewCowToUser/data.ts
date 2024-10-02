export default {
  cowDataToTest: [
    {
      message: "Bad Request: Missing required cow data (name, breed, bullName, or injectionInfoAndAiDates).",
      data: {}
    },
    {
      message: `Bad Request: Cow[0] name is required and cannot be (empty, null, or undefined).`,
      data: {name: "", breed: "", bullName: "", injectionInfoAndAiDates: ""}
    },
    {
      message: `Bad Request: Cow[0] breed is required and cannot be (empty, null, or undefined).`,
      data: {name: "<cowName>", breed: "", bullName: "", injectionInfoAndAiDates: ""}
    },
    {
      message: `Bad Request: Cow[0] bullName is required and cannot be (empty, null, or undefined).`,
      data: {name: "name", breed: "breed", bullName: "", injectionInfoAndAiDates: ""}
    },
    {
      message: `Bad Request: Cow[0] injectionInfoAndAiDates is required and cannot be (empty, null, or undefined).`,
      data: {name: "name", breed: "breed", bullName: "bullName", injectionInfoAndAiDates: ""}
    },
    {
      message: `Bad Request: Cow[0] InjectionInfoAndAiDates[0] injection name is required and cannot be (empty, null or undefined).`,
      data: {
        name: "name", 
        breed: "breed", 
        bullName: "bullName", 
        injectionInfoAndAiDates: [{}]
      }
    },
    {
      message: `Bad Request: Cow[0] InjectionInfoAndAiDates[0] injection name is required and cannot be (empty, null or undefined).`,
      data: {
        name: "name", 
        breed: "breed", 
        bullName: "bullName", 
        injectionInfoAndAiDates: [{name: ""}]
      }
    },
    {
      message: `Bad Request: Cow[0] InjectionInfoAndAiDates[0] injection name is required and cannot be (empty, null or undefined).`,
      data: {
        name: "name", 
        breed: "breed", 
        bullName: "bullName", 
        injectionInfoAndAiDates: [{name: null}]
      }
    },
    {
      message: `Bad Request: Cow[0] InjectionInfoAndAiDates[0] injection name is required and cannot be (empty, null or undefined).`,
      data: {
        name: "name", 
        breed: "breed", 
        bullName: "bullName", 
        injectionInfoAndAiDates: [{name: undefined}]
      }
    },
    {
      message: `Bad Request: Cow[0] InjectionInfoAndAiDates[0] injection cost is required and cannot be (empty, null or undefined).`,
      data: {
        name: "name", 
        breed: "breed", 
        bullName: "bullName", 
        injectionInfoAndAiDates: [{name: "name"}]
      }
    },
    {
      message: `Bad Request: Cow[0] InjectionInfoAndAiDates[0] injection cost is required and cannot be (empty, null or undefined).`,
      data: {
        name: "name", 
        breed: "breed", 
        bullName: "bullName", 
        injectionInfoAndAiDates: [{name: "name", cost: ""}]
      }
    },
    {
      message: `Bad Request: Cow[0] InjectionInfoAndAiDates[0] injection cost is required and cannot be (empty, null or undefined).`,
      data: {
        name: "name", 
        breed: "breed", 
        bullName: "bullName", 
        injectionInfoAndAiDates: [{name: "name", cost: null}]
      }
    },
    {
      message: `Bad Request: Cow[0] InjectionInfoAndAiDates[0] injection cost is required and cannot be (empty, null or undefined).`,
      data: {
        name: "name", 
        breed: "breed", 
        bullName: "bullName", 
        injectionInfoAndAiDates: [{name: "name", cost: undefined}]
      }
    },
    {
      message: `Bad Request: Cow[0] InjectionInfoAndAiDates[0] ai date is required and cannot be (empty, null or undefined).`,
      data: {
        name: "name", 
        breed: "breed", 
        bullName: "bullName", 
        injectionInfoAndAiDates: [{name: "name", cost: 100}]
      }
    },
    {
      message: `Bad Request: Cow[0] InjectionInfoAndAiDates[0] ai date is required and cannot be (empty, null or undefined).`,
      data: {
        name: "name", 
        breed: "breed", 
        bullName: "bullName", 
        injectionInfoAndAiDates: [{name: "name", cost: 100, date: ""}]
      }
    },
    {
      message: `Bad Request: Cow[0] InjectionInfoAndAiDates[0] ai date is required and cannot be (empty, null or undefined).`,
      data: {
        name: "name", 
        breed: "breed", 
        bullName: "bullName", 
        injectionInfoAndAiDates: [{name: "name", cost: 100, date: null}]
      }
    },
    {
      message: `Bad Request: Cow[0] InjectionInfoAndAiDates[0] ai date is required and cannot be (empty, null or undefined).`,
      data: {
        name: "name", 
        breed: "breed", 
        bullName: "bullName", 
        injectionInfoAndAiDates: [{name: "name", cost: 100, date: undefined}]
      }
    }
  ],

  newCowData: {
    name: "new Cow",
    breed: "breed",
    bullName: "bullName",
    injectionInfoAndAiDates: [
      {
        name: "injection 1",
        cost: 100,
        date: "12/3/2004"
      },
      {
        name: "injection 2",
        cost: 200,
        date: "12/3/2006"
      }
    ]
  }
}