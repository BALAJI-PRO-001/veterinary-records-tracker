import sqlite3 from "../../../../backend/src/db/sqlite3";
import User from "../../../../backend/src/models/user.model";
import { describe, test, expect, beforeAll } from "@jest/globals";
import { SQLITE3_DATABASE_DIR_PATH } from "../../../../backend/src/utils/constants";


beforeAll(async () => {
  await sqlite3.connectAndCreateDatabase(SQLITE3_DATABASE_DIR_PATH, "database");
});


describe("GET ALL USERS TESTS", () => {
  test("Test 1 (Check if method throw any error)", async () => {
    await expect(User.getAllUsers()).resolves.not.toThrow();
  });

  test("Test 2 (Fetch all user records)", async () => {
    const users = await User.getAllUsers();
    expect(users.length).toBeGreaterThan(0);
    expect(users).not.toBeNull();
    expect(users).not.toBeUndefined();
  });
});