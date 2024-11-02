
const alertBox = document.getElementById("alert-box");
const serverInfoContainer = document.getElementById("server-info-container");


const dbAndRecordsManagementContainer = document.getElementById("db-and-records-management-container");
const dbFileInput = dbAndRecordsManagementContainer.querySelector("#db-file-input");
const dbUpdateBTN = dbAndRecordsManagementContainer.querySelector("#db-update-btn");
const dbAndRecordsDivMessageEl = dbAndRecordsManagementContainer.querySelector("#message-element");


dbFileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (file && file.name.split(".").pop() !== "db") {
    dbAndRecordsDivMessageEl.classList.remove("text-success");
    dbAndRecordsDivMessageEl.classList.add("text-danger");
    return dbAndRecordsDivMessageEl.innerText = "You can only upload database file ....";
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


