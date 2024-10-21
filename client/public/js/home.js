


const contentContainer = document.getElementById("content-container");

async function getRecordsFromServer() {
  const res = await fetch("/api/v1/records/all",{
    method: "GET"
  });
  const data = await res.json();

  if(data.statusCode == 200) {
    return data.data.records;
  }
  return null;
}

async function showData(userRecords) {

  const datas = await userRecords;
  contentContainer.innerText = "";
  datas.forEach((data) => {
    console.log(data);
  })

}

showData(getRecordsFromServer());