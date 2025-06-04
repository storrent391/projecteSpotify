const express = require("express");
const { check } = require("express-validator");
const {
  register,
  login,
  updateUser,
  deleteUser,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Ruta: POST /api/auth/register
router.post(
  "/register",
  [
    check("username", "El nom d'usuari és obligatori").notEmpty(),
    check("email", "El correu no és vàlid").isEmail(),
    check("password", "La contrasenya ha de tenir almenys 6 caràcters").isLength({ min: 6 }),
  ],
  register
);

// Ruta: POST /api/auth/login
router.post(
  "/login",
  [
    check("email", "El correu no és vàlid").isEmail(),
    check("password", "La contrasenya és obligatòria").notEmpty(),
  ],
  login
);

// Ruta: PUT /api/auth/update (protegit)
router.put(
  "/update",
  authMiddleware,
  [
    // Tots els camps són optatius, però si venen, han de ser vàlids
    check("email").optional().isEmail().withMessage("El correu no és vàlid"),
    check("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("La contrasenya ha de tenir almenys 6 caràcters"),
  ],
  updateUser
);

// Ruta: DELETE /api/auth/delete (protegit)
router.delete("/delete", authMiddleware, deleteUser);

module.exports = router;
