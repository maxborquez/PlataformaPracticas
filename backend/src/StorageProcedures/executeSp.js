const sql = require('mssql');
const config = require('../../dbConfig');

const executeStoredProcedure = async (procedureName, params) => {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();
    
    // Verifica y agrega los parámetros necesarios
    for (const [key, value] of Object.entries(params)) {
      if (value && value.type !== undefined) {
        request.input(key, value.type, value.value);
      }
    }
    
    let result = await request.execute(procedureName);

    return result.recordset;
  } catch (err) {
    console.error('Error al ejecutar el procedimiento almacenado:', err);
    throw err;
  }
};

module.exports = executeStoredProcedure;
