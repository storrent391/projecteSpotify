require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const songRoutes = require("./routes/songRoutes");
const playlistRoutes = require("./routes/playlistRoutes");

const app = express();

// Middlewares globals
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Rutes
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/playlists", playlistRoutes);

// Middleware global de gestió d’errors
app.use((err, req, res, next) => {
  console.error(err); // Logo intern, no s’envia al client
  res.status(err.statusCode || 500).json({
    message: err.clientMessage || "Ha ocorregut un error intern",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor en execució a http://localhost:${PORT}`);
});
