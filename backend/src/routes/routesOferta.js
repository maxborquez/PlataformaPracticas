
const express = require("express");

const ofertaPracticaController = require("../controllers/ofertaPracticaController");
const { body, param } = require("express-validator");
const { AutenticacionProfesional } = require("../middlewares/VerifyRolProfesional");
const { AutenticacionToken } = require("../middlewares/verifyToken");
const routerOfertas = express.Router()


//descripcion,experiencia_laboral,cupos,id_modalidad,id_periodo_academico,id_empresa
routerOfertas.post("/create",
[
AutenticacionProfesional,
body("descripcion").notEmpty().withMessage("El campo descripcion es requerido").isString().withMessage("El campo descripcion debe ser un string"),
body("experiencia_laboral").notEmpty().withMessage("el campo experiencia laboral es requerido").isBoolean().withMessage("El campo experiencia laboral debe ser un boolean"),
body("cupos").notEmpty().withMessage("El campo cupo es requerido").isInt().withMessage("El campo cupos ser un entero"),
body("id_modalidad").notEmpty().withMessage("El campo id_modalidad es requerido").isInt().withMessage("El campo id_modalidad debe ser un entero"),
body("id_periodo_academico").notEmpty().withMessage("El campo id_periodo_academico es requerido").isInt().withMessage("El campo id_periodo_academico debe ser un entero"),
body("id_empresa").notEmpty().withMessage("El campo id_empresa es requerido").isInt().withMessage("El campo id_empresa debe ser un entero")]
,ofertaPracticaController.crear_oferta);

routerOfertas.get("/getAll",
[AutenticacionToken],
ofertaPracticaController.mostrar_ofertas);


routerOfertas.get("/show/:id",[
    AutenticacionToken,
    param("id").notEmpty().withMessage("El campo id es requerido").isInt().withMessage("El campo id debe ser entero")
],ofertaPracticaController.mostrar_oferta);

routerOfertas.delete("/delete/:id",[
    AutenticacionProfesional,
    param("id").notEmpty().withMessage("El campo id es requerido").isInt().withMessage("El campo id debe ser entero")

],ofertaPracticaController.eliminar_oferta)

routerOfertas.put("/update/:id",
[param("id").notEmpty().withMessage("El campo id es requerido").isInt().withMessage("El id debe ser entero"),
 body("descripcion").notEmpty().withMessage("El campo descripcion es requerido").isString().withMessage("El campo descripcion debe ser un string"),
body("experiencia_laboral").notEmpty().withMessage("el campo experiencia laboral es requerido").isBoolean().withMessage("El campo experiencia laboral debe ser un boolean"),
body("cupos").notEmpty().withMessage("El campo cupo es requerido").isInt().withMessage("El campo cupos ser un entero"),
body("id_modalidad").notEmpty().withMessage("El campo id_modalidad es requerido").isInt().withMessage("El campo id_modalidad debe ser un entero"),
body("id_periodo_academico").notEmpty().withMessage("El campo id_periodo_academico es requerido").isInt().withMessage("El campo id_periodo_academico debe ser un entero"),
body("id_empresa").notEmpty().withMessage("El campo id_empresa es requerido").isInt().withMessage("El campo id_empresa debe ser un entero")],ofertaPracticaController.actualizar_oferta)

module.exports = routerOfertas;