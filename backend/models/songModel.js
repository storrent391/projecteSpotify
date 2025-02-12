import { poolPromise } from "../config/db.js";

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

const getSongById = async (id) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("Id", id)
    .query("SELECT * FROM Songs WHERE Id = @Id");
  return result.recordset[0];
};

const createSong = async ({ title, artist, userId }) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("Title", title)
    .input("Artist", artist)
    .input("UserId", userId)
    .query(
      "INSERT INTO Songs (Title, Artist, UserId) OUTPUT INSERTED.* VALUES (@Title, @Artist, @UserId)"
    );
  return result.recordset[0];
};

const deleteSong = async (id) => {
  const pool = await poolPromise;
  await pool.request().input("Id", id).query("DELETE FROM Songs WHERE Id = @Id");
};

export { Song, getAllSongs, getSongById, createSong, deleteSong };
