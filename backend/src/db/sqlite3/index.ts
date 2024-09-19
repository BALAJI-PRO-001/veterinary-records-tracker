import sqlite3 from "sqlite3";
import { SQLITE3_DATABASE_PATH } from "../../utils/constants";

function connect(): Promise<sqlite3.Database> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(SQLITE3_DATABASE_PATH, (err) => {
      if (err) {
        reject(new Error("SQLite3 database connection error: " + err.message));
      } else {
        resolve(db);
      }
    });
  });
}