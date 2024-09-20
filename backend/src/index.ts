import sqlite3 from "./db/sqlite3";
import { app, PORT } from "./app";
import { SQLITE3_DATABASE_DIR_PATH } from "./utils/constants";
import queries from "./db/sqlite3/queries";

async function main() {
  try {
    const db = await sqlite3.connectAndCreateDatabase(SQLITE3_DATABASE_DIR_PATH, "database");
    if (db) {
      console.log("Sqlite3 database connected!");
      await sqlite3.createTables(
        queries.CREATE_USERS_TABLE_SQL, 
        queries.CREATE_COWS_TABLE_SQL, 
        queries.CREATE_INJECTION_INFO_AND_AI_DATES_TABLE_SQL
      );

      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}!`);
      });  
    }
  } catch(err: any) {
    console.log(err);
    console.error("Startup Error: " + err.message);
  }
}


main();