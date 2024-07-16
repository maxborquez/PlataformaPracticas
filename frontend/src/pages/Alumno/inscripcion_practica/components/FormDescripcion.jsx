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
  const validateInput = (value) => {
    // Filtrar caracteres no permitidos (letras, números, comas, puntos y espacio)
    const filteredValue = value.replace(/[^a-zA-Z0-9,. ]/g, '');
    // Limitar la longitud a 200 caracteres
    return filteredValue.slice(0, 200);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const filteredText = validateInput(text);
    // Insertar el texto filtrado (recortado a 200 caracteres) en el campo de texto
    document.execCommand('insertText', false, filteredText.slice(0, 200));
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
          onChange={(e) => setAreaDesarrollo(validateInput(e.target.value))}
          onPaste={handlePaste} // Manejar el evento de pegado
          inputProps={{ maxLength: 200 }} // Limitar el número máximo de caracteres
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
          onChange={(e) => setObjetivosPractica(validateInput(e.target.value))}
          onPaste={handlePaste} // Manejar el evento de pegado
          inputProps={{ maxLength: 200 }} // Limitar el número máximo de caracteres
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
          onChange={(e) => setActividadesDesarrollar(validateInput(e.target.value))}
          onPaste={handlePaste} // Manejar el evento de pegado
          inputProps={{ maxLength: 200 }} // Limitar el número máximo de caracteres
        />
      </Grid>
    </Grid>
  );
};

export default FormDescripcion;
