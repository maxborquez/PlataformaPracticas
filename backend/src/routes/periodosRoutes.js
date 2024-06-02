const express = require('express')


 const periodoController = require("../controllers/periodoacademicoController");
const { AutenticacionToken } = require('../middlewares/verifyToken');

 const routerPeriodo = express.Router();


 routerPeriodo.get("/getall",[
    AutenticacionToken
 ],periodoController.mostrar_periodos_academicos);

module.exports=routerPeriodo;

