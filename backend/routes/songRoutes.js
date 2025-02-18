const express = require("express");
const { getSongs, getSong, addSong, removeSong } = require("../controllers/songController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getSongs);
router.get("/:id", getSong);
router.post("/", authMiddleware, addSong);
router.delete("/:id", authMiddleware, removeSong);

module.exports = router;
