import { describe, expect, test } from "@jest/globals";
import sqlite3 from "../../../backend/src/db/sqlite3";
import path from "path";

const TEST_PATH_FOR_SQLITE3_DB = path.join(__dirname, "../sqlite3/db/");

describe("Update Sql Tests", () => {
  test("Execute update sql without db connection (Except: Error)", async () => {
    try {
      await sqlite3.update("UPDATE TEST SET ID = 2 WHERE ID = 1");
    } catch(err) {
      expect(err.message).toMatch("Database not connected.");
    }
  });

  test("Execute update sql with db connection", async () => {
    await sqlite3.connectAndCreateDatabase(TEST_PATH_FOR_SQLITE3_DB, "database");
    await expect(
      sqlite3.update("UPDATE TEST SET ID = 2 WHERE ID = 1")
    ).resolves.toBeUndefined();
  });

  test("Update sql with params", async () => {
    await expect(
      sqlite3.update("UPDATE TEST SET ID = ? WHERE ID = ?", 1, 1)
    ).resolves.toBeUndefined();
  });

  test("Update sql without params", async () => {
    await expect(
      sqlite3.update("UPDATE TEST SET ID = 1 WHERE ID = 1")
    ).resolves.toBeUndefined();
  })

  test("Check if the data was updated successfully", async () => {
    const data = await sqlite3.select("SELECT * FROM TEST WHERE ID = 2", false);
    expect(data).toEqual({ID: 2});
  })
});