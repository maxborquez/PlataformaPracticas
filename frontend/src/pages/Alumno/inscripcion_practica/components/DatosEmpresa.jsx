import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const DatosEmpresa = ({
  nombreEmpresa,
  setNombreEmpresa,
  deptoArea,
  setDeptoArea,
  paginaWeb,
  setPaginaWeb,
  rubro,
  setRubro,
  fonoEmpresa,
  setFonoEmpresa,
  direccionEmpresa,
  setDireccionEmpresa,
  ciudadSeleccionada,
  handleChangeCiudad,
  ciudades,
}) => {
  const handleNombreEmpresaChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]{0,40}$/.test(value)) {
      setNombreEmpresa(value);
    }
  };

  const handleDeptoAreaChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]{0,15}$/.test(value)) {
      setDeptoArea(value);
    }
  };

  const handlePaginaWebChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z.\s]{0,30}$/.test(value)) {
      setPaginaWeb(value);
    }
  };

  const handleRubroChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]{0,30}$/.test(value)) {
      setRubro(value);
    }
  };

  const handleFonoEmpresaChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,9}$/.test(value)) {
      setFonoEmpresa(value);
    }
  };

  const handleDireccionEmpresaChange = (e) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setDireccionEmpresa(value);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Datos de empresa
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Nombre de la Empresa"
          value={nombreEmpresa}
          onChange={handleNombreEmpresaChange}
          variant="outlined"
          margin="normal"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Departamento o Área"
          value={deptoArea}
          onChange={handleDeptoAreaChange}
          variant="outlined"
          margin="normal"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Página Web"
          value={paginaWeb}
          onChange={handlePaginaWebChange}
          variant="outlined"
          margin="normal"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Rubro"
          value={rubro}
          onChange={handleRubroChange}
          variant="outlined"
          margin="normal"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Fono de la Empresa"
          type="text"
          placeholder="9xxxxxxxx"
          inputProps={{ maxLength: 9 }}
          value={fonoEmpresa}
          onChange={handleFonoEmpresaChange}
          variant="outlined"
          margin="normal"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Dirección de la Empresa"
          value={direccionEmpresa}
          onChange={handleDireccionEmpresaChange}
          variant="outlined"
          margin="normal"
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="ciudad-label">Ciudad</InputLabel>
          <Select
            labelId="ciudad-label"
            value={ciudadSeleccionada || ""} // Usa una cadena vacía como valor inicial
            onChange={handleChangeCiudad}
            label="Ciudad"
          >
            <MenuItem value="" disabled>
              Seleccione una ciudad
            </MenuItem>
            {ciudades.map((ciudad) => (
              <MenuItem key={ciudad.id_ciudad} value={ciudad.id_ciudad}>
                {ciudad.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

DatosEmpresa.propTypes = {
  nombreEmpresa: PropTypes.string.isRequired,
  setNombreEmpresa: PropTypes.func.isRequired,
  deptoArea: PropTypes.string.isRequired,
  setDeptoArea: PropTypes.func.isRequired,
  paginaWeb: PropTypes.string.isRequired,
  setPaginaWeb: PropTypes.func.isRequired,
  rubro: PropTypes.string.isRequired,
  setRubro: PropTypes.func.isRequired,
  fonoEmpresa: PropTypes.string.isRequired,
  setFonoEmpresa: PropTypes.func.isRequired,
  direccionEmpresa: PropTypes.string.isRequired,
  setDireccionEmpresa: PropTypes.func.isRequired,
  ciudadSeleccionada: PropTypes.number.isRequired,
  handleChangeCiudad: PropTypes.func.isRequired,
  ciudades: PropTypes.arrayOf(
    PropTypes.shape({
      id_ciudad: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DatosEmpresa;
