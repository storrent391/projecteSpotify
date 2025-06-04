const { validationResult } = require("express-validator");
const {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
} = require("../models/playlistModel");
const { getSongsByPlaylistId } = require("../models/playlistSongModel");

// Crear nova playlist
const createPlaylistController = async (req, res, next) => {
  // Validació
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;
    const userId = req.user.Id;

    const newPlaylist = await createPlaylist({ name, userId });
    return res.status(201).json(newPlaylist);
  } catch (error) {
    return next(error);
  }
};

// Obtenir totes les playlists (poden mostrar-se en public, o bé filtrar per usuari)
const getPlaylistsController = async (req, res, next) => {
  try {
    const playlists = await getAllPlaylists();
    return res.json(playlists);
  } catch (error) {
    return next(error);
  }
};

// Obtenir playlist per Id
const getPlaylistController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const playlist = await getPlaylistById(id);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist no trobada" });
    }
    return res.json(playlist);
  } catch (error) {
    return next(error);
  }
};

// Actualitzar nom de la playlist
const updatePlaylistController = async (req, res, next) => {
  // Validació
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.Id;

    const playlist = await getPlaylistById(id);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist no trobada" });
    }
    if (playlist.UserId.toString() !== userId) {
      return res.status(403).json({ message: "No tens permisos per modificar aquesta playlist" });
    }

    const updated = await updatePlaylist(id, { name });
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
};

// Eliminar playlist
const deletePlaylistController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.Id;

    const playlist = await getPlaylistById(id);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist no trobada" });
    }
    if (playlist.UserId.toString() !== userId) {
      return res.status(403).json({ message: "No tens permisos per eliminar aquesta playlist" });
    }

    await deletePlaylist(id);
    return res.json({ message: "Playlist eliminada amb èxit" });
  } catch (error) {
    return next(error);
  }
};

// Obtenir totes les cançons d’una playlist concreta
const getSongsInPlaylistController = async (req, res, next) => {
  try {
    const { playlistId } = req.params;
    const playlist = await getPlaylistById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist no trobada" });
    }
    // Opcionalment, es podria comprovar si l’usuari té permís per veure-la (pública vs privada)

    const songs = await getSongsByPlaylistId(playlistId);
    return res.json(songs);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createPlaylistController,
  getPlaylistsController,
  getPlaylistController,
  updatePlaylistController,
  deletePlaylistController,
  getSongsInPlaylistController,
};
