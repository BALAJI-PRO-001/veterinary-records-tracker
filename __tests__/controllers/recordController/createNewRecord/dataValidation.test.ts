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
    password: "<password>"
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





describe("Record API Tests [ Create New Record ] [ Cow Data Validation ]", () => {
  test(`Test 1 [ Task: Invalid cow data ] [ Response: Bad Request 400 ]`, async () => {
  const res = await request(app).post("/api/v1/records")
    .send({user: {name: "<name>", phoneNumber: 123, address: "<address>"}, cows: []})
    .set("Cookie", adminAccessToken!);

  expect(res.statusCode).toBe(400);
  expect(res.body.statusCode).toBe(400);
  expect(res.body.success).not.toBeTruthy();
  expect(res.body.message).toBe("Bad Request: Cows data must contain at least one cow entry.");
  });



  test(`Test 2 [ Task: Validate cow name ] [ Response: Bad Request 400 ]`, async () => {
    for (let nameDataToTest of data.cowDataToTest.nameData.data) {
      const res = await request(app).post("/api/v1/records")
        .send(nameDataToTest)
        .set("Cookie", adminAccessToken!);

      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(data.cowDataToTest.nameData.message);
    }
  });



  test(`Test 3 [ Task: Validate cow breed ] [ Response: Bad Request 400 ]`, async () => {
    for (let breedDataToTest of data.cowDataToTest.breedData.data) {
      const res = await request(app).post("/api/v1/records")
        .send(breedDataToTest)
        .set("Cookie", adminAccessToken!);

      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(data.cowDataToTest.breedData.message);
    }
  });



  test(`Test 4 [ Task: Validate cow bull name ] [ Response: Bad Request 400 ]`, async () => {
    for (let bullNameDataToTest of data.cowDataToTest.bullNameData.data) {
      const res = await request(app).post("/api/v1/records")
        .send(bullNameDataToTest)
        .set("Cookie", adminAccessToken!);

      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(data.cowDataToTest.bullNameData.message);
    }
  });



  test(`Test 5 [ Task: Validate cow injection info and ai dates ] [ Response: Bad Request 400 ]`, async () => {
    for (let injectionInfoAndAiDatesDataToTest of data.cowDataToTest.injectionInfoAndAiDates.data[0]) {
      const res = await request(app).post("/api/v1/records")
        .send(injectionInfoAndAiDatesDataToTest)
        .set("Cookie", adminAccessToken!);

      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(data.cowDataToTest.injectionInfoAndAiDates.message[0]);
    }
  });



  test(`Test 6 [ Task: Invalid injection info and ai dates ] [ Response: Bad Request 400 ]`, async () => {
    const res = await request(app).post("/api/v1/records")
      .send(data.cowDataToTest.injectionInfoAndAiDates.data[1][0])
      .set("Cookie", adminAccessToken!);

    expect(res.statusCode).toBe(400);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.success).not.toBeTruthy();
    expect(res.body.message).toBe(data.cowDataToTest.injectionInfoAndAiDates.message[1]);
  });



  test(`Test 7 [ Task: Validate cow injection info and ai dates (name) ] [ Response: Bad Request 400 ]`, async () => {
    for (let nameDataToTest of data.cowDataToTest.injectionInfoAndAiDates.data[2]) {
      const res = await request(app).post("/api/v1/records")
        .send(nameDataToTest)
        .set("Cookie", adminAccessToken!);

      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(data.cowDataToTest.injectionInfoAndAiDates.message[2]);
    }
  });



  test(`Test 8 [ Task: Validate cow injection info and ai dates (date) ] [ Response: Bad Request 400 ]`, async () => {
    for (let aiDateDataToTest of data.cowDataToTest.injectionInfoAndAiDates.data[4]) {
      const res = await request(app).post("/api/v1/records")
        .send(aiDateDataToTest)
        .set("Cookie", adminAccessToken!);

      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(data.cowDataToTest.injectionInfoAndAiDates.message[4]);
    }
  });
});