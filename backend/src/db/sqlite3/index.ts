import sqlite3 from "sqlite3";
import { SQLITE3_DATABASE_DIR_PATH } from "../../utils/constants";
import fs from "fs/promises";
import queries from "./queries";



async function connect(): Promise<sqlite3.Database> {
  try {
    await fs.access(SQLITE3_DATABASE_DIR_PATH);
  } catch(err) {
    await fs.mkdir(SQLITE3_DATABASE_DIR_PATH);
  }

  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(SQLITE3_DATABASE_DIR_PATH + "database.db", (err) => {
      if (err) {
        reject(new Error("SQLite3 database connection error: " + err.message));
      } else {
        resolve(db);
      }
    });
  });
}



async function createTables(): Promise<void> {
  const db = await connect();
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(queries.CREATE_USERS_TABLE_SQL, (err) => {
        if (err) {
          reject(new Error("Error creating user table: " + err.message));
        }
      });

      db.run(queries.CREATE_COWS_TABLE_SQL, (err) => {
        if (err) {
          reject(new Error("Error creating cows table: " + err.message));
        }
      });

      db.run(queries.CREATE_INJECTION_INFO_AND_AI_DATES_TABLE_SQL, (err) => {
        if (err){
          reject(new Error("Error creating injection info and ai dates table" + err.message))
        }

        resolve();
      });
    });
  });
}



export default {
  connect,
  createTables
};