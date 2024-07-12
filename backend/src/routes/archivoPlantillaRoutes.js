const express = require("express");

const routerArchivoPlantilla = express.Router();
const archivoPlantillaController = require("../controllers/archivoPlantillaController");
const { body, param } = require("express-validator");

const multer = require("multer");

const {
  AutenticacionProfesional,
} = require("../middlewares/VerifyRolProfesional");
const { AutenticacionAlumno } = require("../middlewares/verifyRolAlumno");
const { AutenticacionToken } = require("../middlewares/verifyToken");
const upload = multer({
  storage: multer.memoryStorage(),
});

routerArchivoPlantilla.post(
  "/create",
  [
    AutenticacionAlumno,
    upload.single("archivo"),
  ],
  archivoPlantillaController.subirArchivo
);


module.exports = routerArchivoPlantilla;
