import express, { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

const router = express.Router();

interface RequestUserData {
  name: string,
  phoneNumber: number,
  address: string
}

async function testApi(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // const { name, phoneNumber, address } = req.body as unknown as RequestUserData;
    // const newUser = await User.addNewUser({name, phoneNumber, address});
    // console.log(newUser);
    // const users = await User.getAllUsers();
    // console.log(users);

    const updatedUser = await User.updateUserById(6, {name: "Updated", phoneNumber: 1231253653});
    console.log(updatedUser);
  } catch(err) { 
    next(err);
  }
}

router.post("/user", testApi);


export default router;