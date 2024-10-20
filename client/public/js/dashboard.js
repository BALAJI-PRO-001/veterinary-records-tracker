const alertBox = document.getElementById("alert-box");

const dbContainer = document.getElementById("db-container");
const dbInputElement = dbContainer.querySelector("input");
const dbMessageElement = dbContainer.querySelector("#db-message-element");
const serverStatusElement = document.getElementById("server-status-element");
const hardResetBTN = document.getElementById("hard-reset-btn");


dbInputElement.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (file && file.name.split(".").pop() !== "db") {
    dbMessageElement.classList.replace("text-success", "text-danger");
    dbMessageElement.textContent = "You can only upload database files ....";
    return;
  } 

  try {
    const formData = new FormData();
    formData.append("database", file);
    dbMessageElement.classList.replace("text-danger", "text-success");
    dbMessageElement.innerText = "Uploading database ....";

    const res = await fetch("/api/v1/super-user/update/db", {
      method: "PATCH",
      body: formData
    });
    const data = await res.json();
 
    if (data.statusCode === 200) {
      dbMessageElement.innerText = data.message; 
      dbMessageElement.innerText = "Connecting to server ....";

      serverStatusElement.classList.replace("text-success", "text-danger");
      serverStatusElement.innerText = "Deactivated.";

      setTimeout(() => {
        fetch("/").then((res) => {
          if (res.ok) {
            dbMessageElement.classList.replace("text-danger", "text-success");
            dbMessageElement.innerText = "Server restated successfully ....";

            serverStatusElement.classList.replace("text-danger", "text-success");
            serverStatusElement.innerText = "Alive.";

            setTimeout(() => {
              dbMessageElement.innerText = "";
            }, 2500);
          }
        }) 
        .catch((err) => {
          dbMessageElement.classList.replace("text-success", "text-danger");
          dbMessageElement.innerText = "Server restarting failed ....";
          serverStatusElement.classList.replace("text-success", "text-danger");
          serverStatusElement.innerText = "Deactivated.";
        });
      }, 500);
    }
  } catch(err) {
    alertBox.innerText = "Error: " + err.message;
  }
});



hardResetBTN.addEventListener("click", async () => {
  const res = await fetch("/api/v1/super-user/server-actions", {method: "POST"});
});