import express from "express";
import validateSuperUserCredentials from "../utils/validateSuperUserCredentials";
import validateSuperUserAuthenticationToken from "../utils/verifySuperUserAuthenticationToken";
import { downloadRecords } from "../controllers/record.controller";
import { 
  login,
  logout,
  downloadDatabase, 
  updateDatabase, 
  serverActions, 
  serverStatus, 
  executeCommand,
  sendLogFiles,
  clearLogs
} from "../controllers/superuser.controller";

const router = express.Router();

router.post("/login", validateSuperUserCredentials, login)
      .post("/server-actions", validateSuperUserAuthenticationToken, serverActions)
      .post("/commands/execute", validateSuperUserAuthenticationToken, executeCommand)
      .post("/logs/clear", clearLogs);

router.get("/logout", logout)
      .get("/download/db", validateSuperUserAuthenticationToken, downloadDatabase)
      .get("/download/records", validateSuperUserAuthenticationToken, downloadRecords)
      .get("/server/status", validateSuperUserAuthenticationToken, serverStatus)
      .get("/logs", validateSuperUserAuthenticationToken, sendLogFiles);

router.patch("/update/db", validateSuperUserAuthenticationToken, updateDatabase);

export default router;
