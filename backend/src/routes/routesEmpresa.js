const express = require("express");
const routerEmpresa = express.Router();
const empresaController = require("../controllers/empresaController");
const { body, param } = require("express-validator");

const {
  AutenticacionProfesional,
} = require("../middlewares/VerifyRolProfesional");
const { AutenticacionToken } = require("../middlewares/verifyToken");

routerEmpresa.post(
  "/create",
  [
    body("nombre")
      .notEmpty()
      .withMessage("El campo nombre es requerido")
      .isString()
      .withMessage("El campo nombre debe ser un string"),
    body("departamento")
      .notEmpty()
      .withMessage("El campo departamento es requerido")
      .isString()
      .withMessage("El campo departamento debe ser un string"),
    body("web")
      .notEmpty()
      .withMessage("El campo web es requerido")
      .isString()
      .withMessage("El campo web debe ser un string"),
    body("id_rubro")
      .notEmpty()
      .withMessage("El campo rubro es requerido")
      .isInt()
      .withMessage("El campo rubro debe ser un Int"),
    body("direccion")
      .notEmpty()
      .withMessage("El campo direccion es requerido")
      .isString()
      .withMessage("El campo direccion debe ser un string"),
    body("telefono")
      .notEmpty()
      .withMessage("El campo telefono es requerido")
      .isString()
      .withMessage("El campo telefono debe ser un string"),
    body("id_comuna")
      .notEmpty()
      .withMessage("El campo id_comuna es requerido")
      .isInt()
      .withMessage("El campo id_comuna debe ser un entero"),
  ],
  empresaController.crear_empresa
);

routerEmpresa.get(
  "/getall",
  [AutenticacionToken],
  empresaController.obtener_empresas
);

routerEmpresa.delete(
  "/delete/:id",
  [
    AutenticacionProfesional,
    param("id")
      .notEmpty()
      .withMessage("El campo id es requerido")
      .isInt()
      .withMessage("El campo id debe ser un entero"),
  ],
  empresaController.eliminar_empresa
);

routerEmpresa.get(
  "/show/:id",
  [
    AutenticacionToken,
    param("id")
      .notEmpty()
      .withMessage("El campo id es requerido")
      .isInt()
      .withMessage("El campo id debe ser un entero"),
  ],
  empresaController.mostrar_empresa
);

routerEmpresa.put(
  "/update/:id",
  [
    AutenticacionToken,
    body("nombre")
      .notEmpty()
      .withMessage("El campo nombre es requerido")
      .isString()
      .withMessage("El campo nombre debe ser un string"),
    body("departamento")
      .notEmpty()
      .withMessage("El campo departamento es requerido")
      .isString()
      .withMessage("El campo departamento debe ser un string"),
    body("web")
      .notEmpty()
      .withMessage("El campo web es requerido")
      .isString()
      .withMessage("El campo web debe ser un string"),
    body("id_rubro")
      .notEmpty()
      .withMessage("El campo rubro es requerido")
      .isInt()
      .withMessage("El campo rubro debe ser un Int"),
    body("direccion")
      .notEmpty()
      .withMessage("El campo direccion es requerido")
      .isString()
      .withMessage("El campo direccion debe ser un string"),
    body("telefono")
      .notEmpty()
      .withMessage("El campo telefono es requerido")
      .isString()
      .withMessage("El campo telefono debe ser un string"),
    body("id_comuna")
      .notEmpty()
      .withMessage("El campo id_comuna es requerido")
      .isInt()
      .withMessage("El campo id_comuna debe ser un entero"),
  ],
  empresaController.actualizar_empresa
);

routerEmpresa.post('/getByNombre', empresaController.getEmpresaByNombre);

routerEmpresa.get('/getById/:id', empresaController.getEmpresaById);

routerEmpresa.put('/aprobar/:id_empresa', empresaController.aprobarEmpresa);

module.exports = routerEmpresa;
