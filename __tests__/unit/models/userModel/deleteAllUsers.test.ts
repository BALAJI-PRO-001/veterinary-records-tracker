import sqlite3 from "../../../../backend/src/db/sqlite3";
import User from "../../../../backend/src/models/user.model";
import { describe, test, expect, beforeAll } from "@jest/globals";
import { SQLITE3_DATABASE_DIR_PATH } from "../../../../backend/src/utils/constants";


beforeAll(async () => {
  await sqlite3.connectAndCreateDatabase(SQLITE3_DATABASE_DIR_PATH, "database");
});


describe("DELETE ALL USERS TEST", () => {
  test("Test 1 (Delete All user)", async () => {
    await expect(User.deleteAllUsers()).resolves.not.toThrow();
  });

  test("Test 2 (Check if all user records was deleted)", async () => {
    const users = await User.getAllUsers();
    expect(users.length).toBe(0);
  });
});