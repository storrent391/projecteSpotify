const { validationResult } = require("express-validator");
const {
  addSongToPlaylist,
  removeSongFromPlaylist,
} = require("../models/playlistSongModel");
const { getPlaylistById } = require("../models/playlistModel");
const { getSongById } = require("../models/songModel");

// Afegir cançó a una playlist
const addSongToPlaylistController = async (req, res, next) => {
  // Validació
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { playlistId } = req.params;
    const { songId } = req.body;
    const userId = req.user.Id;

    // Comprovar que la playlist existeix i pertany a l’usuari
    const playlist = await getPlaylistById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist no trobada" });
    }
    if (playlist.UserId.toString() !== userId) {
      return res.status(403).json({ message: "No tens permisos per afegir cançons a aquesta playlist" });
    }

    // Comprovar que la cançó existeix
    const song = await getSongById(songId);
    if (!song) {
      return res.status(404).json({ message: "Cançó no trobada" });
    }

    const added = await addSongToPlaylist(playlistId, songId);
    return res.status(201).json(added);
  } catch (error) {
    return next(error);
  }
};

// Eliminar cançó d’una playlist
const removeSongFromPlaylistController = async (req, res, next) => {
  try {
    const { playlistId, songId } = req.params;
    const userId = req.user.Id;

    const playlist = await getPlaylistById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist no trobada" });
    }
    if (playlist.UserId.toString() !== userId) {
      return res.status(403).json({ message: "No tens permisos per eliminar cançons d’aquesta playlist" });
    }

    const rows = await removeSongFromPlaylist(playlistId, songId);
    if (rows === 0) {
      return res.status(404).json({ message: "La cançó no pertanyia a la playlist" });
    }

    return res.json({ message: "Cançó eliminada de la playlist amb èxit" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addSongToPlaylistController,
  removeSongFromPlaylistController,
};
