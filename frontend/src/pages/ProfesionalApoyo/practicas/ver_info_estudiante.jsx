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
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useQuery } from "react-query";
import clienteAxios from "../../../helpers/clienteaxios";
import Header from "../../../components/headers/header";
import SidebarProfesional from "../../../components/sidebars/sidebarProfesional";
import MisAptitudes from "../../Alumno/perfil-alumno/components/misApitudes"; // Asegúrate de que la ruta sea correcta

const PerfilEstudiante = () => {
  const { rut } = useParams(); // Aquí obtienes el 'rut' que usas como identificador
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

  const { data, status } = useQuery(["datosAlumno", rut], async () => {
    const response = await clienteAxios.get(`/sp/datosAlumno/${rut}`);
    return response.data[0]; // Asumiendo que el endpoint devuelve un array y solo necesitas el primer elemento
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
    const { nombre, alu_email, alu_celular, alu_fono, dir_domicilio, ciudad, crr_nombre } = data;

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
              marginTop: "5px",
              display: "flex",
              justifyContent: "center",
              marginBottom: "16px"
            }}
          >
            <Card
              sx={{
                padding: "20px",
                backgroundColor: "white",
                width: "100%",
                marginTop: "15px",
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
                <TableContainer component={Paper} sx={{ maxWidth: '100%', marginTop: "15px", boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)' }}>
                  <Table>
                    <TableHead sx={{ backgroundColor:"#326fa6" }}>
                      <TableRow>
                        <TableCell colSpan={2}>
                          <Typography variant="subtitle1" sx={{ textAlign: "center", color: "white", padding: "10px 0" }}>
                            Datos Personales
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <strong>Nombre Completo:</strong>
                        </TableCell>
                        <TableCell>
                          {nombre}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Correo Institucional:</strong>
                        </TableCell>
                        <TableCell>
                          {alu_email}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Teléfono Personal:</strong>
                        </TableCell>
                        <TableCell>
                          {alu_celular}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Teléfono Familiar:</strong>
                        </TableCell>
                        <TableCell>
                          {alu_fono}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Dirección Particular:</strong>
                        </TableCell>
                        <TableCell>
                          {dir_domicilio}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Ciudad:</strong>
                        </TableCell>
                        <TableCell>
                          {ciudad}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Carrera:</strong>
                        </TableCell>
                        <TableCell>
                          {crr_nombre}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", marginTop: "20px" }}
                >
                  Conocimientos
                </Typography>
                <MisAptitudes
                  id_alumno={rut}
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
