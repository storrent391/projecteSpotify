const { poolPromise } = require("../config/db");

const getUserByEmail = async (email) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Email", email)
      .query("SELECT * FROM Users WHERE Email = @Email");
    return result.recordset[0];
  } catch (error) {
    console.error("Error al obtener el usuario:", error.message);
    throw error;
  }
};

const createUser = async ({ username, email, password }) => {
  try {
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
  } catch (error) {
    console.error("Error al crear el usuario:", error.message);
    throw error;
  }
};

module.exports = { getUserByEmail, createUser };
