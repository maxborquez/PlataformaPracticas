const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");
const prisma = new PrismaClient();

const subirArchivo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        mensaje: "Se han encontrado errores",
        errors: errors.array(),
      });
    }

    const { originalname, buffer } = req.file;
    const archivo = await prisma.plantilla_word.create({
      data: {
        nombre: originalname,
        archivo: buffer,
      },
    });

    if (!archivo) {
      return res.status(400).json({
        mensaje: "Error al subir un archivo",
      });
    }
    return res.status(200).json({
      mensaje: "Archivo subido correctamente",
      archivo: archivo,
    });
  } catch (error) {
    console.log(error.stack);
    return res.status(400).json({
      mensaje: "Error al subir el archivo",
      error: error.stack,
    });
  }
};
module.exports = { subirArchivo };
