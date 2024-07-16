import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const FormEstudiante = ({
  nombreEstudiante,
  run,
  emailEstudiante,
  celular,
  direccionEstudiante,
  fonoEmergencia
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
