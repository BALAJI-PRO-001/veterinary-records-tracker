import { describe, test, expect } from "@jest/globals";
import sqlite3 from "../../../backend/src/db/sqlite3";
import fs from "fs/promises";
import path from "path";

const TEST_SQLITE3_DB_PATH = path.join(__dirname, "./db/");

describe("SQLITE3 CONNECTION TESTS", () => {
  test("Test 1 (Create db and connect)", async () => {
    const db = await sqlite3.connectAndCreateDatabase(TEST_SQLITE3_DB_PATH, "database");
    expect(db).not.toBeNull();
    expect(db).not.toBeUndefined();
    expect(db).toBeDefined();
    await expect(fs.access(TEST_SQLITE3_DB_PATH + "database.db"))
      .resolves.not.toThrow();
  })
});