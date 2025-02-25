const express = require("express");
const {
  createPlaylistController,
  getPlaylistsController,
  getPlaylistController,
  updatePlaylistController,
  deletePlaylistController,
} = require("../controllers/playlistController");
const {
  addSongToPlaylistController,
  removeSongFromPlaylistController,
} = require("../controllers/playlistSongController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Rutes per a Playlists
router.post("/", authMiddleware, createPlaylistController);
router.get("/", getPlaylistsController);
router.get("/:id", getPlaylistController);
router.put("/:id", authMiddleware, updatePlaylistController);
router.delete("/:id", authMiddleware, deletePlaylistController);

// Rutes per afegir i eliminar cançons de les playlists
router.post("/add-song", authMiddleware, addSongToPlaylistController);
router.delete("/remove-song/:playlistId/:songId", authMiddleware, removeSongFromPlaylistController);

module.exports = router;
