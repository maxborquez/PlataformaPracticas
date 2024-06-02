



const express = require("express");
const EstadosInscripcionPractica = require("../controllers/EstadosInscripcionController");
const { AutenticacionToken } = require("../middlewares/verifyToken");
const routerEstadosInscripcion = express.Router();


routerEstadosInscripcion.get("/getall",[
    [AutenticacionToken]
],EstadosInscripcionPractica.mostrar_estados)


module.exports = routerEstadosInscripcion