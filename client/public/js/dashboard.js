
const alertBox = document.getElementById("alert-box");
const serverInfoContainer = document.getElementById("server-info-container");
const serverInfoContainerSpinner = serverInfoContainer.querySelector("#spinner");
const serverDeactivatedContentEl = serverInfoContainer.querySelector("#deactivated-content-element");
const requestCountSpan = serverInfoContainer.querySelector("#request-count");
const responseTimeSpan = serverInfoContainer.querySelector("#response-time");
const allocatedMemSpan = serverInfoContainer.querySelector("#allocated-mem");
const heapMemSpan = serverInfoContainer.querySelector("#heap-mem");
const heapMemUsageSpan = serverInfoContainer.querySelector("#heap-mem-usage");
const cpuUsage = serverInfoContainer.querySelector("#cpu-usage");

const dbAndRecordsManagementContainer = document.getElementById("db-and-records-management-container");
const dbFileInput = dbAndRecordsManagementContainer.querySelector("#db-file-input");
const dbUpdateBTN = dbAndRecordsManagementContainer.querySelector("#db-update-btn");
const dbAndRecordsDivMessageEl = dbAndRecordsManagementContainer.querySelector("#message-element");


// const id = setInterval(async () => {
//   try {
//     const res = await fetch("/server-information");
//     const data = await res.json();
//     requestCountSpan.innerText = `${data.requestCount}`;
//     responseTimeSpan.innerText = `${(data.responseTime / 60).toFixed(2)}H`;
//     allocatedMemSpan.innerText = `${(data.memoryUsage.rss / (1024 * 1024)).toFixed(2)} MB`;
//     heapMemSpan.innerText = `${(data.memoryUsage.heapTotal / (1024 * 1024)).toFixed(2)} MB`;
//     heapMemUsageSpan.innerText = `${(data.memoryUsage.heapUsed / (1024 * 1024)).toFixed(2)} MB`;
//     cpuUsage.innerText = `${(data.cpuUsage.user / 1000000).toFixed(2)} s`;  
//   } catch(err) {
//     clearInterval(id);
//     serverInfoContainerSpinner.classList.add("d-none");
//     serverDeactivatedContentEl.classList.remove("d-none");
//   }
// }, 1000);


dbFileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (file && file.name.split(".").pop() !== "db") {
    dbAndRecordsDivMessageEl.classList.remove("text-success");
    dbAndRecordsDivMessageEl.classList.add("text-danger");
    dbUpdateBTN.setAttribute("disabled", "");
    dbAndRecordsDivMessageEl.innerText = "You can only upload database file.";
  } else {
    dbUpdateBTN.removeAttribute("disabled");
    dbAndRecordsDivMessageEl.innerText = "";
  }
});


dbUpdateBTN.addEventListener("click", async () => {
  try {
    const dbFile = dbFileInput.files[0];
    if (!dbFile) {
      dbAndRecordsDivMessageEl.classList.remove("text-success");
      dbAndRecordsDivMessageEl.classList.add("text-danger");
      return dbAndRecordsDivMessageEl.innerText = "Please select a database file.";
    } 
    dbAndRecordsDivMessageEl.innerText = "";

    const spinner = dbAndRecordsManagementContainer.querySelector("#spinner");
    spinner.classList.remove("d-none");
    const formData = new FormData();
    formData.append("database", dbFile);
    spinner.classList.remove("d-none");

    const res = await fetch("/api/v1/super-user/update/db", {
      method: "PATCH",
      body: formData
    });
    const data = await res.json();
    spinner.classList.add("d-none");

    if (data.statusCode === 401) {
      dbAndRecordsDivMessageEl.classList.remove("text-success");
      dbAndRecordsDivMessageEl.classList.add("text-danger");
      return dbAndRecordsDivMessageEl.innerText = "Your session has expired. Please log out and log back in to continue.";
    }

    if (data.statusCode === 200) {
      dbAndRecordsDivMessageEl.classList.remove("text-danger");
      dbAndRecordsDivMessageEl.classList.add("text-success");
      dbAndRecordsDivMessageEl.innerText = "Database file uploaded successfully.";
      return setTimeout(() => {
        dbAndRecordsDivMessageEl.innerText = "";
      }, 1000);
    }
  } catch(err) {
    alertBox.classList.remove("d-none");
    alertBox.innerText = "Error: " + err.message;
  }

});


