import React from 'react';
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

  const handleHorarioChange = (e, diaSemana, turno) => {
    const { value } = e.target;
    setHorarioPractica(prevHorarios => ({
      ...prevHorarios,
      [diaSemana]: {
        ...prevHorarios[diaSemana],
        [turno]: value
      }
    }));
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
          onChange={(e) => setFechaInicio(e.target.value)}
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Fecha de término"
          type="date"
          value={fechaTermino}
          onChange={(e) => setFechaTermino(e.target.value)}
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
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
