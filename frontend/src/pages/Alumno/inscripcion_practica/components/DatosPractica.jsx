import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

const DatosPractica = ({
  practica,
  setPractica,
  fechaRecepcion,
  modalidad,
  setModalidad,
  onStepComplete,
}) => {
  const [modalidadLocal, setModalidadLocal] = useState('');

  useEffect(() => {
    setModalidadLocal(modalidad);
  }, [modalidad]);

  useEffect(() => {
    // Aquí puedes implementar validaciones para determinar si los campos están completos
    const completado = practica !== '' && fechaRecepcion !== '' && modalidadLocal !== '';
    onStepComplete(completado);
  }, [practica, fechaRecepcion, modalidadLocal, onStepComplete]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Datos de la práctica
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="practica-label">Práctica</InputLabel>
          <Select
            labelId="practica-label"
            id="practica"
            value={practica}
            onChange={(e) => setPractica(e.target.value)}
            label="Práctica"
            disabled
          >
            <MenuItem value="620509">Práctica 1</MenuItem>
            <MenuItem value="620520">Práctica 2</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Fecha de Recepción"
          value={fechaRecepcion}
          disabled
          variant="outlined"
          margin="normal"
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="modalidad-label">Modalidad</InputLabel>
          <Select
            labelId="modalidad-label"
            id="modalidad"
            value={modalidadLocal}
            onChange={(e) => setModalidad(e.target.value)}
            label="Modalidad"
          >
            <MenuItem value="1">Presencial</MenuItem>
            <MenuItem value="2">Online</MenuItem>
            <MenuItem value="3">Pasantía</MenuItem>
            <MenuItem value="4">Training</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

// Definir PropTypes para validar los props
DatosPractica.propTypes = {
  practica: PropTypes.number.isRequired,
  setPractica: PropTypes.func.isRequired,
  fechaRecepcion: PropTypes.string.isRequired,
  modalidad: PropTypes.string.isRequired,
  setModalidad: PropTypes.func.isRequired,
  onStepComplete: PropTypes.func.isRequired,
};

export default DatosPractica;
