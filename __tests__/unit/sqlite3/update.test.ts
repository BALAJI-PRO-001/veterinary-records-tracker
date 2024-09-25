import { describe, test, expect } from "@jest/globals";
import sqlite3 from "../../../backend/src/db/sqlite3";
import path from "path";

const DB_NOT_CONNECT_ERROR = "Database not connected.";
const TEST_SQLITE3_DB_PATH = path.join(__dirname, "./db/");


describe("UPDATE SQL TEST", () => {
  test("Test 1 (Without db connection)", async () => {
    try {
      await sqlite3.update("UPDATE TEST SET NAME = 'Kumar' WHERE ID = 2");
    } catch(err) {
      expect(err.message).toMatch(DB_NOT_CONNECT_ERROR);
    }
  });

  test("Test 2 (With db connection)", async () => {
    await sqlite3.connectAndCreateDatabase(TEST_SQLITE3_DB_PATH, "database");
    const sql = "UPDATE TEST SET NAME = 'Kumar' WHERE ID = 2";
    expect(sqlite3.update(sql)).resolves.not.toThrow();
  });

  test("Test 3 (Execute wrong sql)", async () => {
    const sql = "UPDATE TEST SET NAME = 'Kumar' WHERE ID = ";
    expect(sqlite3.update(sql)).rejects.toThrow();
  });

  test("Test 4 (Update using params)", async () => {
    const sql = "UPDATE TEST SET NAME = 'Kumar' WHERE ID = ?";
    expect(sqlite3.update(sql, 1)).resolves.toBeUndefined();
  });

  test("Test 5 (Check data was updated successfully)", async () => {
    const res = await sqlite3.select("SELECT NAME FROM TEST WHERE ID = ?", false, 1);
    expect(res).toEqual({NAME: "Kumar"});
    expect(res).not.toBeUndefined();
    expect(res).not.toBeNull();
  });
});