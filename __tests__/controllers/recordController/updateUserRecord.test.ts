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


describe("Record API Tests [ Update User Record ]", () => {
  test("Test 1 [ Task: Invalid user id ] [ Response: Bad Request 400 ] ", async () => {
    const requestParamsToTest = ["a", null, undefined];
    for (let value of requestParamsToTest) {
      const res = await request(app).patch(`/api/v1/records/users/${value}`).set("Cookie", adminAccessToken!);
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(`Bad Request: Invalid user id in URL. The id must be a number, but '${value}' provided.`);
    }
  });


  
  test("Test 2 [ Task: Valid user id but user record not exists ] [ Response: Record not found 404 ]", async () => {
    const res = await request(app).patch("/api/v1/records/users/100").set("Cookie", adminAccessToken!);
    expect(res.statusCode).toBe(404);
    expect(res.body.statusCode).toBe(404);
    expect(res.body.success).not.toBeTruthy();
    expect(res.body.message).toBe("User record not found for the specified user id: 100.");
  });


    
  test("Test 3 [ Task: Try to update user id ] [ Response: Bad Request 400 ]", async () => {
    const res = await request(app).patch("/api/v1/records/users/1")
      .send({id: 1})
      .set("Cookie", adminAccessToken!);
    expect(res.statusCode).toBe(400);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.success).not.toBeTruthy();
    expect(res.body.message).toBe("Bad Request: Cannot update user id.");
  });



  test("Test 4 [ Task: Update empty data ] [ Response: Bad Request 400 ]", async () => {
    const res = await request(app).patch("/api/v1/records/users/1")
      .send({})
      .set("Cookie", adminAccessToken!);
    expect(res.statusCode).toBe(400);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.success).not.toBeTruthy();
    expect(res.body.message).toBe("Bad Request: Update failed, no data provided for update.");
  });


  test("Test 5 [ Task: Update Duplicate phone number ] [ Response: Bad Request 400 ]", async () => {
    const res = await request(app).patch("/api/v1/records/users/1")
      .send({phoneNumber: 1231231236})
      .set("Cookie", adminAccessToken!);
    expect(res.statusCode).toBe(409);
    expect(res.body.statusCode).toBe(409);
    expect(res.body.success).not.toBeTruthy();
    expect(res.body.message).toBe("Duplicate Key: Phone number is already in use by another record.");
  });



  test("Test 6 [ Task: Update invalid name ] [ Response: Bad Request 400 ]", async () => {
    const nameDataToTest = ["", null];
    for (let data of nameDataToTest) {
      const res = await request(app).patch("/api/v1/records/users/1")
        .send({name: data})
        .set("Cookie", adminAccessToken!);
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe("User name cannot be (empty, null or undefined).");
    }
  });




  test("Test 7 [ Task: Update invalid phoneNumber ] [ Response: Bad Request 400 ]", async () => {
    const phoneNumberDataToTest = ["", null];
    for (let data of phoneNumberDataToTest) {
      const res = await request(app).patch("/api/v1/records/users/1")
        .send({phoneNumber: data})
        .set("Cookie", adminAccessToken!);
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe("User phoneNumber cannot be (empty, null or undefined).");
    }
  });



  test("Test 8 [ Task: Update invalid address ] [ Response: Bad Request 400 ]", async () => {
    const addressDataToTest = ["", null];
    for (let data of addressDataToTest) {
      const res = await request(app).patch("/api/v1/records/users/1")
        .send({address: data})
        .set("Cookie", adminAccessToken!);
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe("User address cannot be (empty, null or undefined).");
    }
  });




  test("Test 9 [ Task: Update invalid isCurrentUser ] [ Response: Bad Request 400 ]", async () => {
    const isCurrentUserDataToTest = ["", null];
    for (let data of isCurrentUserDataToTest) {
      const res = await request(app).patch("/api/v1/records/users/1")
        .send({isCurrentUser: data})
        .set("Cookie", adminAccessToken!);
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe("User isCurrentUser cannot be (empty, null or undefined).");
    }
  });


  test("Test 10 [ Task: Update valid user data ] [ Response: Updated Data 200 ]", async () => {
    const res = await request(app).patch("/api/v1/records/users/1")
      .send({
        name: "Ram Kumar",
        phoneNumber: 1231231233,
        address: "new Address",
        isCurrentUser: true
      })
      .set("Cookie", adminAccessToken!);
    expect(res.statusCode).toBe(200);
    expect(res.body.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.data.user.name).toBe("Ram Kumar");
    expect(res.body.data.user.phoneNumber).toBe(1231231233);
    expect(res.body.data.user.address).toBe("new Address");
    expect(res.body.data.user.isCurrentUser).toBeTruthy();
  });
});