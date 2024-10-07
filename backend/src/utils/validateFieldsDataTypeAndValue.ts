

export default function validateFieldsDataTypeAndValue(fields: Array<{property: {name: string, value: any}, dataType: string}>): Error | void {
  for (let field of fields) {
    const filedType = typeof field.property.value;
    if (typeof field.property.value !== field.dataType) {
      throw new Error(`${field.property.name} must be a valid '${field.dataType}', but received a value of type '${field.property.value === null ? "null" : filedType}'.`);
    }

    if (field.property.value === "") {
      throw new Error(`${field.property.name} cannot be empty string.`);
    }
    
    if (field.property.value === null) {
      throw new Error(`${field.property.name} cannot be null.`);
    }

    if (field.property.value === undefined) {
      throw new Error(`${field.property.name} cannot be undefined.`);
    }
  }
}