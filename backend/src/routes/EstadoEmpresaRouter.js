

const express = require("express");
const EstadoEmpresaController = require("../controllers/EstadoEmpresaController");
const routerEstadoEmpresa = express.Router();

routerEstadoEmpresa.get("/getall",EstadoEmpresaController.obtener_estados);


module.exports = routerEstadoEmpresa;