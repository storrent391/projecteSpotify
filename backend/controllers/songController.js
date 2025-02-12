import { getAllSongs, getSongById, createSong, deleteSong } from "../models/songModel.js";

export const getSongs = async (req, res) => {
  try {
    const songs = await getAllSongs();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: "Error en obtenir les cançons", error });
  }
};

export const getSong = async (req, res) => {
  try {
    const song = await getSongById(req.params.id);
    if (!song) return res.status(404).json({ message: "Cançó no trobada" });
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: "Error en obtenir la cançó", error });
  }
};

export const addSong = async (req, res) => {
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

export const removeSong = async (req, res) => {
  try {
    const song = await getSongById(req.params.id);
    if (!song) return res.status(404).json({ message: "Cançó no trobada" });

    await deleteSong(req.params.id);
    res.json({ message: "Cançó eliminada amb èxit" });
  } catch (error) {
    res.status(500).json({ message: "Error en eliminar la cançó", error });
  }
};
