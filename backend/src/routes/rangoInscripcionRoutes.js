const express = require('express');
const rangoInscripcionController = require('../controllers/rangoInscrpcionController');
const routerRangoInscripcion = express.Router();

routerRangoInscripcion.get('/getAll', rangoInscripcionController.getAllRangos);
routerRangoInscripcion.get('/:id', rangoInscripcionController.getRangoById);
routerRangoInscripcion.post('/create', rangoInscripcionController.createRango);
routerRangoInscripcion.put('/update/:id', rangoInscripcionController.updateRango);
routerRangoInscripcion.delete('/delete/:id', rangoInscripcionController.deleteRango);

module.exports = routerRangoInscripcion;
