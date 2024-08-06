const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const obtener_comunas = async (req, res) => {
  try {
    const comuna = await prisma.comuna.findMany({
      include: {
        provincia: {
          include: {
            region: true,
          },
        },
      },
    });

    if (comuna.length == 0) {
      return res.status(200).json({
        mensaje: "NO hay registro de comunas",
      });
    }
    return res.status(200).json({
      mensaje: "Se han encontrado datos",
      comuna: comuna,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Error al cargar el listado de comunas",
    });
  }
};

const getAllRegiones = async (req, res) => {
  try {
    const regiones = await prisma.region.findMany();
    res.json(regiones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las regiones" });
  }
};

const getProvinciaByRegion = async (req, res) => {
  const { id_region } = req.params;
  try {
    const provincias = await prisma.provincia.findMany({
      where: {
        id_region: parseInt(id_region),
      },
    });
    res.json(provincias);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener las provincias por región" });
  }
};

const getComunasByProvincia = async (req, res) => {
  const { id_provincia } = req.params;
  try {
    const comunas = await prisma.comuna.findMany({
      where: {
        id_provincia: parseInt(id_provincia),
      },
    });
    res.json(comunas);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener las comunas por provincia" });
  }
};


module.exports = {
  obtener_comunas,
  getAllRegiones,
  getProvinciaByRegion,
  getComunasByProvincia,
};
