import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const FormPractica = ({ practica, fechaRecepcion, modalidad, setPractica, setFechaRecepcion, setModalidad }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          label="Práctica"
          fullWidth
          value={practica}
          onChange={(e) => setPractica(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Fecha de Recepción"
          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={fechaRecepcion}
          onChange={(e) => setFechaRecepcion(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Modalidad</InputLabel>
          <Select
            value={modalidad}
            onChange={(e) => setModalidad(e.target.value)}
          >
            <MenuItem value="">
              <em>Seleccione una modalidad</em>
            </MenuItem>
            <MenuItem value="presencial">Presencial</MenuItem>
            <MenuItem value="virtual">Virtual</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default FormPractica;
