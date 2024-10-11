import express from "express";
import validateSuperUserCredentials from "../utils/validateSuperUserCredentials";
import validateSuperUserAuthenticationToken from "../utils/verifySuperUserAuthenticationToken";
import { login, logout, downloadDatabase, updateDatabase} from "../controllers/superuser.controller";

const router = express.Router();

router.post("/login", validateSuperUserCredentials, login);

router.get("/logout", logout)
      .get("/download/db", validateSuperUserAuthenticationToken, downloadDatabase)

router.patch("/update/db", validateSuperUserAuthenticationToken, updateDatabase);

export default router;
