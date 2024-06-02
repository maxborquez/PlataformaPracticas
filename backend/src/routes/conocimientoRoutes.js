const express = require('express')
const conocimientoControllers = require('../controllers/conocimiento_controllers')
const {body, param} = require('express-validator')
const { AutenticacionToken } = require('../middlewares/verifyToken')
const routerConocimiento = express.Router()


routerConocimiento.get('/getAll', AutenticacionToken, conocimientoControllers.obtener_conocimientos)
routerConocimiento.post('/create', [
    AutenticacionToken,
    body('id_alumno').notEmpty().withMessage('El campo id_alumno es requerido').isInt().withMessage('El campo id_alumno debe ser un string').isLength({ max: 50 }),
    body('id_aptitud').notEmpty().withMessage('El campo id_aptitud es requerido').isInt().withMessage('El campo id_aptitud debe ser un string').isLength({ max: 50 })
], conocimientoControllers.crear_conocimiento);


routerConocimiento.get('/show/:id', [
    AutenticacionToken,
    param('id_alumno').notEmpty().withMessage('El campo ID es requerido').isString().withMessage('El campo ID debe ser un string').isLength({ max: 50 }),
    param('id_aptitud').notEmpty().withMessage('El campo ID es requerido').isString().withMessage('El campo ID debe ser un string').isLength({ max: 50 })

], conocimientoControllers.obtener_conocimiento);

routerConocimiento.delete('/delete/:id', [
    AutenticacionToken,
    param('id').notEmpty().withMessage('El campo ID es requerido').isInt().withMessage('El campo ID debe ser un entero').isLength({ max: 50 }),
  
], conocimientoControllers.eliminar_conocimiento);

routerConocimiento.put('/update/:id', [
    AutenticacionToken,
    body('id_alumno').notEmpty().withMessage('El campo id_alumno es requerido').isString().withMessage('El campo id_alumno debe ser un string').isLength({ max: 50 }),
    body('id_aptitud').notEmpty().withMessage('El campo id_aptitud es requerido').isString().withMessage('El campo id_aptitud debe ser un string').isLength({ max: 50 })
], conocimientoControllers.actualizar_conocimiento);

module.exports = routerConocimiento