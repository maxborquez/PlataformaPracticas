import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const FormSupervisor = ({
  nombreSupervisor,
  cargoSupervisor,
  fonoSupervisor,
  emailSupervisor,
  setNombreSupervisor,
  setCargoSupervisor,
  setFonoSupervisor,
  setEmailSupervisor,
}) => {
  const [nombreSupervisorError, setNombreSupervisorError] = useState(false);
  const [cargoSupervisorError, setCargoSupervisorError] = useState(false);
  const [fonoSupervisorError, setFonoSupervisorError] = useState(false);
  const [emailSupervisorError, setEmailSupervisorError] = useState(false);

  const validateNombreSupervisor = (value) => {
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
    setNombreSupervisor(filteredValue);
    setNombreSupervisorError(filteredValue.length > 50);
  };

  const validateCargoSupervisor = (value) => {
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
    setCargoSupervisor(filteredValue);
    setCargoSupervisorError(filteredValue.length > 30);
  };

  const validateFonoSupervisor = (value) => {
    const filteredValue = value.replace(/\D/g, "");
    setFonoSupervisor(filteredValue);
    setFonoSupervisorError(filteredValue.length > 9);
  };
  const validateEmailSupervisor = (value) => {
    const filteredValue = value.replace(/[^a-zA-Z0-9._@-]/g, "");
    setEmailSupervisor(filteredValue);
    const emailPattern = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailSupervisorError(!emailPattern.test(filteredValue));
  };

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
          inputProps={{ maxLength: 50 }}
          value={nombreSupervisor}
          onChange={(e) => validateNombreSupervisor(e.target.value)}
          error={nombreSupervisorError}
          helperText={nombreSupervisorError ? "Nombre inválido" : ""}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Cargo del Supervisor"
          variant="outlined"
          margin="normal"
          inputProps={{ maxLength: 30 }}
          value={cargoSupervisor}
          onChange={(e) => validateCargoSupervisor(e.target.value)}
          error={cargoSupervisorError}
          helperText={cargoSupervisorError ? "Cargo inválido" : ""}
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
          onChange={(e) => validateFonoSupervisor(e.target.value)}
          error={fonoSupervisorError}
          helperText={fonoSupervisorError ? "Fono inválido" : ""}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Email del Supervisor"
          variant="outlined"
          margin="normal"
          value={emailSupervisor}
          onChange={(e) => validateEmailSupervisor(e.target.value)}
          error={emailSupervisorError}
          helperText={emailSupervisorError ? "Email inválido" : ""}
        />
      </Grid>
    </Grid>
  );
};

export default FormSupervisor;
