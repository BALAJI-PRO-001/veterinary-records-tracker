import request from 'supertest';
import { app } from "../../backend/src/app";
const randomEmailGenerator = require('random-email');
const randomPasswordGenerator = require("generate-password");



describe("Admin Login API Tests", () => {
  it ("POST: /api/v1/admin/login  RESPONSE: Bad Request (Both email and password are required) [400]", async () => {
    const res = await request(app).post("/api/v1/admin/login");
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.message).toBe("Both email and password are required.");
  });



  it ("POST: /api/v1/admin/login  RESPONSE: Bad Request (email is required) [400]", async () => {
    const res = await request(app).post("/api/v1/admin/login").send({password: ""});
    expect(res.statusCode).toBe(400);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Bad Request: Email is required.");
  });



  it ("POST: /api/v1/admin/login  RESPONSE: Bad Request (password is required) [400]", async () => {
    const res = await request(app).post("/api/v1/admin/login").send({email: ""});
    expect(res.statusCode).toBe(400);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Bad Request: Password is required.");
  });



  it ("POST: /api/v1/admin/login  RESPONSE: Bad Request (email cannot be null) [400]", async () => {
    const res = await request(app).post("/api/v1/admin/login").send({email: null, password: ""});
    expect(res.statusCode).toBe(400);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Bad Request: Email cannot be null.");
  });



  it ("POST: /api/v1/admin/login  RESPONSE: Bad Request (password cannot be null) [400]", async () => {
    const res = await request(app).post("/api/v1/admin/login").send({email: "", password: null});
    expect(res.statusCode).toBe(400);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Bad Request: Password cannot be null.");
  });



  it ("POST: /api/v1/admin/login  RESPONSE: Bad Request (invalid email) [404]", async () => {
    for (let i = 1; i <= 100; i++) {
      const randomEmail = randomEmailGenerator("gmail.com");
      const res = await request(app).post("/api/v1/admin/login").send({email: randomEmail, password: ""});
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.statusCode).toBe(404);
      expect(res.body.message).toBe("Admin not found: Invalid email.");
    }
  });


  
  it ("POST: /api/v1/admin/login  RESPONSE: Bad Request (invalid password) [401]", async () => {
    const passwordGeneratorConfig = {length: 10, numbers: true, symbols: true, lowercase: true, uppercase: true};
    const promises: Promise<void>[] = [];
    for (let i = 1; i <= 100; i++) {
      const newPromise: Promise<void> = new Promise((resolve, reject) => {
        const randomPassword = randomPasswordGenerator.generate(passwordGeneratorConfig);
        request(app)
          .post("/api/v1/admin/login")
          .send({email: process.env.ADMIN_EMAIL, password: randomPassword})
          .then((res) => {
            try {
              expect(res.statusCode).toBe(401);
              expect(res.body.statusCode).toBe(401);
              expect(res.body.success).toBe(false);
              expect(res.body.message).toBe("Unauthorized: Invalid password.");
              resolve();
            } catch(err) {
              reject(err);
            }
          })
      });
      promises.push(newPromise);
    }
    await Promise.all(promises);
  }, 10 * 10000);


  it ("POST: /api/v1/admin/login  RESPONSE: Admin logged in successfully [200]", async () => {
    const adminCredentials = {email: process.env.ADMIN_EMAIL, password: "<password>"};
    console.log(adminCredentials);
    const res = await request(app).post("/api/v1/admin/login").send(adminCredentials);
    expect(res.statusCode).toBe(200);
    expect(res.body.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Admin logged in successfully.");
    expect(res.headers["set-cookie"]).toBeDefined();
  });
});



describe("Admin Log Out API Tests", () => {
  it ("POST: /api/v1/admin/logout  RESPONSE: Admin has been logged out successfully [200]", async () => {
    const res = await request(app).get("/api/v1/admin/logout");
    expect(res.statusCode).toBe(200);
    expect(res.body.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Admin has been logged out successfully.")
  });
});