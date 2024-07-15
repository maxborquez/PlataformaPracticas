import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DatosEmpresa = () => {
  const { register, formState: { errors }, watch } = useFormContext();
  const ciudadSeleccionada = watch('ciudadSeleccionada');

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Datos de empresa
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Nombre de la Empresa"
          {...register('nombreEmpresa', {
            required: 'Este campo es obligatorio',
            pattern: {
              value: /^[a-zA-Z\s]{0,40}$/,
              message: 'Nombre inválido. Solo letras y máximo 40 caracteres.'
            }
          })}
          variant="outlined"
          margin="normal"
          error={!!errors.nombreEmpresa}
          helperText={errors.nombreEmpresa?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Departamento o Área"
          {...register('deptoArea', {
            required: 'Este campo es obligatorio',
            pattern: {
              value: /^[a-zA-Z\s]{0,15}$/,
              message: 'Departamento o área inválido. Solo letras y máximo 15 caracteres.'
            }
          })}
          variant="outlined"
          margin="normal"
          error={!!errors.deptoArea}
          helperText={errors.deptoArea?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Página Web"
          {...register('paginaWeb', {
            required: 'Este campo es obligatorio',
            pattern: {
              value: /^[a-zA-Z.\s]{0,30}$/,
              message: 'Página web inválida. Solo letras, puntos y máximo 30 caracteres.'
            }
          })}
          variant="outlined"
          margin="normal"
          error={!!errors.paginaWeb}
          helperText={errors.paginaWeb?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Rubro"
          {...register('rubro', {
            required: 'Este campo es obligatorio',
            pattern: {
              value: /^[a-zA-Z\s]{0,30}$/,
              message: 'Rubro inválido. Solo letras y máximo 30 caracteres.'
            }
          })}
          variant="outlined"
          margin="normal"
          error={!!errors.rubro}
          helperText={errors.rubro?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Fono de la Empresa"
          type="text"
          placeholder="9xxxxxxxx"
          inputProps={{ maxLength: 9 }}
          {...register('fonoEmpresa', {
            required: 'Este campo es obligatorio',
            pattern: {
              value: /^\d{0,9}$/,
              message: 'Fono inválido. Solo números y máximo 9 dígitos.'
            }
          })}
          variant="outlined"
          margin="normal"
          error={!!errors.fonoEmpresa}
          helperText={errors.fonoEmpresa?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Dirección de la Empresa"
          {...register('direccionEmpresa', {
            required: 'Este campo es obligatorio',
            maxLength: {
              value: 20,
              message: 'Dirección inválida. Máximo 20 caracteres.'
            }
          })}
          variant="outlined"
          margin="normal"
          error={!!errors.direccionEmpresa}
          helperText={errors.direccionEmpresa?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="ciudad-label">Ciudad</InputLabel>
          <Select
            labelId="ciudad-label"
            {...register('ciudadSeleccionada', { required: 'Este campo es obligatorio' })}
            value={ciudadSeleccionada || ""}
            label="Ciudad"
          >
            <MenuItem value="" disabled>
              Seleccione una ciudad
            </MenuItem>
            {/* Menú vacío sin ciudades */}
          </Select>
          {errors.ciudadSeleccionada && (
            <Typography variant="body2" color="error">
              {errors.ciudadSeleccionada.message}
            </Typography>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default DatosEmpresa;
