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

routerAptitud.post('/create', aptitudesControllers.createAptitud);

routerAptitud.delete('/delete/:idAptitud', aptitudesControllers.deleteAptitud);

routerAptitud.get('/getAprobadas', aptitudesControllers.getAptitudesAprobadas);

routerAptitud.get('/getPendientes', aptitudesControllers.getAptitudesPendientes);

routerAptitud.put('/aprobar/:idAptitud', aptitudesControllers.aprobarAptitud);


module.exports = routerAptitud;