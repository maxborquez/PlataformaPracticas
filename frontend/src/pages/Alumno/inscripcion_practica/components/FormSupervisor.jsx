import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const FormSupervisor = ({
  nombreSupervisor,
  cargoSupervisor,
  fonoSupervisor,
  emailSupervisor,
  setNombreSupervisor,
  setCargoSupervisor,
  setFonoSupervisor,
  setEmailSupervisor
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Datos del Supervisor
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Nombre del Supervisor"
          variant="outlined"
          margin="normal"
          value={nombreSupervisor}
          onChange={(e) => setNombreSupervisor(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Cargo del Supervisor"
          variant="outlined"
          margin="normal"
          value={cargoSupervisor}
          onChange={(e) => setCargoSupervisor(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Fono del Supervisor"
          type="text"
          placeholder="9xxxxxxxx"
          inputProps={{ maxLength: 9 }}
          variant="outlined"
          margin="normal"
          value={fonoSupervisor}
          onChange={(e) => setFonoSupervisor(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Email del Supervisor"
          variant="outlined"
          margin="normal"
          value={emailSupervisor}
          onChange={(e) => setEmailSupervisor(e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default FormSupervisor;
