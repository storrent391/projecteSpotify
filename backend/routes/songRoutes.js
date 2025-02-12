import express from "express";
import { getSongs, getSong, addSong, removeSong } from "../controllers/songController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getSongs);
router.get("/:id", getSong);
router.post("/", authMiddleware, addSong);
router.delete("/:id", authMiddleware, removeSong);

export default router;
