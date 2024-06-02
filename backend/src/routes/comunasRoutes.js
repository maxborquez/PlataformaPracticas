

const express = require("express");

const routerComunas = express.Router();
const comunaController = require("../controllers/ComunasController");

routerComunas.get("/getall",comunaController.obtener_regiones);
routerComunas.post("/getComunas",comunaController.obtener_comunas_por_region);
routerComunas.get("/getComunas",comunaController.obtener_comunas);
routerComunas.post("/getRegion",comunaController.obtener_region_por_comuna);
module.exports=routerComunas;