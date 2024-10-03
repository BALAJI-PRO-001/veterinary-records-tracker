import User from "../models/user.model";
import Cow from "../models/cow.model";
import {  
  User as UserRecord,
  Cow as CowRecord,
  NewCow,
  NewRecord,
  Record,
  InjectionInfoAndAiDates,
  RecordToUpdate,
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
    recordCreatedAt: newUser.createdAt
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



async function hasInjectionInfoAndAiDatesRecord(id: number): Promise<boolean> {
  const injectionInfoAndAiDates = await Cow.getInjectionInfoAndAiDatesById(id);
  return injectionInfoAndAiDates ? true : false;
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
      recordCreatedAt: user.createdAt
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
    recordCreatedAt: user.createdAt
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




async function addNewInjectionInfoAndAiDatesToCow(cowId: number, injectionInfoAndAiDates: InjectionInfoAndAiDates): Promise<void> {
   await Cow.addNewInjectionInfoAndAiDatesToCow(cowId, [injectionInfoAndAiDates]);
}



async function removeInjectionInfoAndAiDatesFromCow(id: number) {
  await Cow.deleteInjectionInfoAndAiDatesById(id);
}



async function updateRecord(record: RecordToUpdate): Promise<Record> {
  let updatedUser: UserRecord | null = null;
  if (record.user) {
    updatedUser = await User.updateUserById(Number(record.user.id), {...record.user});
  }

  if (record.cows) {
    for (let cow of record.cows) {
      await Cow.updateCowById(cow.id, {...cow});
    }
  }

  const updatedCows = await Cow.getCowsByUserId(Number(record.user!.id));

  return {
    user: updatedUser as UserRecord,
    cows: updatedCows,
    recordCreatedAt: updatedUser?.createdAt!
  }
}



export default {
  createNewRecord,
  isPhoneNumberAlreadyInUse,
  getAllRecords,
  getRecordByUserId,
  hasUserRecord, hasCowRecord,
  hasInjectionInfoAndAiDatesRecord,
  deleteAllRecords,
  deleteRecordByUserId,
  addNewCowToUser,
  deleteCowFromUser,
  addNewInjectionInfoAndAiDatesToCow,
  removeInjectionInfoAndAiDatesFromCow,
  updateRecord
};