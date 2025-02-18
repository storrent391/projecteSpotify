const { poolPromise } = require("../config/db");

class User {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

const getUserByEmail = async (email) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("Email", email)
    .query("SELECT * FROM Users WHERE Email = @Email");
  return result.recordset[0];
};

const createUser = async ({ username, email, password }) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("Username", username)
    .input("Email", email)
    .input("Password", password)
    .query(
      "INSERT INTO Users (Username, Email, Password) OUTPUT INSERTED.* VALUES (@Username, @Email, @Password)"
    );
  return result.recordset[0];
};

module.exports = { getUserByEmail, createUser, User };
