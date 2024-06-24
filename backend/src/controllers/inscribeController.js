const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updateEstadoPractica = async (req, res) => {
  const { id_inscripcion, id_estado } = req.params;

  try {
    const inscribe = await prisma.inscribe.update({
      where: {
        id_inscripcion: parseInt(id_inscripcion),
      },
      data: {
        id_estado_practica: parseInt(id_estado),
      },
    });

    res.status(200).json({ message: 'Estado de práctica actualizado correctamente', inscribe });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el estado de práctica', error });
  }
};

module.exports = {
  updateEstadoPractica,
};
