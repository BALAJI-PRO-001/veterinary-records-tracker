import { describe, test, expect } from "@jest/globals";
import sqlite3 from "../../../backend/src/db/sqlite3";
import path from "path";

const DB_NOT_CONNECT_ERROR = "Database not connected.";
const TEST_SQLITE3_DB_PATH = path.join(__dirname, "./db/");


describe("SELECT SQL TESTS", () => {
  test("Test 1 (Without db connection)", async () => {
    try {
      await sqlite3.select("SELECT * FROM TEST", true);
    } catch(err) {
      expect(err.message).toMatch(DB_NOT_CONNECT_ERROR);
    }
  });

  test("Test 2 (With db connection)", async () => {
    await sqlite3.connectAndCreateDatabase(TEST_SQLITE3_DB_PATH, "database");
    const res = await sqlite3.select("SELECT * FROM TEST", true);
    expect(res).not.toBeUndefined();
    expect(res).not.toBeNull();
  });

  test("Test 3 (Execute wrong sql)", async () => {
    const sql = "SELECT * FROM ";
    await expect(sqlite3.select(sql, true)).rejects.toThrow();
  });

  test("Test 4 (Select all records from db)", async () => {
    const res = await sqlite3.select("SELECT * FROM TEST", true) as Array<Object>;
    expect(res.length).not.toBe(0);
    expect(res.length).toBeGreaterThan(0);
    expect(res.length).toBeGreaterThanOrEqual(1);
    expect(res).not.toBeUndefined();
    expect(res).not.toBeNull();
  });

  test("Test 5 (Select single record using params)", async () => {
    const sql = "SELECT * FROM TEST WHERE ID = ?";
    const res = await sqlite3.select(sql, false, 1) as Array<Object>;
    expect(res).not.toBeUndefined();
    expect(res).not.toBeNull();
  });

  test("Test 5 (Select unknown record)", async () => {
    const sql = "SELECT * FROM TEST WHERE ID = ?";
    const res = await sqlite3.select(sql, false, 10) as Array<Object>;
    expect(res).toBeUndefined();
    expect(res).not.toBeNull();
  });
});