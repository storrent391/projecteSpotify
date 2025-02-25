const { getAllSongs, getSongByIdOrTitle, createSong, deleteSong, updateSong } = require("../models/songModel");
const sql = require("mssql");

const getSongs = async (req, res) => {
  try {
    const songs = await getAllSongs();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: "Error en obtenir les cançons", error });
  }
};

const getSong = async (req, res) => {
  try {
    const song = await getSongByIdOrTitle(req.params.id);
    if (!song) return res.status(404).json({ message: "Cançó no trobada" });
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: "Error en obtenir la cançó", error });
  }
};

const addSong = async (req, res) => {
  const { title, artist } = req.body;
  if (!title || !artist) {
    return res.status(400).json({ message: "Tots els camps són obligatoris" });
  }

  try {
    const newSong = await createSong({ title, artist, userId: req.user.id });
    res.status(201).json(newSong);
  } catch (error) {
    res.status(500).json({ message: "Error en afegir la cançó", error });
  }
};

const updateSongController = async (req, res) => {
  const { id } = req.params;
  const { title, artist } = req.body;

  if (!title && !artist) {
    return res.status(400).json({ message: "Cal proporcionar almenys un camp per actualitzar" });
  }
  
  try {
    const song = await getSongByIdOrTitle(id);
    if (!song) return res.status(404).json({ message: "Cançó no trobada" });

    const updatedRows = await updateSong(id, { title, artist });

    if (updatedRows > 0) {
      res.json({ message: "Cançó actualitzada correctament" });
    } else {
      res.status(400).json({ message: "No s'ha fet cap canvi a la cançó" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en modificar la cançó", error });
  }
};

const removeSong = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "ID no proporcionat" });

    const song = await getSongByIdOrTitle(id);
    if (!song) return res.status(404).json({ message: "Cançó no trobada" });

    await deleteSong(id);
    res.json({ message: "Cançó eliminada amb èxit" });
  } catch (error) {
    res.status(500).json({ message: "Error en eliminar la cançó", error });
  }
};

const searchSongs = async (req, res) => {
  const { title, artist } = req.query;

  try {
    const pool = await poolPromise;
    const request = pool.request();

    if (title) request.input("Title", sql.VarChar, `%${title}%`);
    if (artist) request.input("Artist", sql.VarChar, `%${artist}%`);

    const result = await request.query(`
      SELECT * FROM Songs
      WHERE (@Title IS NULL OR Title LIKE '%' + @Title + '%')
      AND (@Artist IS NULL OR Artist LIKE '%' + @Artist + '%')
    `);

    res.json(result.recordset);
  } catch (error) {
    console.error("Error en la cerca de cançons:", error);
    res.status(500).json({ message: "Error en la cerca de cançons", error });
  }
};


module.exports = { getSongs, getSong, addSong, updateSongController, removeSong, searchSongs };
