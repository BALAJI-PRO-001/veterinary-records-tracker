import { toggleElementVisibility } from "./utils/userInteraction";



const contentContainer = document.getElementById("content-container");
const spinner = document.getElementById("spinner");

async function fetchRecordAndUpdateUI() {
  try {
    toggleElementVisibility(spinner,false,"d-none");
    




  } catch (err) {
    console.log(err);
  }
}