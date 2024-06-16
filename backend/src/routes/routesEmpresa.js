
const express = require("express");
const routerEmpresa = express.Router();
const empresaController = require("../controllers/empresaController");
const { body, param } = require("express-validator");

const {AutenticacionProfesional} = require("../middlewares/VerifyRolProfesional");
const {AutenticacionToken} = require("../middlewares/verifyToken");

//rut_empresa,razon_social,direccion,id_comuna, id_estado_empresa
routerEmpresa.post("/create",
[
    AutenticacionProfesional,
body("rut_empresa").notEmpty().withMessage("El campo rut_empresa es requerido").isString().withMessage("El campo rut debe ser un string"),
body("razon_social").notEmpty().withMessage("el campo razon_social es requerido").isString().withMessage("El campo razon social debe ser un string"),
body("direccion").notEmpty().withMessage().isString().withMessage("El campo direccion ser un string"),
body("correo").notEmpty().withMessage("El campo email ser requerido").isEmail().withMessage("El campo correo debe ser email"),
body("telefono").notEmpty().withMessage("El campo telefono es requerido").isString().withMessage("El campo telefono debe ser email"),
body("id_comuna").notEmpty().withMessage("El campo id_comuna es requerido").isInt().withMessage("El campo id_comuna debe ser un entero"),
body("id_estado_empresa").notEmpty().withMessage("El campo id_estado_empresa es requerido").withMessage("El campo id_estado_comuna debe ser un entero")
],
empresaController.crear_empresa);

routerEmpresa.get("/getall",[AutenticacionToken],empresaController.obtener_empresas);

routerEmpresa.delete("/delete/:id",[
   AutenticacionProfesional, 
   param("id").notEmpty().withMessage("El campo id es requerido").isInt().withMessage("El campo id debe ser un entero")
],empresaController.eliminar_empresa);

routerEmpresa.get("/show/:id",[
    AutenticacionToken,
    param("id").notEmpty().withMessage("El campo id es requerido").isInt().withMessage("El campo id debe ser un entero")
],empresaController.mostrar_empresa);

routerEmpresa.put("/update/:id",
[
AutenticacionToken,
body("rut_empresa").notEmpty().withMessage("El campo rut_empresa es requerido").isString().withMessage("El campo rut debe ser un string"),
body("razon_social").notEmpty().withMessage("el campo razon_social es requerido").isString().withMessage("El campo razon social debe ser un string"),
body("direccion").notEmpty().withMessage().isString().withMessage("El campo direccion ser un string"),
body("correo").notEmpty().withMessage("El campo email ser requerido").isEmail().withMessage("El campo correo debe ser email"),
body("telefono").notEmpty().withMessage("El campo telefono es requerido").isString().withMessage("El campo telefono debe ser email"),
body("id_comuna").notEmpty().withMessage("El campo id_comuna es requerido").isInt().withMessage("El campo id_comuna debe ser un entero"),
body("id_estado_empresa").notEmpty().withMessage("El campo id_estado_empresa es requerido").withMessage("El campo id_estado_comuna debe ser un entero")
],
empresaController.actualizar_empresa);

module.exports=routerEmpresa;