const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserByEmail, createUser } = require("../models/userModel");
require("dotenv").config();

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Tots els camps són obligatoris" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ username, email, password: hashedPassword });

    res.status(201).json({ message: "Usuari creat amb èxit", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar l'usuari", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.Password))) {
      return res.status(401).json({ message: "Credencials incorrectes" });
    }

    const token = jwt.sign({ id: user.Id, email: user.Email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login correcte", token });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sessió", error });
  }
};

module.exports = { register, login };
