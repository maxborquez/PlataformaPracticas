
const express = require("express")
const routerArchivoInscripcion =  express.Router();
const archivoInscripcionController = require("../controllers/archivoInscripcionController");
const { body, param } = require("express-validator");

const multer = require("multer");

const {AutenticacionProfesional} = require("../middlewares/VerifyRolProfesional");
const {AutenticacionAlumno} = require("../middlewares/verifyRolAlumno");
const {AutenticacionToken} = require("../middlewares/verifyToken");
const upload = multer({
    storage: multer.memoryStorage()
})

routerArchivoInscripcion.post("/create",
[
    AutenticacionAlumno,
    upload.single("archivo"),
    body("tipo_archivo").notEmpty().withMessage("El campo tipo_archivo es requerido"),
    body("id_inscripcion").notEmpty().withMessage("El campo id_inscripcion es requerido").isInt().withMessage("El campo id_inscripcion debe ser entero")   
],
archivoInscripcionController.subirArchivo)

routerArchivoInscripcion.post("/getall",
[
    AutenticacionToken
]
,archivoInscripcionController.mostrar_archivos)

routerArchivoInscripcion.delete("/delete/:id",
[
    AutenticacionAlumno,
    param("id").notEmpty().withMessage("El campo id es requerido").isInt().withMessage("El campo id debe ser entero")  
]
,archivoInscripcionController.eliminar_archivo);

routerArchivoInscripcion.get("/show/:id",[AutenticacionToken],archivoInscripcionController.mostrar_archivo);


module.exports = routerArchivoInscripcion;