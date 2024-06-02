const express = require('express')
const representanteControllers = require('../controllers/representante_controller')
const {body,param} = require('express-validator')
const routerRepresentante = express.Router()
const {AutenticacionAlumno} = require("../middlewares/verifyRolAlumno");

routerRepresentante.get("/getAll",AutenticacionAlumno,representanteControllers.obtener_representantes)

routerRepresentante.post("/create", [
    AutenticacionAlumno,
    body('nombre').notEmpty().withMessage('El campo nombre es requerido').isString().withMessage('El campo nombre debe ser un string').isLength({ max: 50 }),
    body('apellido').notEmpty().withMessage('El campo apellido es requerido').isString().withMessage('El campo apellido debe ser un string').isLength({ max: 50 }),
    body('correo').notEmpty().withMessage('El campo correo es requerido').isEmail().withMessage('El campo correo debe ser un email válido').isLength({ max: 50 }),
    body('telefono').notEmpty().withMessage('El campo teléfono es requerido').isString().withMessage('El campo teléfono debe ser un string').isLength({ max: 20 })
], representanteControllers.crear_representante);

routerRepresentante.get("/show/:id", [
    AutenticacionAlumno,
    param('id').notEmpty().withMessage('El campo ID es requerido').isString().withMessage('El campo ID debe ser un string').isLength({ max: 50 })
], representanteControllers.obtener_representante);

routerRepresentante.put("/update/:id", [
    AutenticacionAlumno,
    body('nombre').optional().isString().withMessage('El campo nombre debe ser un string').isLength({ max: 50 }),
    body('apellido').optional().isString().withMessage('El campo apellido debe ser un string').isLength({ max: 50 }),
    body('correo').optional().isEmail().withMessage('El campo correo debe ser un email válido').isLength({ max: 50 }),
    body('telefono').optional().isString().withMessage('El campo teléfono debe ser un string').isLength({ max: 20 })
], representanteControllers.actualizar_representante);

routerRepresentante.delete("/delete/:id", [
    AutenticacionAlumno,
    param('id').notEmpty().withMessage('El campo ID es requerido').isString().withMessage('El campo ID debe ser un string').isLength({ max: 50 })
], representanteControllers.eliminar_representante);


module.exports = routerRepresentante;