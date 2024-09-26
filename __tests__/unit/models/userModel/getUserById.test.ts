import sqlite3 from "../../../../backend/src/db/sqlite3";
import User from "../../../../backend/src/models/user.model";
import { describe, test, expect, beforeAll } from "@jest/globals";
import { SQLITE3_DATABASE_DIR_PATH } from "../../../../backend/src/utils/constants";


beforeAll(async () => {
  await sqlite3.connectAndCreateDatabase(SQLITE3_DATABASE_DIR_PATH, "database");
});


describe("GET USER RECORD BY ID TESTS", () => {
  test("Test 1 (Pass negative number)", async () => {
    await expect(User.getUserById(-10000)).rejects.toThrow();
  });

  test("Test 2 (Fetch user record using invalid id)", async () => {
    const user = await User.getUserById(10000);
    expect(user).toBeNull();
  });

  test("Test 3 (Fetch user record using valid id)", async () => {
    const user = await User.getUserById(10);
    expect(Object.keys(user!)).toEqual(["id", "name", "phoneNumber", "address", "isCurrentUser", "createdAt"]);
    expect(user).not.toBeNull();
  });

  test("Test 4 (Random id)", async () => {
    for (let i = 100; i <= 1000; i++) {
      await expect(User.getUserById(i)).resolves.toBeNull();
    }
  });
});