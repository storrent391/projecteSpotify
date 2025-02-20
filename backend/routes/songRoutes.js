const express = require("express");
const { getSongs, getSong, addSong, removeSong, updateSongController, searchSongs } = require("../controllers/songController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getSongs);
router.get("/:id", getSong);
router.get("/search", searchSongs);

router.post("/", authMiddleware, addSong);
router.put("/:id", authMiddleware, updateSongController);
router.delete("/:id", authMiddleware, removeSong);

module.exports = router;
