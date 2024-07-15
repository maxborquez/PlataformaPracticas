import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, TextField } from '@mui/material';

const DatosSupervisor = ({
  nombreSupervisor,
  setNombreSupervisor,
  cargoSupervisor,
  setCargoSupervisor,
  fonoSupervisor,
  setFonoSupervisor,
  emailSupervisor,
  setEmailSupervisor,
}) => {

  const handleNombreSupervisorChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]{0,50}$/.test(value)) {
      setNombreSupervisor(value);
    }
  };

  const handleCargoSupervisorChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]{0,30}$/.test(value)) {
      setCargoSupervisor(value);
    }
  };

  const handleFonoSupervisorChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,9}$/.test(value)) {
      setFonoSupervisor(value);
    }
  };

  const handleEmailSupervisorChange = (e) => {
    const value = e.target.value;
    if (value.length <= 40) {
      setEmailSupervisor(value);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Datos del supervisor
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Nombre del Supervisor"
          value={nombreSupervisor}
          onChange={handleNombreSupervisorChange}
          variant="outlined"
          margin="normal"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Cargo del Supervisor"
          value={cargoSupervisor}
          onChange={handleCargoSupervisorChange}
          variant="outlined"
          margin="normal"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Fono del Supervisor"
          type="text"
          placeholder="9xxxxxxxx"
          inputProps={{ maxLength: 9 }}
          value={fonoSupervisor}
          onChange={handleFonoSupervisorChange}
          variant="outlined"
          margin="normal"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          type="email"
          placeholder="correo@dominio.cl"
          label="Email del Supervisor"
          value={emailSupervisor}
          onChange={handleEmailSupervisorChange}
          variant="outlined"
          margin="normal"
        />
      </Grid>
    </Grid>
  );
};

// Definir PropTypes para validar los props
DatosSupervisor.propTypes = {
  nombreSupervisor: PropTypes.string.isRequired,
  setNombreSupervisor: PropTypes.func.isRequired,
  cargoSupervisor: PropTypes.string.isRequired,
  setCargoSupervisor: PropTypes.func.isRequired,
  fonoSupervisor: PropTypes.string.isRequired,
  setFonoSupervisor: PropTypes.func.isRequired,
  emailSupervisor: PropTypes.string.isRequired,
  setEmailSupervisor: PropTypes.func.isRequired,
};

export default DatosSupervisor;
