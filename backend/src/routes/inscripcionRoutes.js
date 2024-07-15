const express = require("express");

const routerInscripcion = express.Router();

const inscripcionPracticaController = require("../controllers/inscripcionPracticaController");
const { body, param } = require("express-validator");

const { AutenticacionAlumno } = require("../middlewares/verifyRolAlumno");
const {
  AutenticacionProfesional,
} = require("../middlewares/VerifyRolProfesional");
const { AutenticacionToken } = require("../middlewares/verifyToken");
routerInscripcion.post(
  "/create",
  [
    AutenticacionAlumno,
    body("fecha_inscripcion_practica")
      .notEmpty()
      .withMessage("El campo es requerido"),
    body("fecha_inicio")
      .notEmpty()
      .withMessage("El campo es requerido"),
    body("fecha_fin")
      .notEmpty()
      .withMessage("El campo es requerido"),
    body("id_modalidad")
      .notEmpty()
      .withMessage("El campo es requerido")
      .isInt()
      .withMessage("El campo debe ser un entero"),
    body("id_estado_inscripcion")
      .notEmpty()
      .withMessage("El campo es requerido")
      .isInt()
      .withMessage("El campo debe ser un entero"),
    body("id_inscribe")
      .notEmpty()
      .withMessage("El campo es requerido")
      .isInt()
      .withMessage("El campo debe ser un entero"),
    body("descripcion")
      .optional()
      .isString()
      .withMessage("Debe ser una cadena de texto"),
    body("objetivos")
      .optional()
      .isString()
      .withMessage("Debe ser una cadena de texto"),
    body("actividades")
      .optional()
      .isString()
      .withMessage("Debe ser una cadena de texto"),
    body("id_empresa")
      .optional()
      .isInt()
      .withMessage("El campo debe ser un entero"),
    body("id_supervisor")
      .optional()
      .isInt()
      .withMessage("El campo debe ser un entero"),
    body("id_oferta")
      .optional()
      .isInt()
      .withMessage("El campo debe ser un entero"),
    body("observaciones")
      .optional()
      .isString()
      .withMessage("Debe ser una cadena de texto"),
    // Campos de hora
    body("lunes_manana1")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
    body("lunes_manana2")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
    body("lunes_tarde1")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
    body("lunes_tarde2")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
    body("martes_manana1")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
    body("martes_manana2")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
    body("martes_tarde1")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
    body("martes_tarde2")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
    body("miercoles_manana1")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
    body("miercoles_manana2")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
    body("miercoles_tarde1")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
    body("miercoles_tarde2")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
    body("jueves_manana1")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
    body("jueves_manana2")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
    body("jueves_tarde1")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
    body("jueves_tarde2")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
    body("viernes_manana1")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
    body("viernes_manana2")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
    body("viernes_tarde1")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
    body("viernes_tarde2")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
      body("sabado_manana1")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
      body("sabado_manana2")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
      body("sabado_tarde1")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
      body("sabado_tarde2")
      .optional()
      .custom((value) => {
        if (value === '') return true; // Permitir cadena vacía
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      })
      .withMessage("Debe ser una hora válida en formato HH:mm"),
  ],
  inscripcionPracticaController.crear_inscripcion
);

routerInscripcion.get(
  "/getall",
  [AutenticacionProfesional],
  inscripcionPracticaController.mostrar_inscripciones
);

routerInscripcion.get(
  "/show/:id",
  [
    AutenticacionToken,
    param("id")
      .notEmpty()
      .withMessage("El parámetro id es requerido")
      .isInt()
      .withMessage("El parámetro debe ser un entero"),
  ],
  inscripcionPracticaController.mostrar_inscripcion
);

routerInscripcion.delete(
  "/delete/:id",
  [
    AutenticacionToken,
    param("id")
      .notEmpty()
      .withMessage("El parámetro id es requerido")
      .isInt()
      .withMessage("El parámetro debe ser un entero"),
  ],
  inscripcionPracticaController.eliminar_inscripcion
);

routerInscripcion.post(
  "/comprobar",
  [AutenticacionToken],
  inscripcionPracticaController.comprobar_inscripcion
);
routerInscripcion.get(
  "/modalidades",
  [AutenticacionToken],
  inscripcionPracticaController.obtener_Modalidades
);
routerInscripcion.put(
  "/actualizasupervisor/:id",
  [AutenticacionToken],
  inscripcionPracticaController.actualizar_supervisor
);
routerInscripcion.post(
  "/updatestado",
  [AutenticacionToken],
  inscripcionPracticaController.actualizar_estado_inscripcion
);
routerInscripcion.post(
  "/updatevaluacion",
  [AutenticacionToken],
  inscripcionPracticaController.actualizar_evaluacion_inscripcion
);
routerInscripcion.post(
  "/getidinscripcion",
  [AutenticacionAlumno],
  inscripcionPracticaController.mostrar_id_inscripcion
);

routerInscripcion.put(
  "/actualizaralumno/:id",
  [
    AutenticacionAlumno,
    body("fecha_inscripcion_practica")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha válida"),
    body("fecha_inicio")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha válida"),
    body("fecha_fin")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha válida"),
    body("observaciones")
      .optional()
      .isString()
      .withMessage("El campo observaciones debe ser un string"),
    body("id_supervisor")
      .optional()
      .isInt()
      .withMessage("El campo debe ser un entero"),
    body("id_oferta")
      .optional()
      .isInt()
      .withMessage("El campo debe ser un entero"),
    body("id_modalidad")
      .optional()
      .isInt()
      .withMessage("El campo debe ser un entero"),
    body("id_estado_inscripcion")
      .optional()
      .isInt()
      .withMessage("El campo debe ser un entero"),
    body("id_inscribe")
      .optional()
      .isInt()
      .withMessage("El campo debe ser un entero"),
    body("descripcion")
      .optional()
      .isString()
      .withMessage("Debe ser una cadena de texto"),
    body("objetivos")
      .optional()
      .isString()
      .withMessage("Debe ser una cadena de texto"),
    body("actividades")
      .optional()
      .isString()
      .withMessage("Debe ser una cadena de texto"),
    body("lunes_manana1")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("lunes_manana2")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("lunes_tarde1")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("lunes_tarde2")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("martes_manana1")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("martes_manana2")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("martes_tarde1")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("martes_tarde2")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("miercoles_manana1")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("miercoles_manana2")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("miercoles_tarde1")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("miercoles_tarde2")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("jueves_manana1")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("jueves_manana2")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("jueves_tarde1")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("jueves_tarde2")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("viernes_manana1")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("viernes_manana2")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("viernes_tarde1")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("viernes_tarde2")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("sabado_manana1")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("sabado_manana2")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("sabado_tarde1")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
    body("sabado_tarde2")
      .optional()
      .isISO8601()
      .withMessage("Debe ser una fecha y hora válida"),
  ],
  inscripcionPracticaController.actualizar_inscripcion_alumno
);

routerInscripcion.get(
  "/estado/:id_estado_inscripcion",
  [AutenticacionProfesional],
  inscripcionPracticaController.getInscripcionesEnProceso
);

routerInscripcion.get(
  "/count/:careerId/:practicaId/:year/:period",
  inscripcionPracticaController.getInscriptionsByCareerAndPractica
);
routerInscripcion.get(
  "/listaestudiantes/:careerId/:asignaturaId/:anio/:periodo",
  inscripcionPracticaController.getEstudiantesPorParametros
);
routerInscripcion.get(
  "/getPracticas/:id_alumno",
  inscripcionPracticaController.getPracticasByAlumno
);

module.exports = routerInscripcion;
