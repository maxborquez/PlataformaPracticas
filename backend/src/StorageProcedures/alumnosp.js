const sql = require('mssql');
const config = require('../../dbConfig');

const executeStoredProcedure = async (procedureName, params) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .input('alu_rut', sql.Int, params.alu_rut) // asegúrate de que el nombre del parámetro coincida
      .execute(procedureName);

    return result.recordset;
  } catch (err) {
    console.error('Error al ejecutar el procedimiento almacenado:', err);
    throw err;
  }
};

module.exports = executeStoredProcedure;
