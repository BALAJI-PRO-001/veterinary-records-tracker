import express from "express";
import { login, logout, downloadDB, uploadDB } from "../controllers/superuser.controller";
import validateSuperUserCredentials from "../utils/validateSuperUserCredentials";
import validateSuperUserAuthenticationToken from "../utils/verifySuperUserAuthenticationToken";

const router = express.Router();

router.post("/login", validateSuperUserCredentials, login)
      // .post("/upload/db", validateSuperUserAuthenticationToken, uploadDB);

router.get("/logout", logout)
      .get("/download/db", validateSuperUserAuthenticationToken, downloadDB);

export default router;
