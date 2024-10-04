import sqlite3 from "../db/sqlite3"
import queries from "../db/sqlite3/queries";
import { 
 NewUser,
 User,
 UserInDB,
 UserDataToUpdate
} from "../utils/types";



function validatePhoneNumber(phoneNumber: number): void {
  if (String(phoneNumber).length !== 10 || isNaN(phoneNumber)) {
    throw new Error("Phone number must be a valid number with exactly 10 digits.");
  }
}



function validateId(id: number): void {
  if (id < 0) {
    throw new Error("Id must be positive number.");
  }

  if (!id) {
    throw new Error("User id is null or undefined.");
  }
}



async function addNewUser(newUser: NewUser): Promise<User> {
  validatePhoneNumber(newUser.phoneNumber);
  await sqlite3.insert(queries.INSERT_USER_RECORD_SQL, newUser.name, newUser.phoneNumber, newUser.address);
  const createdUser = await sqlite3.select(queries.SELECT_LAST_USER_RECORD_SQL, false) as UserInDB;

  return {
    id: createdUser.id,
    name: createdUser.name,
    phoneNumber: createdUser.phone_number,
    address: createdUser.address,
    isCurrentUser: createdUser.is_current_user === 1 ? true : false,
    createdAt: createdUser.date_and_time
  }
}



async function getUserByPhoneNumber(phoneNumber: number): Promise<User | null> {
  validatePhoneNumber(phoneNumber);
  const user = await sqlite3.select(queries.SELECT_USER_RECORD_BY_PHONE_NUMBER_SQL, false, phoneNumber) as UserInDB;
  if (!user) {
    return null;
  }
  return {
    id: user.id,
    name: user.name,
    phoneNumber: user.phone_number,
    address: user.address,
    isCurrentUser: user.is_current_user === 1 ? true : false,
    createdAt: user.date_and_time
  };
}



async function getUserById(id: number): Promise<User | null> {
  validateId(id);

  const user = await sqlite3.select(queries.SELECT_USER_RECORD_BY_ID_SQL, false, id) as UserInDB;
  if (!user) {
    return null;
  }
  return {
    id: user.id,
    name: user.name,
    phoneNumber: user.phone_number,
    address: user.address,
    isCurrentUser: user.is_current_user === 1 ? true : false,
    createdAt: user.date_and_time
  };
}



async function getAllUsers(): Promise<User[]> {
  const usersRecords = await sqlite3.select(queries.SELECT_ALL_USERS_RECORDS_SQL, true) as UserInDB[];
  const users = usersRecords.map((user) => {
    return {
      id: user.id,
      name: user.name,
      phoneNumber: user.phone_number,
      address: user.address, 
      isCurrentUser: user.is_current_user === 1 ? true : false,
      createdAt: user.date_and_time
    }
  });
  return users;
}



async function updateUserById(id: number, userDataToUpdate: UserDataToUpdate): Promise<User> {
  validateId(id);

  if (Object.keys(userDataToUpdate).length == 0) {
    throw new Error("The provided data is empty. At least one field must be updated.");
  }

  if (userDataToUpdate.phoneNumber) {
    validatePhoneNumber(userDataToUpdate.phoneNumber);
  }

  for (let [key, value] of Object.entries(userDataToUpdate)) {
    key = key === "phoneNumber" ? "phone_number" : key === "isCurrentUser" ? "is_current_user" : key;
    const sql = queries.UPDATE_USER_RECORD_BY_ID.replace("<column_name>", key);
    await sqlite3.update(sql, value, id);
  }

  const updatedUser = await sqlite3.select(queries.SELECT_USER_RECORD_BY_ID_SQL, false, id) as UserInDB;
  return {
    id: updatedUser.id,
    name: updatedUser.name,
    phoneNumber: updatedUser.phone_number,
    address: updatedUser.address, 
    isCurrentUser: updatedUser.is_current_user === 1 ? true : false,
    createdAt: updatedUser.date_and_time
  }
}



async function deleteUserById(id: number): Promise<void> {
  validateId(id);
  await sqlite3.delete(queries.DELETE_USER_RECORD_BY_ID_SQL, id);
}



async function deleteAllUsers(): Promise<void> {
  await sqlite3.delete(queries.DELETE_ALL_USERS_RECORDS_SQL);
}



export default {
  addNewUser,
  getUserByPhoneNumber,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  deleteAllUsers
};