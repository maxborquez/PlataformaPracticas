const sql = require('mssql');
const executeStoredProcedure = require('../StorageProcedures/executeSp');

const getDatosAlumno = async (req, res) => {
  const { alu_rut } = req.params;

  try {
    const params = {
      alu_rut: { type: sql.Int, value: alu_rut }
    };

    const datos = await executeStoredProcedure('academia..sp_web_trae_carreras_alumno_practica', params);
    res.json(datos);
  } catch (err) {
    res.status(500).send('Error al obtener datos del alumno');
  }
};

const getAlumnosPorAsignaturaPractica = async (req, res) => {
  const { ano, periodo } = req.params;  // Obtén los parámetros de la ruta

  try {
    const params = {
      cod_asignatura: { type: sql.Int, value: null }, // Siempre null
      ano: { type: sql.Int, value: ano ? parseInt(ano, 10) : null }, // Cambia 'year' a 'ano'
      periodo: { type: sql.Int, value: periodo ? parseInt(periodo, 10) : null },
      cod_carrera: { type: sql.Int, value: null },  // Ajusta estos parámetros según sea necesario
      seccion: { type: sql.Int, value: null },
      n_rut_alumno: { type: sql.Int, value: null }
    };

    const datos = await executeStoredProcedure('academia..sp_web_alumnos_por_asignatura_practica', params);
    res.json(datos);
  } catch (err) {
    res.status(500).send('Error al obtener datos de alumnos por asignatura práctica');
  }
};

const getConveniosVigentes = async (req, res) => {
  const { fecha_inicio } = req.params;  // Obtén los parámetros de la ruta

  try {
    const params = {
      fecha_inicio: { type: sql.Int, value: fecha_inicio ? parseInt(fecha_inicio, 10) : null },
    };

    const datos = await executeStoredProcedure('vrae..sp_vrae_consulta_convenio_ri_vigentes', params);
    res.json(datos);
  } catch (err) {
    res.status(500).send('Error al obtener convenios vigentes');
  }
};

const getIdentificacionPractica = async (req, res) => {
  const { n_rut, password } = req.params;

  try {
    const params = {
      n_rut: { type: sql.Int, value: parseInt(n_rut, 10) },
      password: { type: sql.VarChar, value: password }
    };

    const datos = await executeStoredProcedure('Ubb.dbo.sp_WEB_IDENTIFICACION_practica', params);
    res.json(datos);
  } catch (err) {
    res.status(500).send('Error al obtener la identificación de práctica');
  }
};

module.exports = {
  getDatosAlumno,
  getAlumnosPorAsignaturaPractica,
  getConveniosVigentes,
  getIdentificacionPractica
};
