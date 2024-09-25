import { describe, test, expect } from "@jest/globals";
import sqlite3 from "../../../backend/src/db/sqlite3";
import path from "path";

const DB_NOT_CONNECT_ERROR = "Database not connected.";
const TEST_SQLITE3_DB_PATH = path.join(__dirname, "./db/");

describe("INSERT SQL TESTS", () => {
  test("Test 1 (Without db connection)", async () => {
    try {
      await sqlite3.insert("INSERT INTO TEST (ID, NAME, EMAIL, PASSWORD) VALUES (1, 'Ram', 'ram@gmail.com', 'ram@1234'");
    } catch(err) {
      expect(err.message).toMatch(DB_NOT_CONNECT_ERROR);
    }
  });

  test("Test 2 (With db connection)", async () => {
    await sqlite3.connectAndCreateDatabase(TEST_SQLITE3_DB_PATH, "database");
    await expect(
      sqlite3.insert("INSERT INTO TEST (ID, NAME, EMAIL, PASSWORD) VALUES (1, 'Ram', 'ram@gmail.com', 'ram@1234')")
    ).resolves.not.toThrow();
  });

  test("Test 3 (Check if data was inserted successfully)", async () => {
    const res = await sqlite3.select("SELECT * FROM TEST WHERE ID = 1", false);
    expect(res).toEqual({ ID: 1, NAME: 'Ram', EMAIL: 'ram@gmail.com', PASSWORD: 'ram@1234'});
    expect(res).not.toBeUndefined();
    expect(res).not.toBeNull();
  });

  test("Test 4 (Execute wrong sql)", async () => {
    const sql = "INSERT INTO TEST (ID, NAME, )";
    await expect(sqlite3.insert(sql)).rejects.toThrow();
  });

  test("Test 5 (Insert data using params)", async () => {
    const sql = "INSERT INTO TEST (ID, NAME, EMAIL, PASSWORD) VALUES (?, ?, ?, ?)";
    await expect(sqlite3.insert(sql, 2, "Sam", "sam@gmail.com", "sam@#$")).resolves.not.toThrow();
  });
});