
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
          try {
            await fetch("/api/v1/super-user/server/status");
            dbAndRecordsDivMessageEl.classList.remove("text-danger");
            dbAndRecordsDivMessageEl.classList.add("text-success");
            dbAndRecordsDivMessageEl.innerText = "Server restarted successfully.";
            return setTimeout(() => {
              dbAndRecordsDivMessageEl.innerText = "";
            }, 1000);
          } catch(err) {
            dbAndRecordsDivMessageEl.classList.remove("text-success");
            dbAndRecordsDivMessageEl.classList.add("text-danger");
            dbAndRecordsDivMessageEl.innerText = "Server restart failed. You cannot make further requests to the server. Please check the deployed machine.";
          }
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




// Monit Process every 1s.
setInterval(async () => {
  try {
    const res = await fetch("/api/v1/super-user/commands/execute", {
      headers: { "Content-Type": "application/json"},
      method: "POST",
      body: JSON.stringify({
        commands: ["npx pm2 list"]
      })
    });
    const data = await res.json();
    processManagementContainer.querySelector("#monit-output-element").innerText = data.output;
  } catch(err) {
    
  }
}, 1000);




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
    alertBox.classList.remove("d-none");
    alertBox.innerText = "Error: " + err.message;
  }
});