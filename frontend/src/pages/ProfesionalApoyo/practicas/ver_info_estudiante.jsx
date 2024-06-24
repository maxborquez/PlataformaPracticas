import React, { useState, useEffect } from "react";
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
import MisAptitudes from "../../Alumno/perfil-alumno/components/misApitudes";
import SidebarProfesional from "../../../components/sidebars/sidebarProfesional";

const PerfilEstudiante = () => {
  const { rut } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const zoomThreshold = 900;
      setIsWideScreen(window.innerWidth >= zoomThreshold);
      setSidebarOpen(window.innerWidth < zoomThreshold ? false : true);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        sx={{ backgroundColor: "#e8e9eb", minHeight: "100vh" }}
      >
        <Grid
          item
          sx={{ position: "sticky", top: 0, zIndex: 1000, width: "100%" }}
        >
          <Header
            toggleSidebar={toggleSidebar}
            isWideScreen={isWideScreen}
            showSidebarButton={true}
          />
        </Grid>

        <Grid container item>
          {sidebarOpen && (
            <Grid
              item
              sx={{
                position: "fixed",
                top: "80px",
                left: 0,
                width: "250px",
                zIndex: 1200,
                backgroundColor: "#36465d",
              }}
            >
              <SidebarProfesional />
            </Grid>
          )}

          <Grid
            item
            xs
            sx={{
              marginLeft: sidebarOpen && isWideScreen ? "250px" : "0px",
              transition: "margin-left 0.3s",
              overflowY: "auto",
              paddingRight: "16px",
              overflowX: "auto",
              marginTop: "35px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              sx={{
                padding: "20px",
                backgroundColor: "white",
                width: "100%",
                marginTop: "15px",
                marginBottom: "15px",
                marginLeft: "16px",
              }}
            >
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
                        <strong>Correo Personal:</strong>{" "}
                        {alumno.correo_personal}
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
                        <strong>Carrera:</strong>{" "}
                        {alumno.carrera.nombre_carrera}
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
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return null;
};

export default PerfilEstudiante;
