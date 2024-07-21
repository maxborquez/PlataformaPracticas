import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText"; // Add this line
import clienteAxios from "../../../../helpers/clienteaxios"; // Ajusta la importación según corresponda

const FormEmpresa = ({
  nombreEmpresa,
  departamento,
  paginaWeb,
  rubro,
  fonoEmpresa,
  direccionEmpresa,
  region,
  provincia,
  comuna,
  setNombreEmpresa,
  setDepartamento,
  setPaginaWeb,
  setRubro,
  setFonoEmpresa,
  setDireccionEmpresa,
  setRegion,
  setProvincia,
  setComuna,
}) => {
  const [regiones, setRegiones] = useState([]);
  const [rubros, setRubros] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [nombreEmpresaError, setNombreEmpresaError] = useState(false);
  const [departamentoError, setDepartamentoError] = useState(false);
  const [paginaWebError, setPaginaWebError] = useState(false);
  const [rubroError, setRubroError] = useState(false);
  const [fonoEmpresaError, setFonoEmpresaError] = useState(false);
  const [direccionEmpresaError, setDireccionEmpresaError] = useState(false);

  useEffect(() => {
    // Función para obtener las regiones disponibles
    const obtenerRegiones = async () => {
      try {
        const response = await clienteAxios.get("/comuna/regiones");
        setRegiones(response.data);
      } catch (error) {
        console.error("Error al obtener las regiones:", error);
      }
    };

    // Llamar a la función para obtener las regiones al cargar el componente
    obtenerRegiones();
  }, []);

  useEffect(() => {
    // Función para obtener las regiones disponibles
    const obtenerRubros = async () => {
      try {
        const response = await clienteAxios.get("/rubro/getAll");
        setRubros(response.data);
      } catch (error) {
        console.error("Error al obtener los rubros:", error);
      }
    };

    // Llamar a la función para obtener las regiones al cargar el componente
    obtenerRubros();
  }, []);

  const handleRubroChange = (event) => {
    const { value } = event.target;
    setRubro(value);
    // Aquí puedes agregar validación si es necesario
    setRubroError(false); // Asume que es válido si se selecciona un valor
  };

  const handleRegionChange = async (regionId) => {
    try {
      const response = await clienteAxios.get(
        `/comuna/getProvinciaByRegion/${regionId}`
      );
      setProvincias(response.data); // Ajustar según la estructura de datos recibida
      setRegion(regionId); // Actualizar el estado de la región seleccionada
      setProvincia(""); // Reiniciar la selección de provincia al cambiar la región
      setComuna(""); // Reiniciar la selección de comuna al cambiar la región
    } catch (error) {
      console.error("Error al obtener las provincias por región:", error);
    }
  };

  const handleProvinciaChange = async (provinciaId) => {
    try {
      const response = await clienteAxios.get(
        `/comuna/getComunasByProvincia/${provinciaId}`
      );
      setComunas(response.data); // Ajustar según la estructura de datos recibida
      setProvincia(provinciaId); // Actualizar el estado de la provincia seleccionada
      setComuna(""); // Reiniciar la selección de comuna al cambiar la provincia
    } catch (error) {
      console.error("Error al obtener las comunas por provincia:", error);
    }
  };

  const validateNombreEmpresa = (value) => {
    // Filtrar caracteres no permitidos
    const filteredValue = value.replace(/[^a-zA-ZñÑ\s]/g, "");
    setNombreEmpresa(filteredValue);
    if (filteredValue.length > 30) {
      setNombreEmpresaError(true);
    } else {
      setNombreEmpresaError(false);
    }
  };

  const validateDepartamento = (value) => {
    // Filtrar caracteres no permitidos
    const filteredValue = value.replace(/[^a-zA-ZñÑ\s]/g, "");
    setDepartamento(filteredValue);
    if (filteredValue.length > 30) {
      setDepartamentoError(true);
    } else {
      setDepartamentoError(false);
    }
  };

  const validatePaginaWeb = (value) => {
    // Filtrar caracteres no permitidos
    const filteredValue = value.replace(/[^a-zA-ZñÑ0-9.]/g, "");
    setPaginaWeb(filteredValue);
    if (filteredValue.length > 0 && !/^[a-zA-ZñÑ0-9.]*$/.test(filteredValue)) {
      setPaginaWebError(true);
    } else {
      setPaginaWebError(false);
    }
  };

  const validateFonoEmpresa = (value) => {
    // Filtrar caracteres no permitidos
    const filteredValue = value.replace(/\D/g, "");
    setFonoEmpresa(filteredValue);
    if (filteredValue.length > 9) {
      setFonoEmpresaError(true);
    } else {
      setFonoEmpresaError(false);
    }
  };

  const validateDireccion = (value) => {
    // Filtrar caracteres no permitidos
    const filteredValue = value.replace(/[^a-zA-ZñÑ09,\s]/g, "");
    setDireccionEmpresa(filteredValue);
    if (filteredValue.length > 30) {
      setDireccionEmpresaError(true);
    } else {
      setDireccionEmpresaError(false);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Datos de la Empresa
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Nombre de Empresa"
          variant="outlined"
          margin="normal"
          inputProps={{ maxLength: 30 }}
          value={nombreEmpresa}
          onChange={(e) => validateNombreEmpresa(e.target.value)}
          error={nombreEmpresaError}
          helperText={nombreEmpresaError ? "Nombre inválido" : ""}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Departamento o Área"
          variant="outlined"
          margin="normal"
          inputProps={{ maxLength: 30 }}
          value={departamento}
          onChange={(e) => validateDepartamento(e.target.value)}
          error={departamentoError}
          helperText={departamentoError ? "Departamento inválido" : ""}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Página Web"
          variant="outlined"
          margin="normal"
          inputProps={{ maxLength: 30 }}
          value={paginaWeb}
          onChange={(e) => validatePaginaWeb(e.target.value)}
          error={paginaWebError}
          helperText={paginaWebError ? "Página web inválida" : ""}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl
          fullWidth
          variant="outlined"
          margin="normal"
          error={rubroError}
        >
          <InputLabel>Rubro</InputLabel>
          <Select
            value={rubro}
            onChange={handleRubroChange}
            label="Rubro"
          >
            <MenuItem value="">
              <em>Seleccione un rubro</em>
            </MenuItem>
            {rubros.map((rubro) => (
              <MenuItem key={rubro.id_rubro} value={rubro.id_rubro}>
                {rubro.nombre_rubro}
              </MenuItem>
            ))}
          </Select>
          {rubroError && <FormHelperText>Rubro inválido</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Fono de la Empresa"
          type="text"
          placeholder="9xxxxxxxx"
          inputProps={{ maxLength: 9 }}
          variant="outlined"
          margin="normal"
          value={fonoEmpresa}
          onChange={(e) => validateFonoEmpresa(e.target.value)}
          error={fonoEmpresaError}
          helperText={fonoEmpresaError ? "Fono inválido" : ""}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Dirección de la Empresa"
          variant="outlined"
          margin="normal"
          inputProps={{ maxLength: 30 }}
          value={direccionEmpresa}
          onChange={(e) => validateDireccion(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Región</InputLabel>
          <Select
            value={region}
            onChange={(e) => handleRegionChange(e.target.value)}
          >
            <MenuItem value="">
              <em>Seleccione una región</em>
            </MenuItem>
            {regiones.map((region) => (
              <MenuItem key={region.id_region} value={region.id_region}>
                {region.nombre_region}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Provincia</InputLabel>
          <Select
            value={provincia}
            onChange={(e) => handleProvinciaChange(e.target.value)}
          >
            <MenuItem value="">
              <em>Seleccione una provincia</em>
            </MenuItem>
            {provincias.map((provincia) => (
              <MenuItem
                key={provincia.id_provincia}
                value={provincia.id_provincia}
              >
                {provincia.nombre_provincia}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Comuna</InputLabel>
          <Select value={comuna} onChange={(e) => setComuna(e.target.value)}>
            <MenuItem value="">
              <em>Seleccione una comuna</em>
            </MenuItem>
            {comunas.map((comuna) => (
              <MenuItem key={comuna.id_comuna} value={comuna.id_comuna}>
                {comuna.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default FormEmpresa;
