import { describe, test, expect } from "@jest/globals";
import sqlite3 from "../../../backend/src/db/sqlite3";
import path from "path";

const DB_NOT_CONNECT_ERROR = "Database not connected.";
const TEST_SQLITE3_DB_PATH = path.join(__dirname, "./db/");

describe("CREATE TABLE SQL TESTS", () => {
  test("Test 1 (Without db connection)", async () => {
    try {
      const sql = "CREATE TABLE TEST (ID INT, NAME VARCHAR(50), EMAIL VARCHAR(50), PASSWORD VARCHAR(50)";
      await sqlite3.createTables(sql);
    } catch(err) {
      expect(err.message).toMatch(DB_NOT_CONNECT_ERROR)
    }
  });

  test("Test 2 (With db connection)", async () => {
    await sqlite3.connectAndCreateDatabase(TEST_SQLITE3_DB_PATH, "database");
    const sql = "CREATE TABLE IF NOT EXISTS TEST (ID INT, NAME VARCHAR(50), EMAIL VARCHAR(50), PASSWORD VARCHAR(50))";
    await expect(sqlite3.createTables(sql)).resolves.toBeUndefined();
  });

  test("Test 3 (Check if table is created successfully)", async () => {
    const res = await sqlite3.select("SELECT name FROM sqlite_master WHERE type = 'table'", false);
    expect(res).toEqual({name: "TEST"});
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
  });
});