import React from 'react';
import { Grid, Typography, TextField } from '@mui/material';

const DatosEstudiante = ({
  nombreEstudiante,
  setNombreEstudiante,
  run,
  setRun,
  emailEstudiante,
  setEmailEstudiante,
  celular,
  setCelular,
  direccionEstudiante,
  setDireccionEstudiante,
  fonoEmergencia,
  setFonoEmergencia,
}) => {
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
          value={nombreEstudiante}
          onChange={(e) => setNombreEstudiante(e.target.value)}
          variant="outlined"
          margin="normal"
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="RUN"
          value={run}
          onChange={(e) => setRun(e.target.value)}
          variant="outlined"
          margin="normal"
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Email del Estudiante"
          value={emailEstudiante}
          onChange={(e) => setEmailEstudiante(e.target.value)}
          variant="outlined"
          margin="normal"
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
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
          variant="outlined"
          margin="normal"
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Dirección del Estudiante"
          value={direccionEstudiante}
          onChange={(e) => setDireccionEstudiante(e.target.value)}
          variant="outlined"
          margin="normal"
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
          value={fonoEmergencia}
          onChange={(e) => setFonoEmergencia(e.target.value)}
          variant="outlined"
          margin="normal"
          disabled
        />
      </Grid>
    </Grid>
  );
};

export default DatosEstudiante;
