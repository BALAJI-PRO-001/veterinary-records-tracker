import express from "express";
import { 
  createNewRecord, 
  getAllRecords,
  getRecordByUserId,
  deleteAllRecords,
  deleteRecord,
  addNewCowToUser,
  deleteCowFromUser,
  addNewInjectionInfoAndAiDatesToCow,
  removeInjectionInfoAndAiDatesFromCow,
  updateRecord
} from "../controllers/record.controller";

import verifyAdminAuthenticationToken from "../utils/verifyAdminAuthenticationToken";



const router = express.Router();

router.post("", verifyAdminAuthenticationToken, createNewRecord)
      .post("/:userId/cows", verifyAdminAuthenticationToken, addNewCowToUser)
      .post("/:userId/cows/:cowId/inject-info-ai-dates", verifyAdminAuthenticationToken, addNewInjectionInfoAndAiDatesToCow);

router.get("/all", verifyAdminAuthenticationToken, getAllRecords)
      .get("/:userId", verifyAdminAuthenticationToken, getRecordByUserId);

router.patch("/:userId", verifyAdminAuthenticationToken, updateRecord);

router.delete("/all", verifyAdminAuthenticationToken, deleteAllRecords)
      .delete("/:userId", verifyAdminAuthenticationToken, deleteRecord)
      .delete("/:userId/cows/:cowId", verifyAdminAuthenticationToken, deleteCowFromUser)
      .delete("/:userId/cows/:cowId/inject-info-ai-dates/:id", verifyAdminAuthenticationToken, removeInjectionInfoAndAiDatesFromCow);


export default router;