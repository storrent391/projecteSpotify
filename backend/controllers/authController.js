const jwt = require("jsonwebtoken");
const { getUserByEmail, createUser } = require("../models/userModel");

const login = async (req, res) => {
  const { email, password } = {
    email: req.body.email,
    password: req.body.password || req.body.Password, // Normalización
  };

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (password.trim() !== user.Password.trim()) {
      console.log("Las contraseñas no coinciden");
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.UUID, username: user.Username, type: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      username: user.Username,
      email: user.Email,
    });
  } catch (error) {
    console.error("Error en el servidor:", error.message);
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const newUser = await createUser({ username, email, password });

    const token = jwt.sign(
      { id: newUser.UUID, username: newUser.Username, type: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
      username: newUser.Username,
      email: newUser.Email,
    });
  } catch (error) {
    console.error("Error en el servidor:", error.message);
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

module.exports = { login, register };
