import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import clienteAxios from "../../../../helpers/clienteaxios";

const FormPractica = ({
  practica,
  fechaRecepcion,
  modalidad,
  setPractica,
  setFechaRecepcion,
  setModalidad,
}) => {
  useEffect(() => {
    // Obtener datos del localStorage o inicializar según tu lógica
    const idInscribeLocalStorage = localStorage.getItem("id_inscribe");
    if (idInscribeLocalStorage) {
      obtenerDatosInscripcion(idInscribeLocalStorage);
    } else {
      console.error("No se encontró id_inscribe en el localStorage.");
    }
  }, []);

  const obtenerDatosInscripcion = async (idInscribe) => {
    try {
      const response = await clienteAxios.get(
        `/inscribe/getInscribe/${idInscribe}`
      );
      const { asignatura } = response.data; // Ajustar según la respuesta real del servidor
      const practicaRegistrada = asignatura.id_asignatura; // Ajustar según la respuesta real del servidor
      setPractica(practicaRegistrada);
    } catch (error) {
      console.error("Error al obtener los datos de la inscripción:", error);
    }
  };

  const handleChangePractica = (event) => {
    setPractica(event.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Datos del estudiante
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Select
          fullWidth
          label="Práctica"
          value={practica}
          onChange={handleChangePractica}
          variant="outlined"
          disabled
        >
          <MenuItem value={620509}>Práctica 1</MenuItem>
          <MenuItem value={620520}>Práctica 2</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Fecha de Recepción"
          type="date"
          fullWidth
          disabled
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

export default FormPractica;
