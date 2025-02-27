const { addSongToPlaylist, removeSongFromPlaylist } = require("../models/playlistSongModel");

const addSongToPlaylistController = async (req, res) => {
  const { playlistId, songId } = req.body;

  console.log("Afegint cançó a la playlist:", { playlistId, songId });

  if (!playlistId || !songId) {
    return res.status(400).json({ message: "Cal proporcionar PlaylistId i SongId" });
  }

  try {
    const addedSong = await addSongToPlaylist(playlistId, songId);
    res.status(201).json(addedSong);
  } catch (error) {
    console.error("Error en afegir la cançó a la playlist:", error);
    res.status(500).json({ message: "Error en afegir la cançó a la playlist", error });
  }
};

const removeSongFromPlaylistController = async (req, res) => {
  const { playlistId, songId } = req.params;

  console.log("Eliminant cançó de la playlist:", { playlistId, songId });

  if (!playlistId || !songId) {
    return res.status(400).json({ message: "Cal proporcionar PlaylistId i SongId" });
  }

  try {
    await removeSongFromPlaylist(playlistId, songId);
    res.json({ message: "Cançó eliminada de la playlist amb èxit" });
  } catch (error) {
    console.error("Error en eliminar la cançó de la playlist:", error);
    res.status(500).json({ message: "Error en eliminar la cançó de la playlist", error });
  }
};

module.exports = {
  addSongToPlaylistController,
  removeSongFromPlaylistController,
}