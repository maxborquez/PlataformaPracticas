import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, TextField } from '@mui/material';

const HorarioPractica = ({
  fechaInicio,
  handleFechaInicioChange,
  fechaFin,
  handleFechaFinChange,
}) => {


  const validateFechaInicio = () => {
    if (!fechaInicio) return true;

    const today = new Date();
    const start = new Date(fechaInicio);

    // Validar que la fecha de inicio sea este año o el próximo
    const currentYear = today.getFullYear();
    const nextYear = currentYear + 1;

    return start.getFullYear() >= currentYear && start.getFullYear() <= nextYear;
  };

  const validateFechaFin = () => {
    if (!fechaInicio || !fechaFin) return true;

    const start = new Date(fechaInicio);
    const end = new Date(fechaFin);

    // Validar que la fecha de fin sea mayor o igual que la fecha de inicio
    // y que esté dentro de los próximos 30 días después de la fecha de inicio
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return start <= end && diffDays >= 30 && end.getFullYear() >= start.getFullYear() && end.getFullYear() <= start.getFullYear() + 1;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Horario de la práctica
        </Typography>
      </Grid>

      <Grid item xs={6} md={3}>
        <Typography variant="subtitle1" gutterBottom>
          Fecha de inicio de la práctica
        </Typography>
        <TextField
          id="fecha_inicio"
          label="Fecha de inicio"
          type="date"
          value={fechaInicio}
          onChange={handleFechaInicioChange}
          InputLabelProps={{
            shrink: true,
          }}
          error={!validateFechaInicio()}
          helperText={
            !validateFechaInicio()
              ? "La fecha de inicio debe ser este año o el próximo"
              : ""
          }
          fullWidth
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <Typography variant="subtitle1" gutterBottom>
          Fecha de fin de la práctica
        </Typography>
        <TextField
          id="fecha_fin"
          label="Fecha de fin"
          type="date"
          value={fechaFin}
          onChange={handleFechaFinChange}
          InputLabelProps={{
            shrink: true,
          }}
          error={!validateFechaFin()}
          helperText={
            !validateFechaFin()
              ? "La fecha de fin debe ser al menos 30 días después de la fecha inicio y este año o el próximo"
              : ""
          }
          fullWidth
          disabled={!fechaInicio}
        />
      </Grid>
    </Grid>
  );
};

// Definir PropTypes para validar los props
HorarioPractica.propTypes = {
  fechaInicio: PropTypes.string.isRequired,
  handleFechaInicioChange: PropTypes.func.isRequired,
  fechaFin: PropTypes.string.isRequired,
  handleFechaFinChange: PropTypes.func.isRequired,
  horarioPractica: PropTypes.object.isRequired,
  handleTimeChange: PropTypes.func.isRequired,
};

export default HorarioPractica;
