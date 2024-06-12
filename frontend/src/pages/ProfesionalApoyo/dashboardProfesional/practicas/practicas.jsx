import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../../../components/headers/header";
import SidebarProfesional from "../../../../components/sidebars/sidebarProfesional";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Checklist } from "@mui/icons-material";

const Practicas = () => {
  const [anio, setanio] = useState(2023);
  const [periodo_academico, setPeriodo] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const navigate = useNavigate();
  const queryclient = useQueryClient();

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

  const onSubmit = (e) => {
    e.preventDefault();
    getListadoPractica1ICINF.refetch();
    getListadoPractica2ICINF.refetch();
    getListadoPractica1IECI.refetch();
    getListadoPractica2IECI.refetch();
  };

  const getListadoPractica1IECI = useQuery("lpractica1ieci", async () => {
    const response = await clienteAxios.post(
      "/inscripcion/listadopractica1ieci",
      {
        anio: anio,
        id_periodo: periodo_academico,
        id_asignatura: 620509,
      }
    );
    if (response.status === 200) {
      if (!response.data.alumnos_ieci) {
        Swal.fire({
          title: "Error",
          text: response.data.mensaje,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
      return response.data;
    }
  });

  const getListadoPractica2IECI = useQuery("lpractica2ieci", async () => {
    const response = await clienteAxios.post(
      "/inscripcion/listadopractica2ieci",
      {
        anio: anio,
        id_periodo: periodo_academico,
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  });

  const getListadoPractica1ICINF = useQuery("lpractica1icinf", async () => {
    const response = await clienteAxios.post(
      "/inscripcion/listadopractica1icinf",
      {
        anio: anio,
        id_periodo: periodo_academico,
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  });

  const getListadoPractica2ICINF = useQuery("lpractica2icinf", async () => {
    const response = await clienteAxios.post(
      "/inscripcion/listadopractica2icinf",
      {
        anio: anio,
        id_periodo: periodo_academico,
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  });

  return (
    <Grid container direction="column">
      <Grid item sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Header
          toggleSidebar={toggleSidebar}
          isWideScreen={isWideScreen}
          showSidebarButton={true}
        />
      </Grid>
      <Grid container item>
        {sidebarOpen && (
          <Grid item sx={{ position: "fixed", top: "80px", zIndex: 1200 }}>
            <SidebarProfesional />
          </Grid>
        )}
        <Grid
          item
          xs
          sx={{
            marginLeft: sidebarOpen && isWideScreen ? "250px" : "0px",
            transition: "margin-left 0.3s",
            padding: "20px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              marginTop: "20px",
              marginBottom: "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Ingrese el semestre y período{" "}
            <Checklist style={{ marginLeft: "5px" }} />{" "}
          </Typography>
          <form
            onSubmit={onSubmit}
            style={{
              width: "70%",
              borderRadius: "5px",
              backgroundColor: "#f4f5f7",
              padding: "15px",
              margin: "0px auto",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            <Grid
              container
              spacing={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid xs={11} xl={6} lg={5} md={4} sm={10} item>
                <TextField
                  placeholder="202x"
                  value={anio}
                  type="number"
                  inputProps={{
                    min: 2000,
                  }}
                  sx={{ backgroundColor: "white" }}
                  onChange={(e) => {
                    setanio(e.target.value);
                  }}
                  label="Año"
                  fullWidth
                />
              </Grid>
              <Grid item xs={11} xl={6} lg={5} md={4} sm={10}>
                <FormControl fullWidth>
                  <InputLabel>Seleccione Período</InputLabel>
                  <Select
                    sx={{ backgroundColor: "white" }}
                    onChange={(e) => {
                      setPeriodo(e.target.value);
                    }}
                    value={periodo_academico}
                    label="Seleccione periodo"
                    fullWidth
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={11}
                xl={6}
                lg={2}
                md={3}
                sm={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button type="submit" variant="contained">
                  Buscar
                </Button>
              </Grid>
            </Grid>
          </form>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              marginTop: "10px",
              fontSize: { xs: "1.3rem", sm: "1.4rem" },
            }}
          >
            Ingeniería de Ejecución en Computación e Informática{" "}
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Grid item xs={11} md={6} lg={4}>
              <Card
                sx={{
                  padding: "20px",
                  backgroundColor: "#f4f5f7",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "70%",
                  maxWidth: "600px",
                }}
              >
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  Práctica profesional 1
                </Typography>
                {getListadoPractica1IECI.status === "success" && (
                  <Typography variant="h6" sx={{ textAlign: "center" }}>
                    Alumnos inscritos:{" "}
                    {getListadoPractica1IECI.data.cantidad_alumnos}{" "}
                  </Typography>
                )}
                {getListadoPractica1IECI.status === "success" && (
                  <Button
                    onClick={() => {
                      navigate(
                        `/estadopracticas/${anio}/${periodo_academico}/620509/${getListadoPractica1IECI.data.carrera}`
                      );
                    }}
                    variant="contained"
                  >
                    Ver estudiantes
                  </Button>
                )}
              </Card>
            </Grid>
            <Grid item xs={11} md={6} lg={4}>
              <Card
                sx={{
                  padding: "20px",
                  backgroundColor: "#f4f5f7",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "70%",
                  maxWidth: "600px",
                }}
              >
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  Práctica profesional 2
                </Typography>
                {getListadoPractica2IECI.status === "success" && (
                  <Typography variant="h6" sx={{ textAlign: "center" }}>
                    Alumnos inscritos:{" "}
                    {getListadoPractica2IECI.data.cantidad_alumnos}
                  </Typography>
                )}
                {getListadoPractica2IECI.status === "success" && (
                  <Button
                    onClick={() => {
                      navigate(
                        `/estadopracticas/${anio}/${periodo_academico}/620512/${getListadoPractica2IECI.data.carrera}`
                      );
                    }}
                    variant="contained"
                  >
                    Ver estudiantes
                  </Button>
                )}
              </Card>
            </Grid>
          </Grid>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              marginTop: "10px",
              fontSize: { xs: "1.3rem", sm: "1.4rem" },
            }}
          >
            Ingeniería Civil en Informática
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Grid item xs={11} md={6} lg={4}>
              <Card
                sx={{
                  padding: "20px",
                  backgroundColor: "#f4f5f7",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "70%",
                  maxWidth: "600px",
                }}
              >
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  Práctica profesional 1
                </Typography>
                {getListadoPractica1ICINF.status === "success" && (
                  <Typography variant="h6" sx={{ textAlign: "center" }}>
                    Alumnos inscritos:{" "}
                    {getListadoPractica1ICINF.data.cantidad_alumnos}{" "}
                  </Typography>
                )}
                {getListadoPractica1ICINF.status === "success" && (
                  <Button
                    onClick={() => {
                      navigate(
                        `/estadopracticas/${anio}/${periodo_academico}/620510/${getListadoPractica1ICINF.data.carrera}`
                      );
                    }}
                    variant="contained"
                  >
                    Ver estudiantes
                  </Button>
                )}
              </Card>
            </Grid>
            <Grid item xs={11} md={6} lg={4}>
              <Card
                sx={{
                  padding: "20px",
                  backgroundColor: "#f4f5f7",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "70%",
                  maxWidth: "600px",
                }}
              >
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  Práctica profesional 2
                </Typography>
                {getListadoPractica2ICINF.status === "success" && (
                  <Typography variant="h6" sx={{ textAlign: "center" }}>
                    Alumnos inscritos:{" "}
                    {getListadoPractica2ICINF.data.cantidad_alumnos}
                  </Typography>
                )}
                {getListadoPractica2ICINF.status === "success" && (
                  <Button
                    onClick={() => {
                      navigate(
                        `/estadopracticas/${anio}/${periodo_academico}/620511/${getListadoPractica2ICINF.data.carrera}`
                      );
                    }}
                    variant="contained"
                  >
                    Ver estudiantes
                  </Button>
                )}
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Practicas;
