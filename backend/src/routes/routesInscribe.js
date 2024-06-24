const express = require('express');
const routerInscribe = express.Router();
const inscribeController = require('../controllers/inscribeController');
const { param } = require('express-validator');

const { AutenticacionProfesional } = require('../middlewares/VerifyRolProfesional');
const { AutenticacionToken } = require('../middlewares/verifyToken');

routerInscribe.put('/:id_inscripcion/:id_estado',
  [
    AutenticacionToken,
    param('id_inscripcion').notEmpty().withMessage('El campo id_inscripcion es requerido').isInt().withMessage('El campo id_inscripcion debe ser un entero'),
    param('id_estado').notEmpty().withMessage('El campo id_estado es requerido').isInt().withMessage('El campo id_estado debe ser un entero')
  ],
  inscribeController.updateEstadoPractica
);

module.exports = routerInscribe;
