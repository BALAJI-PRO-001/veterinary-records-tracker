import { 
       setBorder,
       setMessage,removeBorder
      } from "./userInterface.js";

export function addValidationListener(inputElement,validationfunction) {
  if(inputElement == null ||
    inputElement == undefined ||
    validationfunction == null ||
    validationfunction == undefined
  ) {
    throw new Error("Element or function is null or undefined...");
  }

  inputElement.addEventListener("keyup",validationfunction);
  inputElement.addEventListener("change",validationfunction);
}


export function removeInjectionDetails(e) {
  const recentInjection =e.target.parentElement.parentElement.querySelectorAll(".injection-details");
  if (recentInjection.length > 1) {
    recentInjection[recentInjection.length - 1].remove();
  }
}

export function addInjectionDetails(e) {
  const injectionDetails = e.target.parentElement.parentElement.querySelector(".injection-details").cloneNode(true);
  injectionDetails.querySelectorAll("input").forEach((input) => {
    input.value = "";
    removeBorder(input,"is-invalid");
    setMessage(input.nextElementSibling,"");
  })
  e.target.parentElement.parentElement.insertBefore(injectionDetails,e.target.parentElement);
}


export function addAnotherCow(e){
  const data = e.target.parentElement.parentElement.querySelector(".cow-container").querySelectorAll(".cow-details");
  const cowContent = data[data.length-1].cloneNode(true);
  const inputs = cowContent.querySelectorAll("input");
  inputs.forEach((input) => {
    input.value = "";
    removeBorder(input,"is-invalid");
    setMessage(input.nextElementSibling,"");
  })
  const unwantedChilds = cowContent.querySelectorAll(".injection-details");
  for(let i=1;i<unwantedChilds.length;i++) {
    unwantedChilds[i].remove();
  }
  
  const cowContainer = e.target.parentElement.parentElement.querySelector(".cow-container");
  console.log(cowContent);
  cowContainer.appendChild(cowContent);
  const injectionBtn = cowContent.querySelector("#add-injection");
  injectionBtn.addEventListener("click",addInjectionDetails);
  const removeInjectionBtn = cowContent.querySelector("#delete-recent-injection");
  removeInjectionBtn.addEventListener("click",removeInjectionDetails);
}


export function removeCow(e) {
  const container = e.target.parentElement.parentElement.querySelector(".cow-container");
  if(container.lastElementChild && container.childElementCount > 1) {
    container.removeChild(container.lastElementChild);
  }
}



async function showSingleRecord(id,container) {
  console.log(id);
  try {
    const res = await fetch(`/api/v1/records/${id}`,{
      method: "GET", 
    })

    const data = await res.json();
    console.log(data);
  } catch(err) {

  }
  
}


export function showAllRecords(datas, container) {
  let sno = 1;
  container.innerHTML = "";
  datas.forEach((data) => {
    // Create a new div element
    const dataContainer = document.createElement('div');
    dataContainer.className = 'bg-white shadow rounded m-1 ms-2 d-flex justify-content-between align-items-center w-100 w-sm-auto';
    dataContainer.style.minWidth = '300px';
    dataContainer.style.maxWidth = '500px';
    dataContainer.style.height = '60px';
    dataContainer.id = 'user-details';
    dataContainer.style.flex = '1';


    // Add the HTML content to the new div element
    dataContainer.innerHTML = `
      <p class="fs-6 my-auto ps-4">${sno}.</p>
      <p class="user-name my-auto">${data.user.name}</p>
      <p class="user-balance my-auto pe-4 text-success">₹5500</p>
    `;

    //add listener 
    dataContainer.addEventListener("click",(e)=> {
      showSingleRecord(data.user.id,container)
    });

    // Append the created div to the container
    container.appendChild(dataContainer);
    
    sno++;
  });
}




