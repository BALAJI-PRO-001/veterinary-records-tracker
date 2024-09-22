import User from "../models/user.model";
import Cow from "../models/cow.model";
import { 
  NewUser, 
  NewCow, 
  User as UserRecord, 
  Cow as CowRecords, 
} from "../utils/types";



async function createNewRecord(user: NewUser, cows: NewCow[]): Promise<{user: UserRecord, cows: CowRecords[]}> {
  const newUser = await User.addNewUser(user);
  const newCows = [];
  for (let cow of cows) {
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
    cows: newCows
  };
}



async function isPhoneNumberAlreadyInUse(phoneNumber: number): Promise<boolean> {
  const user = await User.getUserByPhoneNumber(phoneNumber);
  if (user) {
    return true;
  }
  return false;
}



async function getAllRecords(): Promise<Array<{user: UserRecord, cows: CowRecords[]}>> {
  const users = await User.getAllUsers();
  const cows = await Cow.getAllCows();
  const records: Array<{user: UserRecord, cows: CowRecords[]}> = [];

  for (let user of users) {
    const userCows: CowRecords[] = cows
      .filter(({userId}) => userId === user.id)
      .map(({id, name, breed, bullName, injectionInfoAndAiDates, createdAt}) => {
        return {id, name, breed, bullName, injectionInfoAndAiDates, createdAt}
      });

    records.push({
      user: user,
      cows: userCows
    });
  }

  return records;
}




export default {
  createNewRecord,
  isPhoneNumberAlreadyInUse,
  getAllRecords
};




