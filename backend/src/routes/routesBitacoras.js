const express = require("express");
const { AutenticacionAlumno } = require("../middlewares/verifyRolAlumno");
const {
  AutenticacionProfesional,
} = require("../middlewares/VerifyRolProfesional");
const { AutenticacionToken } = require("../middlewares/verifyToken");

const routerBitacoras = express.Router();
const bitacorasController = require("../controllers/bitacorasController");
const { body, param } = require("express-validator");
//titulo,descripcion,fecha_creacion,hora_inicio,hora_fin,id_estado_bitacora,id_inscripcion_practica,id_usuario
routerBitacoras.post(
  "/create",
  bitacorasController.createBitacora
);

routerBitacoras.get(
  "/getall/:id_inscripcion_practica/:id_alumno",
  [AutenticacionToken],
  bitacorasController.mostrar_bitacoras
);

routerBitacoras.get(
  "/show/:id",
  [
    AutenticacionToken,
    param("id")
      .notEmpty()
      .withMessage("El campo id es requerido")
      .isInt()
      .withMessage("El campo id debe ser un entero"),
  ],
  bitacorasController.mostrar_bitacora
);
routerBitacoras.delete(
  "/delete/:id",
  [
    AutenticacionAlumno,
    param("id")
      .notEmpty()
      .withMessage("El campo id es requerido")
      .isInt()
      .withMessage("El campo id debe ser un entero"),
  ],
  bitacorasController.eliminar_bitacora
);

routerBitacoras.get(
  "/detalle/:id_bitacora",
  [
    AutenticacionToken,
    param("id_bitacora")
      .notEmpty()
      .withMessage("El campo id_bitacora es requerido")
      .isInt()
      .withMessage("El campo id_bitacora debe ser un entero"),
  ],
  bitacorasController.detalle_bitacora
);

routerBitacoras.put(
  "/revisar/:id_bitacora",
  [
    AutenticacionToken,
    param("id_bitacora")
      .notEmpty()
      .withMessage("El campo id_bitacora es requerido")
      .isInt()
      .withMessage("El campo id_bitacora debe ser un entero"),
  ],
  bitacorasController.revisar
);

routerBitacoras.put(
  "/update/:id_bitacora",
  bitacorasController.actualizar_bitacora
);

module.exports = routerBitacoras;
