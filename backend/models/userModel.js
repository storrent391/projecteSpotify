const sql = require("mssql");
const { poolPromise } = require("../config/db");

const getUserByEmail = async (email) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Email", sql.VarChar, email)
      .query("SELECT * FROM Users WHERE Email = @Email");

    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Id", sql.UniqueIdentifier, id)
      .query("SELECT * FROM Users WHERE Id = @Id");

    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

const createUser = async ({ username, email, password }) => {
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("Username", sql.VarChar, username)
      .input("Email", sql.VarChar, email)
      .input("Password", sql.VarChar, password)
      .query("INSERT INTO Users (Username, Email, Password) VALUES (@Username, @Email, @Password)");

    return { username, email };
  } catch (error) {
    throw error;
  }
};

const updateUserById = async (id, { username, email, password }) => {
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("Id", sql.UniqueIdentifier, id)
      .input("Username", sql.VarChar, username)
      .input("Email", sql.VarChar, email)
      .input("Password", sql.VarChar, password)
      .query(
        "UPDATE Users SET Username = @Username, Email = @Email, Password = @Password WHERE Id = @Id"
      );

    return { id, username, email };
  } catch (error) {
    throw error;
  }
};

const deleteUserById = async (id) => {
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("Id", sql.UniqueIdentifier, id)
      .query("DELETE FROM Users WHERE Id = @Id");
  } catch (error) {
    throw error;
  }
};

module.exports = { getUserByEmail, getUserById, createUser, updateUserById, deleteUserById };
