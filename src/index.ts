import sqlite3 from "sqlite3";
import { open } from "sqlite";

enum ORDER {
  ASC = "ASC",
  DESC = "DESC",
}

async function connection() {
  return await open({
    filename: "./mock.db",
    driver: sqlite3.Database,
  });
}

// Create new table
async function createTable(tableName: string) {
  try {
    const db = await connection();
    await db.exec(
      `CREATE TABLE ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, organizationId INTEGER NOT NULL)`
    );
    console.log(`Table: ${tableName} created`);
  } catch (err) {
    console.log(err);
  }
}

// Add data
async function addData(tableName: string, organizationId: number) {
  try {
    const db = await connection();
    await db.exec(
      `INSERT INTO ${tableName} (organizationId) VALUES ('${organizationId}')`
    );
    console.log(`Data added into ${tableName}`);
  } catch (err) {
    console.log(err);
  }
}

// Get all data with table name and order (ASC, DESC)
async function getData(tableName: string, order: string) {
  try {
    const db = await connection();
    const data = await db.all(
      `SELECT * FROM ${tableName} ORDER BY id ${order}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Get data by organizationId
async function getDataByOrganizationId(
  tableName: string,
  organizationId: number
) {
  try {
    const db = await connection();
    const data = await db.get(
      `SELECT * FROM ${tableName} WHERE organizationId = ?`,
      organizationId
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}

// createTable("testtable2");
// addData("testtable", 202021);
// getData("testtable", ORDER.ASC).then((data) => console.log(data));
// getDataByOrganizationId("testtable", 202021).then((d) => console.log(d));
