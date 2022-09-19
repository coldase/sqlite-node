import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function connection() {
  return await open({
    filename: "./mock.db",
    driver: sqlite3.Database,
  });
}

const tableColumns =
  "(ID INTEGER PRIMARY KEY AUTOINCREMENT, organizationId VARCHAR(100), data VARCHAR(10000))";

// Create new table
function createTable(tableName: string) {
  connection().then((db) => {
    db.exec(`CREATE TABLE ${tableName} ${tableColumns}`)
      .then(() => {
        console.log(`Table: ${tableName} created`);
      })
      .catch((err) => console.log(err.message));
  });
}

// Add data
function addData(tableName: string, organizationId: string, data: string) {
  connection().then((db) => {
    db.exec(
      `INSERT INTO ${tableName} (organizationId, data) VALUES ('${organizationId}', '${data}')`
    )
      .then(() => {
        console.log(`Data added into ${tableName}`);
        db.close();
      })
      .catch((err) => console.log(err.message));
  });
}

// Get all data
function getData(tableName: string, organizationId: string) {
  connection().then((db) => {
    db.all(`SELECT * FROM ${tableName}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });
}

// Get data by organizationId
function getOne(tableName: string, organizationId: string) {
  connection().then((db) => {
    db.get(
      `SELECT * FROM ${tableName} WHERE organizationId = ?`,
      organizationId
    )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });
}

const payload = {
  name: "testingnewdataa",
  age: 31,
  status: "alive",
};

// createTable("test");
// addData("test", "00000", JSON.stringify(payload));
// getData("test", "asd");
// getOne("test", "00000");
