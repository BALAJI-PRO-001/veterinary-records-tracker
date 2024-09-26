import sqlite3 from "../../../../backend/src/db/sqlite3";
import User from "../../../../backend/src/models/user.model";
import { describe, test, expect, beforeAll } from "@jest/globals";
import { SQLITE3_DATABASE_DIR_PATH } from "../../../../backend/src/utils/constants";


beforeAll(async () => {
  await sqlite3.connectAndCreateDatabase(SQLITE3_DATABASE_DIR_PATH, "database");
});


describe("GET USER RECORD BY PHONE NUMBER TESTS", () => {
  test("Test 1 (Pass invalid phone number)", async () => {
    await expect(User.getUserByPhoneNumber(123)).rejects.toThrow();
  });

  test("Test 2 (Fetch user record using invalid phone number)", async () => {
    const res = await User.getUserByPhoneNumber(1231231239);
    expect(res).toBeNull();
  });

  test("Test 3 (Fetch user record using valid phone number)", async () => {
    const res = await User.getUserByPhoneNumber(1231231233);
    expect(Object.keys(res!)).toEqual(["id", "name", "phoneNumber", "address", "isCurrentUser", "createdAt"]);
    expect(res).not.toBeNull();
  });
});