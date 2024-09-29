import request from 'supertest';
import { app } from "../../../../backend/src/app";
import sqlite3 from '../../../../backend/src/db/sqlite3';
import { SQLITE3_DATABASE_DIR_PATH  } from "../../../../backend/src/utils/constants";


let adminAccessToken: string | null = null;

beforeAll(async () => {
  await sqlite3.connectAndCreateDatabase(SQLITE3_DATABASE_DIR_PATH, "database");

  const res = await request(app).post("/api/v1/admin/login").send({
    email: process.env.ADMIN_EMAIL,
    password: "Admin@1234"
  });

  adminAccessToken = res.headers["set-cookie"];
});



describe("Record API ", () => {
  describe("Data Validation", () => {
    test("POST: /api/v1/records  Response: Bad Request: User or cows data is missing. [400]", async () => {
      const res = await request(app).post("/api/v1/records").send({}).set("Cookie", adminAccessToken!);
      expect(res.statusCode).toBe(400);
      expect(res.body.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Bad Request: User or cows data is missing.");
    });
  
    describe("User Name Tests", () => {
      let userNameDataToTest = [
        {
          data: {user: {}, cows: []},
          message: "Bad Request: User name is required."
        },
        {
          data: {user: {name: ""}, cows: []},
          message: "Bad Request: User name cannot be empty."
        },
        {
          data: {user: {name: null}, cows: []},
          message: "Bad Request: User name cannot be null."
        }
      ];
    
      for (let data of userNameDataToTest) {
        test(`POST: /api/v1/records  Response: ${data.message} [400]`, async () => {
          const res = await request(app).post("/api/v1/records")
            .send(data.data)  
            .set("Cookie", adminAccessToken!);
      
            expect(res.statusCode).toBe(400);
            expect(res.body.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe(data.message);
        });
      }  
    });
  
  
  
  
    describe("User Phone Number Tests", () => {
      const userPhoneNumberDataToTest = [
        {
          data: {user: {name: "Ram"}, cows: []},
          message: "Bad Request: User phoneNumber is required."
        },
        {
          data: {user: {name: "Ram", phoneNumber: ""}, cows: []},
          message: "Bad Request: User phoneNumber cannot be empty."
        },
        {
          data: {user: {name: "Ram", phoneNumber: null}, cows: []},
          message: "Bad Request: User phoneNumber cannot be null."
        }
      ];
    
      for (let data of userPhoneNumberDataToTest) {
        test(`POST: /api/v1/records  Response: ${data.message} [400]`, async () => {
          const res = await request(app).post("/api/v1/records")
            .send(data.data)  
            .set("Cookie", adminAccessToken!);
      
            expect(res.statusCode).toBe(400);
            expect(res.body.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe(data.message);
        });
      }
    });
  
  
  
    describe("User Address Tests", () => {
      const userAddressDataToTest = [
        {
          data: {user: {name: "Ram", phoneNumber: 1231231233}, cows: []},
          message: "Bad Request: User address is required."
        },
        {
          data: {user: {name: "Ram", phoneNumber: 1231231233, address: ""}, cows: []},
          message: "Bad Request: User address cannot be empty."
        },
        {
          data: {user: {name: "Ram", phoneNumber: 1231231233, address: null}, cows: []},
          message: "Bad Request: User address cannot be null."
        }
      ];
    
      for (let data of userAddressDataToTest) {
        test(`POST: /api/v1/records  Response: ${data.message} [400]`, async () => {
          const res = await request(app).post("/api/v1/records")
            .send(data.data)  
            .set("Cookie", adminAccessToken!);
      
            expect(res.statusCode).toBe(400);
            expect(res.body.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe(data.message);
        });
      }  
    })  



    describe("Cow Name Tests", () => {
      const cowNameDataToTest = [
        {
          data: {user: {name: "Ram", phoneNumber: 1231231233, address: "address"}, cows: []},
          message: "Bad Request: Cow[0] name is required."
        },
        {
          data: {user: {name: "Ram", phoneNumber: 1231231233, address: "address"}, cows: [{name: ""}]},
          message: "Bad Request: Cow[0] name cannot be empty."
        },
        {
          data: {user: {name: "Ram", phoneNumber: 1231231233, address: "address"}, cows: [{name: null}]},
          message: "Bad Request: Cow[0] name cannot be null."
        },
      ];
      
      for (let data of cowNameDataToTest) {
        test(`POST: /api/v1/records Response: ${data.message} [400]`, async () => {
          const res = await request(app).post("/api/v1/records")
            .send(data)
            .set("Cookie", adminAccessToken!);

          expect(res.statusCode).toBe(400);
          expect(res.body.statusCode).toBe(400);
          expect(res.body.success).toBe(false);
          expect(res.body.message).toBe(data.message);
        });
      }
    });
  });
});
