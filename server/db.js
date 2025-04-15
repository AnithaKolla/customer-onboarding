const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "3123",
  database: "onboarding",
});

db.connect((err) => {
  if (err) {
    console.error(
      "MySQL Connection Failed:",
      err
    );
  } else {
    console.log("MySQL Connected!");
  }
});

module.exports = db;
