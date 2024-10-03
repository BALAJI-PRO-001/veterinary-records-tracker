import request from 'supertest';
import sqlite3 from '../../../../backend/src/db/sqlite3';
import { SQLITE3_DATABASE_DIR_PATH } from "../../../../backend/src/utils/constants";
import { app } from "../../../../backend/src/app";
import data from './data';


let adminAccessToken: string | null = null;

beforeAll(async () => {
  await sqlite3.connectAndCreateDatabase(SQLITE3_DATABASE_DIR_PATH, "database");

  const res = await request(app).post("/api/v1/admin/login").send({
    email: process.env.ADMIN_EMAIL,
    password: "Admin@1234"
  });

  adminAccessToken = res.headers["set-cookie"];
});



describe("Record API Tests [ Add New Injection Info And Ai Dates To Cow ]", () => {
  test("Test 1 [ Task: Insert invalid cost data ]", async () => {
    const res = await request(app).post("/api/v1/records/1/cows/3/inject-info-ai-dates")
      .send(data.newInjectionInfoAndAiDatesData[0].data)
      .set("Cookie", adminAccessToken!);

    expect(res.statusCode).toBe(400);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.success).not.toBeTruthy();
    expect(res.body.message).toBe(data.newInjectionInfoAndAiDatesData[0].message);
  });


  test("Test 2 [ Task: Insert valid injection info and ai dates ]", async () => {
    const res = await request(app).post("/api/v1/records/1/cows/3/inject-info-ai-dates")
      .send(data.newInjectionInfoAndAiDatesData[1].data)
      .set("Cookie", adminAccessToken!);

    console.log(res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body.statusCode).toBe(201);
    expect(res.body.success).toBeTruthy();
    expect(res.body.message).toBe(data.newInjectionInfoAndAiDatesData[1].message);
  });
});