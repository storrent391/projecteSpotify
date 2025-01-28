const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel").default;

// Secret key para JWT
const SECRET_KEY = process.env.JWT_SECRET;

// Controlador para registrar un usuario
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Hash de la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear el usuario en la base de datos
    const newUser = await User.createUser({
      username,
      email,
      password: hashedPassword,
    });

    // Generar un token JWT
    const token = jwt.sign(
      { id: newUser.UUID, username: newUser.Username, type: "user" },
      SECRET_KEY,
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

// Controlador para iniciar sesión
const login = async (req, res) => {
  const { email, password } = {
    email: req.body.email,
    password: req.body.password || req.body.Password,
  };

  try {
    const user = await User.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.Password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar un token JWT
    const token = jwt.sign(
      { id: user.UUID, username: user.Username, type: "user" },
      SECRET_KEY,
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

module.exports = { register, login };
