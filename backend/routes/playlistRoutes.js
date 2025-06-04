const express = require("express");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createPlaylistController,
  getPlaylistsController,
  getPlaylistController,
  updatePlaylistController,
  deletePlaylistController,
  getSongsInPlaylistController,
} = require("../controllers/playlistController");
const {
  addSongToPlaylistController,
  removeSongFromPlaylistController,
} = require("../controllers/playlistSongController");

const router = express.Router();

// Rutes per a Playlists
// POST /api/playlists   → crea nova playlist (auth)
router.post(
  "/",
  authMiddleware,
  [check("name", "El nom de la playlist és obligatori").notEmpty()],
  createPlaylistController
);

// GET /api/playlists    → llista totes les playlists
router.get("/", getPlaylistsController);

// GET /api/playlists/:id → detalls d’una playlist
router.get("/:id", getPlaylistController);

// PUT /api/playlists/:id → actualitza (nom) d’una playlist (auth + propietari)
router.put(
  "/:id",
  authMiddleware,
  [check("name", "El nom de la playlist és obligatori").notEmpty()],
  updatePlaylistController
);

// DELETE /api/playlists/:id → elimina playlist (auth + propietari)
router.delete("/:id", authMiddleware, deletePlaylistController);

// GET /api/playlists/:playlistId/songs → llista cançons d’una playlist
router.get("/:playlistId/songs", getSongsInPlaylistController);

// Rutes per a afegir/eliminar cançons d’una playlist (RESTful)
// POST   /api/playlists/:playlistId/songs   → afegeix cançó (auth + propietari)
router.post(
  "/:playlistId/songs",
  authMiddleware,
  [check("songId", "El songId és obligatori").notEmpty().isUUID().withMessage("El songId ha de ser un UUID")],
  addSongToPlaylistController
);

// DELETE /api/playlists/:playlistId/songs/:songId → elimina cançó (auth + propietari)
router.delete("/:playlistId/songs/:songId", authMiddleware, removeSongFromPlaylistController);

module.exports = router;
