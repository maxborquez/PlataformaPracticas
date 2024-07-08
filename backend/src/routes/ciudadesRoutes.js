

const express = require("express");

const routerCiudades = express.Router();
const ciudadController = require("../controllers/ciudadesController");

routerCiudades.get("/getCiudades",ciudadController.obtener_comunas);

module.exports=routerCiudades;