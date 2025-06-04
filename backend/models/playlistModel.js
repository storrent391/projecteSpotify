const sql = require("mssql");
const { poolPromise } = require("../config/db");

const createPlaylist = async ({ name, userId }) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("Name", sql.VarChar, name)
    .input("UserId", sql.UniqueIdentifier, userId)
    .query(
      "INSERT INTO Playlists (Name, UserId, CreatedAt) OUTPUT INSERTED.* VALUES (@Name, @UserId, GETDATE())"
    );
  return result.recordset[0];
};

const getAllPlaylists = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query("SELECT * FROM Playlists ORDER BY CreatedAt DESC");
  return result.recordset;
};

const getPlaylistById = async (id) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("Id", sql.UniqueIdentifier, id)
    .query("SELECT * FROM Playlists WHERE Id = @Id");
  return result.recordset[0];
};

const updatePlaylist = async (id, { name }) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("Id", sql.UniqueIdentifier, id)
    .input("Name", sql.VarChar, name)
    .query(`
      UPDATE Playlists 
      SET Name = @Name 
      WHERE Id = @Id;
      SELECT * FROM Playlists WHERE Id = @Id
    `);
  return result.recordset[0];
};

const deletePlaylist = async (id) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("Id", sql.UniqueIdentifier, id)
    .query("DELETE FROM Playlists WHERE Id = @Id");
};

module.exports = {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
};
