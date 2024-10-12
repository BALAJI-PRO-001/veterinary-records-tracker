import { extractCowInformation } from "./utils/common.js";

const recordCountElement = document.getElementById("record-count");
const alertBox = document.getElementById("alert-box");
const spinner = document.getElementById("spinner");
const mainContainer = document.getElementById("main-container");
const tableContainer = document.getElementById("table-container");

async function getRecordsFromServer() {
  try {
    const res = await fetch("/api/v1/records/all");
    const data = await res.json();
    spinner.classList.add("d-none");
    mainContainer.classList.remove("d-none");

    if (data.statusCode === 200) {
      return data.data.records;
    }
    alertBox.classList.toggle("d-none");
    alertBox.innerText = "Error: " + data.message;
  } catch(err) {
    alertBox.classList.toggle("d-none");
    alertBox.innerText = "Error: " + err.message;
  }
}



getRecordsFromServer().then((records) => {
  recordCountElement.innerText = `Records: ${records.length}`;
  tableContainer.appendChild(createDynamicRecordsTable(records));
});



function click() {
  console.log("HI");
}


function createDynamicRecordsTable(records) {
  const table = document.createElement("table");
  table.setAttribute("id", "records-table");
  table.className += "table align-middle table-hover text-nowrap";

  const thead = document.createElement("thead");
  thead.className += "bg-primary text-white position-sticky top-0";

  const tr = `
    <tr class="border border-dark">
      <th>Id</th>
      <th>Name</th>
      <th>Phone Number</th>
      <th>Address</th>
      <th>D&T In DB</th>
    </tr>
  `;

  thead.innerHTML = tr;
  table.appendChild(thead);

  let tbody = document.createElement("tbody");
  for (let record of records) {
    const { 
      cowNames, cowBreeds, bullNames, injectionNames, 
      injectionPrices, givenAmounts, pendingAmounts, dates 
    } = extractCowInformation(record.cows);

    const tr = document.createElement("tr");
    tr.className += "border border-dark";
    tr.onclick = click;
    const tdElements = `
        <td class="border border-dark d-inline-block border-top-0 text-truncate" style="width: 100px">${record.user.id}</td>
        <td class="border border-dark d-inline-block border-top-0 text-truncate" style="width: 100px">${record.user.name}</td>
        <td class="border border-dark d-inline-block border-top-0 text-truncate" style="width: 100px">${record.user.phoneNumber}</td>
        <td class="border border-dark d-inline-block border-top-0 text-truncate" style="width: 100px">${record.user.address}</td>
        <td class="border border-dark d-inline-block border-top-0 text-truncate" style="width: 100px">${record.recordCreatedAt}</td>
    `;
    tr.innerHTML = tdElements;
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  return table;
}



/* <td class="border border-dark">${cowNames}</td>
<td class="border border-dark">${cowBreeds}</td>
<td class="border border-dark">${bullNames}</td>
<td class="border border-dark">${injectionNames}</td>
<td class="border border-dark">${injectionPrices}</td>
<td class="border border-dark">${givenAmounts}</td>
<td class="border border-dark">${pendingAmounts}</td>
<td class="border border-dark">${dates}</td> */


// <th>Cow Names</th>
// <th>Cow Breeds</th>
// <th>Bull Names</th>
// <th>Injection Names</th>
// <th>Injection Prices</th>
// <th>Given Amount</th>
// <th>Pending Amount</th>
// <th>Ai Dates</th>