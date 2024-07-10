const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");

const prisma = new PrismaClient();

const crear_supervisor = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Se han encontrado errores",
        errors: errors.array(),
      });
    }

    const {
      primer_nombre,
      segundo_nombre,
      apellido_paterno,
      apellido_materno,
      telefono,
      correo,
      cargo,
      id_empresa,
    } = req.body;

    const supervisor = await prisma.supervisor.create({
      data: {
        primer_nombre,
        segundo_nombre,
        apellido_paterno,
        apellido_materno,
        telefono,
        correo,
        cargo,
        id_empresa,
      },
    });

    if (!supervisor) {
      return res.status(400).json({
        message: "No se ha podido crear el supervisor",
      });
    }

    return res.status(200).json({
      message: "El supervisor se ha añadido correctamente",
      supervisor: supervisor,
    });
  } catch (error) {
    return res.status(400).json({
      message: "No se ha podido añadir el supervisor",
      error: error.stack,
    });
  }
};

const obtener_supervisores = async (req, res) => {
  try {
    const supervisor = await prisma.supervisor.findMany();
    if (supervisor.length == 0) {
      return res
        .status(200)
        .json({ message: "Error, no existe lista de supervisores" });
    }
    return res.status(200).json({
      message: "Se han encontrado con éxito los supervisores",
      supervisor: supervisor,
    });
  } catch (error) {
    return res.status(400).json({ message: "Error, no se ha encontrado" });
  }
};

const obtener_supervisor = async (req, res) => {
  const { id } = req.params;
  try {
    const supervisor = await prisma.supervisor.findFirst({
      where: {
        id_supervisor: Number(id),
      },
    });
    if (!supervisor) {
      return res
        .status(200)
        .json({ message: "Error, no existe este supervisor" });
    }
    return res.status(200).json({
      message: "Se ha encontrado con éxito el supervisor",
      supervisor: supervisor,
    });
  } catch (error) {
    return res.status(400).json({ message: "Error, no se ha encontrado" });
  }
};

const eliminar_supervisor = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Se han encontrado errores", errors: errors.array() });
    }
    const { id } = req.params;
    const supervisor = await prisma.supervisor.findFirst({
      where: {
        id_supervisor: Number(id),
      },
    });
    if (!supervisor) {
      return res.status(200).json({
        message: "No se ha encontrado a ningun supervisor con este ID",
      });
    }
    await prisma.supervisor.delete({
      where: { id_supervisor: Number(id) },
    });
    return res.status(200).json({
      message: "Se ha eliminado con éxito el supervisor",
      // supervisorEliminado:supervisorEliminado
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error, no se ha podido eliminar el supervisor",
      error: error.stack,
    });
  }
};

const actualizar_supervisor = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Se han encontrado errores",
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const {
      primer_nombre,
      segundo_nombre,
      apellido_paterno,
      apellido_materno,
      correo,
      telefono,
      cargo,
    } = req.body;

    const supervisor = await prisma.supervisor.findFirst({
      where: {
        id_supervisor: Number(id),
      },
    });

    if (!supervisor) {
      return res.status(200).json({
        message: "No existe el supervisor",
      });
    }

    const supervisorActualizado = await prisma.supervisor.update({
      where: { id_supervisor: Number(id) },
      data: {
        primer_nombre,
        segundo_nombre,
        apellido_paterno,
        apellido_materno,
        telefono,
        correo,
        cargo,
      },
    });

    if (!supervisorActualizado) {
      return res
        .status(200)
        .json({ message: "Error al actualizar al supervisor" });
    }

    return res.status(200).json({
      message: "Se ha actualizado con éxito el supervisor",
      supervisor: supervisorActualizado,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error, no se ha podido actualizar el supervisor",
      error: error.stack,
    });
  }
};

module.exports = {
  obtener_supervisor,
  obtener_supervisores,
  crear_supervisor,
  eliminar_supervisor,
  actualizar_supervisor,
};
