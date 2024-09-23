import User from "../models/user.model";
import Cow from "../models/cow.model";
import {  
  User as UserRecord,
  Cow as CowRecord,
  NewCow,
  NewRecord,
  Record,
} from "../utils/types";



async function createNewRecord(record: NewRecord): Promise<Record> {
  const newUser = await User.addNewUser(record.user);
  const newCows = [];
  for (let cow of record.cows) {
    const newCow = await Cow.addNewCow({
      userId: newUser.id,
      name: cow.name,
      breed: cow.breed,
      bullName: cow.bullName,
      injectionInfoAndAiDates: cow.injectionInfoAndAiDates
    });
    newCows.push(newCow);
  }
  
  return {
    user: newUser,
    cows: newCows,
    createdAt: newUser.createdAt
  };
}



async function isPhoneNumberAlreadyInUse(phoneNumber: number): Promise<boolean> {
  const user = await User.getUserByPhoneNumber(phoneNumber);
  return user ? true : false;
}



async function hasUserRecord(userId: number): Promise<boolean> {
  const user = await User.getUserById(userId);
  return user ? true : false;
}



async function hasCowRecord(cowId: number) {
  const cow = await Cow.getCowById(cowId);
  return cow ? true : false
}


async function getAllRecords(): Promise<Array<Record>> {
  const users = await User.getAllUsers();
  const cows = await Cow.getAllCows();
  const records: Array<Record> = [];

  for (let user of users) {
    const userCows: CowRecord[] = cows
      .filter(({userId}) => userId === user.id)
      .map(({id, name, breed, bullName, injectionInfoAndAiDates, createdAt}) => {
        return {id, name, breed, bullName, injectionInfoAndAiDates, createdAt}
      });

    records.push({
      user: user,
      cows: userCows,
      createdAt: user.createdAt
    });
  }

  return records;
}



async function getRecordByUserId(userId: number): Promise<Record> {
  const user = await User.getUserById(userId) as UserRecord;
  const cows = await Cow.getCowsByUserId(userId);
  return {
    user: user,
    cows: cows,
    createdAt: user.createdAt
  };
}



async function deleteAllRecords(): Promise<void> {
  await User.deleteAllUsers();
  await Cow.deleteAllCows();
}


async function deleteRecordByUserId(userId: number): Promise<void> {
  await User.deleteUserById(userId);
  await Cow.deleteCowsByUserId(userId);
}



async function addNewCowToUser(userId: number, newCow: NewCow): Promise<CowRecord> {
  return await Cow.addNewCow({
    userId: userId,
    name: newCow.name,
    breed: newCow.breed,
    bullName: newCow.bullName,
    injectionInfoAndAiDates: newCow.injectionInfoAndAiDates
  });
}



async function deleteCowFromUser(cowId: number) {
  await Cow.deleteCowById(cowId);
}


export default {
  createNewRecord,
  isPhoneNumberAlreadyInUse,
  getAllRecords,
  getRecordByUserId,
  hasUserRecord, hasCowRecord,
  deleteAllRecords,
  deleteRecordByUserId,
  addNewCowToUser,
  deleteCowFromUser
};




