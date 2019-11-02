const mysql = require("mysql2");

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: "tendenciasdb.cirt9lkaraum.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "0B-e-a8969",
  database: "control3db",
  port: 3306
});

async function testConnection() {
  try {
    const result = await pool.promise().query("select 1 + 1");
    console.log("The reult is (mysql):", result[0]);
  } catch (error) {
    console.error("Error trying to connect:", error);
  }
}

/** @returns [rows, fields, error] */
async function query({ sql, args }) {
  try {
    return await pool.promise().query(sql, args);
  } catch (error) {
    console.log("Query error:", error);
    return [null, null, error];
  }
}

/** @param sql - string */
function SQL(sql, ...args) {
  if (typeof sql === "string") return { sql, args: undefined };
  else if (Array.isArray(sql)) {
    return { sql: sql.join("?"), args };
  } else throw new Error("SQL: Type error exception");
}

testConnection();

module.exports = {
  query,
  SQL
};
