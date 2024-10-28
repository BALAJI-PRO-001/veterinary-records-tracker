import express from "express";
import { 
  createNewRecord, 
  getAllRecords,
  getRecordByUserId,
  deleteAllRecords,
  deleteRecord,
  addNewCowToUser,
  deleteCowFromUser,
  addNewInjectionInfoAndAiDateToCow,
  removeInjectionInfoAndAiDateFromCow,
  updateUserRecord,
  updateCowRecord,
  updateInjectionInfoAndAiDate,
  downloadRecords,
  deleteAllCowsFromUser
} from "../controllers/record.controller";

import verifyAdminAuthenticationToken from "../utils/verifyAdminAuthenticationToken";



const router = express.Router();

router.post("", verifyAdminAuthenticationToken, createNewRecord)
      .post("/:userId/cows", verifyAdminAuthenticationToken, addNewCowToUser)
      .post("/:userId/cows/:cowId/inject-info-ai-dates", verifyAdminAuthenticationToken, addNewInjectionInfoAndAiDateToCow);

router.get("/all", verifyAdminAuthenticationToken, getAllRecords)
      .get("/download", verifyAdminAuthenticationToken, downloadRecords)
      .get("/:userId", verifyAdminAuthenticationToken, getRecordByUserId);

router.patch("/users/:userId", verifyAdminAuthenticationToken, updateUserRecord)
      .patch("/:userId/cows/:cowId", verifyAdminAuthenticationToken, updateCowRecord)
      .patch("/:userId/cows/:cowId/inject-info-ai-dates/:id", verifyAdminAuthenticationToken, updateInjectionInfoAndAiDate);

router.delete("/all", verifyAdminAuthenticationToken, deleteAllRecords)
      .delete("/:userId", verifyAdminAuthenticationToken, deleteRecord)
      .delete("/:userId/cows/all", verifyAdminAuthenticationToken, deleteAllCowsFromUser)
      .delete("/:userId/cows/:cowId", verifyAdminAuthenticationToken, deleteCowFromUser)
      .delete("/:userId/cows/:cowId/inject-info-ai-dates/:id", verifyAdminAuthenticationToken, removeInjectionInfoAndAiDateFromCow);


export default router;