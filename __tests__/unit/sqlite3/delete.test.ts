import { describe, test, expect } from "@jest/globals";
import sqlite3 from "../../../backend/src/db/sqlite3";
import path from "path";

const DB_NOT_CONNECT_ERROR = "Database not connected.";
const TEST_SQLITE3_DB_PATH = path.join(__dirname, "./db/");



describe("DELETE SQL TEST", () => {
  test("Test 1 (Without db connection)", async () => {
    try {
      await sqlite3.delete("DELETE FROM TEST WHERE ID = 3");
    } catch(err) {
      expect(err.message).toMatch(DB_NOT_CONNECT_ERROR);
    }
  });

  test("Test 2 (With db connection)", async () => {
    await sqlite3.connectAndCreateDatabase(TEST_SQLITE3_DB_PATH, "database");
    const sql = "DELETE FROM TEST WHERE ID = 3";
    await expect(sqlite3.delete(sql)).resolves.toBeUndefined();
  });

  test("Test 3 (Execute wrong sql)", async () => {
    const sql = "DELETE FROM TEST WHERE ID = ";
    await expect(sqlite3.delete(sql)).rejects.toThrow();
  });

  test("Test 4 (Delete single record using params)", async () => {
    const sql = "DELETE FROM TEST WHERE ID = ?";
    await expect(sqlite3.delete(sql, 1)).resolves.toBeUndefined();
    const res = await sqlite3.select("SELECT * FROM TEST WHERE ID = 1", false);
    expect(res).toBeUndefined();
  });

  test("Test 4 (Delete all records)", async () => {
    const sql = "DELETE FROM TEST";
    await expect(sqlite3.delete(sql)).resolves.toBeUndefined();
    const res = await sqlite3.select("SELECT * FROM TEST", true) as Array<Object>;
    expect(res.length).toBe(0);
  });
});