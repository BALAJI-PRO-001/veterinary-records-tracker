import sqlite3 from "../../../../backend/src/db/sqlite3";
import User from "../../../../backend/src/models/user.model";
import { describe, test, expect, beforeAll } from "@jest/globals";
import { SQLITE3_DATABASE_DIR_PATH } from "../../../../backend/src/utils/constants";


beforeAll(async () => {
  await sqlite3.connectAndCreateDatabase(SQLITE3_DATABASE_DIR_PATH, "database");
});


describe("ADD NEW USER FUNCTION TESTS", () => {
  test("Test 1 (Try to insert wrong phoneNumber)", async () => {
    const user = {name: "Ram", phoneNumber: 123123123, address: "address"};
    await expect(User.addNewUser(user)).rejects.toThrow();
  });

  test("Test 2 (Insert correct values)", async () => {
    const createdUser = await User.addNewUser({name: "Ram", phoneNumber: 1231231236, address: "address"});
    expect(Object.keys(createdUser)).toEqual(["id", "name", "phoneNumber", "address", "isCurrentUser", "createdAt"]);
    expect(createdUser).not.toBeUndefined();
    expect(createdUser).not.toBeNull();
  });

  test("Test 3 (Insert duplicate phone number)", async () => {
    await expect(User.addNewUser({name: "Ram", phoneNumber: 1231231236, address: "address"}))
      .rejects.toThrow();
  });
});