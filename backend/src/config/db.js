const sql = require("mssql");
require("dotenv").config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
};

const connectDB = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    console.log("Connected to Microsoft SQL Server");
    return pool;
  } catch (error) {
    console.error("Database connection failed: ", error.message);
    throw error;
  }
};

module.exports = connectDB;
