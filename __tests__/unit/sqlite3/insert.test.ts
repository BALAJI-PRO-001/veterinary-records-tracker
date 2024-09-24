import { describe, expect, test } from "@jest/globals";
import sqlite3 from "../../../backend/src/db/sqlite3";
import path from "path";

const TEST_PATH_FOR_SQLITE3_DB = path.join(__dirname, "../sqlite3/db/");

describe("Insert Sql Tests", () => {
  test("Execute insert sql without db connection (Except: Error)", async () => {
    try {
      await sqlite3.insert("INSERT INTO TEST (ID) VALUES (?)", 1);
    } catch(err) {
      expect(err.message).toMatch("Database not connected.");
    }
  });

  test("Execute insert sql with db connection with params", async () => {
    await sqlite3.connectAndCreateDatabase(TEST_PATH_FOR_SQLITE3_DB, "database");
    await expect(
      sqlite3.insert("INSERT INTO TEST (ID) VALUES (?)", 1)
    ).resolves.toBeUndefined();
  });

  test("Execute insert sql with db connection without params", async () => {
    await sqlite3.connectAndCreateDatabase(TEST_PATH_FOR_SQLITE3_DB, "database");
    await expect(
      sqlite3.insert("INSERT INTO TEST (ID) VALUES (1)")
    ).resolves.toBeUndefined();
  });

  test("Check if the data was inserted correctly", async () => {
    const data = await sqlite3.select("SELECT * FROM TEST", true);
    expect(data).not.toBeUndefined();
    expect(data).not.toBeNull();
  });
});