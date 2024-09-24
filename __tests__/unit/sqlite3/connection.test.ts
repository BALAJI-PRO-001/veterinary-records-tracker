import { describe, expect, test } from "@jest/globals";
import sqlite3 from "../../../backend/src/db/sqlite3";
import path from "path";

const TEST_PATH_FOR_SQLITE3_DB = path.join(__dirname, "../sqlite3/db/");

describe("Database Tests", () => {
  test("Create database and make connection", async  () => {
    await expect(
      sqlite3.connectAndCreateDatabase(TEST_PATH_FOR_SQLITE3_DB, "database")
    ).resolves.not.toBeNull();
  });

  test("Execute Table Sql", async () => {
    await expect(
      sqlite3.createTables("CREATE TABLE IF NOT EXISTS TEST (ID INT)")
    ).resolves.toBeUndefined();
  });

  test("Check if table created successfully", async () => {
    const response = await sqlite3.select("SELECT NAME FROM SQLITE_MASTER WHERE TYPE = 'table'", false);
    expect(response).toEqual({name: "TEST"});
  });
});