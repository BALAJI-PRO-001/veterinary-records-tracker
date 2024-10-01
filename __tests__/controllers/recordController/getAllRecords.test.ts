import request from 'supertest';
import sqlite3 from '../../../backend/src/db/sqlite3';
import { SQLITE3_DATABASE_DIR_PATH } from "../../../backend/src/utils/constants";
import { app } from "../../../backend/src/app";


let adminAccessToken: string | null = null;

beforeAll(async () => {
  await sqlite3.connectAndCreateDatabase(SQLITE3_DATABASE_DIR_PATH, "database");

  const res = await request(app).post("/api/v1/admin/login").send({
    email: process.env.ADMIN_EMAIL,
    password: "Admin@1234"
  });

  adminAccessToken = res.headers["set-cookie"];
});



describe("Record API Tests [ Get All Records ]", () => {
  test("Test 1 [ Task: Get all records ] [ Response: All records 200 ]", async () => {
    const res = await request(app).get("/api/v1/records/all").set("Cookie", adminAccessToken!);
    expect(res.statusCode).toBe(200);
    expect(res.body.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();

    for (let record of res.body.data.records) {
      expect(record.user).toBeDefined();
      expect(record.user).toBeTruthy();
      expect(record.user.id).toBeDefined();
      expect(record.user.id).toBeTruthy();
      expect(record.user.id).toBeGreaterThanOrEqual(1);
      expect(record.user.name).toBeDefined();
      expect(record.user.name).toBeTruthy();
      expect(record.user.phoneNumber).toBeDefined();
      expect(record.user.phoneNumber).toBeTruthy();
      expect(typeof record.user.phoneNumber === "number").toBeTruthy();
      expect(record.user.address).toBeDefined();
      expect(record.user.address).toBeTruthy();
      expect(record.user.isCurrentUser).toBeDefined();
      expect(record.user.createdAt).toBeDefined();
      expect(record.user.createdAt).toBeTruthy();


      for (let cow of record.cows) {
        expect(cow.id).toBeDefined();
        expect(cow.id).toBeGreaterThanOrEqual(1);
        expect(cow.name).toBeDefined();
        expect(cow.name).toBeTruthy();
        expect(cow.breed).toBeDefined();
        expect(cow.breed).toBeTruthy();
        expect(cow.bullName).toBeDefined();
        expect(cow.bullName).toBeTruthy();
        expect(cow.injectionInfoAndAiDates).toBeDefined();
        expect(cow.injectionInfoAndAiDates).toBeTruthy();
        expect(cow.createdAt).toBeDefined();
        expect(cow.createdAt).toBeTruthy();


        for (let {id, name, cost, date} of cow.injectionInfoAndAiDates) {
          expect(id).toBeDefined();
          expect(id).toBeGreaterThanOrEqual(1);
          expect(name).toBeDefined();
          expect(name).toBeTruthy();
          expect(cost).toBeTruthy();
          expect(typeof cost === "number").toBeTruthy();
          expect(cost).toBeTruthy();
          expect(date).toBeDefined();
          expect(date).toBeTruthy();
        }
      }

      expect(record.recordCreatedAt).toBeDefined();
      expect(record.recordCreatedAt).toBeTruthy();
    }
  });
});


