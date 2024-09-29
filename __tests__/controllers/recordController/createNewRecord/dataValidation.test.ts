import request from 'supertest';
import { app } from "../../../../backend/src/app";
import sqlite3 from '../../../../backend/src/db/sqlite3';
import { SQLITE3_DATABASE_DIR_PATH  } from "../../../../backend/src/utils/constants";
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



describe("Record API Tests [ Create New Record ] [ User Data Validation ]", () => {
  test(`Test 1 [ Task: Validate user name ] [ Response: Bad Request 400 ]`, async () => {
    for (let nameDataToTest of data.userDataToTest.nameData.data) {
      const res = await request(app).post("/api/v1/records")
        .send(nameDataToTest)
        .set("Cookie", adminAccessToken!);

      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(data.userDataToTest.nameData.message);
    }
  });



  test(`Test 2 [ Task: Validate phone number ] [ Response: Bad Request 400 ]`, async () => {
    for (let phoneNumberDataToTest of data.userDataToTest.phoneNumberData.data) {
      const res = await request(app).post("/api/v1/records")
        .send(phoneNumberDataToTest)
        .set("Cookie", adminAccessToken!);

      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(data.userDataToTest.phoneNumberData.message);
    }
  });



  test(`Test 3 [ Task: Validate address ] [ Response: Bad Request 400 ]`, async () => {
    for (let addressDataToTest of data.userDataToTest.addressData.data) {
      const res = await request(app).post("/api/v1/records")
        .send(addressDataToTest)
        .set("Cookie", adminAccessToken!);

      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(data.userDataToTest.addressData.message);
    }
  });
});