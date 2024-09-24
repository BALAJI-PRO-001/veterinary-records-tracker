import { describe, expect, test } from "@jest/globals";
import sqlite3 from "../../../backend/src/db/sqlite3";
import path from "path";

const TEST_PATH_FOR_SQLITE3_DB = path.join(__dirname, "../sqlite3/db/");

describe("Select Sql Tests", () => {
  test("Execute select sql without db connection (Except: Error)", async () => {
    try {
      await sqlite3.select("SELECT * FROM TEST", true);
    } catch(err) {
      expect(err.message).toMatch("Database not connected.")
    }
  });

  test("Execute select sql with db connection", async () => {
    await sqlite3.connectAndCreateDatabase(TEST_PATH_FOR_SQLITE3_DB, "database");
    const data = await sqlite3.select("SELECT * FROM TEST", true);
    expect(data).not.toBeUndefined();
    expect(data).not.toBeNull();
  })


  test("Fetch single record from db with params", async () => {
    const data = await sqlite3.select("SELECT * FROM TEST WHERE ID = ?", false, 1);
    expect(data).toEqual({ID: 1});
  })

  test("Fetch single record from db without params", async () => {
    const data = await sqlite3.select("SELECT * FROM TEST WHERE ID = 1", false);
    expect(data).toEqual({ID: 1});
  })

  test("Fetch one more record from db with params", async () => {
    const data = await sqlite3.select("SELECT * FROM TEST WHERE ID = ?", false, 1);
    expect(data).not.toBeUndefined();
    expect(data).not.toBeNull();
  })

  test("Fetch one more record from db without params", async () => {
    const data = await sqlite3.select("SELECT * FROM TEST WHERE ID = 1", false);
    expect(data).not.toBeUndefined();
    expect(data).not.toBeNull();
  })
});