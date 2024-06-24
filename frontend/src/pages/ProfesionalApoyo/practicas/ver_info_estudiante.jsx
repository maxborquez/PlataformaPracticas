import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";
import { useQuery } from "react-query";
import clienteAxios from "../../../helpers/clienteaxios";
import Header from "../../../components/headers/header";
import MisAptitudes from "../../Alumno/perfil-alumno/components/misApitudes"; // Asegúrate de que la ruta sea correcta

const PerfilEstudiante = () => {
  const { rut } = useParams();
  const navigate = useNavigate();

  const { data, status } = useQuery(["perfilEstudiante", rut], async () => {
    const response = await clienteAxios.post("/alumno/show", {
      rut: rut,
    });
    return response.data;
  });

  if (status === "loading") {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  if (status === "success") {
    const { alumno } = data;

    return (
      <Grid
        container
        direction="column"
        sx={{ width: "100%", minHeight: "100vh", bgcolor: "#e8e9eb" }}
      >
        <Header />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "20px",
          }}
        >
          <Card sx={{ maxWidth: "800px", width: "90%", marginTop: "20px" }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <Typography variant="h4" sx={{ textAlign: "center" }}>
                  Perfil del Estudiante
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(-1)}
                >
                  Volver
                </Button>
              </Box>
              <Paper
                elevation={3}
                sx={{ padding: "16px", backgroundColor: "#fff" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">
                      <strong>Primer Nombre:</strong> {alumno.primer_nombre}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">
                      <strong>Segundo Nombre:</strong> {alumno.segundo_nombre}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">
                      <strong>Apellido Paterno:</strong>{" "}
                      {alumno.apellido_paterno}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">
                      <strong>Apellido Materno:</strong>{" "}
                      {alumno.apellido_materno}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">
                      <strong>Correo Institucional:</strong>{" "}
                      {alumno.correo_institucional}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">
                      <strong>Correo Personal:</strong> {alumno.correo_personal}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">
                      <strong>Dirección Académica:</strong>{" "}
                      {alumno.direccion_academica}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">
                      <strong>Dirección Particular:</strong>{" "}
                      {alumno.direccion_particular}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">
                      <strong>Teléfono Personal:</strong>{" "}
                      {alumno.telefono_personal}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">
                      <strong>Teléfono Familiar:</strong>{" "}
                      {alumno.telefono_familiar}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      <strong>Carrera:</strong> {alumno.carrera.nombre_carrera}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
              <Typography
                variant="h5"
                sx={{ textAlign: "center", marginTop: "20px" }}
              >
                Conocimientos
              </Typography>
              <MisAptitudes
                id_alumno={alumno.id_alumno}
                showDeleteButton={false}
              />
            </CardContent>
          </Card>
        </Box>
      </Grid>
    );
  }

  return null;
};

export default PerfilEstudiante;
