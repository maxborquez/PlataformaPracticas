const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");

const prisma = new PrismaClient();

const crear_inscripcion = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        mensaje: "Se han encontrado errores",
        errors: errors.array(),
      });
    }

    const {
      fecha_inscripcion_practica,
      fecha_inicio,
      fecha_fin,
      descripcion,
      objetivos,
      actividades,
      id_empresa,
      id_supervisor,
      id_oferta,
      id_estado_inscripcion,
      id_modalidad,
      id_inscribe,
      observaciones,
      lunes_manana1,
      lunes_manana2,
      lunes_tarde1,
      lunes_tarde2,
      martes_manana1,
      martes_manana2,
      martes_tarde1,
      martes_tarde2,
      miercoles_manana1,
      miercoles_manana2,
      miercoles_tarde1,
      miercoles_tarde2,
      jueves_manana1,
      jueves_manana2,
      jueves_tarde1,
      jueves_tarde2,
      viernes_manana1,
      viernes_manana2,
      viernes_tarde1,
      viernes_tarde2,
      sabado_manana1,
      sabado_manana2,
      sabado_tarde1,
      sabado_tarde2,
    } = req.body;

    const inscripcion = await prisma.inscripcion_practica.create({
      data: {
        fecha_inscripcion_practica: new Date(`${fecha_inscripcion_practica}T00:00:00.000Z`),
        fecha_inicio: new Date(`${fecha_inicio}T00:00:00.000Z`),
        fecha_fin: new Date(`${fecha_fin}T00:00:00.000Z`),
        descripcion,
        objetivos,
        actividades,
        id_empresa,
        id_supervisor,
        id_oferta,
        id_estado_inscripcion,
        id_modalidad,
        id_inscribe,
        observaciones,
        lunes_manana1: new Date(`${fecha_inscripcion_practica}T${lunes_manana1}:00.000Z`),
        lunes_manana2: new Date(`${fecha_inscripcion_practica}T${lunes_manana2}:00.000Z`),
        lunes_tarde1: new Date(`${fecha_inscripcion_practica}T${lunes_tarde1}:00.000Z`),
        lunes_tarde2: new Date(`${fecha_inscripcion_practica}T${lunes_tarde2}:00.000Z`),
        martes_manana1: new Date(`${fecha_inscripcion_practica}T${martes_manana1}:00.000Z`),
        martes_manana2: new Date(`${fecha_inscripcion_practica}T${martes_manana2}:00.000Z`),
        martes_tarde1: new Date(`${fecha_inscripcion_practica}T${martes_tarde1}:00.000Z`),
        martes_tarde2: new Date(`${fecha_inscripcion_practica}T${martes_tarde2}:00.000Z`),
        miercoles_manana1: new Date(`${fecha_inscripcion_practica}T${miercoles_manana1}:00.000Z`),
        miercoles_manana2: new Date(`${fecha_inscripcion_practica}T${miercoles_manana2}:00.000Z`),
        miercoles_tarde1: new Date(`${fecha_inscripcion_practica}T${miercoles_tarde1}:00.000Z`),
        miercoles_tarde2: new Date(`${fecha_inscripcion_practica}T${miercoles_tarde2}:00.000Z`),
        jueves_manana1: new Date(`${fecha_inscripcion_practica}T${jueves_manana1}:00.000Z`),
        jueves_manana2: new Date(`${fecha_inscripcion_practica}T${jueves_manana2}:00.000Z`),
        jueves_tarde1: new Date(`${fecha_inscripcion_practica}T${jueves_tarde1}:00.000Z`),
        jueves_tarde2: new Date(`${fecha_inscripcion_practica}T${jueves_tarde2}:00.000Z`),
        viernes_manana1: new Date(`${fecha_inscripcion_practica}T${viernes_manana1}:00.000Z`),
        viernes_manana2: new Date(`${fecha_inscripcion_practica}T${viernes_manana2}:00.000Z`),
        viernes_tarde1: new Date(`${fecha_inscripcion_practica}T${viernes_tarde1}:00.000Z`),
        viernes_tarde2: new Date(`${fecha_inscripcion_practica}T${viernes_tarde2}:00.000Z`),
        sabado_manana1: new Date(`${fecha_inscripcion_practica}T${sabado_manana1}:00.000Z`),
        sabado_manana2: new Date(`${fecha_inscripcion_practica}T${sabado_manana2}:00.000Z`),
        sabado_tarde1: new Date(`${fecha_inscripcion_practica}T${sabado_tarde1}:00.000Z`),
        sabado_tarde2: new Date(`${fecha_inscripcion_practica}T${sabado_tarde2}:00.000Z`),
      },
    });

    if (!inscripcion) {
      return res.status(400).json({
        mensaje: "Error al registrar inscripcion",
      });
    }

    return res.status(200).json({
      mensaje: "Inscripcion registrada correctamente",
      inscripcion,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.stack,
    });
  }
};


const mostrar_inscripciones = async (req, res) => {
  try {
    const inscripciones = await prisma.inscripcion_practica.findMany({
      where: {
        id_estado_inscripcion: 1,
      },
      include: {
        estado_inscripcion: true,
      },
    });
    if (inscripciones.length === 0) {
      console.log("No hay inscripciones pendientes");
      return res.status(200).json({
        mensaje: "No existen registros de inscripciones",
      });
    }
    return res.status(200).json({
      mensaje: "Se han encontrado inscripciones",
      inscripciones: inscripciones,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.stack,
    });
  }
};

const mostrar_inscripcion = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        mensaje: "Se han encontrado errores",
        errors: errors.array(),
      });
    }
    const { id } = req.params;
    const inscripcion = await prisma.inscripcion_practica.findFirst({
      where: {
        id_inscribe: Number(id),
      },
      include: {
        estado_inscripcion: true,
        supervisor: true,
        modalidad: true,
        oferta_practica: true,
      },
    });
    if (!inscripcion) {
      return res.status(200).json({
        mensaje: "No se ha encontrado la inscripcion",
      });
    }

    return res.status(200).json({
      mensaje: "Se ha encontrado la inscripcion",
      inscripcion: inscripcion,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.stack,
    });
  }
};

const eliminar_inscripcion = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        mensaje: "Se han encontrado errores",
        errors: errors.array(),
      });
    }
    const { id } = req.params;
    console.log(id);
    const inscripcion = await prisma.inscripcion_practica.findFirst({
      where: {
        id_inscripcion_practica: Number(id),
      },
    });
    if (!inscripcion) {
      return res.status(200).json({
        mensaje: "No se ha encontrado la inscripcion",
      });
    }
    await prisma.inscripcion_practica.delete({
      where: {
        id_inscripcion_practica: Number(inscripcion.id_inscripcion_practica),
      },
    });
    return res.status(200).json({
      mensaje: "La inscripción ha sido eliminada correctamente",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.stack,
    });
  }
};

const actualizar_inscripcion = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        mensaje: "Se han encontrado errores",
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const inscripcion = await prisma.inscripcion_practica.findFirst({
      where: {
        id_inscripcion_practica: Number(id),
      },
    });

    if (!inscripcion) {
      return res.status(200).json({
        mensaje: "La inscripción no existe",
      });
    }

    const {
      fecha_inscripcion_practica,
      fecha_inicio,
      fecha_fin,
      descripcion,
      objetivos,
      actividades,
      id_empresa,
      id_supervisor,
      id_oferta,
      id_estado_inscripcion,
      id_modalidad,
      id_inscribe,
      observaciones,
      lunes_manana1,
      lunes_manana2,
      lunes_tarde1,
      lunes_tarde2,
      martes_manana1,
      martes_manana2,
      martes_tarde1,
      martes_tarde2,
      miercoles_manana1,
      miercoles_manana2,
      miercoles_tarde1,
      miercoles_tarde2,
      jueves_manana1,
      jueves_manana2,
      jueves_tarde1,
      jueves_tarde2,
      viernes_manana1,
      viernes_manana2,
      viernes_tarde1,
      viernes_tarde2,
      sabado_manana1,
      sabado_manana2,
      sabado_tarde1,
      sabado_tarde2,
    } = req.body;

    const formato_fecha = "T00:00:00Z";
    const formato_hora = "T00:00:00Z"; // Ajusta el formato de hora si es necesario

    const inscripcion_actualizada = await prisma.inscripcion_practica.update({
      where: {
        id_inscripcion_practica: Number(id),
      },
      data: {
        fecha_inscripcion_practica: `${fecha_inscripcion_practica}${formato_fecha}`,
        fecha_inicio: `${fecha_inicio}${formato_fecha}`,
        fecha_fin: `${fecha_fin}${formato_fecha}`,
        descripcion,
        objetivos,
        actividades,
        id_empresa,
        id_supervisor,
        id_oferta,
        id_estado_inscripcion,
        id_modalidad,
        id_inscribe,
        observaciones,
        lunes_manana1: `${lunes_manana1}${formato_hora}`,
        lunes_manana2: `${lunes_manana2}${formato_hora}`,
        lunes_tarde1: `${lunes_tarde1}${formato_hora}`,
        lunes_tarde2: `${lunes_tarde2}${formato_hora}`,
        martes_manana1: `${martes_manana1}${formato_hora}`,
        martes_manana2: `${martes_manana2}${formato_hora}`,
        martes_tarde1: `${martes_tarde1}${formato_hora}`,
        martes_tarde2: `${martes_tarde2}${formato_hora}`,
        miercoles_manana1: `${miercoles_manana1}${formato_hora}`,
        miercoles_manana2: `${miercoles_manana2}${formato_hora}`,
        miercoles_tarde1: `${miercoles_tarde1}${formato_hora}`,
        miercoles_tarde2: `${miercoles_tarde2}${formato_hora}`,
        jueves_manana1: `${jueves_manana1}${formato_hora}`,
        jueves_manana2: `${jueves_manana2}${formato_hora}`,
        jueves_tarde1: `${jueves_tarde1}${formato_hora}`,
        jueves_tarde2: `${jueves_tarde2}${formato_hora}`,
        viernes_manana1: `${viernes_manana1}${formato_hora}`,
        viernes_manana2: `${viernes_manana2}${formato_hora}`,
        viernes_tarde1: `${viernes_tarde1}${formato_hora}`,
        viernes_tarde2: `${viernes_tarde2}${formato_hora}`,
        sabado_manana1: `${sabado_manana1}${formato_hora}`,
        sabado_manana2: `${sabado_manana2}${formato_hora}`,
        sabado_tarde1: `${sabado_tarde1}${formato_hora}`,
        sabado_tarde2: `${sabado_tarde2}${formato_hora}`,
      },
    });

    return res.status(200).json({
      mensaje: "Inscripción actualizada correctamente",
      inscripcion_actualizada,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.stack,
    });
  }
};


const comprobar_inscripcion = async (req, res) => {
  try {
    const { id_alumno } = req.body;
    
    // Comprobamos si el alumno existe
    const alumno = await prisma.alumno.findFirst({
      where: {
        id_alumno: Number(id_alumno),
      },
    });
    
    if (!alumno) {
      return res.status(400).json({
        mensaje: "El alumno no existe",
      });
    }
    
    // Consultamos si tiene inscrita la práctica desde intranet y que no tenga id_estado_practica = 3
    const inscribe = await prisma.inscribe.findFirst({
      where: {
        id_alumno: Number(id_alumno),
        NOT: {
          id_estado_practica: 3,
        },
      },
    });
    
    if (!inscribe) {
      return res.status(200).json({
        mensaje: "El alumno no tiene inscrita la práctica desde intranet o ya ha finalizado",
        inscrito_intranet: false,
      });
    }

    // Consultamos si la inscripción está en el sistema
    const inscripcion_sistema = await prisma.inscripcion_practica.findFirst({
      where: {
        id_inscribe: inscribe.id_inscripcion,
      },
    });
    
    if (!inscripcion_sistema) {
      return res.status(200).json({
        mensaje: "Por favor haga inscripción en el sistema",
        inscrito_sistema: false,
      });
    }
    
    return res.status(200).json({
      mensaje: "Tiene su práctica inscrita correctamente en el sistema",
      inscrito_sistema: true,
      id_inscripcion: inscripcion_sistema.id_inscripcion_practica,
    });
    
  } catch (error) {
    return res.status(400).json({
      error: error.stack,
    });
  }
};


const obtener_Modalidades = async (req, res) => {
  try {
    const modalidades = await prisma.modalidad.findMany();
    if (modalidades.length == 0) {
      return res.status(200).json({
        mensaje: "No hay modalidades",
      });
    }
    return res.status(200).json({
      mensaje: "Se han encontrado resultados",
      modalidades: modalidades,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.stack,
    });
  }
};

const actualizar_supervisor = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_supervisor } = req.body;
    const inscripcion = await prisma.inscripcion_practica.findFirst({
      where: {
        id_inscribe: Number(id),
      },
    });

    if (!inscripcion) {
      return res.status(400).json({
        mensaje: "La inscripcion no existe",
      });
    }
    const actualiza = await prisma.inscripcion_practica.update({
      where: {
        id_inscripcion_practica: Number(inscripcion.id_inscripcion_practica),
      },
      data: {
        id_supervisor: Number(id_supervisor),
      },
    });
    if (!actualiza) {
      return res.status(400).json({
        mensaje: "Error al actualizar",
      });
    }
    return res.status(200).json({
      mensaje: "Inscripción actualizada correctamente",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.stack,
    });
  }
};

const actualizar_inscripcion_alumno = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        mensaje: "Se han encontrado errores",
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const inscripcion = await prisma.inscripcion_practica.findFirst({
      where: {
        id_inscribe: Number(id),
      },
    });

    if (!inscripcion) {
      return res.status(200).json({
        mensaje: "La inscripción no existe",
      });
    }

    const {
      fecha_inicio,
      fecha_fin,
      descripcion,
      objetivos,
      actividades,
      id_empresa,
      id_supervisor,
      id_oferta,
      id_estado_inscripcion,
      id_modalidad,
      observaciones,
      lunes_manana1,
      lunes_manana2,
      lunes_tarde1,
      lunes_tarde2,
      martes_manana1,
      martes_manana2,
      martes_tarde1,
      martes_tarde2,
      miercoles_manana1,
      miercoles_manana2,
      miercoles_tarde1,
      miercoles_tarde2,
      jueves_manana1,
      jueves_manana2,
      jueves_tarde1,
      jueves_tarde2,
      viernes_manana1,
      viernes_manana2,
      viernes_tarde1,
      viernes_tarde2,
      sabado_manana1,
      sabado_manana2,
      sabado_tarde1,
      sabado_tarde2,
    } = req.body;

    const formato_fecha = "T00:00:00.000Z";
    const formato_hora = ":00.000Z";

    const inscripcion_actualizada = await prisma.inscripcion_practica.update({
      where: {
        id_inscripcion_practica: inscripcion.id_inscripcion_practica,
      },
      data: {
        fecha_inicio: new Date(`${inscripcion.fecha_inscripcion_practica}T${fecha_inicio}${formato_hora}`),
        fecha_fin: new Date(`${inscripcion.fecha_inscripcion_practica}T${fecha_fin}${formato_hora}`),
        descripcion,
        objetivos,
        actividades,
        id_empresa,
        id_supervisor,
        id_oferta,
        id_estado_inscripcion,
        id_modalidad,
        observaciones,
        lunes_manana1: new Date(`${inscripcion.fecha_inscripcion_practica}T${lunes_manana1}${formato_hora}`),
        lunes_manana2: new Date(`${inscripcion.fecha_inscripcion_practica}T${lunes_manana2}${formato_hora}`),
        lunes_tarde1: new Date(`${inscripcion.fecha_inscripcion_practica}T${lunes_tarde1}${formato_hora}`),
        lunes_tarde2: new Date(`${inscripcion.fecha_inscripcion_practica}T${lunes_tarde2}${formato_hora}`),
        martes_manana1: new Date(`${inscripcion.fecha_inscripcion_practica}T${martes_manana1}${formato_hora}`),
        martes_manana2: new Date(`${inscripcion.fecha_inscripcion_practica}T${martes_manana2}${formato_hora}`),
        martes_tarde1: new Date(`${inscripcion.fecha_inscripcion_practica}T${martes_tarde1}${formato_hora}`),
        martes_tarde2: new Date(`${inscripcion.fecha_inscripcion_practica}T${martes_tarde2}${formato_hora}`),
        miercoles_manana1: new Date(`${inscripcion.fecha_inscripcion_practica}T${miercoles_manana1}${formato_hora}`),
        miercoles_manana2: new Date(`${inscripcion.fecha_inscripcion_practica}T${miercoles_manana2}${formato_hora}`),
        miercoles_tarde1: new Date(`${inscripcion.fecha_inscripcion_practica}T${miercoles_tarde1}${formato_hora}`),
        miercoles_tarde2: new Date(`${inscripcion.fecha_inscripcion_practica}T${miercoles_tarde2}${formato_hora}`),
        jueves_manana1: new Date(`${inscripcion.fecha_inscripcion_practica}T${jueves_manana1}${formato_hora}`),
        jueves_manana2: new Date(`${inscripcion.fecha_inscripcion_practica}T${jueves_manana2}${formato_hora}`),
        jueves_tarde1: new Date(`${inscripcion.fecha_inscripcion_practica}T${jueves_tarde1}${formato_hora}`),
        jueves_tarde2: new Date(`${inscripcion.fecha_inscripcion_practica}T${jueves_tarde2}${formato_hora}`),
        viernes_manana1: new Date(`${inscripcion.fecha_inscripcion_practica}T${viernes_manana1}${formato_hora}`),
        viernes_manana2: new Date(`${inscripcion.fecha_inscripcion_practica}T${viernes_manana2}${formato_hora}`),
        viernes_tarde1: new Date(`${inscripcion.fecha_inscripcion_practica}T${viernes_tarde1}${formato_hora}`),
        viernes_tarde2: new Date(`${inscripcion.fecha_inscripcion_practica}T${viernes_tarde2}${formato_hora}`),
        sabado_manana1: new Date(`${inscripcion.fecha_inscripcion_practica}T${sabado_manana1}${formato_hora}`),
        sabado_manana2: new Date(`${inscripcion.fecha_inscripcion_practica}T${sabado_manana2}${formato_hora}`),
        sabado_tarde1: new Date(`${inscripcion.fecha_inscripcion_practica}T${sabado_tarde1}${formato_hora}`),
        sabado_tarde2: new Date(`${inscripcion.fecha_inscripcion_practica}T${sabado_tarde2}${formato_hora}`),
      },
    });

    return res.status(200).json({
      mensaje: "Inscripción actualizada correctamente",
      inscripcion_actualizada,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.stack,
    });
  }
};

const actualizar_estado_inscripcion = async (req, res) => {
  try {
    const { id_estado_inscripcion, id_inscripcion } = req.body;

    const inscripcion = await prisma.inscripcion_practica.findFirst({
      where: {
        id_inscripcion_practica: Number(id_inscripcion),
      },
    });

    if (!inscripcion) {
      return res.status(200).json({
        mensaje: "La inscripcion no existe",
      });
    }
    const inscripcion_actualizada = await prisma.inscripcion_practica.update({
      where: {
        id_inscripcion_practica: Number(id_inscripcion),
      },
      data: {
        id_estado_inscripcion: Number(id_estado_inscripcion),
      },
    });

    return res.status(200).json({
      mensaje: "Inscripcion actualizada correctamente",
      inscripcion: inscripcion_actualizada,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.stack,
    });
  }
};

const actualizar_evaluacion_inscripcion = async (req, res) => {
  try {
    const { id_inscripcion, observaciones } =
      req.body;

    const inscripcion = await prisma.inscripcion_practica.findFirst({
      where: {
        id_inscripcion_practica: Number(id_inscripcion),
      },
    });

    if (!inscripcion) {
      return res.status(200).json({
        mensaje: "La inscripcion no existe",
      });
    }
    const inscripcion_actualizada = await prisma.inscripcion_practica.update({
      where: {
        id_inscripcion_practica: Number(id_inscripcion),
      },
      data: {
        observaciones: observaciones,
      },
    });

    return res.status(200).json({
      mensaje: "Inscripcion actualizada correctamente",
      inscripcion: inscripcion_actualizada,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.stack,
    });
  }
};

const mostrar_id_inscripcion = async (req, res) => {
  try {
    const { id_inscribe } = req.body;
    const inscripcion = await prisma.inscripcion_practica.findFirst({
      where: {
        id_inscribe: Number(id_inscribe),
      },
    });
    if (!inscripcion) {
      return res.status(200).json({ mensaje: "No existe la inscripcion" });
    }
    return res.status(200).json({
      mensaje: "Se encontró una inscripcion",
      id_inscripcion_practica: inscripcion.id_estado_inscripcion,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Error al obtener id",
    });
  }
};

const getInscripcionesEnProceso = async (req, res) => {
  const { id_estado_inscripcion } = req.params;

  try {
    const inscripciones = await prisma.inscripcion_practica.findMany({
      where: {
        id_estado_inscripcion: parseInt(id_estado_inscripcion),
      },
      include: {
        inscribe: {
          include: {
            alumno: {
              include: {
                carrera: true,
              },
            },
            asignatura: {
              include: {
                periodo_academico: true,
              },
            },
          },
        },
        oferta_practica: true,
      },
    });

    const formattedInscripciones = inscripciones.map(inscripcion => ({
      id_inscripcion: inscripcion.id_inscripcion_practica,
      primer_nombre: inscripcion.inscribe.alumno.primer_nombre,
      primer_apellido: inscripcion.inscribe.alumno.apellido_paterno,
      rut: inscripcion.inscribe.alumno.rut,
      carrera: inscripcion.inscribe.alumno.carrera.nombre_carrera,
      oferta: inscripcion.oferta_practica ? inscripcion.oferta_practica.descripcion : 'No especificada',
      periodo_academico: `${inscripcion.inscribe.asignatura.periodo_academico.anio}-${inscripcion.inscribe.asignatura.periodo_academico.periodo}`,
    }));

    res.status(200).json(formattedInscripciones);
  } catch (error) {
    console.error('Error fetching inscripciones:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getInscriptionsByCareerAndPractica = async (req, res) => {
  try {
    const { careerId, practicaId, year, period } = req.params;

    const inscriptions = await prisma.inscribe.count({
      where: {
        id_asignatura: parseInt(practicaId),
        alumno: {
          id_carrera: parseInt(careerId),
        },
        asignatura: {
          periodo_academico: {
            anio: parseInt(year),
            periodo: parseInt(period),
          },
        },
      },
    });

    res.status(200).json({ count: inscriptions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEstudiantesPorParametros = async (req, res) => {
  const { careerId, asignaturaId, anio, periodo } = req.params;

  try {
    const estudiantes = await prisma.alumno.findMany({
      where: {
        id_carrera: parseInt(careerId),
        inscribe: {
          some: {
            id_asignatura: parseInt(asignaturaId),
            asignatura: {
              periodo_academico: {
                anio: parseInt(anio),
                periodo: parseInt(periodo),
              },
            },
          },
        },
      },
      include: {
        inscribe: {
          include: {
            asignatura: {
              include: {
                periodo_academico: true,
              },
            },
            estado_practica: true,
            // Quitar la inclusión de estado_inscripcion
          },
          where: {
            id_asignatura: parseInt(asignaturaId),
            asignatura: {
              periodo_academico: {
                anio: parseInt(anio),
                periodo: parseInt(periodo),
              },
            },
          },
        },
      },
    });

    res.json(estudiantes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los estudiantes' });
  }
};

const getPracticasByAlumno = async (req, res) => {
  const { id_alumno } = req.params;

  try {
    // Obtener las inscripciones y las prácticas asociadas del alumno
    const practicas = await prisma.inscribe.findMany({
      where: {
        id_alumno: parseInt(id_alumno),
      },
      include: {
        inscripcion_practica: true,
      },
    });

    // Devolver la respuesta en formato JSON
    res.json(practicas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las prácticas del alumno' });
  }
};


module.exports = {
  crear_inscripcion,
  mostrar_inscripciones,
  comprobar_inscripcion,
  mostrar_inscripcion,
  eliminar_inscripcion,
  actualizar_inscripcion,
  obtener_Modalidades,
  actualizar_supervisor,
  actualizar_inscripcion_alumno,
  actualizar_estado_inscripcion,
  actualizar_evaluacion_inscripcion,
  mostrar_id_inscripcion,
  getInscripcionesEnProceso,
  getInscriptionsByCareerAndPractica,
  getEstudiantesPorParametros,
  getPracticasByAlumno
};
