

const express = require("express");
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage()
})
const routerArchivoAlumno = express.Router()

const {AutenticacionAlumno} = require("../middlewares/verifyRolAlumno");
const {AutenticacionToken}  = require("../middlewares/verifyToken");

const archivoBitacoraAlumnoController = require("../controllers/archivoBitacoraAlumnoController");
const { body, param } = require("express-validator");

routerArchivoAlumno.post("/create",
[
    AutenticacionAlumno,
    upload.single("archivo"),
    body("tipo_archivo").notEmpty().withMessage("El campo tipo_archivo es requerido").isString().withMessage("El campo tipo_archivo debe ser string"),
    body("id_bitacora").notEmpty().withMessage("El campo id_bitacora es requerido").isInt().withMessage("El campo id_bitacora debe ser entero")   
],archivoBitacoraAlumnoController.subirArchivo)

routerArchivoAlumno.post("/getpdf",
[
    AutenticacionToken
]
,archivoBitacoraAlumnoController.mostrar_archivos_pdf)

routerArchivoAlumno.post("/getimagenes",
[
    AutenticacionToken
]
,archivoBitacoraAlumnoController.mostrar_imagenes);


routerArchivoAlumno.get("/show/:id",archivoBitacoraAlumnoController.mostrar_archivo);


routerArchivoAlumno.delete("/delete/:id",
[
    AutenticacionAlumno,
    param("id").notEmpty().withMessage("El campo id es requerido").isInt().withMessage("El campo id debe ser entero")  
]
,archivoBitacoraAlumnoController.eliminar_archivo)


module.exports=routerArchivoAlumno;
