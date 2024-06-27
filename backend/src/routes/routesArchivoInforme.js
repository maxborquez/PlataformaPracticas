const express = require("express");
const routerArchivoInforme = express.Router();
const archivoInformeController = require("../controllers/archivoInformeController");
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

routerArchivoInforme.post(
  "/create",
  [
    AutenticacionAlumno,
    upload.single("archivo"),
    body("tipo_archivo")
      .notEmpty()
      .withMessage("El campo tipo_archivo es requerido"),
    body("id_inscripcion")
      .notEmpty()
      .withMessage("El campo id_inscripcion es requerido")
      .isInt()
      .withMessage("El campo id_inscripcion debe ser entero"),
  ],
  archivoInformeController.subirArchivo
);

routerArchivoInforme.post(
  "/getall",
  [
    AutenticacionToken,
    body("id_inscripcion")
      .notEmpty()
      .withMessage("El campo id_inscripcion es requerido")
      .isInt()
      .withMessage("El campo id_inscripcion debe ser entero"),
  ],
  archivoInformeController.mostrar_archivos
);

routerArchivoInforme.delete(
  "/delete/:id",
  [
    AutenticacionAlumno,
    param("id")
      .notEmpty()
      .withMessage("El campo id es requerido")
      .isInt()
      .withMessage("El campo id debe ser entero"),
  ],
  archivoInformeController.eliminar_archivo
);

routerArchivoInforme.get(
  "/show/:id",
  [AutenticacionToken],
  archivoInformeController.mostrar_archivo
);

routerArchivoInforme.get(
  "/tabla_vacia",
  [AutenticacionToken],
  archivoInformeController.comprobarTablaVacia
);

routerArchivoInforme.get('/getPendientes', archivoInformeController.getPendientes);


module.exports = routerArchivoInforme;
