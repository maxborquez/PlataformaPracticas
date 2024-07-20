import React, { useState } from 'react';
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
  const [areaDesarrolloLength, setAreaDesarrolloLength] = useState(areaDesarrollo.length);
  const [objetivosPracticaLength, setObjetivosPracticaLength] = useState(objetivosPractica.length);
  const [actividadesDesarrollarLength, setActividadesDesarrollarLength] = useState(actividadesDesarrollar.length);

  const validateInput = (value) => {
    const filteredValue = value.replace(/[^a-zA-ZñÑ0-9,.\s]/g, '');
    return filteredValue.slice(0, 200);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const filteredText = validateInput(text);
    document.execCommand('insertText', false, filteredText.slice(0, 200));
  };

  const handleAreaDesarrolloChange = (e) => {
    const value = validateInput(e.target.value);
    setAreaDesarrollo(value);
    setAreaDesarrolloLength(value.length);
  };

  const handleObjetivosPracticaChange = (e) => {
    const value = validateInput(e.target.value);
    setObjetivosPractica(value);
    setObjetivosPracticaLength(value.length);
  };

  const handleActividadesDesarrollarChange = (e) => {
    const value = validateInput(e.target.value);
    setActividadesDesarrollar(value);
    setActividadesDesarrollarLength(value.length);
  };

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
          onChange={handleAreaDesarrolloChange}
          onPaste={handlePaste}
          inputProps={{ maxLength: 200 }}
        />
        <Typography variant="body2" color="textSecondary">
          {200 - areaDesarrolloLength} caracteres restantes
        </Typography>
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
          onChange={handleObjetivosPracticaChange}
          onPaste={handlePaste}
          inputProps={{ maxLength: 200 }}
        />
        <Typography variant="body2" color="textSecondary">
          {200 - objetivosPracticaLength} caracteres restantes
        </Typography>
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
          onChange={handleActividadesDesarrollarChange}
          onPaste={handlePaste}
          inputProps={{ maxLength: 200 }}
        />
        <Typography variant="body2" color="textSecondary">
          {200 - actividadesDesarrollarLength} caracteres restantes
        </Typography>
      </Grid>
    </Grid>
  );
};

export default FormDescripcion;
