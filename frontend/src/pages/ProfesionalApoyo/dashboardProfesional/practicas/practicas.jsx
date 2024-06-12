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
  Divider,
} from "@mui/material";
import HeaderProfesional from "../../../../components/headers/headerProfesional";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Checklist } from "@mui/icons-material";
import SidebarProfesional from "../../../../components/sidebars/sidebarProfesional";

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
      setSidebarOpen(window.innerWidth >= zoomThreshold);
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
    <Grid
      container
      direction="column"
      sx={{ backgroundColor: "#e8e9eb", minHeight: "100vh" }}
    >
      <Grid item sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <HeaderProfesional
          toggleSidebar={toggleSidebar}
          isWideScreen={isWideScreen}
        />
      </Grid>
      <Grid container>
        {sidebarOpen && (
          <Grid
            item
            xs={3}
            sx={{ position: "fixed", top: "80px", zIndex: 1200 }}
          >
            <SidebarProfesional />
          </Grid>
        )}
        <Grid
          item
          xs={12}
          sx={{
            marginLeft: sidebarOpen && isWideScreen ? "250px" : "0px",
            transition: "margin-left 0.3s",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            spacing={1}
            direction="column"
            alignItems="center"
            sx={{ bgcolor: "#e8e9eb", width: "100%" ,marginBottom: "10px", marginRight:"12px"}}
          >
          
            
             
          
            <Typography
                  variant="h5"
                  sx={{
                    marginTop:"10px",
                    marginBottom: "10px",
                    fontSize: { xs: "1.3rem", sm: "1.4rem" },
                  }}
                >
                   Ingrese el semestre y período <Checklist style={{ marginLeft: "5px" }} />
                </Typography>

            <form
              onSubmit={onSubmit}
              style={{
                width: "100%",
                maxWidth: "1120px", // Ajuste para asegurar el tamaño
                borderRadius: "5px",
                backgroundColor: "white",
                padding: "10px",
                margin: "0px auto",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "white",
                  borderRadius: "5px",
                 
                  padding: "1px",
                  
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{
                    bgcolor:"white",
                    borderRadius: "5px",
                    marginTop:"10px",
                    padding:"10px"
                    
                  }}
                >
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
                <Grid item
                  xs={12}
                  sm={4}
                  sx={{
                    bgcolor:"white",
                    borderRadius: "5px",
                    marginTop:"10px",
                    padding:"10px"
                    
                  }}>
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
                  xs={12}
                  sm={4}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    bgcolor: "white",
                  }}
                >
                  <Button type="submit" variant="contained">
                    Buscar
                  </Button>
                </Grid>
              </Grid>
            </form>

          
            <Typography
                  variant="h5"
                  sx={{
                    marginTop:"10px",
                    marginBottom: "10px",
                    fontSize: { xs: "1.3rem", sm: "1.4rem" },
                  }}
                >
                  Ingeniería de Ejecución en Computación e Informática
                </Typography>


              <Card
                sx={{
                  padding: "10px",
                  backgroundColor: "white",
                  textAlign: "center",
                  width: "100%",
                  marginBottom: "10px",
                  
                }}
              >
                
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Typography variant="h6">Práctica profesional</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6">Alumnos inscritos</Typography>
                  </Grid>
                  <Grid item xs={4} />
                </Grid>
                <Divider sx={{ backgroundColor: "grey", my: 1 }} />
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="h6">1</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    {getListadoPractica1IECI.status === "success" && (
                      <Typography variant="h6">
                        {getListadoPractica1IECI.data.cantidad_alumnos}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    {getListadoPractica1IECI.status === "success" && (
                      <Button
                        onClick={() => {
                          navigate(
                            `/estadopracticas/${anio}/${periodo_academico}/620509/${getListadoPractica1IECI.data.carrera}`
                          );
                        }}
                        variant="contained"
                        sx={{ padding: "5px 10px" }}
                      >
                        Ver situación estudiantes
                      </Button>
                    )}
                  </Grid>
                </Grid>
                <Divider sx={{ backgroundColor: "grey", my: 1 }} />
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="h6">2</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    {getListadoPractica2IECI.status === "success" && (
                      <Typography variant="h6">
                        {getListadoPractica2IECI.data.cantidad_alumnos}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    {getListadoPractica2IECI.status === "success" && (
                      <Button
                        onClick={() => {
                          navigate(
                            `/estadopracticas/${anio}/${periodo_academico}/620520/${getListadoPractica2IECI.data.carrera}`
                          );
                        }}
                        variant="contained"
                        sx={{ padding: "5px 10px" }}
                      >
                        Ver situación estudiantes
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Card>
           
              <Typography
                  variant="h5"
                  sx={{
                    marginTop:"10px",
                    marginBottom: "10px",
                    fontSize: { xs: "1.3rem", sm: "1.4rem" },
                  }}
                >
                  Ingeniería Civil en Informática
                </Typography>
           
              <Card
                sx={{
                  padding: "10px",
                  backgroundColor: "white",
                  textAlign: "center",
                  width: "100%",
                
                  marginBottom: "10px",
                }}
              >
                
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Typography variant="h6">Práctica profesional</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6">Alumnos inscritos</Typography>
                  </Grid>
                  <Grid item xs={4} />
                </Grid>
                <Divider sx={{ backgroundColor: "grey", my: 1 }} />
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="h6">1</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    {getListadoPractica1ICINF.status === "success" && (
                      <Typography variant="h6">
                        {getListadoPractica1ICINF.data.cantidad_alumnos}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    {getListadoPractica1ICINF.status === "success" && (
                      <Button
                        onClick={() => {
                          navigate(
                            `/estadopracticas/${anio}/${periodo_academico}/620509/${getListadoPractica1ICINF.data.carrera}`
                          );
                        }}
                        variant="contained"
                        sx={{ padding: "5px 10px" }}
                      >
                        Ver situación estudiantes
                      </Button>
                    )}
                  </Grid>
                </Grid>
                <Divider sx={{ backgroundColor: "grey", my: 1 }} />
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="h6">2</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    {getListadoPractica2ICINF.status === "success" && (
                      <Typography variant="h6">
                        {getListadoPractica2ICINF.data.cantidad_alumnos}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    {getListadoPractica2ICINF.status === "success" && (
                      <Button
                        onClick={() => {
                          navigate(
                            `/estadopracticas/${anio}/${periodo_academico}/620520/${getListadoPractica2ICINF.data.carrera}`
                          );
                        }}
                        variant="contained"
                        sx={{ padding: "5px 10px" }}
                      >
                        Ver situación estudiantes
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Card>
          
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Practicas;