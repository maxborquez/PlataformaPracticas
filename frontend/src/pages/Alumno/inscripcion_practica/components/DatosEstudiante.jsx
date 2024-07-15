import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, Typography, TextField } from '@mui/material';

const DatosEstudiante = () => {
  const { register } = useFormContext();

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
          {...register('nombreEstudiante')}
          variant="outlined"
          margin="normal"
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="RUN"
          {...register('run')}
          variant="outlined"
          margin="normal"
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Email del Estudiante"
          {...register('emailEstudiante')}
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
          {...register('celular')}
          variant="outlined"
          margin="normal"
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Dirección del Estudiante"
          {...register('direccionEstudiante')}
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
          {...register('fonoEmergencia')}
          variant="outlined"
          margin="normal"
          disabled
        />
      </Grid>
    </Grid>
  );
};

export default DatosEstudiante;
