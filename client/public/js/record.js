import { toggleElementVisibility } from "./utils/userInteraction.js";


const userNameSpan = document.getElementById("user-name");
const phoneNumberSpan = document.getElementById("phone-number");
const addressSpan = document.getElementById("address");
const cowNameAndBreedSpan = document.getElementById("cow-name-and-breed");
const bullNameSpan = document.getElementById("bull-name");


const alertBox = document.getElementById("alert-box");
const pendingAmountSpan = document.getElementById("pending-amount");
const paginationContainer = document.getElementById("pagination-container");
const mainContainer = document.getElementById("main-container");
const spinner = document.getElementById("spinner");
const tableContainer = document.getElementById("table-container");
const cowActionsBTNContainer = document.getElementById("cow-action-btn-container");
const cowImgContainer = document.getElementById("cow-img-container");



async function getRecordFromServer(id) {
  const res = await fetch(`/api/v1/records/${id}`);
  const data = await res.json();
  if (data.statusCode === 200) {
    return data.data.record;
  }
}



function updateUserRecordToUI(user) {
  if (user === null || user === undefined) {
    throw new Error("User is null or undefined.");
  }

  userNameSpan.innerText = user.name;
  phoneNumberSpan.innerText = user.phoneNumber;
  addressSpan.innerText = user.address;
}



function updateCowRecordToUI(cow) {
  if (cow === null || cow === undefined) {
    throw new Error("Cow is null or undefined.")
  }

  cowNameAndBreedSpan.previousElementSibling.classList.remove("d-none");
  bullNameSpan.previousElementSibling.classList.remove("d-none");
  cowNameAndBreedSpan.innerText = cow.name + " - " + cow.breed;
  bullNameSpan.innerText = cow.bullName;
}



function createDynamicInjectionInfoAndAiDatesTable(injectionInfoAndAiDates) {
  if (injectionInfoAndAiDates === null || injectionInfoAndAiDates === undefined) {
    throw new Error("Injection info and ai dates is null or undefined.");
  }

  const table = document.createElement("table");
  table.className = "table table-bordered table-sm table-hover c-fs-f-srp-t";
  
  const theadString = `
    <thead>
      <tr class="text-nowrap position-sticky bg-white" style="top: -1px;">
        <th>Name</th>
          <th>Cost</th>
          <th>G-Amount</th>
          <th>P-Amount</th>     
          <th>Ai-Date</th> 
        </tr>
    </thead>
  `;

  let tRowsString = "";
  for (let { id, name, price, givenAmount, pendingAmount, date } of injectionInfoAndAiDates) {
    const trString = `
      <tr id="table-row" key="${id}">
        <td>${name}</td>
        <td>${price}</td>
        <td>${givenAmount}</td>
        <td>${pendingAmount}</td>
        <td>${date}</td>
      </tr>
    `;
    tRowsString += trString;
  }

  table.innerHTML = `${theadString} <tbody> ${tRowsString} </tbody>`;
  return table;
}



function createCowsPaginationList(cows) {
  if (cows === null || cows === undefined) {
    throw new Error("Cows is null or undefined.");
  }

  const ul = document.createElement("ul");
  ul.className = "pagination mt-3 mb-0 text-nowrap";
  ul.id = "pagination-list";

  for (let cow of cows) {
    const li = document.createElement("li");
    li.className = "page-item c-fs-f-srp-p";
    li.id = "page-item";

    const a = document.createElement("a");
    a.className = "page-link";
    a.id = "page-link";
    a.key = cow.id;
    a.innerText = cow.name;

    li.appendChild(a);
    ul.appendChild(li);
  }
  return ul;
}


/* Fetch data from server and update ui based by fetched data. */
async function fetchRecordAndUpdateUI() {
  try {
    const id = location.href.split("/").pop();
    toggleElementVisibility(mainContainer, true);
    const record = await getRecordFromServer(id);
    
    /* Load default user data to ui. */
    updateUserRecordToUI(record.user);

    if (record.cows.length <= 0) {
      cowImgContainer.classList.remove("d-none");
    } else {
      cowImgContainer.classList.add("d-none");
    }

    if (record.cows.length > 0) {
      /* Find and update pending amount to ui. */
      let pendingAmount = record.cows.map((cow, index) => {
        const amounts = cow.injectionInfoAndAiDates.map(({pendingAmount}) => {
          return pendingAmount;
        });
        return amounts.reduce((total, amount) => total + amount, 0);
      });

      pendingAmountSpan.innerText = pendingAmount.reduce((total, amount) => total + amount, 0);
      /* Load default cow data to ui. */
      updateCowRecordToUI(record.cows[0]);

      paginationContainer.appendChild(createCowsPaginationList(record.cows));

      /* Load default injection info and ai date data to ui. */
      tableContainer.appendChild(createDynamicInjectionInfoAndAiDatesTable(record.cows[0].injectionInfoAndAiDates));
      cowActionsBTNContainer.classList.remove("d-none");

      /* Listen pagination links is clicked. also update cow and injection info to ui. */
      document.addEventListener("click", (e) => {
        if (e.target.id === "page-link") {
          const cow = record.cows.find((cow) => cow.id === e.target.key);
          updateCowRecordToUI(cow);
          tableContainer.innerHTML = "";
          tableContainer.appendChild(createDynamicInjectionInfoAndAiDatesTable(cow.injectionInfoAndAiDates));
        }
      });
    }

    toggleElementVisibility(spinner, false, "d-none")
    toggleElementVisibility(mainContainer, false);

  } catch(err) {
    alertBox.classList.toggle("d-none");
    alertBox.innerText = "Error :" + err.message;
  }
}

fetchRecordAndUpdateUI();



/* Add popup menu to table rows. and control show and hide functionality. */
const popupMenu = document.getElementById("popup-menu");

document.addEventListener("click", (e) => {
  if (e.target.parentElement.id === "table-row") {
    popupMenu.classList.remove("d-none");
    console.log(e.pageY-40);
    popupMenu.style.left = `${e.pageX - 100}px`;
    popupMenu.style.top = `${e.pageY - 10}px`;
  }
});

document.addEventListener('click', function(e) {
  if (!e.target.closest("#table-row") && !e.target.closest("#popup-menu")) {
    popupMenu.classList.add("d-none");
  }
});
