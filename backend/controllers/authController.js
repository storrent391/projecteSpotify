const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const {
  getUserByEmail,
  getUserById,
  updateUserById,
  deleteUserById,
  createUser,
} = require("../models/userModel");

require("dotenv").config();

const register = async (req, res, next) => {
  // Validació amb express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Aquest correu ja està en ús" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ username, email, password: hashedPassword });
    return res.status(201).json({
      message: "Usuari creat amb èxit",
      user: { id: newUser.Id, username: newUser.Username, email: newUser.Email },
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  // Validació amb express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.Password))) {
      return res.status(401).json({ message: "Credencials incorrectes" });
    }

    const token = jwt.sign(
      { Id: user.Id, Email: user.Email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({ message: "Login correcte", token });
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  // Validació amb express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.user.Id;
    const { username, email, password } = req.body;

    const existingUser = await getUserById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "Usuari no trobat" });
    }

    if (email && email !== existingUser.Email) {
      const already = await getUserByEmail(email);
      if (already) {
        return res.status(400).json({ message: "Aquest correu ja està en ús" });
      }
    }

    let hashedPassword = existingUser.Password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await updateUserById(userId, {
      username: username || existingUser.Username,
      email: email || existingUser.Email,
      password: hashedPassword,
    });

    return res.json({
      message: "Usuari actualitzat correctament",
      user: { id: updatedUser.Id, username: updatedUser.Username, email: updatedUser.Email },
    });
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.user.Id;
    const existingUser = await getUserById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "Usuari no trobat" });
    }

    await deleteUserById(userId);
    return res.json({ message: "Usuari eliminat correctament" });
  } catch (error) {
    return next(error);
  }
};

module.exports = { register, login, updateUser, deleteUser };
