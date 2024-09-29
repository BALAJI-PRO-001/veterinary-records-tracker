import request from 'supertest';
import { app } from "../../../backend/src/app";
import data from "./data";
const randomEmailGenerator = require('random-email');
const randomPasswordGenerator = require("generate-password");



describe("Admin Login API Tests [ Invalid Credentials ]", () => {
  test("Test 1 [ Task: Login without email and password ] [ Response: Bad Request 400 ]", async () => {
    const res = await request(app).post("/api/v1/admin/login").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.success).not.toBeTruthy();
    expect(res.body.message).toBe("Bad Request: Both email and password are required.");
  });
});



describe("Admin Login API Tests [Invalid Email]", () => {
  let testCount = 1;
  for (let emailDataToTest of data.emailDataToTest) {
    test(`Test ${testCount ++} [ Task: Login with invalid email ] [ Response: Bad Request 400 ]`, async () => {
      const res = await request(app)
      .post("/api/v1/admin/login")
      .send(emailDataToTest.data);
    
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(emailDataToTest.message);
    });
  }
});




describe("Admin Login API Tests [Invalid Password]", () => {
  let testCount = 1;
  for (let passwordDataToTest of data.passwordDataToTest) {
    test(`Test ${testCount ++} [ Task: Login with invalid password ] [ Response: Bad Request 400 ]`, async () => {
      const res = await request(app)
      .post("/api/v1/admin/login")
      .send(passwordDataToTest.data);
    
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.message).toBe(passwordDataToTest.message);
    });
  }
});



describe("Admin Login API Tests [ Random Email ]", () => {
  test(`Tests Count 100 [ Task: Login with random email ]  [Response: Invalid email 404 ]`, async () => {
    for (let i = 1; i <= 100; i++) {
      const randomEmail = randomEmailGenerator("gmail.com");
      const res = await request(app).post("/api/v1/admin/login").send({email: randomEmail, password: "<password>"});
      expect(res.statusCode).toBe(404);
      expect(res.body.success).not.toBeTruthy();
      expect(res.body.statusCode).toBe(404);
      expect(res.body.message).toBe("Admin not found: Invalid email.");
    }
  });
});



describe("Admin Login API Tests [ Random Password ]", () => {
  test("Tests Count 100 [ Task: Login with random password ] [ Response: Unauthorized 401 ]", async () => {
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
              expect(res.body.success).not.toBeTruthy();
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
  }, 10 * 5000);
});



describe("Admin Login API Tests [ Valid Credentials ]", () => {
  test(`Test 1 [ Task: Login with correct credentials ]  [Response: Logged successfully 200 ]`, async () => {
    const adminCredentials = {email: process.env.ADMIN_EMAIL, password: "<password>"};
    const res = await request(app).post("/api/v1/admin/login").send(adminCredentials);
    expect(res.statusCode).toBe(200);
    expect(res.body.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.message).toBe("Admin logged in successfully.");
    expect(res.headers["set-cookie"]).toBeDefined();
  });
});



describe("Admin Logout API Tests", () => {
  test(`Test 1 [ Task: Make logout request ]  [Response: Logged out successfully 200 ]`, async () => {
    const res = await request(app).get("/api/v1/admin/logout");
    expect(res.statusCode).toBe(200);
    expect(res.body.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.message).toBe("Admin has been logged out successfully.");
  });
});