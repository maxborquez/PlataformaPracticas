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

    if (!req.file) {
      return res.status(400).json({
        mensaje: "No se ha proporcionado un archivo",
      });
    }

    const { originalname, buffer } = req.file;
    const { tipo_archivo, id_inscripcion, tipo_documento } = req.body;

    const archivo = await prisma.archivo_evaluacion.create({
      data: {
        nombre: originalname,
        tipo_archivo: tipo_archivo,
        id_inscripcion: Number(id_inscripcion),
        archivo: buffer,
        tipo_documento: tipo_documento,
        id_estado_evaluacion: 1,
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

const mostrar_archivos = async (req, res) => {
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

    const archivos = await prisma.archivo_evaluacion.findMany({
      where: {
        id_inscripcion: Number(id_inscripcion),
      },
      include: {
        estado_evaluacion: true,
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

const mostrar_archivo = async (req, res) => {
  try {
    const { id } = req.params;
    const archivo = await prisma.archivo_evaluacion.findFirst({
      where: {
        id_archivo_evaluacion: Number(id),
      },
      include: {
        estado_evaluacion: true,
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

const eliminar_archivo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        mensaje: "Se han encontrado errores",
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const archivo = await prisma.archivo_evaluacion.findFirst({
      where: {
        id_archivo_evaluacion: Number(id),
      },
      include: {
        estado_evaluacion: true,
      },
    });

    if (!archivo) {
      return res.status(404).json({
        mensaje: "No se ha encontrado un archivo con ese id",
      });
    }

    if (archivo.estado_evaluacion.nombre_estado_evaluacion === "Aprobado") {
      return res.status(403).json({
        mensaje: "El archivo no puede ser eliminado porque ya ha sido aprobado",
      });
    }

    await prisma.archivo_evaluacion.delete({
      where: {
        id_archivo_evaluacion: Number(id),
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

const comprobarTablaVacia = async (req, res) => {
  try {
    const count = await prisma.archivo_evaluacion.count();
    if (count > 0) {
      return res.json({ isEmpty: false });
    } else {
      return res.json({ isEmpty: true });
    }
  } catch (error) {
    console.error("Error al comprobar la tabla:", error);
    return res.status(500).json({ message: "Error al comprobar la tabla" });
  }
};

module.exports = {
  subirArchivo,
  mostrar_archivos,
  eliminar_archivo,
  mostrar_archivo,
  comprobarTablaVacia,
};