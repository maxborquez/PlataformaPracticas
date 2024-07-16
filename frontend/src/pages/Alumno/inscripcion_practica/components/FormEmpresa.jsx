import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import clienteAxios from '../../../../helpers/clienteaxios'; // Ajusta la importación según corresponda

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
  setComuna
}) => {
  const [regiones, setRegiones] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [comunas, setComunas] = useState([]);


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

  const handleRegionChange = async (regionId) => {
    try {
      const response = await clienteAxios.get(
        `/comuna/getProvinciaByRegion/${regionId}`
      );
      setProvincias(response.data); // Ajustar según la estructura de datos recibida
      setRegion(regionId); // Actualizar el estado de la región seleccionada
      setProvincia(''); // Reiniciar la selección de provincia al cambiar la región
      setComuna(''); // Reiniciar la selección de comuna al cambiar la región
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
      setComuna(''); // Reiniciar la selección de comuna al cambiar la provincia
    } catch (error) {
      console.error("Error al obtener las comunas por provincia:", error);
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
          value={nombreEmpresa}
          onChange={(e) => setNombreEmpresa(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Departamento o Área"
          variant="outlined"
          margin="normal"
          value={departamento}
          onChange={(e) => setDepartamento(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Página Web"
          variant="outlined"
          margin="normal"
          value={paginaWeb}
          onChange={(e) => setPaginaWeb(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Rubro"
          variant="outlined"
          margin="normal"
          value={rubro}
          onChange={(e) => setRubro(e.target.value)}
        />
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
          onChange={(e) => setFonoEmpresa(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Dirección de la Empresa"
          variant="outlined"
          margin="normal"
          value={direccionEmpresa}
          onChange={(e) => setDireccionEmpresa(e.target.value)}
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
              <MenuItem key={provincia.id_provincia} value={provincia.id_provincia}>
                {provincia.nombre_provincia}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Comuna</InputLabel>
          <Select
            value={comuna}
            onChange={(e) => setComuna(e.target.value)}
          >
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
