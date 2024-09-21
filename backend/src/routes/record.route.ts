import express, { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import Cow from "../models/cow.model";

const router = express.Router();

interface RequestData {
  userId: number;
  name: string,
  breed: string,
  bullName: string,
  injectionInfoAndAiDates: Array<{
    name: string,
    cost: number, 
    date: string
  }>
}

async function testApi(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // const { name, breed, bullName, injectionInfoAndAiDates } = req.body as unknown as RequestData;
    // const newCow = await Cow.addNewCow({
    //   userId: 1,
    //   name: name,
    //   breed: breed,
    //   bullName: bullName,
    //   injectionInfoAndAiDates: injectionInfoAndAiDates
    // });
    // res.json(newCow);
    const cows = await Cow.getAllCows();
  } catch(err) { 
    next(err);
  }
}

router.post("/test", testApi);


export default router;