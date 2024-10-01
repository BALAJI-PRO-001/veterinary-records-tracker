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



describe("Record API Tests [ Get Record By User Id ]", () => {
  const reqParamsTestValues = ["a", null, undefined];
  for (let [index, value] of Object.entries(reqParamsTestValues)) {
    test(`Test ${Number(index) + 1} [ Task: Get record by invalid user id (${value}) ] [ Response: Bad Request 400 ]`, async () => {
      const res = await request(app).get("/api/v1/records/" + value).set("Cookie", adminAccessToken!);
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(`Bad Request: Invalid user id in URL. The id must be a number, but '${value}' provided.`);
    });
  }

  test(`Test 4 [ Task: Get record by valid id but record not exists ] [ Response: Record not found 404 ]`, async () => {
    const res = await request(app).get("/api/v1/records/20").set("Cookie", adminAccessToken!);
    expect(res.statusCode).toBe(404);
    expect(res.body.statusCode).toBe(404);
    expect(res.body.success).not.toBeTruthy();
    expect(res.body.message).toBe("Record not found for the specified user id: 20");
  });



  test(`Test 5 [ Task: Get record by valid id record exists ] [ Response: Record 200 ]`, async () => {
    const res = await request(app).get("/api/v1/records/16").set("Cookie", adminAccessToken!);
    expect(res.statusCode).toBe(200);
    expect(res.body.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();

    const userFields = ["id", "name", "phoneNumber", "address", "isCurrentUser", "createdAt"];
    const cowFields = ["id", "name", "breed", "bullName", "injectionInfoAndAiDates", "createdAt"];
    const injectionInfoAndAiDatesFields = ["id", "name", "cost", "date"];
 
    for (let field of userFields) {
      expect(res.body.data.record.user[field]).toBeDefined();
      expect(res.body.data.record.user[field]).toBeTruthy();
      expect(res.body.data.record.user[field]).not.toBeNull();

      if (field === "id") {
        expect(res.body.data.record.user[field]).toBeGreaterThanOrEqual(1);
      }

      if (field === "phoneNumber") {
        expect(typeof res.body.data.record.user[field] === "number").toBeTruthy();
      }
    }


    for (let cow of res.body.data.record.cows) {
      for (let field of cowFields) {
        expect(cow[field]).toBeDefined();
        expect(cow[field]).toBeTruthy();
        expect(cow[field]).not.toBeNull();
      }

      for (let injectionInfoAndAiDates of cow.injectionInfoAndAiDates) {
        for (let field of injectionInfoAndAiDatesFields) {
          expect(injectionInfoAndAiDates[field]).toBeDefined();
          expect(injectionInfoAndAiDates[field]).toBeTruthy();
          expect(injectionInfoAndAiDates[field]).not.toBeNull();

          if (field === "cost") {
            expect(typeof injectionInfoAndAiDates[field] === "number").toBeTruthy();
          }
        }
      }
    }

    expect(res.body.data.record.recordCreatedAt).toBeDefined();
    expect(res.body.data.record.recordCreatedAt).toBeTruthy();
  });
});

