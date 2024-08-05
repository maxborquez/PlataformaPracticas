import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import clienteAxios from '../../../../helpers/clienteaxios';

const FormEstudiante = ({
  nombreEstudiante,
  run,
  emailEstudiante,
  celular,
  direccionEstudiante,
  fonoEmergencia,
  setNombreEstudiante,
  setRun,
  setEmailEstudiante,
  setCelular,
  setDireccionEstudiante,
  setFonoEmergencia
}) => {
  const obtenerDatosEstudiante = async () => {
    try {
      const id_alumno = localStorage.getItem('id_alumno');
      if (!id_alumno) {
        console.error('No se encontró el id_alumno en el localStorage.');
        return;
      }

      const response = await clienteAxios.get(`/sp/datosAlumno/${id_alumno}`);
      const alumno = response.data[0]; // Asumiendo que la respuesta es una lista y solo necesitas el primer elemento

      setNombreEstudiante(alumno.nombre);
      setRun(formatearRun(alumno.alu_rut, alumno.alu_dv));
      setEmailEstudiante(alumno.alu_email);
      setCelular(alumno.alu_celular);
      setDireccionEstudiante(alumno.dir_domicilio);
      setFonoEmergencia(alumno.alu_fono);
    } catch (error) {
      console.error('Error al obtener los datos del estudiante:', error);
    }
  };

  const formatearRun = (rut, dv) => {
    const rutFormateado = rut.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${rutFormateado}-${dv}`;
  };

  // Llamar a obtenerDatosEstudiante al cargar el componente
  useEffect(() => {
    obtenerDatosEstudiante();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Datos del estudiante
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Nombre del Estudiante"
          variant="outlined"
          margin="normal"
          value={nombreEstudiante}
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="RUN"
          variant="outlined"
          margin="normal"
          value={run}
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Email del Estudiante"
          variant="outlined"
          margin="normal"
          value={emailEstudiante}
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Celular"
          type="text"
          placeholder="9xxxxxxxx"
          inputProps={{ maxLength: 9 }}
          variant="outlined"
          margin="normal"
          value={celular}
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Dirección del Estudiante"
          variant="outlined"
          margin="normal"
          value={direccionEstudiante}
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Fono de Emergencia"
          type="text"
          placeholder="9xxxxxxxx"
          inputProps={{ maxLength: 9 }}
          variant="outlined"
          margin="normal"
          value={fonoEmergencia}
          disabled
        />
      </Grid>
    </Grid>
  );
};

export default FormEstudiante;
