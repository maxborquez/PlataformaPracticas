import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, TextField } from '@mui/material';

const HorarioPractica = ({
  fechaInicio,
  handleFechaInicioChange,
  fechaFin,
  handleFechaFinChange,
  diasSemana,
  horarioPractica,
  handleTimeChange,
  errors,
}) => {

  const validateFechaInicio = () => {
    // Validar que la fecha de inicio no sea anterior a 30 días desde hoy
    if (!fechaInicio) return true;
    const today = new Date();
    const start = new Date(fechaInicio);
    const diffTime = Math.abs(start - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  const validateFechaFin = () => {
    // Validar que la fecha de fin no sea menor que la fecha de inicio y sea al menos 30 días después de la fecha de inicio
    if (!fechaInicio || !fechaFin) return true; // Si alguna fecha no está definida, no validar
    const start = new Date(fechaInicio);
    const end = new Date(fechaFin);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return start <= end && diffDays >= 30;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" marginBottom={5}>
          Horario de la práctica
        </Typography>
      </Grid>

      <Grid container spacing={2} marginLeft={0.06}>
        <Grid item xs={6} md={2}>
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
                ? "La fecha de inicio debe ser máximo 30 días antes de hoy"
                : ""
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={2}>
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
                ? "La fecha de fin debe ser al menos 30 días después de la fecha inicio"
                : ""
            }
            fullWidth
            disabled={!fechaInicio}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {diasSemana.map((dia) => (
          <Grid item xs={12} key={dia}>
            <Typography
              variant="subtitle1"
              style={{ textTransform: "capitalize" }}
            >
              {dia}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Inicio Mañana"
                  value={horarioPractica[dia].mañana1}
                  onChange={(e) =>
                    handleTimeChange(dia, "mañana1", e.target.value)
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Fin Mañana"
                  value={horarioPractica[dia].mañana2}
                  onChange={(e) =>
                    handleTimeChange(dia, "mañana2", e.target.value)
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Inicio Tarde"
                  value={horarioPractica[dia].tarde1}
                  onChange={(e) =>
                    handleTimeChange(dia, "tarde1", e.target.value)
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Fin Tarde"
                  value={horarioPractica[dia].tarde2}
                  onChange={(e) =>
                    handleTimeChange(dia, "tarde2", e.target.value)
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        ))}
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
  diasSemana: PropTypes.array.isRequired,
  horarioPractica: PropTypes.object.isRequired,
  handleTimeChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default HorarioPractica;
