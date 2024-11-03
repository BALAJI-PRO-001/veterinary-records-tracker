import express from "express";
import validateSuperUserCredentials from "../utils/validateSuperUserCredentials";
import validateSuperUserAuthenticationToken from "../utils/verifySuperUserAuthenticationToken";
import { login, logout, downloadDatabase, updateDatabase, serverActions, serverStatus, executeCommand} from "../controllers/superuser.controller";
import { downloadRecords } from "../controllers/record.controller";

const router = express.Router();

router.post("/login", validateSuperUserCredentials, login)
      .post("/server-actions", validateSuperUserAuthenticationToken, serverActions)
      .post("/command/exec", validateSuperUserAuthenticationToken, executeCommand);

router.get("/logout", logout)
      .get("/download/db", validateSuperUserAuthenticationToken, downloadDatabase)
      .get("/download/records", validateSuperUserAuthenticationToken, downloadRecords)
      .get("/server/status", validateSuperUserAuthenticationToken, serverStatus);

router.patch("/update/db", validateSuperUserAuthenticationToken, updateDatabase);

export default router;
