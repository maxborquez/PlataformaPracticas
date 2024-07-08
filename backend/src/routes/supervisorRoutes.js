const express = require('express')
const supervisorControllers = require('../controllers/supervisor_controller')
const {body,param} = require('express-validator')
const routerSupervisor = express.Router()
const {AutenticacionAlumno} = require("../middlewares/verifyRolAlumno");

routerSupervisor.get("/getAll",AutenticacionAlumno,supervisorControllers.obtener_supervisores)

routerSupervisor.post("/create", [
    AutenticacionAlumno,
    body('nombre').notEmpty().withMessage('El campo nombre es requerido').isString().withMessage('El campo nombre debe ser un string').isLength({ max: 50 }),
    body('apellido').notEmpty().withMessage('El campo apellido es requerido').isString().withMessage('El campo apellido debe ser un string').isLength({ max: 50 }),
    body('correo').notEmpty().withMessage('El campo correo es requerido').isEmail().withMessage('El campo correo debe ser un email válido').isLength({ max: 50 }),
    body('telefono').notEmpty().withMessage('El campo teléfono es requerido').isString().withMessage('El campo teléfono debe ser un string').isLength({ max: 20 })
], supervisorControllers.crear_supervisor);

routerSupervisor.get("/show/:id", [
    AutenticacionAlumno,
    param('id').notEmpty().withMessage('El campo ID es requerido').isString().withMessage('El campo ID debe ser un string').isLength({ max: 50 })
], supervisorControllers.obtener_supervisor);

routerSupervisor.put("/update/:id", [
    AutenticacionAlumno,
    body('nombre').optional().isString().withMessage('El campo nombre debe ser un string').isLength({ max: 50 }),
    body('apellido').optional().isString().withMessage('El campo apellido debe ser un string').isLength({ max: 50 }),
    body('correo').optional().isEmail().withMessage('El campo correo debe ser un email válido').isLength({ max: 50 }),
    body('telefono').optional().isString().withMessage('El campo teléfono debe ser un string').isLength({ max: 20 })
], supervisorControllers.actualizar_supervisor);

routerSupervisor.delete("/delete/:id", [
    AutenticacionAlumno,
    param('id').notEmpty().withMessage('El campo ID es requerido').isString().withMessage('El campo ID debe ser un string').isLength({ max: 50 })
], supervisorControllers.eliminar_supervisor);


module.exports = routerSupervisor;