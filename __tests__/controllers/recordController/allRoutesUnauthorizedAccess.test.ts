import request from 'supertest';
import { app } from "../../../backend/src/app";


describe("Record API Tests [Method: GET]", () => {
  const urls = ["/api/v1/records/all", "/api/v1/records/1"];

  for (let url of urls) {
    test(`GET: ${url}  Response: Unauthorized [401]`, async () => {
      const res = await request(app).get(url);
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.statusCode).toBe(401);
      expect(res.body.message).toBe("Unauthorized: Admin access token is missing in cookies.");
    });
  }
});



describe("Record API Tests [Method: POST]", () => {
  const urls = [
    "/api/v1/records", 
    "/api/v1/records/1/cows", 
    "/api/v1/records/1/cows/1/inject-info-ai-dates"
  ];

  for (let url of urls) {
    test(`POST: ${url}  Response: Unauthorized [401]`, async () => {
      const res = await request(app).post(url);
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.statusCode).toBe(401);
      expect(res.body.message).toBe("Unauthorized: Admin access token is missing in cookies.");
    });
  }
});



describe("Records API Tests [Method: PATCH]", () => {
  test("PATCH: /api/v1/records/1 Response: Unauthorized [401]", async () => {
    const res = await request(app).patch("/api/v1/records/1");
    expect(res.statusCode).toBe(401);
    expect(res.body.statusCode).toBe(401);
    expect(res.body.success).not.toBeTruthy();
    expect(res.body.message).toBe("Unauthorized: Admin access token is missing in cookies.");
  });
});



describe("Records Api Tests [Method: DELETE]", () => {
  const urls = [
    "/api/v1/records/all",
    "/api/v1/records/1",
    "/api/v1/records/1/cows/1",
    "/api/v1/records/1/cows/1/inject-info-ai-dates/1"
  ];

  for (let url of urls) {
    test(`DELETE: ${url}  Response: Unauthorized [401]`, async () => {
      const res = await request(app).delete(url);
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.statusCode).toBe(401);
      expect(res.body.message).toBe("Unauthorized: Admin access token is missing in cookies.");
    });
  }
});