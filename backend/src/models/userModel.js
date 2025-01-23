const connectDB = require("../config/db");

const createUser = async (email, password) => {
  const pool = await connectDB();
  const result = await pool
    .request()
    .input("email", email)
    .input("password", password)
    .query(
      "INSERT INTO Users (email, password) VALUES (@email, @password); SELECT SCOPE_IDENTITY() AS id;"
    );
  return result.recordset[0].id;
};

const getUserByEmail = async (email) => {
  const pool = await connectDB();
  const result = await pool
    .request()
    .input("email", email)
    .query("SELECT * FROM Users WHERE email = @email;");
  return result.recordset[0];
};

module.exports = { createUser, getUserByEmail };
