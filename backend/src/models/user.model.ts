import sqlite3 from "../db/sqlite3"
import queries from "../db/sqlite3/queries";

interface User {
  id?: number,
  name: string,
  phoneNumber: number,
  address: string
  createdAt?: string
}



async function addNewUser(user: User): Promise<void> {
  await sqlite3.insert(queries.INSERT_USER_RECORD_SQL, user.name, user.phoneNumber, user.address);
  const newUser = sqlite3.select(queries.SELECT_LAST_USER_RECORD_SQL);
  console.log(newUser);
}
