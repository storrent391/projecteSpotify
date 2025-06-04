const sql = require("mssql");
const { poolPromise } = require("../config/db");

const getUserByEmail = async (email) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("Email", sql.VarChar, email)
    .query("SELECT * FROM Users WHERE Email = @Email");
  return result.recordset[0];
};

const getUserById = async (id) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("Id", sql.UniqueIdentifier, id)
    .query("SELECT * FROM Users WHERE Id = @Id");
  return result.recordset[0];
};

const createUser = async ({ username, email, password }) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("Username", sql.VarChar, username)
    .input("Email", sql.VarChar, email)
    .input("Password", sql.VarChar, password)
    .query(
      "INSERT INTO Users (Username, Email, Password) OUTPUT INSERTED.Id, INSERTED.Username, INSERTED.Email VALUES (@Username, @Email, @Password)"
    );
  return result.recordset[0]; // { Id, Username, Email }
};

const updateUserById = async (id, { username, email, password }) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("Id", sql.UniqueIdentifier, id)
    .input("Username", sql.VarChar, username)
    .input("Email", sql.VarChar, email)
    .input("Password", sql.VarChar, password)
    .query(`
      UPDATE Users 
      SET Username = @Username, Email = @Email, Password = @Password 
      WHERE Id = @Id;
      SELECT Id, Username, Email FROM Users WHERE Id = @Id;
    `);
  return result.recordset[0]; // { Id, Username, Email }
};

const deleteUserById = async (id) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("Id", sql.UniqueIdentifier, id)
    .query("DELETE FROM Users WHERE Id = @Id");
};

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
