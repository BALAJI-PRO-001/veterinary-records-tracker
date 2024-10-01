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



describe("Record API Tests [ Get Record By User Id ]", () => {
  const reqParamsTestValues = ["a", null, undefined];
  for (let [index, value] of Object.entries(reqParamsTestValues)) {
    test(`Test ${Number(index) + 1} [ Task: Get record by invalid user id (${value}) ] [ Response: Bad Request 400 ]`, async () => {
      const res = await request(app).get("/api/v1/records/" + value).set("Cookie", adminAccessToken!);
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(`Bad Request: Invalid user id in URL. The id must be a number, but "${value}" provided.`);
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

    expect(res.body.data.record.user).toBeDefined();
    expect(res.body.data.record.user).toBeTruthy();
    expect(res.body.data.record.user.id).toBeDefined();
    expect(res.body.data.record.user.id).toBeTruthy();
    expect(res.body.data.record.user.id).toBeGreaterThanOrEqual(1);
    expect(res.body.data.record.user.name).toBeDefined();
    expect(res.body.data.record.user.name).toBeTruthy();
    expect(res.body.data.record.user.phoneNumber).toBeDefined();
    expect(res.body.data.record.user.phoneNumber).toBeTruthy();
    expect(typeof res.body.data.record.user.phoneNumber === "number").toBeTruthy();
    expect(res.body.data.record.user.address).toBeDefined();
    expect(res.body.data.record.user.address).toBeTruthy();
    expect(res.body.data.record.user.isCurrentUser).toBeDefined();
    expect(res.body.data.record.user.createdAt).toBeDefined();
    expect(res.body.data.record.user.createdAt).toBeTruthy();

    for (let cow of res.body.data.record.cows) {
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

    expect(res.body.data.record.recordCreatedAt).toBeDefined();
    expect(res.body.data.record.recordCreatedAt).toBeTruthy();
  });
});