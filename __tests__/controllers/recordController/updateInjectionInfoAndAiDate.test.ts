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



describe("Record API Tests [ Update Injection Info And Ai Date ]", () => {
  test("Test 1 [ Task: Invalid user id ] [ Response: Bad Request 400 ]", async () => {
    const requestParamsToTest = ["a", null, undefined];
    for (let value of requestParamsToTest) {
      const res = await request(app).patch(`/api/v1/records/${value}/cows/1/inject-info-ai-dates/1`).set("Cookie", adminAccessToken!);
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(`Bad Request: Invalid user id in URL. The id must be a number, but '${value}' provided.`);
    }
  });



  test("Test 2 [ Task: Invalid cow id ] [ Response: Bad Request 400 ]", async () => {
    const requestParamsToTest = ["a", null, undefined];
    for (let value of requestParamsToTest) {
      const res = await request(app).patch(`/api/v1/records/1/cows/${value}/inject-info-ai-dates/1`).set("Cookie", adminAccessToken!);
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(`Bad Request: Invalid cow id in URL. The id must be a number, but '${value}' provided.`);
    }
  });



  test("Test 3 [ Task: Invalid injection info and ai date id ] [ Response: Bad Request 400 ]", async () => {
    const requestParamsToTest = ["a", null, undefined];
    for (let value of requestParamsToTest) {
      const res = await request(app).patch(`/api/v1/records/1/cows/1/inject-info-ai-dates/${value}`).set("Cookie", adminAccessToken!);
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(`Bad Request: Invalid injection info and ai date id in URL. The id must be a number, but '${value}' provided.`);
    }
  });



  test("Test 4 [ Task: Valid user id but user record not found ] [ Response: User Record not found 404 ]", async () => {
    const res = await request(app).patch("/api/v1/records/100/cows/1/inject-info-ai-dates/1").set("Cookie", adminAccessToken!);
    expect(res.statusCode).toBe(404);
    expect(res.body.statusCode).toBe(404);
    expect(res.body.success).not.toBeTruthy();
    expect(res.body.message).toBe("User record not found for the specified user id: 100");
  });



  test("Test 5 [ Task: Valid cow id but cow record not found ] [ Response: Cow Record not found 404 ]", async () => {
    const res = await request(app).patch("/api/v1/records/1/cows/100/inject-info-ai-dates/1").set("Cookie", adminAccessToken!);
    expect(res.statusCode).toBe(404);
    expect(res.body.statusCode).toBe(404);
    expect(res.body.success).not.toBeTruthy();
    expect(res.body.message).toBe("Cow record not found for the specified cow id: 100");
  });



  test("Test 6 [ Task: Valid cow id but inject info and ai date record not found ] [ Response: Inject Info And Ai date Record not found 404 ]", async () => {
    const res = await request(app).patch("/api/v1/records/1/cows/1/inject-info-ai-dates/100").set("Cookie", adminAccessToken!);
    expect(res.statusCode).toBe(404);
    expect(res.body.statusCode).toBe(404);
    expect(res.body.success).not.toBeTruthy();
    expect(res.body.message).toBe("Injection info and ai dates record not found for the specific id: 100");
  });


  test("Test 7 [ Task: Try to update id ] [ Response: Bad Request 400 ]", async () => {
    const res = await request(app).patch("/api/v1/records/1/cows/1/inject-info-ai-dates/1")
      .send({id: 1})
      .set("Cookie", adminAccessToken!);

    expect(res.statusCode).toBe(400);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.success).not.toBeTruthy();
    expect(res.body.message).toBe("Bad Request: Cannot update injection info ai dates id.");
  });



  test("Test 8 [ Task: Invalid injection info and ai date ] [ Response: Bad Request 400 ]", async () => {
    const res = await request(app).patch("/api/v1/records/1/cows/1/inject-info-ai-dates/1")
      .send({})
      .set("Cookie", adminAccessToken!);

    expect(res.statusCode).toBe(400);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.success).not.toBeTruthy();
    expect(res.body.message).toBe("Bad Request: Update failed, no data provided for update.");
  });




  test("Test 9 [ Task: Invalid injection info and ai date name ] [ Response: Bad Request 400 ]", async () => {
    const nameDataToTest = ["", null];
    for (let data of nameDataToTest) {
      const res = await request(app).patch("/api/v1/records/1/cows/1/inject-info-ai-dates/1")
        .send({name: data})
        .set("Cookie", adminAccessToken!);
      
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe("Bad Request: Injection info and ai date name cannot be (empty, null or undefined).");
    }
  });



  test("Test 10 [ Task: Invalid injection info and ai date cost ] [ Response: Bad Request 400 ]", async () => {
    const costDataToTest = ["", null];
    for (let data of costDataToTest) {
      const res = await request(app).patch("/api/v1/records/1/cows/1/inject-info-ai-dates/1")
        .send({cost: "data"})
        .set("Cookie", adminAccessToken!);
      
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe("Bad Request: Injection info and ai date cost cannot be (empty, null or undefined).");
    }
  });



  test("Test 10 [ Task: Invalid injection info and ai date cost ] [ Response: Bad Request 400 ]", async () => {
    const costDataToTest = ["", null];
    for (let data of costDataToTest) {
      const res = await request(app).patch("/api/v1/records/1/cows/1/inject-info-ai-dates/1")
        .send({cost: data})
        .set("Cookie", adminAccessToken!);
      
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe("Bad Request: Injection info and ai date cost cannot be (empty, null or undefined).");
    }
  });


  test("Test 11 [ Task: Update valid data ] [ Response: Bad Request 200 ]", async () => {
    const res = await request(app).patch("/api/v1/records/1/cows/1/inject-info-ai-dates/1")
    .send({
      name: "new Injection",
      cost: 100,
      date: "12/2/2005"
    })
    .set("Cookie", adminAccessToken!);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.data.injectionInfoAndAiDate.name).toBe("new Injection");
    expect(res.body.data.injectionInfoAndAiDate.cost).toBe(100);
    expect(res.body.data.injectionInfoAndAiDate.date).toBe("12/2/2005");
  });
});