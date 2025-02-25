const {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
} = require("../models/playlistModel");

const createPlaylistController = async (req, res) => {
  const { name } = req.body;
  const userId = req.user?.id;

  console.log("BODY REBUT:", req.body);
  console.log("Usuari autenticat:", req.user);

  if (!name) {
    return res.status(400).json({ message: "El nom de la playlist és obligatori" });
  }

  try {
    const newPlaylist = await createPlaylist({ name, userId });
    res.status(201).json(newPlaylist);
  } catch (error) {
    console.error("Error en crear la playlist:", error);
    res.status(500).json({ message: "Error en crear la playlist", error });
  }
};

const getPlaylistsController = async (req, res) => {
  try {
    const playlists = await getAllPlaylists();
    res.json(playlists);
  } catch (error) {
    console.error("Error en obtenir les playlists:", error);
    res.status(500).json({ message: "Error en obtenir les playlists", error });
  }
};

const getPlaylistController = async (req, res) => {
  const { id } = req.params;
  try {
    const playlist = await getPlaylistById(id);
    if (!playlist) return res.status(404).json({ message: "Playlist no trobada" });
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Error en obtenir la playlist", error });
  }
};

const updatePlaylistController = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const playlist = await getPlaylistById(id);
    if (!playlist) return res.status(404).json({ message: "Playlist no trobada" });

    const updatedPlaylist = await updatePlaylist(id, { name });
    res.json(updatedPlaylist);
  } catch (error) {
    res.status(500).json({ message: "Error en modificar la playlist", error });
  }
};

const deletePlaylistController = async (req, res) => {
  const { id } = req.params;
  try {
    const playlist = await getPlaylistById(id);
    if (!playlist) return res.status(404).json({ message: "Playlist no trobada" });

    await deletePlaylist(id);
    res.json({ message: "Playlist eliminada amb èxit" });
  } catch (error) {
    res.status(500).json({ message: "Error en eliminar la playlist", error });
  }
};


module.exports = {
  createPlaylistController,
  getPlaylistsController,
  getPlaylistController,
  updatePlaylistController,
  deletePlaylistController,
};
