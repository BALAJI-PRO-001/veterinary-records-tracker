import User from "../models/user.model";
import Cow from "../models/cow.model";
import { 
  NewUser, 
  NewCow, 
  User as UserRecord, 
  Cow as CowsRecords 
} from "../utils/types";



async function createNewRecord(user: NewUser, cows: NewCow[]): Promise<{user: UserRecord, cows: CowsRecords[]}> {
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



async function getAllRecords(): Promise<any> {
  const user = await User.getAllUsers();
  console.log(user);
  return user;
}

export default {
  createNewRecord,
  isPhoneNumberAlreadyInUse,
  getAllRecords
};




