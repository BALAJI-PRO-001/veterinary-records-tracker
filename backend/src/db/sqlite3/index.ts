import sqlite3 from "sqlite3";
import fs from "fs/promises";



class Sqlite3Error extends Error {
  constructor(message: string) {
    super(message);
  }
};


class Sqlite3 {
  db: sqlite3.Database | null;

  constructor() {
    this.db = null;
  }

  async connectAndCreateDatabase(path: string, databaseName: string): Promise<sqlite3.Database | Sqlite3Error> {
    try {
      await fs.access(path);
    } catch(err) {
      await fs.mkdir(path);
    }
  
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(path + databaseName + ".db", (err) => {
        if (err) {
          reject(new Sqlite3Error("SQLite3 database connection error: " + err.message));
        } else {
          this.db = db;
          resolve(db);
        }
      });
    });
  }



  async createTables(...queries: string[]): Promise<void | Sqlite3Error> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject(new Sqlite3Error("Database not connected."));
      }
      
      const promises = queries.map((query) => {
        return new Promise<void>((resolveQuery, rejectQuery) => {
          this.db!.run(query, (err) => {
            if (err) {
              rejectQuery(`${err.message} while executing query: "${query}"`)
            } else {
              resolveQuery();
            }
          });
        });
      });

      Promise.all(promises)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }



  async insert(sql: string, ...values: any[]): Promise<void | Sqlite3Error> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject(new Sqlite3Error("Database not connected."));
      }

      this.db.run(sql, values, (err) => {
        if (err) {
          reject(new Sqlite3Error(`${err.message} while executing query: "${sql}"`));
        } else {
          resolve();
        }
      });
    });
  }



  async select(sql: string, selectAll: boolean, ...values: any[]): Promise<unknown> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject(new Sqlite3Error("Database not connected."));
      }

      function callback(err: Error, rows: unknown[]) {
        if (err) {
          reject(new Sqlite3Error(`${err.message} while executing query: "${sql}"`));
        } else {
          resolve(rows);
        }
      }
      
      if (selectAll) {
        return this.db.all(sql, values, callback);
      } else {
        return this.db.get(sql, values, callback);
      }
    });
  }



  async update(sql: string, ...values: any[]): Promise<void | Sqlite3Error> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject(new Sqlite3Error("Database not connected."));
      }

      this.db.run(sql, values, (err) => {
        if (err) {
          reject(new Sqlite3Error(`${err.message} while executing query: "${sql}"`));
        } else {
          resolve();
        }
      });
    });
  }



  async delete(sql: string, ...values: any[]): Promise<void | Sqlite3Error> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject(new Sqlite3Error("Database not connected."));
      }

      this.db.run(sql, values, (err) => {
        if (err) {
          reject(new Sqlite3Error(`${err.message} while executing query: "${sql}"`));
        } else {
          resolve();
        }
      });
    });
  }

}



export default new Sqlite3;