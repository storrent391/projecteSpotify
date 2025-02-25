const { poolPromise } = require("../config/db");
const sql = require("mssql");

const addSongToPlaylist = async (playlistId, songId) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("PlaylistId", sql.UniqueIdentifier, playlistId)
    .input("SongId", sql.UniqueIdentifier, songId)
    .query(
      "INSERT INTO PlaylistSongs (PlaylistId, SongId, AddedAt) OUTPUT INSERTED.* VALUES (@PlaylistId, @SongId, GETDATE())"
    );
  return result.recordset[0];
};

const removeSongFromPlaylist = async (playlistId, songId) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("PlaylistId", sql.UniqueIdentifier, playlistId)
    .input("SongId", sql.UniqueIdentifier, songId)
    .query("DELETE FROM PlaylistSongs WHERE PlaylistId = @PlaylistId AND SongId = @SongId");
};

module.exports = {
  addSongToPlaylist,
  removeSongFromPlaylist,
};
