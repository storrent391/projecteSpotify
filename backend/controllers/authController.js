const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserByEmail, getUserById, updateUserById, deleteUserById } = require("../models/userModel");
require("dotenv").config();

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Tots els camps són obligatoris" });
  }

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Aquest correu ja està en ús" });
    }

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


const updateUser = async (req, res) => {
  const userId = req.user.id; 
  const { username, email, password } = req.body;

  try {
    const user = await getUserById(userId);
    if (!user) return res.status(404).json({ message: "Usuari no trobat" });


    if (email && email !== user.Email) {
      const existingEmail = await getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ message: "Aquest correu ja està en ús" });
      }
    }


    let hashedPassword = user.Password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

  
    const updatedUser = await updateUserById(userId, {
      username: username || user.Username,
      email: email || user.Email,
      password: hashedPassword,
    });

    res.json({ message: "Usuari actualitzat correctament", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error al modificar l'usuari", error });
  }
};


const deleteUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await getUserById(userId);
    if (!user) return res.status(404).json({ message: "Usuari no trobat" });

    await deleteUserById(userId);
    res.json({ message: "Usuari eliminat correctament" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar l'usuari", error });
  }
};

module.exports = { register, login, updateUser, deleteUser };
