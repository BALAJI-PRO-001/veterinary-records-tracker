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



describe("Record API Tests [ Delete All Records ]", () => {
  test("Test 1 [ Task: Delete all records ] [ Response: Empty 204 ]", async () => {
    const res = await request(app).delete("/api/v1/records/all").set("Cookie", adminAccessToken!);
    expect(res.statusCode).toBe(204);
    expect(res.body).toEqual({});
  });
});