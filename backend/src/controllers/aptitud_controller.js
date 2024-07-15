const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");

const prisma = new PrismaClient();

const obtener_aptitudes = async (req, res) => {
  try {
    const aptitudes = await prisma.aptitud.findMany({
      orderBy: {
        nombre_aptitud: "asc",
      },
    });
    if (aptitudes.length === 0) {
      return res
        .status(200)
        .json({ message: "Error, no existe lista de aptitudes" });
    }
    return res.status(200).json({
      message: "Se han encontrado con éxito las aptitudes",
      aptitudes: aptitudes,
    });
  } catch (error) {
    return res.status(400).json({ message: "Error, no se ha encontrado" });
  }
};

const getAptitudesAprobadas = async (req, res) => {
  try {
    const aptitudes = await prisma.aptitud.findMany({
      where: {
        id_estado: 2,
      },
    });

    res.status(200).json({ aptitudes });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error al obtener las aptitudes aprobadas",
        details: error.message,
      });
  }
};

const getAptitudesPendientes = async (req, res) => {
  try {
    const aptitudes = await prisma.aptitud.findMany({
      where: {
        id_estado: 1, // Filtra por el estado de aptitud pendiente (debes ajustar según tu estructura)
      },
    });

    res.status(200).json({ aptitudes });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error al obtener las aptitudes pendientes",
        details: error.message,
      });
  }
};

// Función para crear una nueva aptitud
const createAptitud = async (req, res) => {
  const { nombre_aptitud, id_estado } = req.body;

  try {
    const aptitud = await prisma.aptitud.create({
      data: {
        nombre_aptitud,
        id_estado,
      },
    });

    res.status(201).json({ message: "Aptitud creada exitosamente", aptitud });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear la aptitud", details: error.message });
  }
};

// Función para eliminar una aptitud por su ID
const deleteAptitud = async (req, res) => {
  const { idAptitud } = req.params; // Captura el ID desde los parámetros de la URL

  try {
    const aptitud = await prisma.aptitud.delete({
      where: {
        id_aptitud: parseInt(idAptitud), // Convierte el ID a entero, si es necesario
      },
    });

    res
      .status(200)
      .json({ message: "Aptitud eliminada correctamente", aptitud });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar la aptitud", details: error.message });
  }
};

const aprobarAptitud = async (req, res) => {
  const { idAptitud } = req.params;

  try {
    // Actualizar la aptitud en la base de datos
    const aptitudActualizada = await prisma.aptitud.update({
      where: { id_aptitud: parseInt(idAptitud) },
      data: {
        id_estado: 2
      },
    });

    res.status(200).json({
      message: "Aptitud aprobada correctamente",
      aptitud: aptitudActualizada,
    });
  } catch (error) {
    console.error("Error al aprobar aptitud:", error);
    res.status(500).json({ message: "Hubo un problema al aprobar la aptitud" });
  }
};


module.exports = {
  obtener_aptitudes,
  createAptitud,
  deleteAptitud,
  getAptitudesAprobadas,
  getAptitudesPendientes,
  aprobarAptitud,
};
