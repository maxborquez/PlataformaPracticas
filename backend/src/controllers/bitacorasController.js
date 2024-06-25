const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");

const prisma = new PrismaClient();

const crear_bitacora = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        mensaje: "Se han encontrado errores",
        errors: errors.array(),
      });
    }

    const {
      titulo,
      descripcion,
      fecha_creacion,
      hora_inicio,
      hora_fin,
      id_estado_bitacora,
      id_inscripcion_practica,
      id_usuario,
    } = req.body;
    const formato_fecha = "T00:00:00Z";
    const hora_inicio_formateada = `${fecha_creacion}T${hora_inicio}:00Z`;
    const hora_fin_formateada = `${fecha_creacion}T${hora_fin}:00Z`;
    const bitacora = await prisma.bitacora_alumno.create({
      data: {
        titulo,
        descripcion,
        fecha_creacion: `${fecha_creacion}${formato_fecha}`,
        hora_inicio: hora_inicio_formateada,
        hora_fin: hora_fin_formateada,
        id_estado_bitacora,
        id_usuario,
        id_inscripcion_practica: Number(id_inscripcion_practica),
      },
    });

    if (!bitacora) {
      return res.status(400).json({
        mensaje: "Error al registrar la bitacora",
      });
    }
    return res.status(200).json({
      mensaje: "Bitacora creada exitosamente",
      bitacora: bitacora,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.stack,
    });
  }
};

const mostrar_bitacoras = async (req, res) => {
  const { id_inscripcion_practica, id_alumno } = req.params;
  try {
    const bitacoras = await prisma.bitacora_alumno.findMany({
      where: {
        id_inscripcion_practica: Number(id_inscripcion_practica),
        id_alumno: Number(id_alumno),
      },
      include: {
        estado_bitacora: true,
      },
    });
    if (bitacoras.length == 0) {
      return res.status(200).json({
        mensaje: "No hay registros de bitácoras",
      });
    }
    let bitacoras_reverse = bitacoras.reverse();
    return res.status(200).json({
      mensaje: "Se han encontrado registros",
      bitacoras: bitacoras_reverse,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.stack,
    });
  }
};

const mostrar_bitacora = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        mensaje: "Se han encontrado errores",
        errors: errors.array(),
      });
    }
    const { id } = req.params;
    const bitacora = await prisma.bitacora_alumno.findFirst({
      where: {
        id_bitacora: Number(id),
      },
      include: {
        estado_bitacora: true,
      },
    });
    if (!bitacora) {
      return res.status(200).json({
        mensaje: "No existe una bitácora con ese id",
      });
    }
    return res.status(200).json({
      mensaje: "Se ha encontrado una bitácora",
      bitacora: bitacora,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.stack,
    });
  }
};

const eliminar_bitacora = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        mensaje: "Se han encontrado errores",
        errors: errors.array(),
      });
    }
    const { id } = req.params;
    const bitacora = await prisma.bitacora_alumno.findFirst({
      where: {
        id_bitacora: Number(id),
      },
    });
    if (!bitacora) {
      return res.status(200).json({
        mensaje: "No existe una bitácora con ese id",
      });
    }
    await prisma.bitacora_alumno.delete({
      where: {
        id_bitacora: Number(id),
      },
    });
    return res.status(200).json({
      mensaje: "Se ha eliminado correctamente",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.stack,
    });
  }
};

const actualizar_bitacora = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        mensaje: "Se han encontrado errores",
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const bitacora = await prisma.bitacora_alumno.findFirst({
      where: {
        id_bitacora: Number(id),
      },
    });
    if (!bitacora) {
      return res.status(200).json({
        mensaje: "No existe una bitacora con ese id",
      });
    }
    const {
      titulo,
      descripcion,
      fecha_creacion,
      hora_inicio,
      hora_fin,
      id_estado_bitacora,
      id_inscripcion_practica,
      id_usuario,
    } = req.body;
    const formato_fecha = "T00:00:00Z";
    const hora_inicio_formateada = `${fecha_creacion}T${hora_inicio}:00Z`;
    const hora_fin_formateada = `${fecha_creacion}T${hora_fin}:00Z`;
    const bitacora_actualizada = await prisma.bitacora_alumno.update({
      where: {
        id_bitacora: Number(id),
      },
      data: {
        titulo,
        descripcion,
        fecha_creacion: `${fecha_creacion}${formato_fecha}`,
        hora_inicio: hora_inicio_formateada,
        hora_fin: hora_fin_formateada,
        id_estado_bitacora,
        id_usuario,
        id_inscripcion_practica: Number(id_inscripcion_practica),
      },
    });

    return res.status(200).json({
      mensaje: "Se ha actualizado exitosamente",
      bitacora: bitacora_actualizada,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.stack,
    });
  }
};

module.exports = {
  crear_bitacora,
  mostrar_bitacoras,
  mostrar_bitacora,
  eliminar_bitacora,
  actualizar_bitacora,
};
