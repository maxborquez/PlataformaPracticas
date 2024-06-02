
const express = require("express");
const {AutenticacionAlumno} = require("../middlewares/verifyRolAlumno");
const {AutenticacionProfesional} = require("../middlewares/VerifyRolProfesional");
const {AutenticacionToken} = require("../middlewares/verifyToken");

const routerBitacoraAlumno = express.Router();
const bitacoraAlumnoController = require("../controllers/bitacoraAlumnoController");
const { body, param } = require("express-validator");
//titulo,descripcion,fecha_creacion,hora_inicio,hora_fin,id_estado_bitacora,id_inscripcion_practica,id_usuario
routerBitacoraAlumno.post("/create",
[
    AutenticacionAlumno,
    body("titulo").notEmpty().withMessage("El campo titulo es requerido").isString().withMessage("El campo titulo debe ser un string").isLength({ max: 100 }),
    body("descripcion").notEmpty().withMessage("El campo descripcion es requerido").isString().withMessage("El campo descripcion debe ser un string").isLength({ max: 1300 }),
    body("fecha_creacion").notEmpty().withMessage("El campo fecha creacion es requerido").isDate().withMessage("El campo fecha_creacion debe ser un date"),
    body("hora_inicio").notEmpty().withMessage("El campo hora inicio es requerido"),
    body("hora_fin").notEmpty().withMessage("El campo hora fin es requerido"),
    body("id_estado_bitacora").notEmpty().withMessage("El campo id estado bitacora es requerido").isInt().withMessage("El campo debe ser un entero"),
    body("id_inscripcion_practica").notEmpty().withMessage("El campo id inscripcion practica es requerido").isInt().withMessage("El campo debe ser un entero"),
    body("id_usuario").notEmpty().withMessage("El campo id_usuario es requerido").isInt().withMessage("El campo debe ser un entero")
],
bitacoraAlumnoController.crear_bitacora);

routerBitacoraAlumno.get("/getall/:id",[AutenticacionToken],bitacoraAlumnoController.mostrar_bitacoras)

routerBitacoraAlumno.get("/show/:id",
[
    AutenticacionToken,
    param("id").notEmpty().withMessage("El campo id es requerido").isInt().withMessage("El campo id debe ser un entero")
],bitacoraAlumnoController.mostrar_bitacora
)
routerBitacoraAlumno.delete("/delete/:id",
[
    AutenticacionAlumno,
    param("id").notEmpty().withMessage("El campo id es requerido").isInt().withMessage("El campo id debe ser un entero")
],bitacoraAlumnoController.eliminar_bitacora
)

routerBitacoraAlumno.put("/update/:id",
[
    AutenticacionAlumno,
    param("id").notEmpty().withMessage("El campo id es requerido").isInt().withMessage("El campo id debe ser un entero"),
    body("titulo").notEmpty().withMessage("El campo titulo es requerido").isString().withMessage("El campo titulo debe ser un string"),
    body("descripcion").notEmpty().withMessage("El campo descripcion es requerido").isString().withMessage("El campo descripcion debe ser un string"),
    body("fecha_creacion").notEmpty().withMessage("El campo fecha creacion es requerido").isDate().withMessage("El campo fecha_creacion debe ser un date"),
    body("hora_inicio").notEmpty().withMessage("El campo hora inicio es requerido"),
    body("hora_fin").notEmpty().withMessage("El campo hora fin es requerido"),
    body("id_estado_bitacora").notEmpty().withMessage("El campo id estado bitacora es requerido").isInt().withMessage("El campo debe ser un entero"),
    body("id_inscripcion_practica").notEmpty().withMessage("El campo id inscripcion practica es requerido").isInt().withMessage("El campo debe ser un entero"),
    body("id_usuario").notEmpty().withMessage("El campo id_usuario es requerido").isInt().withMessage("El campo debe ser un entero")
],
bitacoraAlumnoController.actualizar_bitacora);
module.exports = routerBitacoraAlumno;