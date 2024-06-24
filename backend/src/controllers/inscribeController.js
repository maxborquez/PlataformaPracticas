const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updateEstadoPractica = async (req, res) => {
  const { id_inscribe, id_estado } = req.params;

  try {
    const inscribe = await prisma.inscribe.update({
      where: {
        id_inscripcion: parseInt(id_inscribe),
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

const getInscribeIdByInscripcion = async (req, res) => {
  const { id_inscripcion_practica } = req.params;

  try {
    const inscripcion = await prisma.inscripcion_practica.findUnique({
      where: {
        id_inscripcion_practica: parseInt(id_inscripcion_practica),
      },
      select: {
        id_inscribe: true,
      },
    });

    if (!inscripcion) {
      return res.status(404).json({ message: 'Inscripción no encontrada' });
    }

    const inscribe = await prisma.inscribe.findUnique({
      where: {
        id_inscripcion: inscripcion.id_inscribe,
      },
      include: {
        alumno: true,
      },
    });

    if (!inscribe) {
      return res.status(404).json({ message: 'No se encontró la inscripción asociada' });
    }

    res.status(200).json({ inscribeId: inscribe.id_inscripcion });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la inscripción', error });
  }
};

module.exports = {
  updateEstadoPractica,
  getInscribeIdByInscripcion
};
