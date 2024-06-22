const express = require("express");
const routerArchivoEvaluacion = express.Router();
const archivoEvaluacionController = require("../controllers/archivoEvaluacionController");
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

routerArchivoEvaluacion.post(
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
  archivoEvaluacionController.subirArchivo
);

routerArchivoEvaluacion.post(
  "/getall",
  [
    AutenticacionToken,
    body("id_inscripcion")
      .notEmpty()
      .withMessage("El campo id_inscripcion es requerido")
      .isInt()
      .withMessage("El campo id_inscripcion debe ser entero"),
  ],
  archivoEvaluacionController.mostrar_archivos
);

routerArchivoEvaluacion.delete(
  "/delete/:id",
  [
    AutenticacionAlumno,
    param("id")
      .notEmpty()
      .withMessage("El campo id es requerido")
      .isInt()
      .withMessage("El campo id debe ser entero"),
  ],
  archivoEvaluacionController.eliminar_archivo
);

routerArchivoEvaluacion.get(
  "/show/:id",
  [AutenticacionToken],
  archivoEvaluacionController.mostrar_archivo
);

routerArchivoEvaluacion.get(
  "/tabla_vacia",
  [AutenticacionToken],
  archivoEvaluacionController.comprobarTablaVacia
);

module.exports = routerArchivoEvaluacion;
