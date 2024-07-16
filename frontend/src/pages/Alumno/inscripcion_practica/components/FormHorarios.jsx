import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const FormHorarios = ({
  fechaInicio,
  fechaTermino,
  setFechaInicio,
  setFechaTermino,
  horarioPractica,
  setHorarioPractica
}) => {
  const [errorInicio, setErrorInicio] = useState(null);
  const [errorTermino, setErrorTermino] = useState(null);
  const [erroresHoras, setErroresHoras] = useState({});

  const handleFechaInicioChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    const maxStartDate = new Date();
    maxStartDate.setDate(today.getDate() - 30);

    if (selectedDate < maxStartDate) {
      setErrorInicio('La fecha de inicio debe ser máximo 30 días antes de hoy');
      setFechaInicio(maxStartDate.toISOString().split('T')[0]);
    } else {
      setErrorInicio(null);
      setFechaInicio(e.target.value);

      // Resetear el error de término si la fecha de inicio cambia
      if (errorTermino !== null) {
        setErrorTermino(null);
      }
    }
  };

  const handleFechaTerminoChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const startDate = new Date(fechaInicio);

    const minEndDate = new Date(startDate);
    minEndDate.setDate(startDate.getDate() + 30);

    const maxEndDate = new Date(startDate);
    maxEndDate.setDate(startDate.getDate() + 180);

    if (selectedDate <= minEndDate) {
      setErrorTermino('La fecha de término debe ser mínimo 30 días después de la fecha de inicio');
      setFechaTermino(minEndDate.toISOString().split('T')[0]);
    } else if (selectedDate > maxEndDate) {
      setErrorTermino('La fecha de término debe ser máximo 180 días después de la fecha de inicio');
      setFechaTermino(maxEndDate.toISOString().split('T')[0]);
    } else {
      setErrorTermino(null);
      setFechaTermino(e.target.value);
    }
  };

  const handleHorarioChange = (e, diaSemana, turno) => {
    const { value } = e.target;
    const newHorarios = {
      ...horarioPractica,
      [diaSemana]: {
        ...horarioPractica[diaSemana],
        [turno]: value
      }
    };

    // Validar rango de horas y orden ascendente
    const errors = {};
    let hayErrores = false;
    Object.keys(newHorarios[diaSemana]).forEach((turnoActual) => {
      const horaActual = newHorarios[diaSemana][turnoActual];
      const horaActualDate = parseTimeTo24h(horaActual);
      const horaMinima = parseTimeTo24h('08:00');
      const horaMaxima = parseTimeTo24h('20:00');

      if (horaActualDate < horaMinima || horaActualDate > horaMaxima) {
        errors[diaSemana] = 'Las horas deben estar entre las 08:00 y las 20:00';
        hayErrores = true;
      }
    });

    Object.keys(newHorarios[diaSemana]).forEach((turnoActual, index) => {
      const horaActual = newHorarios[diaSemana][turnoActual];
      const horaSiguiente = newHorarios[diaSemana][Object.keys(newHorarios[diaSemana])[index + 1]];

      if (horaSiguiente && parseTimeTo24h(horaActual) >= parseTimeTo24h(horaSiguiente)) {
        errors[diaSemana] = 'Las horas deben estar en orden ascendente';
        hayErrores = true;
      }
    });

    if (!hayErrores) {
      delete erroresHoras[diaSemana]; // Borrar el error si ya no hay problemas
    }

    setErroresHoras({
      ...erroresHoras,
      ...errors
    });

    if (!hayErrores) {
      setHorarioPractica(newHorarios);
    }
  };

  const parseTimeTo24h = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Horarios de la Práctica
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Fecha de inicio"
          type="date"
          value={fechaInicio}
          onChange={handleFechaInicioChange}
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          error={errorInicio !== null}
          helperText={errorInicio}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Fecha de término"
          type="date"
          value={fechaTermino}
          onChange={handleFechaTerminoChange}
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          error={errorTermino !== null}
          helperText={errorTermino}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Horarios por día:
        </Typography>
        <Grid container spacing={2}>
          {Object.keys(horarioPractica).map((dia) => (
            <React.Fragment key={dia}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">{dia.charAt(0).toUpperCase() + dia.slice(1)}</Typography>
              </Grid>
              {Object.keys(horarioPractica[dia]).map((turno) => (
                <Grid item xs={3} key={`${dia}-${turno}`}>
                  <TextField
                    fullWidth
                    label={turno.charAt(0).toUpperCase() + turno.slice(1)}
                    variant="outlined"
                    margin="normal"
                    type="time"
                    value={horarioPractica[dia][turno]}
                    onChange={(e) => handleHorarioChange(e, dia, turno)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    error={erroresHoras[dia] !== undefined}
                    helperText={erroresHoras[dia]}
                  />
                </Grid>
              ))}
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormHorarios;
