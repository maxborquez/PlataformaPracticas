import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const FormDescripcion = ({
  areaDesarrollo,
  objetivosPractica,
  actividadesDesarrollar,
  setAreaDesarrollo,
  setObjetivosPractica,
  setActividadesDesarrollar
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
            Breve descripción del área de desarrollo
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Descripción"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          value={areaDesarrollo}
          onChange={(e) => setAreaDesarrollo(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
            Objetivo(s) de la práctica
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Objetivos"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          value={objetivosPractica}
          onChange={(e) => setObjetivosPractica(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
            Actividades a desarrollar
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Actividades"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          value={actividadesDesarrollar}
          onChange={(e) => setActividadesDesarrollar(e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default FormDescripcion;
