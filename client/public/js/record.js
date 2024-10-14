
async function getRecordFromServer(id) {
  const res = await fetch(`/api/v1/records/${id}`);
  const data = await res.json();
  if (data.statusCode === 200) {
    return data.data.record;
  }
}

