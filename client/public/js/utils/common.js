

export function addValidationListenersToInputElement(inputElement, validationFunction) {
  if (inputElement === null || inputElement === undefined) {
    throw new Error("Input element is null or undefined.");
  }

  if (!(inputElement instanceof HTMLInputElement)) {
    throw new Error(`Expected an HTMLInputElement, but got (${typeof inputElement}).`);
  }

  if (validationFunction === null || validationFunction === undefined) {
    throw new Error("Validation function is null or undefined.");
  }

  if (typeof validationFunction !== 'function') {
    throw new Error(`Expected a function, but got (${typeof validationFunction}).`);
  }

  inputElement.addEventListener("change", validationFunction);
  inputElement.addEventListener("keyup", validationFunction);
}




export function extractCowInformation(cows) {
  if (cows === null || cows === undefined) {
    throw new Error("Cows are null or undefined.")
  }

  const cowNames = [];
  const cowBreeds = [];
  const bullNames = [];
  const injectionNames = [];
  const injectionPrices = [];
  const givenAmounts = [];
  const pendingAmounts = [];
  const dates = [];

  for (let cow of cows) {
    cowNames.push(cow.name);
    cowBreeds.push(cow.breed);
    bullNames.push(cow.bullName);

    for (let injectionInfoAndAiDate of cow.injectionInfoAndAiDates) {
      injectionNames.push(injectionInfoAndAiDate.name);
      injectionPrices.push(injectionInfoAndAiDate.price);
      givenAmounts.push(injectionInfoAndAiDate.givenAmount);
      pendingAmounts.push(injectionInfoAndAiDate.pendingAmount);
      dates.push(injectionInfoAndAiDate.date);
    }
  }
  return {
    cowNames, cowBreeds, bullNames, injectionNames, 
    injectionPrices, givenAmounts, pendingAmounts, dates
  };
}


export async function logout(reqURL) {
  try {
    const res = await fetch(reqURL);
    const data = await res.json();
    if(data.statusCode != 200) {
      throw new Error("Logout request failed.");
    }

  } catch(err) {
    throw err;
  }
}