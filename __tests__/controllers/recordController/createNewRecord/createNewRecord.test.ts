import request from 'supertest';
import { app } from "../../../../backend/src/app";
import sqlite3 from '../../../../backend/src/db/sqlite3';
import data from "./data";
import { SQLITE3_DATABASE_DIR_PATH  } from "../../../../backend/src/utils/constants";


let adminAccessToken: string | null = null;

beforeAll(async () => {
  await sqlite3.connectAndCreateDatabase(SQLITE3_DATABASE_DIR_PATH, "database");

  const res = await request(app).post("/api/v1/admin/login").send({
    email: process.env.ADMIN_EMAIL,
    password: "Admin@1234"
  });

  adminAccessToken = res.headers["set-cookie"];
});



describe("Record API Tests [ Create New Record ]", () => {
  test("Test 1 [ Task: Insert invalid phone number ]", async () => {
    const res = await request(app).post("/api/v1/records")
      .send(data.newRecordDataToTest[0].data)
      .set("Cookie", adminAccessToken!);

    expect(res.statusCode).toBe(400);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.success).not.toBeTruthy();
    expect(res.body.message).toBe(data.newRecordDataToTest[0].message);
  });



  test.skip("Test 2 [ Task: Create new record with valid data ]", async () => {
    const res = await request(app).post("/api/v1/records")
      .send(data.newRecordDataToTest[1].data)
      .set("Cookie", adminAccessToken!);

    expect(res.statusCode).toBe(201);
    expect(res.body.statusCode).toBe(201);
    expect(res.body.success).toBeTruthy();
    expect(res.body.message).toBe(data.newRecordDataToTest[1].message);
  });



  test("Test 3 [ Task: Insert duplicate phone number ]", async () => {
    const res = await request(app).post("/api/v1/records")
      .send(data.newRecordDataToTest[1].data)
      .set("Cookie", adminAccessToken!);

    expect(res.statusCode).toBe(409);
    expect(res.body.statusCode).toBe(409);
    expect(res.body.success).not.toBeTruthy();
    expect(res.body.message).toBe("Duplicate Key: Phone number is already in use by another record.");
  });
});
