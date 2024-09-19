import sqlite3 from "./db/sqlite3";
import { app, PROTOCOL, HOST, PORT } from "./app";

async function main() {
  try {
    await sqlite3.connect();
    console.log("Sqlite3 database connected!")
    await sqlite3.createTables();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}!`);
      console.log("URL: " + `${PROTOCOL}://${HOST}:${PORT}/` )
    });
  } catch(err: any) {
    console.error("Startup Error: " + err.message);
  }
}


main();