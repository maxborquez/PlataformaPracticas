const express = require('express')
const aptitudesControllers = require('../controllers/aptitud_controller')
const {body} = require('express-validator')
const { AutenticacionToken } = require('../middlewares/verifyToken')
const routerAptitud = express.Router()

routerAptitud.get('/getAll',
[
    AutenticacionToken
]
,aptitudesControllers.obtener_aptitudes)

module.exports = routerAptitud;