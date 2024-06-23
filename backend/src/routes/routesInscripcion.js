
const express = require("express");

const routerInscripcion = express.Router();


const inscripcionPracticaController = require("../controllers/inscripcionPracticaController");
const { body, param } = require("express-validator");

const {AutenticacionAlumno} = require("../middlewares/verifyRolAlumno");
const {AutenticacionProfesional} = require("../middlewares/VerifyRolProfesional");
const { AutenticacionToken } = require("../middlewares/verifyToken");

//fecha_inscripcion_practica,fecha_inicio,fecha_fin,nota_final,observaciones,id_representante,id_oferta,id_estado_inscripcion, id_modalidad
routerInscripcion.post("/create",
[
    AutenticacionAlumno,
    body("fecha_inscripcion_practica").notEmpty().withMessage("El campo es requerido"),
    body("fecha_inicio").notEmpty().withMessage("El campo es requerido"),
    body("fecha_fin").notEmpty().withMessage("El campo es requerido"),
    body("id_modalidad").notEmpty().withMessage("El campo es requerido").isInt().withMessage("El campo debe ser un entero"),
    body("id_estado_inscripcion").notEmpty().withMessage("El campo es requerido").isInt().withMessage("El campo debe ser un entero"),
    body("id_inscribe").notEmpty().withMessage("El campo es requerido").isInt().withMessage("El campo debe ser un entero")
],
inscripcionPracticaController.crear_inscripcion);

routerInscripcion.get("/getall",[
    AutenticacionProfesional
],
inscripcionPracticaController.mostrar_inscripciones);

routerInscripcion.get("/show/:id",
[
    AutenticacionToken,
    param("id").notEmpty().withMessage("El parámetro id es requerido").isInt().withMessage("El parámetro debe ser un entero")
],inscripcionPracticaController.mostrar_inscripcion);

routerInscripcion.delete("/delete/:id",
[
    AutenticacionToken,
    param("id").notEmpty().withMessage("El parámetro id es requerido").isInt().withMessage("El parámetro debe ser un entero")
]
,inscripcionPracticaController.eliminar_inscripcion);

routerInscripcion.post("/comprobar",[AutenticacionToken],inscripcionPracticaController.comprobar_inscripcion);
routerInscripcion.get("/modalidades",[AutenticacionToken],inscripcionPracticaController.obtener_Modalidades);
routerInscripcion.put("/actualizarepresentante/:id",[AutenticacionToken],inscripcionPracticaController.actualizar_representante);
routerInscripcion.post("/updatestado",[AutenticacionToken],inscripcionPracticaController.actualizar_estado_inscripcion)
routerInscripcion.post("/updatevaluacion",[AutenticacionToken],inscripcionPracticaController.actualizar_evaluacion_inscripcion);
routerInscripcion.post("/getidinscripcion",[AutenticacionAlumno],inscripcionPracticaController.mostrar_id_inscripcion);
routerInscripcion.put("/actualizaralumno/:id",
[
    AutenticacionAlumno,
    body("fecha_inscripcion_practica").optional(),
    body("fecha_inicio").optional(),
    body("fecha_fin").optional(),
    body("observaciones").optional().isString().withMessage("El campo observaciones debe ser un string"),
    body("id_representante").optional().isInt().withMessage("El campo debe ser un entero"),
    body("id_oferta").optional(),
    body("id_modalidad").optional().isInt().withMessage("El campo debe ser un entero"),
    body("id_estado_inscripcion").optional().isInt().withMessage("El campo debe ser un entero"),
    body("id_inscribe").optional().isInt().withMessage("El campo debe ser un entero")
]
,
inscripcionPracticaController.actualizar_inscripcion_alumno);

routerInscripcion.get('/estado/:id_estado_inscripcion',[AutenticacionProfesional], inscripcionPracticaController.getInscripcionesEnProceso);

routerInscripcion.get('/count/:careerId/:practicaId/:year/:period', inscripcionPracticaController.getInscriptionsByCareerAndPractica);
routerInscripcion.get('/listaestudiantes/:careerId/:asignaturaId/:anio/:periodo', inscripcionPracticaController.getEstudiantesPorParametros);

module.exports=routerInscripcion;