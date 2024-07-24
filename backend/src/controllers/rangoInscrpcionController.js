const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los rangos de inscripción
const getAllRangos = async (req, res) => {
  try {
    const rangos = await prisma.rango_inscripcion.findMany();
    res.json(rangos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los rangos de inscripción.' });
  }
};

// Obtener un rango de inscripción por ID
const getRangoById = async (req, res) => {
  const { id } = req.params;
  try {
    const rango = await prisma.rango_inscripcion.findUnique({ where: { id_rango: Number(id) } });
    if (rango) {
      res.json(rango);
    } else {
      res.status(404).json({ error: 'Rango de inscripción no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el rango de inscripción.' });
  }
};

// Crear un nuevo rango de inscripción
const createRango = async (req, res) => {
  const { inicio1, termino1, inicio2, termino2 } = req.body;
  try {
    const newRango = await prisma.rango_inscripcion.create({
      data: { inicio1: new Date(inicio1), termino1: new Date(termino1), inicio2: new Date(inicio2), termino2: new Date(termino2) }
    });
    res.status(201).json(newRango);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el rango de inscripción.' });
  }
};

// Actualizar un rango de inscripción
const updateRango = async (req, res) => {
  const { id } = req.params;
  const { inicio1, termino1, inicio2, termino2 } = req.body;
  try {
    const updatedRango = await prisma.rango_inscripcion.update({
      where: { id_rango: Number(id) },
      data: { inicio1: new Date(inicio1), termino1: new Date(termino1), inicio2: new Date(inicio2), termino2: new Date(termino2) }
    });
    res.json(updatedRango);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el rango de inscripción.' });
  }
};

// Eliminar un rango de inscripción
const deleteRango = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.rango_inscripcion.delete({ where: { id_rango: Number(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el rango de inscripción.' });
  }
};

module.exports = {
  getAllRangos,
  getRangoById,
  createRango,
  updateRango,
  deleteRango
};
