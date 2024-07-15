import React from 'react';
import { Grid, Typography, TextField } from "@mui/material";

const Objetivos = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Objetivos
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Objetivos"
          multiline
          rows={4} // Puedes ajustar este valor según la altura que necesites
          variant="outlined"
          placeholder="Escribe aquí los objetivos"
        />
      </Grid>
    </Grid>
  );
}

export default Objetivos;
