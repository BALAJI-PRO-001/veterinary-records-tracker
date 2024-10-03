import request from 'supertest';
import { app } from "../../../backend/src/app";


let adminAccessToken: string | null = null;

beforeAll(async () => {
  const res = await request(app).post("/api/v1/admin/login").send({
    email: process.env.ADMIN_EMAIL,
    password: "<password>"
  });

  adminAccessToken = res.headers["set-cookie"];
});



const record = {
  user: {
    name: "Ram",
    phoneNumber: 1231231233,
    address: "address"
  },
  cows: [
    {
      name: "cow 1",
      breed: "breed",
      bullName: "bullName",
      injectionInfoAndAiDates: [
        {
          name: "injection 1",
          cost: 100,
          date: "12/2/2004"
        }
      ]
    }
  ]
};



describe("Record API Tests [Method: GET]", () => {
  const urls = ["/api/v1/records/all", "/api/v1/records/1"];

  for (let url of urls) {
    test(`GET: ${url}  Response: Database not connected [500]`, async () => {
      const res = await request(app).get(url).set("Cookie", adminAccessToken!);
      expect(res.statusCode).toBe(500);
      expect(res.body.success).toBe(false);
      expect(res.body.statusCode).toBe(500);
      expect(res.body.message).toBe("Database not connected.");
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
    test(`POST: ${url}  Response: Database not connected [500]`, async () => {
      const data = url == "/api/v1/records" ? record : {};
      const res = await request(app).post(url).send(data).set("Cookie", adminAccessToken!);
      expect(res.statusCode).toBe(500);
      expect(res.body.success).toBe(false);
      expect(res.body.statusCode).toBe(500);
      expect(res.body.message).toBe("Database not connected.");
    });
  }
});




describe("Records API Tests [Method: PATCH]", () => {
  test("PATCH: /api/v1/records/1", async () => {
    const res = await request(app).patch("/api/v1/records/1").set("Cookie", adminAccessToken!);
    expect(res.statusCode).toBe(500);
    expect(res.body.statusCode).toBe(500);
    expect(res.body.success).not.toBeTruthy();
    expect(res.body.message).toBe("Database not connected.");
  });
});



describe("Records API Tests [Method: DELETE]", () => {
  const urls = [
    "/api/v1/records/all",
    "/api/v1/records/1",
    "/api/v1/records/1/cows/1",
    "/api/v1/records/1/cows/1/inject-info-ai-dates/1"
  ];

  for (let url of urls) {
    test(`DELETE: ${url}  Response: Database not connected [500]"`, async () => {
      const res = await request(app).delete(url).set("Cookie", adminAccessToken!);
      expect(res.statusCode).toBe(500);
      expect(res.body.success).toBe(false);
      expect(res.body.statusCode).toBe(500);
      expect(res.body.message).toBe("Database not connected.");
    });
  }
});