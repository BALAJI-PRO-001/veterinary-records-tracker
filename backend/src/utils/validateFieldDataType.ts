

export default function validateFieldDataType(fields: Array<{property: {name: string, value: any}, dataType: string}>): Error | void {
  for (let field of fields) {
    if (typeof field.property.value !== field.dataType) {
      throw new Error(`${field.property.name} must be a valid '${field.dataType}', but received a value of type '${typeof field.property.value}'.`);
    }
  }
}