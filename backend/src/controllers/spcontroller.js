const executeStoredProcedure = require('../StorageProcedures/alumnosp');

const getDatosAlumno = async (req, res) => {
  const alumnoId = parseInt(req.params.id, 10);

  try {
    const datos = await executeStoredProcedure('academia..sp_web_trae_carreras_alumno_practica', { alu_rut: alumnoId });
    res.json(datos);
  } catch (err) {
    res.status(500).send('Error al obtener datos del alumno');
  }
};

module.exports = {
  getDatosAlumno,
};
