const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");
const prisma = new PrismaClient();

const subirArchivoInscripcion = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        mensaje: "Se han encontrado errores",
        errors: errors.array(),
      });
    }

    if (!req.file) {
      return res.status(400).json({
        mensaje: "No se ha proporcionado un archivo",
      });
    }

    const { originalname, buffer } = req.file;
    const { tipo_archivo, id_inscripcion, tipo_documento } = req.body;

    const archivo = await prisma.archivo_inscripcion.create({
      data: {
        nombre: originalname,
        tipo_archivo: tipo_archivo,
        id_inscripcion: Number(id_inscripcion),
        archivo: buffer,
        tipo_documento: tipo_documento,
        id_estado_archivo_inscripcion: 1, // Id del estado inicial
      },
    });

    return res.status(200).json({
      mensaje: "Archivo subido correctamente",
      archivo: archivo,
    });
  } catch (error) {
    console.log(error.stack);
    return res.status(400).json({
      mensaje: "Error al subir el archivo",
      error: error.message,
    });
  }
};

const mostrarArchivosInscripcion = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        mensaje: "Se han encontrado errores",
        errors: errors.array(),
      });
    }

    const { id_inscripcion } = req.body;
    if (!id_inscripcion) {
      return res.status(400).json({
        mensaje: "El campo id_inscripcion es requerido",
      });
    }

    const archivos = await prisma.archivo_inscripcion.findMany({
      where: {
        id_inscripcion: Number(id_inscripcion),
      },
      include: {
        estado_archivo_inscripcion: true, // Incluir relación con estado_archivo_inscripcion
      },
    });

    if (archivos.length === 0) {
      return res.status(200).json({
        mensaje: "No hay registros de archivos",
      });
    }

    return res.status(200).json({
      mensaje: "Se han encontrado archivos",
      archivos: archivos.reverse(),
    });
  } catch (error) {
    console.log(error.stack);
    return res.status(400).json({
      mensaje: "Error al mostrar archivos",
      error: error.message,
    });
  }
};

const mostrarArchivoInscripcion = async (req, res) => {
  try {
    const { id } = req.params;
    const archivo = await prisma.archivo_inscripcion.findFirst({
      where: {
        id_archivo: Number(id),
      },
    });

    if (!archivo) {
      return res.status(404).json({
        mensaje: "No se ha encontrado el documento",
      });
    }

    return res.status(200).json({
      mensaje: "Se ha encontrado el documento",
      archivo: archivo,
    });
  } catch (error) {
    console.log(error.stack);
    return res.status(400).json({
      mensaje: "Error al mostrar archivo",
      error: error.message,
    });
  }
};

const eliminarArchivoInscripcion = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        mensaje: "Se han encontrado errores",
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const archivo = await prisma.archivo_inscripcion.findFirst({
      where: {
        id_archivo: Number(id),
      },
      include: {
        estado_archivo_inscripcion: true,
      },
    });

    if (!archivo) {
      return res.status(404).json({
        mensaje: "No se ha encontrado un archivo con ese id",
      });
    }

    if (archivo.estado_archivo_inscripcion.nombre_estado_archivo_inscripcion === "Aprobado") {
      return res.status(403).json({
        mensaje: "El archivo no puede ser eliminado porque ya ha sido aprobado",
      });
    }

    await prisma.archivo_inscripcion.delete({
      where: {
        id_archivo: Number(id),
      },
    });

    return res.status(200).json({
      mensaje: "El archivo ha sido eliminado correctamente",
    });
  } catch (error) {
    console.log(error.stack);
    return res.status(400).json({
      mensaje: "Error al eliminar el archivo",
      error: error.message,
    });
  }
};

module.exports = {
  subirArchivoInscripcion,
  mostrarArchivosInscripcion,
  eliminarArchivoInscripcion,
  mostrarArchivoInscripcion,
};
