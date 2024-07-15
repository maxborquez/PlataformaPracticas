import React from 'react';
import { Grid, Typography, TextField } from "@mui/material";

const Actividades = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Actividades
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Actividades"
          multiline
          rows={4} // Puedes ajustar este valor según la altura que necesites
          variant="outlined"
          placeholder="Escribe aquí las actividades"
        />
      </Grid>
    </Grid>
  );
}

export default Actividades;
