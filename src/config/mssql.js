const sql = require("mssql");

const config = {
  user: "luisgh",
  password: "4Km#9Wze",
  server: "tendencias.database.windows.net", // You can use 'localhost\\instance' to connect to named instance
  database: "tend",

  options: {
    encrypt: true // Use this if you're on Windows Azure
  }
};

async function test() {
  try {
    await sql.connect(config);
    const result = await sql.query(
      `select * from Usuario where password = 'admin'`
    );
    console.log("result test:", result.recordset);
  } catch (error) {
    console.error(error);
  }
}

// async function _sql() {
//   return await sql.connect(config);
// }
test();
module.exports = {
  config,
  sql
};
