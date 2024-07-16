import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

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
            onChange={(e) => setRegion(e.target.value)}
          >
            <MenuItem value="">
              <em>Seleccione una región</em>
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Provincia</InputLabel>
          <Select
            value={provincia}
            onChange={(e) => setProvincia(e.target.value)}
          >
            <MenuItem value="">
              <em>Seleccione una provincia</em>
            </MenuItem>
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
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default FormEmpresa;
