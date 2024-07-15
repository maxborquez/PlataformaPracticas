

const express = require("express");

const routerComunas = express.Router();
const comunaController = require("../controllers/comunaController");

routerComunas.get("/getComunas",comunaController.obtener_comunas);
routerComunas.get('/regiones', comunaController.getAllRegiones);
routerComunas.get('/getProvinciaByRegion/:id_region', comunaController.getProvinciaByRegion);
routerComunas.get('/getComunasByProvincia/:id_provincia', comunaController.getComunasByProvincia);

module.exports=routerComunas;