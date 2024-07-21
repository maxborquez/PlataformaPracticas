// rubroController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los rubros
const getAllRubros = async (req, res) => {
  try {
    const rubros = await prisma.rubro.findMany();
    res.json(rubros);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching rubros' });
  }
};

// Obtener un rubro por ID
const getRubroById = async (req, res) => {
  const { id } = req.params;
  try {
    const rubro = await prisma.rubro.findUnique({
      where: { id_rubro: parseInt(id) }
    });
    if (rubro) {
      res.json(rubro);
    } else {
      res.status(404).json({ error: 'Rubro not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching rubro' });
  }
};

// Crear un nuevo rubro
const createRubro = async (req, res) => {
  const { nombre_rubro } = req.body;
  try {
    const newRubro = await prisma.rubro.create({
      data: { nombre_rubro }
    });
    res.status(201).json(newRubro);
  } catch (error) {
    res.status(500).json({ error: 'Error creating rubro' });
  }
};

// Actualizar un rubro
const updateRubro = async (req, res) => {
  const { id } = req.params;
  const { nombre_rubro } = req.body;
  try {
    const updatedRubro = await prisma.rubro.update({
      where: { id_rubro: parseInt(id) },
      data: { nombre_rubro }
    });
    res.json(updatedRubro);
  } catch (error) {
    res.status(500).json({ error: 'Error updating rubro' });
  }
};

// Eliminar un rubro
const deleteRubro = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.rubro.delete({
      where: { id_rubro: parseInt(id) }
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting rubro' });
  }
};

module.exports = {
  getAllRubros,
  getRubroById,
  createRubro,
  updateRubro,
  deleteRubro
};
