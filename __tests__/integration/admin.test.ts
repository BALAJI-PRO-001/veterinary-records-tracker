import request from 'supertest';
import { app } from "../../backend/src/app";
const randomEmailGenerator = require('random-email');
const randomPasswordGenerator = require("generate-password");



describe("Admin Login API Tests", () => {
  it ("should return email and password both required", async () => {
    const res = await request(app).post("/api/v1/admin/login");
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.message).toBe("Both email and password are required.");
  });



  it ("should return email is required", async () => {
    const res = await request(app).post("/api/v1/admin/login").send({password: ""});
    expect(res.statusCode).toBe(400);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Bad Request: Email is required.");
  });



  it ("should return password is required", async () => {
    const res = await request(app).post("/api/v1/admin/login").send({email: ""});
    expect(res.statusCode).toBe(400);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Bad Request: Password is required.");
  });



  it ("should return email cannot be null", async () => {
    const res = await request(app).post("/api/v1/admin/login").send({email: null, password: ""});
    expect(res.statusCode).toBe(400);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Bad Request: Email cannot be null.");
  });



  it ("should return password cannot be null", async () => {
    const res = await request(app).post("/api/v1/admin/login").send({email: "", password: null});
    expect(res.statusCode).toBe(400);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Bad Request: Password cannot be null.");
  });



  it ("should return invalid email", async () => {
    for (let i = 1; i <= 100; i++) {
      const randomEmail = randomEmailGenerator("gmail.com");
      const res = await request(app).post("/api/v1/admin/login").send({email: randomEmail, password: ""});
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.statusCode).toBe(404);
      expect(res.body.message).toBe("Admin not found: Invalid email.");
    }
  });


  
  it ("should return invalid password or unauthorized", async () => {
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


  it ("should return admin access token with success status code (200)", async () => {
    const adminCredentials = {email: process.env.ADMIN_EMAIL, password: "Admin@1234"};
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
  it ("should return success status code", async () => {
    const res = await request(app).get("/api/v1/admin/log-out");
    expect(res.statusCode).toBe(200);
    expect(res.body.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Admin has been logged out successfully.")
  });
});