const { validationResult } = require("express-validator");
const {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
  searchSongs,
} = require("../models/songModel");

const getSongs = async (req, res, next) => {
  try {
    // Paginació opcional: ?page=1&limit=20
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const songs = await getAllSongs({ page, limit });
    return res.json(songs);
  } catch (error) {
    return next(error);
  }
};

const getSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await getSongById(id);
    if (!song) {
      return res.status(404).json({ message: "Cançó no trobada" });
    }
    return res.json(song);
  } catch (error) {
    return next(error);
  }
};

const addSong = async (req, res, next) => {
  // Validació amb express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, artist } = req.body;
    const userId = req.user.Id;

    const newSong = await createSong({ title, artist, UserId: userId });
    return res.status(201).json(newSong);
  } catch (error) {
    return next(error);
  }
};

const updateSongController = async (req, res, next) => {
  // Validació amb express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { title, artist } = req.body;
    const userId = req.user.Id;

    const existingSong = await getSongById(id);
    if (!existingSong) {
      return res.status(404).json({ message: "Cançó no trobada" });
    }
    // Autorització: només el propietari pot modificar
    if (existingSong.UserId.toString() !== userId) {
      return res.status(403).json({ message: "No tens permisos per modificar aquesta cançó" });
    }

    const rowsAffected = await updateSong(id, { title, artist });
    if (rowsAffected > 0) {
      return res.json({ message: "Cançó actualitzada correctament" });
    } else {
      return res.status(400).json({ message: "No s'ha fet cap canvi a la cançó" });
    }
  } catch (error) {
    return next(error);
  }
};

const removeSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.Id;

    const existingSong = await getSongById(id);
    if (!existingSong) {
      return res.status(404).json({ message: "Cançó no trobada" });
    }
    // Autorització: només el propietari pot eliminar
    if (existingSong.UserId.toString() !== userId) {
      return res.status(403).json({ message: "No tens permisos per eliminar aquesta cançó" });
    }

    await deleteSong(id);
    return res.json({ message: "Cançó eliminada amb èxit" });
  } catch (error) {
    return next(error);
  }
};

const searchSongsController = async (req, res, next) => {
  try {
    const { title, artist } = req.query;
    const results = await searchSongs({ title, artist });
    return res.json(results);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getSongs,
  getSong,
  addSong,
  updateSongController,
  removeSong,
  searchSongsController,
};
