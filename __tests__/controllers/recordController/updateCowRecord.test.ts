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


describe("Record API Tests [ Update Cow Record ]", () => {
  test("Test 1 [ Task: Invalid user id ] [ Response: Bad Request 400 ]", async () => {
    const requestParamsToTest = ["a", null, undefined];
    for (let value of requestParamsToTest) {
      const res = await request(app).patch(`/api/v1/records/${value}/cows/1`).set("Cookie", adminAccessToken!);
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(`Bad Request: Invalid user id in URL. The id must be a number, but '${value}' provided.`);
    }
  });


  test("Test 2 [ Task: Invalid cow id ] [ Response: Bad Request 400 ]", async () => {
    const requestParamsToTest = ["a", null, undefined];
    for (let value of requestParamsToTest) {
      const res = await request(app).patch(`/api/v1/records/1/cows/${value}`).set("Cookie", adminAccessToken!);
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(`Bad Request: Invalid cow id in URL. The id must be a number, but '${value}' provided.`);
    }
  });



  test("Test 3 [ Task: Valid user id but user record not found ] [ Response: User Record not found 404 ]", async () => {
    const res = await request(app).patch("/api/v1/records/100/cows/1").set("Cookie", adminAccessToken!);
    expect(res.statusCode).toBe(404);
    expect(res.body.statusCode).toBe(404);
    expect(res.body.success).not.toBeTruthy();
    expect(res.body.message).toBe("User record not found for the specified user id: 100");
  });



  test("Test 4 [ Task: Valid cow id but cow record not found ] [ Response: Cow Record not found 404 ]", async () => {
    const res = await request(app).patch("/api/v1/records/1/cows/100").set("Cookie", adminAccessToken!);
    expect(res.statusCode).toBe(404);
    expect(res.body.statusCode).toBe(404);
    expect(res.body.success).not.toBeTruthy();
    expect(res.body.message).toBe("Cow record not found for the specified cow id: 100");
  });



  test("Test 5 [ Task: Try to update cow id ] [ Response: Bad Request 400 ]", async () => {
    const res = await request(app).patch("/api/v1/records/1/cows/1")
      .send({id: 100})
      .set("Cookie", adminAccessToken!);
    expect(res.statusCode).toBe(400);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.success).not.toBeTruthy();
    expect(res.body.message).toBe("Bad Request: Cannot update cow id.");
  });



  test("Test 6 [ Task: Invalid cow data ] [ Response: Bad Request 400 ]", async () => {
    const res = await request(app).patch("/api/v1/records/1/cows/1")
      .send({})
      .set("Cookie", adminAccessToken!);
    expect(res.statusCode).toBe(400);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.success).not.toBeTruthy();
    expect(res.body.message).toBe("Bad Request: Update failed, no data provided for update.");
  });



  test("Test 7 [ Task: Invalid cow name ] [ Response: Bad Request 400 ]", async () => {
    const nameDataToUpdate = ["", null];
    for (let data of nameDataToUpdate) {
      const res = await request(app).patch("/api/v1/records/1/cows/1")
        .send({name: data})
        .set("Cookie", adminAccessToken!);
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(`Bad Request: Cow name cannot be (empty, null or undefined).`);
    }
  });



  test("Test 8 [ Task: Invalid cow breed ] [ Response: Bad Request 400 ]", async () => {
    const breedDataToUpdate = ["", null];
    for (let data of breedDataToUpdate) {
      const res = await request(app).patch("/api/v1/records/1/cows/1")
        .send({breed: data})
        .set("Cookie", adminAccessToken!);
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(`Bad Request: Cow breed cannot be (empty, null or undefined).`);
    }
  });




  test("Test 9 [ Task: Invalid cow bullName ] [ Response: Bad Request 400 ]", async () => {
    const bullNameDataToTest = ["", null];
    for (let data of bullNameDataToTest) {
      const res = await request(app).patch("/api/v1/records/1/cows/1")
        .send({bullName: data})
        .set("Cookie", adminAccessToken!);
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(`Bad Request: Cow bullName cannot be (empty, null or undefined).`);
    }
  });



  test("Test 10 [ Task: Update valid cow data ] [ Response: Updated Record 200 ]", async () => {
    const res = await request(app).patch("/api/v1/records/1/cows/1")
      .send({
        name: "new Cow",
        breed: "new Breed",
        bullName: "new BullName"
      })
      .set("Cookie", adminAccessToken!);

    expect(res.statusCode).toBe(200);
    expect(res.body.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.data.cow.name).toBe("new Cow");
    expect(res.body.data.cow.breed).toBe("new Breed");
    expect(res.body.data.cow.bullName).toBe("new BullName");
  });
});