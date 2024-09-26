import sqlite3 from "../../../../backend/src/db/sqlite3";
import User from "../../../../backend/src/models/user.model";
import { describe, test, expect, beforeAll } from "@jest/globals";
import { SQLITE3_DATABASE_DIR_PATH } from "../../../../backend/src/utils/constants";


beforeAll(async () => {
  await sqlite3.connectAndCreateDatabase(SQLITE3_DATABASE_DIR_PATH, "database");
});


describe("UPDATE USER BY ID TESTS", () => {
  test("Test 1 (Pass negative id)", async () => {
    await expect(User.updateUserById(-10, {})).rejects.toThrow();
  });

  test("Test 2 (Pass empty object)", async () => {
    await User.updateUserById(1, {name: "Balaji"});
  });
});