const sql = require("mssql");
const { poolPromise } = require("../config/db");

class Song {
  constructor(id, title, artist, UserId) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.userId = UserId;
  }
}

const getAllSongs = async ({ page = 1, limit = 20 }) => {
  const pool = await poolPromise;
  const offset = (page - 1) * limit;
  // Exemple de paginació amb OFFSET FETCH
  const result = await pool
    .request()
    .input("Limit", sql.Int, limit)
    .input("Offset", sql.Int, offset)
    .query(`
      SELECT * FROM Songs
      ORDER BY Title
      OFFSET @Offset ROWS FETCH NEXT @Limit ROWS ONLY
    `);
  return result.recordset;
};

const getSongById = async (id) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("Id", sql.UniqueIdentifier, id)
    .query("SELECT * FROM Songs WHERE Id = @Id");
  return result.recordset[0];
};

const createSong = async ({ title, artist, UserId }) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("Title", sql.VarChar, title)
    .input("Artist", sql.VarChar, artist)
    .input("UserId", sql.UniqueIdentifier, UserId)
    .query(
      "INSERT INTO Songs (Title, Artist, UserId) OUTPUT INSERTED.* VALUES (@Title, @Artist, @UserId)"
    );
  return result.recordset[0];
};

const updateSong = async (id, { title, artist }) => {
  const pool = await poolPromise;
  let query = "UPDATE Songs SET ";
  const updates = [];
  const request = pool.request();

  if (title) {
    updates.push("Title = @Title");
    request.input("Title", sql.VarChar, title);
  }
  if (artist) {
    updates.push("Artist = @Artist");
    request.input("Artist", sql.VarChar, artist);
  }
  if (updates.length === 0) {
    throw new Error("No hi ha camps per actualitzar");
  }
  query += updates.join(", ") + " WHERE Id = @Id";
  request.input("Id", sql.UniqueIdentifier, id);

  const result = await request.query(query);
  return result.rowsAffected[0]; // nombre de files afectades
};

const deleteSong = async (id) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("Id", sql.UniqueIdentifier, id)
    .query("DELETE FROM Songs WHERE Id = @Id");
  return result.rowsAffected[0];
};

const searchSongs = async ({ title, artist }) => {
  const pool = await poolPromise;
  const request = pool.request();
  if (title) {
    request.input("Title", sql.VarChar, `%${title}%`);
  } else {
    request.input("Title", sql.VarChar, null);
  }
  if (artist) {
    request.input("Artist", sql.VarChar, `%${artist}%`);
  } else {
    request.input("Artist", sql.VarChar, null);
  }

  const result = await request.query(`
    SELECT * FROM Songs
    WHERE (@Title IS NULL OR Title LIKE @Title)
      AND (@Artist IS NULL OR Artist LIKE @Artist)
  `);
  return result.recordset;
};

module.exports = {
  Song,
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
  searchSongs,
};
