

const express = require("express");

const routerAuth = express.Router();
const ObtenerRol = require("../auth/obtenerRol");

routerAuth.post("/showrol",ObtenerRol.obtenerRol);

module.exports=routerAuth;