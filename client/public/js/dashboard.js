
const alertBox = document.getElementById("alert-box");

const dbAndRecordsManagementContainer = document.getElementById("db-and-records-management-container");
const dbFileInput = dbAndRecordsManagementContainer.querySelector("#db-file-input");
const dbUpdateBTN = dbAndRecordsManagementContainer.querySelector("#db-update-btn");
const dbAndRecordsDivMessageEl = dbAndRecordsManagementContainer.querySelector("#message-element");


const logAndMonitContainer = document.getElementById("log-and-monit-container");
const logConsole = logAndMonitContainer.querySelector("#console-output-element");
const logAndMonitContainerMessageEl = logAndMonitContainer.querySelector("#message-element");
const paginationContainer = logAndMonitContainer.querySelector("#pagination-container");

const processManagementContainer = document.getElementById("process-management-container");
const commandConsole = processManagementContainer.querySelector("#console-output-element");
const commandInput = processManagementContainer.querySelector("#command-input");
const commandExecuteBTN = processManagementContainer.querySelector("#command-execute-btn");



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
      return dbAndRecordsDivMessageEl.innerText = "Please select a file. The file must be an SQLite database file.";
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
      
      setTimeout(() => {
        dbAndRecordsDivMessageEl.classList.remove("text-success");
        dbAndRecordsDivMessageEl.classList.add("text-danger");
        dbAndRecordsDivMessageEl.innerText = "Connecting to the server ....";
        
        setTimeout(async () => {
            dbAndRecordsDivMessageEl.classList.remove("text-danger");
            dbAndRecordsDivMessageEl.classList.add("text-success");
            dbAndRecordsDivMessageEl.innerText = "Server restarted required use (CLI) to restart your all instance.";
        }, 1000);
      }, 1000);
    }
  } catch(err) {
    alertBox.classList.remove("d-none");
    alertBox.innerText = "Error: " + err.message;
  }
});



const pageLinks = paginationContainer.querySelectorAll("#page-link");
pageLinks.forEach((pageLink) => {
  pageLink.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      let requestURL = "";
      if (pageLink.innerText === "App Log") {
        requestURL = "/api/v1/super-user/logs?fileName=app.log";
      } else if (pageLink.innerText === "Output Log") {
        requestURL = "/api/v1/super-user/logs?fileName=output.log";
      } else if (pageLink.innerText === "Error Log") {
        requestURL = "/api/v1/super-user/logs?fileName=error.log";
      }
  
      const res = await fetch(requestURL);
      const logContent = await res.text();
      logConsole.innerText = `[ ${pageLink.innerText} ] \n\n${logContent}`;
    } catch(err) {
      logConsole.innerText = `Error: ${err.message}`;
    }
  });
});
pageLinks[0].click();


logAndMonitContainer.querySelector("#clear-log-content-btn").addEventListener("click", async () => {
  try {
    const res = await fetch("/api/v1/super-user/logs/clear", {method: "POST"});
    const data = await res.json();
    if (data.statusCode === 200) {
      logConsole.innerText = data.message;
      return;
    }

    logConsole.innerText = data.message
  } catch(err) {
    logConsole.innerText = err.message;
  }
});



let timeOut = 5000;
let setIntervalId; // To keep track of the interval ID
const timeOutSelectEl = processManagementContainer.querySelector("#time-out");
const monitConsole = processManagementContainer.querySelector("#monit-output-element");

// Function to start the monitoring interval
const startMonitoring = () => {
  // Clear any existing interval to avoid multiple intervals
  if (setIntervalId) clearInterval(setIntervalId);

  // Start a new interval with the updated timeout
  setIntervalId = setInterval(async () => {
    try {
      const res = await fetch("/api/v1/super-user/commands/execute", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          commands: ["npx pm2 list"]
        })
      });
      const data = await res.json();
      monitConsole.innerText = data.output;
    } catch (err) {
      monitConsole.innerText = "Error: All application instances have stopped on the deployed server. No further requests can be processed at this time. Please check the server status and restart the instances to restore functionality.";
      clearInterval(setIntervalId); // Stop monitoring on error
    }
  }, timeOut);
};

// Event listener for changes in timeout selection
timeOutSelectEl.addEventListener("change", () => {
  timeOut = parseInt(timeOutSelectEl.value, 10) || 10000; // Update timeOut, default to 1000 if parsing fails
  startMonitoring(); // Restart the monitoring interval with the new timeout
});

// Initialize by clicking the fourth child element of timeOutSelectEl
timeOutSelectEl.children[3].click();




commandInput.addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    commandExecuteBTN.click();
  }
});


commandExecuteBTN.addEventListener("click", async () => {
  try {
    const commands = commandInput.value.split(",");
    for (let command of commands) {
      if (command === "cls" || command === "clear") {
        commandConsole.innerText = "";
        return;
      }

      const res = await fetch("/api/v1/super-user/commands/execute", {
        headers: { "Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify({
          commands: [command]
        })
      });
      const data = await res.json();
      commandConsole.scrollTop = commandConsole.scrollHeight;
      
      if (data.statusCode === 200) {
        commandConsole.innerText += `\n[Executed Command: ${command} ]\n${data.output}`;
      }

      if (data.statusCode !== 200) {
        commandConsole.innerText += `\n[Executed Command: ${command} ]\n${data.message}`;
      }
    }
  } catch(err) {
    commandConsole.innerText = "Error: All application instances have stopped on the deployed server. No further requests can be processed at this time. Please check the server status and restart the instances to restore functionality.";
    alertBox.classList.remove("d-none");
    alertBox.innerText = "Error: " + err.message;
  }
});