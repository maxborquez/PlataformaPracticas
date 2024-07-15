import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, Typography, TextField } from '@mui/material';

const DatosEstudiante = ({
  nombreEstudiante,
  run,
  emailEstudiante,
  celular,
  direccionEstudiante,
  fonoEmergencia,
  onStepComplete
}) => {
  const { register } = useFormContext();

  useEffect(() => {
    // Verificar que todos los campos necesarios estén completos
    const fieldsCompleted = nombreEstudiante && run && emailEstudiante && celular && direccionEstudiante && fonoEmergencia;
    // Llamar a la función onStepComplete con el estado de completitud
    onStepComplete(fieldsCompleted);
  }, [nombreEstudiante, run, emailEstudiante, celular, direccionEstudiante, fonoEmergencia, onStepComplete]);

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
          defaultValue={nombreEstudiante}
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
          defaultValue={run}
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
          defaultValue={emailEstudiante}
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
          defaultValue={celular}
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
          defaultValue={direccionEstudiante}
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
          defaultValue={fonoEmergencia}
          variant="outlined"
          margin="normal"
          disabled
        />
      </Grid>
    </Grid>
  );
};

export default DatosEstudiante;
