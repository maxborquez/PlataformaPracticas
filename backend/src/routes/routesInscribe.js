const express = require('express');
const routerInscribe = express.Router();
const inscribeController = require('../controllers/inscribeController');
const { param } = require('express-validator');
const { AutenticacionProfesional } = require('../middlewares/VerifyRolProfesional');
const { AutenticacionToken } = require('../middlewares/verifyToken');

routerInscribe.put('/:id_inscripcion/:id_estado', inscribeController.updateEstadoPractica);
routerInscribe.get('/obtener_inscribe/:id_inscripcion_practica', inscribeController.getInscribeIdByInscripcion);
routerInscribe.get('/asignatura/:id_inscripcion', inscribeController.getAsignaturaByInscripcion);
routerInscribe.get('/getInscribe/:id_inscripcion', inscribeController.getInscribe);



module.exports = routerInscribe;
