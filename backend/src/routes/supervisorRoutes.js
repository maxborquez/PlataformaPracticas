const express = require("express");
const supervisorControllers = require("../controllers/supervisorController");
const { body, param } = require("express-validator");
const routerSupervisor = express.Router();
const { AutenticacionAlumno } = require("../middlewares/verifyRolAlumno");

routerSupervisor.get(
  "/getAll",
  AutenticacionAlumno,
  supervisorControllers.obtener_supervisores
);

routerSupervisor.post(
  "/create",
  [
    AutenticacionAlumno,
    body("primer_nombre")
      .notEmpty()
      .withMessage("El campo primer_nombre es requerido")
      .isString()
      .withMessage("El campo primer_nombre debe ser un string")
      .isLength({ max: 30 }),
    body("segundo_nombre")
      .optional()
      .isString()
      .withMessage("El campo segundo_nombre debe ser un string")
      .isLength({ max: 30 }),
    body("apellido_paterno")
      .notEmpty()
      .withMessage("El campo apellido_paterno es requerido")
      .isString()
      .withMessage("El campo apellido_paterno debe ser un string")
      .isLength({ max: 30 }),
    body("apellido_materno")
      .optional()
      .isString()
      .withMessage("El campo apellido_materno debe ser un string")
      .isLength({ max: 30 }),
    body("correo")
      .notEmpty()
      .withMessage("El campo correo es requerido")
      .isEmail()
      .withMessage("El campo correo debe ser un email válido")
      .isLength({ max: 100 }),
    body("telefono")
      .notEmpty()
      .withMessage("El campo teléfono es requerido")
      .isString()
      .withMessage("El campo teléfono debe ser un string")
      .isLength({ max: 15 }),
    body("cargo")
      .notEmpty()
      .withMessage("El campo cargo es requerido")
      .isString()
      .withMessage("El campo cargo debe ser un string")
      .isLength({ max: 50 }),
    body("id_empresa")
      .notEmpty()
      .withMessage("El campo id_empresa es requerido")
      .isInt()
      .withMessage("El campo id_empresa debe ser un entero"),
  ],
  supervisorControllers.crear_supervisor
);

routerSupervisor.get(
  "/show/:id",
  [
    AutenticacionAlumno,
    param("id")
      .notEmpty()
      .withMessage("El campo ID es requerido")
      .isInt()
      .withMessage("El campo ID debe ser un entero"),
  ],
  supervisorControllers.obtener_supervisor
);

routerSupervisor.put(
  "/update/:id",
  [
    AutenticacionAlumno,
    body("primer_nombre")
      .optional()
      .isString()
      .withMessage("El campo primer_nombre debe ser un string")
      .isLength({ max: 30 }),
    body("segundo_nombre")
      .optional()
      .isString()
      .withMessage("El campo segundo_nombre debe ser un string")
      .isLength({ max: 30 }),
    body("apellido_paterno")
      .optional()
      .isString()
      .withMessage("El campo apellido_paterno debe ser un string")
      .isLength({ max: 30 }),
    body("apellido_materno")
      .optional()
      .isString()
      .withMessage("El campo apellido_materno debe ser un string")
      .isLength({ max: 30 }),
    body("correo")
      .optional()
      .isEmail()
      .withMessage("El campo correo debe ser un email válido")
      .isLength({ max: 100 }),
    body("telefono")
      .optional()
      .isString()
      .withMessage("El campo teléfono debe ser un string")
      .isLength({ max: 15 }),
    body("cargo")
      .optional()
      .isString()
      .withMessage("El campo cargo debe ser un string")
      .isLength({ max: 50 }),
    body("id_empresa")
      .optional()
      .isInt()
      .withMessage("El campo id_empresa debe ser un entero"),
  ],
  supervisorControllers.actualizar_supervisor
);

routerSupervisor.delete(
  "/delete/:id",
  [
    AutenticacionAlumno,
    param("id")
      .notEmpty()
      .withMessage("El campo ID es requerido")
      .isInt()
      .withMessage("El campo ID debe ser un entero"),
  ],
  supervisorControllers.eliminar_supervisor
);

module.exports = routerSupervisor;
