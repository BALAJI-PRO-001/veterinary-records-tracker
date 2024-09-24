import { describe, expect, test } from "@jest/globals";
import sqlite3 from "../../../backend/src/db/sqlite3";
import path from "path";

const TEST_PATH_FOR_SQLITE3_DB = path.join(__dirname, "../sqlite3/db/");

describe("Delete Sql Tests", () => {
  test("Execute delete sql without db connection (Except: Error)", async () => {
    try {
      await sqlite3.delete("DELETE * FROM TEST WHERE ID = 1");
    } catch(err) {
      expect(err.message).toMatch("Database not connected.");
    }
  });

  test("Execute delete sql with db connection", async () => {
    await sqlite3.connectAndCreateDatabase(TEST_PATH_FOR_SQLITE3_DB, "database");
    await expect(
      sqlite3.delete("DELETE FROM TEST WHERE ID = 2")
    ).resolves.toBeUndefined();
  });

  test("Delete sql with params", async () => {
    await expect(
      sqlite3.delete("DELETE FROM TEST WHERE ID = ?", 2)
    ).resolves.toBeUndefined();
  });

  test("Delete sql without params", async () => {
    await expect(
      sqlite3.delete("DELETE FROM TEST WHERE ID = 2")
    ).resolves.toBeUndefined();
  });

  test("Check if the data was deleted successfully", async () => {
    const data = await sqlite3.select("SELECT * FROM TEST", true);
    expect(data).toEqual([]);
  });
});
