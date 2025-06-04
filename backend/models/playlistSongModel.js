const sql = require("mssql");
const { poolPromise } = require("../config/db");

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
  const result = await pool
    .request()
    .input("PlaylistId", sql.UniqueIdentifier, playlistId)
    .input("SongId", sql.UniqueIdentifier, songId)
    .query("DELETE FROM PlaylistSongs WHERE PlaylistId = @PlaylistId AND SongId = @SongId");
  return result.rowsAffected[0];
};

// Opcional: obtenir totes les cançons d’una playlist (JOIN)
const getSongsByPlaylistId = async (playlistId) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("PlaylistId", sql.UniqueIdentifier, playlistId)
    .query(`
      SELECT s.*
      FROM Songs s
      INNER JOIN PlaylistSongs ps ON s.Id = ps.SongId
      WHERE ps.PlaylistId = @PlaylistId
      ORDER BY ps.AddedAt DESC
    `);
  return result.recordset;
};

module.exports = {
  addSongToPlaylist,
  removeSongFromPlaylist,
  getSongsByPlaylistId,
};
