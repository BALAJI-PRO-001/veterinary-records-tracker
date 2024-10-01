import request from 'supertest';
import sqlite3 from '../../../backend/src/db/sqlite3';
import { SQLITE3_DATABASE_DIR_PATH } from "../../../backend/src/utils/constants";
import { app } from "../../../backend/src/app";


let adminAccessToken: string | null = null;

beforeAll(async () => {
  await sqlite3.connectAndCreateDatabase(SQLITE3_DATABASE_DIR_PATH, "database");

  const res = await request(app).post("/api/v1/admin/login").send({
    email: process.env.ADMIN_EMAIL,
    password: "<password>"
  });

  adminAccessToken = res.headers["set-cookie"];
});



describe("Record API Tests [ Get All Records ]", () => {
  test("Test 1 [ Task: Get all records ] [ Response: All records 200 ]", async () => {
    const res = await request(app).get("/api/v1/records/all").set("Cookie", adminAccessToken!);
    expect(res.statusCode).toBe(200);
    expect(res.body.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();

    const userFields = ["id", "name", "phoneNumber", "address", "isCurrentUser", "createdAt"];
    const cowFields = ["id", "name", "breed", "bullName", "injectionInfoAndAiDates", "createdAt"];
    const injectionInfoAndAiDatesFields = ["id", "name", "cost", "date"];

    for (let record of res.body.data.records) {
      expect(record.user).toBeDefined();
      expect(record.user).toBeTruthy();
      expect(record.user).not.toBeNull();
      expect(record.cows).toBeDefined();
      expect(record.cows).toBeTruthy();
      expect(record.cows).not.toBeNull()

      for (let field of userFields) {
        expect(record.user[field]).toBeDefined();
        expect(record.user[field]).toBeTruthy();
        expect(record.user[field]).not.toBeNull();

        if (field === "id") {
          expect(record.user[field]).toBeGreaterThanOrEqual(1);
        }

        if (field === "phoneNumber") {
          expect(typeof record.user[field] === "number").toBeTruthy();
        }
      }


      for (let cow of record.cows) {
        for (let field of cowFields) {
          expect(cow[field]).toBeDefined();
          expect(cow[field]).toBeTruthy();
          expect(cow[field]).not.toBeNull();
        }


        expect(cow.injectionInfoAndAiDates).toBeDefined();
        expect(cow.injectionInfoAndAiDates).toBeTruthy();
        expect(cow.injectionInfoAndAiDates).not.toBeNull();

        for (let injectionInfoAndAiDates of cow.injectionInfoAndAiDates) {
          for (let filed of injectionInfoAndAiDatesFields) {
            expect(injectionInfoAndAiDates[filed]).toBeDefined();
            expect(injectionInfoAndAiDates[filed]).toBeTruthy();
            expect(injectionInfoAndAiDates[filed]).not.toBeNull();
  
            if (filed === "id") {
              expect(injectionInfoAndAiDates[filed]).toBeGreaterThanOrEqual(1);
            }
  
            if (filed === "cost") {
              expect(typeof injectionInfoAndAiDates[filed] === "number").toBeTruthy();
            }
          }
        }
      }

      expect(record.recordCreatedAt).toBeDefined();
      expect(record.recordCreatedAt).toBeTruthy();
    }
  });
});


