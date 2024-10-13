import { extractCowInformation } from "./utils/common.js";

const alertBox = document.getElementById("alert-box");

const dbContainer = document.getElementById("db-container");
const dbInputElement = dbContainer.querySelector("input");
const dbMessageElement = dbContainer.querySelector("#db-message-element");



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
      dbMessageElement.innerText = "Checking ....";

      setTimeout(() => {
        fetch("/").then((res) => {
          if (res.ok) {
            dbMessageElement.classList.replace("text-danger", "text-success");
            dbMessageElement.innerText = "Server restated successfully ...."

            setTimeout(() => {
              dbMessageElement.innerText = "";
            }, 2500);
          }
        }) 
        .catch((err) => {
          dbMessageElement.classList.replace("text-success", "text-danger");
          dbMessageElement.innerText = "Server restarting failed ....";
        });
      }, 500);
    }
  } catch(err) {
    alertBox.innerText = "Error: " + err.message;
  }
});