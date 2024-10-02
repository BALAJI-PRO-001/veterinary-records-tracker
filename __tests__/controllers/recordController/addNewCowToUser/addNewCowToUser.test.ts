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
    password: "<password>"
  });

  adminAccessToken = res.headers["set-cookie"];
});


describe("Record API Tests [ Add New Cow To User ]", () => {
  test("Test 1 [ Task: Add new cow to user ] [ Response: Records Created [ 201 ]", async () => {
    const res = await request(app).post("/api/v1/records/1/cows")
      .send(data.newCowData)
      .set("Cookie", adminAccessToken!);

    expect(res.statusCode).toBe(201);
    expect(res.body.statusCode).toBe(201);
    expect(res.body.success).toBeTruthy();
    expect(res.body.message).toBe("A new cow record successfully created for user id: 1");
  });
});
