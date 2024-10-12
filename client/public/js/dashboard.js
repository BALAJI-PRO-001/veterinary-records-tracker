
const recordCountElement = document.getElementById("record-count");
const alertBox = document.getElementById("alert-box");

async function getRecordsFromServer() {
  try {
    const res = await fetch("/api/v1/records/all");
    const data = await res.json();
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
});