

const contentContainer = document.getElementById("content-container");


async function getDataFromServer() {
  const res = await fetch("/api/v1/records/all",{
    method: "GET"
  });
  const data = await res.json();

  if(data.statusCode == 200) {
    return data.data.records;
  }
  return null;
}



getDataFromServer()