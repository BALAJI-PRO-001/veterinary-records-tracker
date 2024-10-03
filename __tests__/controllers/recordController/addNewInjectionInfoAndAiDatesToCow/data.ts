export default {
  injectionInfoAndAiDataToTest: [
    {
      message: "Bad Request: Missing required injection info and ai dates data (name, cost, date).",
      data: {}
    },
    {
      message: "Bad Request: Injection name is required and cannot be (empty, null or undefined).",
      data: {name: "", cost: "", date: ""}
    },
    {
      message: "Bad Request: Injection name is required and cannot be (empty, null or undefined).",
      data: {name: null, cost: "", date: ""}
    },
    {
      message: "Bad Request: Injection cost is required and cannot be (empty, null or undefined).",
      data: {name: "name", cost: "", date: ""}
    },
    {
      message: "Bad Request: Injection cost is required and cannot be (empty, null or undefined).",
      data: {name: "name", cost: null, date: ""}
    },
    {
      message: "Bad Request: Injection date is required and cannot be (empty, null or undefined).",
      data: {name: "name", cost: 100, date: ""}
    },
    {
      message: "Bad Request: Injection date is required and cannot be (empty, null or undefined).",
      data: {name: "name", cost: 100, date: null}
    }
  ],

  newInjectionInfoAndAiDatesData: [
    {
      message: "Bad Request: Injection cost must be a valid number.",
      data: {name: "name", cost: "100", date: "12/1/2002"}
    },
    {
      message: "New injection info and AI dates have been successfully created for cow id: 3.",
      data: {name: "name", cost: 100, date: "12/1/2002"}
    }
  ]
}
