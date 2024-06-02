

const express = require("express");

const routerAlumno = express.Router();

const AlumnoController = require("../controllers/AlumnoController");

routerAlumno.post("/show",AlumnoController.obtener_alumno);
routerAlumno.post("/showAptitudes",AlumnoController.obtener_apitudes_alumno);

module.exports = routerAlumno;