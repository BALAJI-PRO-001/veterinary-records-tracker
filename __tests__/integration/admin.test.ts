import request from 'supertest';
import { app } from "../../backend/src/app";
const randomEmailGenerator = require('random-email');
const randomPasswordGenerator = require("generate-password");



describe("Admin API Tests", () => {
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
    for (let i = 1; i <= 1000; i++) {
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
    for (let i = 1; i <= 100; i++) {
      const randomPassword = randomPasswordGenerator.generate(passwordGeneratorConfig);
      const res = await request(app).post("/api/v1/admin/login").send({email: process.env.ADMIN_EMAIL, password: randomPassword});
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.statusCode).toBe(401);
      expect(res.body.message).toBe("Unauthorized: Invalid password.");
    }
  });
});


