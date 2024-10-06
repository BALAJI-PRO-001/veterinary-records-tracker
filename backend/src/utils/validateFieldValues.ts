

export default function validateFieldValues(fields: Object): Error | void {
  for (let [key, value] of Object.entries(fields)) {
    if (value === "") {
      throw new Error(`${key} cannot be empty string.`);
    }
    
    if (value === null) {
      throw new Error(`${key} cannot be null.`);
    }

    if (value === undefined) {
      throw new Error(`${key} cannot be undefined.`);
    }
  }
}