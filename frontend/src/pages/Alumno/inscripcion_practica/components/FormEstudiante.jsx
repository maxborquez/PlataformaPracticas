import React, { useState } from 'react';
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

      const response = await clienteAxios.post('/alumno/show', { id_alumno });
      const { alumno } = response.data;

      setNombreEstudiante(
        `${alumno.primer_nombre} ${alumno.segundo_nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}`
      );
      setRun(alumno.rut);
      setEmailEstudiante(alumno.correo_personal);
      setCelular(alumno.telefono_personal);
      setDireccionEstudiante(alumno.direccion_particular);
      setFonoEmergencia(alumno.telefono_familiar);
    } catch (error) {
      console.error('Error al obtener los datos del estudiante:', error);
    }
  };

  // Llamar a obtenerDatosEstudiante al cargar el componente
  React.useEffect(() => {
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
