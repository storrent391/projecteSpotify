const express = require("express");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getSongs,
  getSong,
  addSong,
  updateSongController,
  removeSong,
  searchSongsController,
} = require("../controllers/songController");

const router = express.Router();

// GET /api/songs?page=1&limit=20
router.get("/", getSongs);

// GET /api/songs/search?title=...&artist=...
router.get("/search", searchSongsController);

// GET /api/songs/:id
router.get("/:id", getSong);

// POST /api/songs (crea, necessitat d’autenticació)
router.post(
  "/",
  authMiddleware,
  [
    check("title", "El títol és obligatori").notEmpty(),
    check("artist", "L'artista és obligatori").notEmpty(),
  ],
  addSong
);

// PUT /api/songs/:id (actualitza, necessitat d’autenticació + autorització interna)
router.put(
  "/:id",
  authMiddleware,
  [
    // Almenys un camp (title o artist) ha de venir
    check("title")
      .optional()
      .notEmpty()
      .withMessage("Si es proporciona, el títol no pot estar buit"),
    check("artist")
      .optional()
      .notEmpty()
      .withMessage("Si es proporciona, l'artista no pot estar buit"),
  ],
  updateSongController
);

// DELETE /api/songs/:id (elimina, necessitat d’autenticació + autorització interna)
router.delete("/:id", authMiddleware, removeSong);

module.exports = router;
