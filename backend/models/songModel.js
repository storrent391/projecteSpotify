const sql = require("mssql");
const { poolPromise } = require("../config/db");

class Song {
  constructor(id, title, artist, userId) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.userId = userId;
  }
}

const getAllSongs = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query("SELECT * FROM Songs");
  return result.recordset;
};

const getSongByIdOrTitle = async (identifier) => {
  try {
    const pool = await poolPromise;
    let query, request;

    if (/^[0-9a-fA-F-]{36}$/.test(identifier)) {
      query = "SELECT * FROM Songs WHERE Id = @Identifier";
      request = pool.request().input("Identifier", sql.UniqueIdentifier, identifier);
    } else {
      query = "SELECT * FROM Songs WHERE Title = @Identifier";
      request = pool.request().input("Identifier", sql.VarChar, identifier);
    }

    const result = await request.query(query);
    return result.recordset[0];
  } catch (error) {
    console.error("Error en obtenir la cançó:", error);
    throw error;
  }
};

const createSong = async ({ title, artist, userId }) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("Title", sql.VarChar, title)
    .input("Artist", sql.VarChar, artist)
    .input("UserId", sql.UniqueIdentifier, userId)
    .query("INSERT INTO Songs (Title, Artist, UserId) OUTPUT INSERTED.* VALUES (@Title, @Artist, @UserId)");
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
  return result.rowsAffected[0];
};


const deleteSong = async (id) => {
  const pool = await poolPromise;
  console.log("Intentant eliminar cançó amb ID:", id);

  const result = await pool.request()
    .input("Id", sql.UniqueIdentifier, id)
    .query("DELETE FROM Songs WHERE Id = @Id");

  console.log("Files eliminades:", result.rowsAffected[0]);
  return result.rowsAffected[0];
};

module.exports = { Song, getAllSongs, getSongByIdOrTitle, createSong, updateSong, deleteSong };
