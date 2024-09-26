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
    await expect(User.updateUserById(1, {})).rejects.toThrow();
  });

  test("Test 3 (Update single field only)", async () => {
    const updatedUser = await User.updateUserById(13, {name: "Ram"});
    expect(updatedUser.name).toBe("Ram");
    expect(updatedUser).not.toBeNull();
    expect(updatedUser).not.toBeUndefined();
  });

  test("Test 4 (Update duplicate phone number)", async () => {
    await expect(User.updateUserById(13, {phoneNumber: 1912412335})).rejects.toThrow();
  });

  test("Test 5 (Update duplicate phone number)", async () => {
    const updatedUser = await User.updateUserById(13, {
      name: "Ram",
      phoneNumber: 1231231233,
      address: "address"
    });

    expect({name: updatedUser.name, phoneNumber: updatedUser.phoneNumber, address: updatedUser.address}).toEqual({
      name: "Ram",
      phoneNumber: 1231231233,
      address: "address"
    });
    expect(updatedUser).not.toBeUndefined();
    expect(updatedUser).not.toBeNull();
  });
});