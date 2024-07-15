import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, Typography, TextField } from '@mui/material';

const DatosSupervisor = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Datos del supervisor
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Nombre del Supervisor"
          {...register('nombreSupervisor', {
            required: 'Este campo es obligatorio',
            pattern: {
              value: /^[a-zA-Z\s]{0,50}$/,
              message: 'Nombre inválido. Solo letras y máximo 50 caracteres.'
            }
          })}
          variant="outlined"
          margin="normal"
          error={!!errors.nombreSupervisor}
          helperText={errors.nombreSupervisor?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Cargo del Supervisor"
          {...register('cargoSupervisor', {
            required: 'Este campo es obligatorio',
            pattern: {
              value: /^[a-zA-Z\s]{0,30}$/,
              message: 'Cargo inválido. Solo letras y máximo 30 caracteres.'
            }
          })}
          variant="outlined"
          margin="normal"
          error={!!errors.cargoSupervisor}
          helperText={errors.cargoSupervisor?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Fono del Supervisor"
          type="text"
          placeholder="9xxxxxxxx"
          inputProps={{ maxLength: 9 }}
          {...register('fonoSupervisor', {
            required: 'Este campo es obligatorio',
            pattern: {
              value: /^\d{0,9}$/,
              message: 'Fono inválido. Solo números y máximo 9 dígitos.'
            }
          })}
          variant="outlined"
          margin="normal"
          error={!!errors.fonoSupervisor}
          helperText={errors.fonoSupervisor?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          type="email"
          placeholder="correo@dominio.cl"
          label="Email del Supervisor"
          {...register('emailSupervisor', {
            required: 'Este campo es obligatorio',
            maxLength: {
              value: 40,
              message: 'Email inválido. Máximo 40 caracteres.'
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Formato de email inválido.'
            }
          })}
          variant="outlined"
          margin="normal"
          error={!!errors.emailSupervisor}
          helperText={errors.emailSupervisor?.message}
        />
      </Grid>
    </Grid>
  );
};

export default DatosSupervisor;
