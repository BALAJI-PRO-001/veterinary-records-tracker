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
  const requestParamsToTest = ["a", null, undefined];
  test("Test 1 [ Task: Crate a new cow record with invalid user id ] [ Response: Bad Request 400 ]", async () => {
    for (let value of requestParamsToTest) {
      const res = await request(app).post(`/api/v1/records/${value}/cows`).set("Cookie", adminAccessToken!);
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(`Bad Request: Invalid user id in URL. The id must be a number, but '${value}' provided.`);  
    }
  });



  test("Test 2 [ Task: User valid user id but record not exists ] [ Response: Record not found 404 ]", async () => {
    const res = await request(app).post("/api/v1/records/100/cows").set("Cookie", adminAccessToken!);
    expect(res.statusCode).toBe(404);
    expect(res.body.statusCode).toBe(404);
    expect(res.body.success).not.toBeTruthy();
    expect(res.body.message).toBe("User record not found for the specified user id: 100");
  });



  test("Test 3 [ Task: Validate cow data ] [ Response: Bad Request 400 ]", async () => {
    for (let cowDataToTest of data.cowDataToTest) {
      const res = await request(app).post("/api/v1/records/1/cows")
        .send(cowDataToTest.data)
        .set("Cookie", adminAccessToken!);
      
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(cowDataToTest.message);
    }
  });
});