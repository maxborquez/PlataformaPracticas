const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");

const prisma = new PrismaClient();

const createBitacora = async (req, res) => {
  const {
    titulo,
    descripcion,
    fecha_creacion,
    hora_inicio,
    hora_fin,
    id_tipo_bitacora,
    id_estado_bitacora,
    id_inscripcion_practica,
    id_alumno,
  } = req.body;

  try {
    const nuevaBitacora = await prisma.bitacora_alumno.create({
      data: {
        titulo: titulo,
        descripcion: descripcion,
        fecha_creacion: new Date(fecha_creacion + "T00:00:00.000Z"),
        hora_inicio: new Date(fecha_creacion + "T" + hora_inicio + ":00.000Z"),
        hora_fin: new Date(fecha_creacion + "T" + hora_fin + ":00.000Z"),
        id_tipo_bitacora: id_tipo_bitacora,
        id_estado_bitacora: id_estado_bitacora,
        id_inscripcion_practica: id_inscripcion_practica,
        id_alumno: id_alumno,
      },
    });
    res.status(201).json(nuevaBitacora);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la bitácora" });
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

    const { id_bitacora } = req.params;
    const bitacora = await prisma.bitacora_alumno.findFirst({
      where: {
        id_bitacora: Number(id_bitacora),
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
      hora_inicio,
      hora_fin,
      id_estado_bitacora,
      id_inscripcion_practica,
      id_usuario,
      id_tipo_bitacora,
    } = req.body;

    const dataToUpdate = {};
    if (titulo !== undefined) dataToUpdate.titulo = titulo;
    if (descripcion !== undefined) dataToUpdate.descripcion = descripcion;
    if (hora_inicio !== undefined && hora_fin !== undefined) {
      const fecha_creacion = bitacora.fecha_creacion.toISOString().split('T')[0];
      const hora_inicio_formateada = `${fecha_creacion}T${hora_inicio}:00Z`;
      const hora_fin_formateada = `${fecha_creacion}T${hora_fin}:00Z`;
      dataToUpdate.hora_inicio = hora_inicio_formateada;
      dataToUpdate.hora_fin = hora_fin_formateada;
    }
    if (id_estado_bitacora !== undefined) dataToUpdate.id_estado_bitacora = Number(id_estado_bitacora);
    if (id_usuario !== undefined) dataToUpdate.id_usuario = Number(id_usuario);
    if (id_inscripcion_practica !== undefined) dataToUpdate.id_inscripcion_practica = Number(id_inscripcion_practica);
    if (id_tipo_bitacora !== undefined) dataToUpdate.id_tipo_bitacora = Number(id_tipo_bitacora);

    const bitacora_actualizada = await prisma.bitacora_alumno.update({
      where: {
        id_bitacora: Number(id_bitacora),
      },
      data: dataToUpdate,
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


const detalle_bitacora = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        mensaje: "Se han encontrado errores",
        errors: errors.array(),
      });
    }
    const { id_bitacora } = req.params;

    const bitacora = await prisma.bitacora_alumno.findFirst({
      where: {
        id_bitacora: Number(id_bitacora),
      },
      include: {
        estado_bitacora: true,
      },
    });
    if (!bitacora) {
      return res.status(200).json({
        mensaje: "No existe una bitácora con ese ID",
      });
    }
    return res.status(200).json({
      mensaje: "Se ha encontrado una bitácora",
      bitacora: bitacora,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.stack,
    });
  }
};

const revisar = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        mensaje: "Se han encontrado errores",
        errors: errors.array(),
      });
    }

    const { id_bitacora } = req.params;

    // Actualizar el estado de la bitácora a 2
    const updatedBitacora = await prisma.bitacora_alumno.update({
      where: {
        id_bitacora: Number(id_bitacora),
      },
      data: {
        id_estado_bitacora: 1,
      },
    });

    return res.status(200).json({
      mensaje: "El estado de la bitácora ha sido actualizado a revisada",
      bitacora: updatedBitacora,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.stack,
    });
  }
};

module.exports = {
  createBitacora,
  mostrar_bitacoras,
  mostrar_bitacora,
  eliminar_bitacora,
  actualizar_bitacora,
  detalle_bitacora,
  revisar,
};
