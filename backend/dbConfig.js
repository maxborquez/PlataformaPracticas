require('dotenv').config();
const sql = require('mssql');

const config = {
  user: process.env.REMOTE_DB_USER,
  password: process.env.REMOTE_DB_PASSWORD,
  server: process.env.REMOTE_DB_SERVER,
  database: process.env.REMOTE_DB_DATABASE,
  port: parseInt(process.env.REMOTE_DB_PORT, 10), // Agrega esta línea para especificar el puerto
  options: {
    encrypt: true, // si estás usando Azure
    trustServerCertificate: true // si necesitas confiar en el certificado del servidor
  }
};

module.exports = config;
