import React from 'react';
import { Grid, Typography, TextField } from "@mui/material";

const Descripcion = () => {
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
          multiline
          rows={4} // Puedes ajustar este valor según la altura que necesites
          variant="outlined"
          placeholder="Escribe aquí la descripción del área de desarrollo"
        />
      </Grid>
    </Grid>
  );
}

export default Descripcion;
