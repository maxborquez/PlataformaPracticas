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
import { useQuery } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Checklist } from "@mui/icons-material";
import MUIDataTable from "mui-datatables";

const Practicas = () => {
  const [anio, setanio] = useState(2023);
  const [periodo_academico, setPeriodo] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const navigate = useNavigate();

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

  const columns = [
    { 
      name: "Practica", 
      label: "Práctica profesional", 
      options: { 
        sort: false,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: '#326fa6',
            color: '#fff'
          }
        })
      } 
    },
    { 
      name: "Alumnos", 
      label: "Alumnos inscritos", 
      options: { 
        sort: false,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: '#326fa6',
            color: '#fff'
          }
        })
      } 
    },
    {
      name: "Accion",
      label: "Acción",
      options: {
        sort: false,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: '#326fa6',
            color: '#fff'
          }
        }),
        customBodyRender: (value, tableMeta, updateValue) => {
          const practica = tableMeta.rowData[0];
          const carrera = value.carrera;
          const id_asignatura = value.id_asignatura;
          return (
            <Button
              onClick={() => {
                navigate(
                  `/estadopracticas/${anio}/${periodo_academico}/${id_asignatura}/${carrera}`
                );
              }}
              variant="contained"
              sx={{ padding: "5px 10px" }}
            >
              Ver estudiantes
            </Button>
          );
        },
      },
    },
  ];

  const options = {
    responsive: "standard",
    search: false,
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    pagination: false,
    selectableRows: "none", // Desactiva la selección múltiple
  }

  const dataIECI = [
    {
      Practica: 1,
      Alumnos:
        getListadoPractica1IECI.status === "success"
          ? getListadoPractica1IECI.data.cantidad_alumnos
          : 0,
      Accion: {
        carrera:
          getListadoPractica1IECI.status === "success"
            ? getListadoPractica1IECI.data.carrera
            : "",
        id_asignatura: 620509,
      },
    },
    {
      Practica: 2,
      Alumnos:
        getListadoPractica2IECI.status === "success"
          ? getListadoPractica2IECI.data.cantidad_alumnos
          : 0,
      Accion: {
        carrera:
          getListadoPractica2IECI.status === "success"
            ? getListadoPractica2IECI.data.carrera
            : "",
        id_asignatura: 620520,
      },
    },
  ];

  const dataICINF = [
    {
      Practica: 1,
      Alumnos:
        getListadoPractica1ICINF.status === "success"
          ? getListadoPractica1ICINF.data.cantidad_alumnos
          : 0,
      Accion: {
        carrera:
          getListadoPractica1ICINF.status === "success"
            ? getListadoPractica1ICINF.data.carrera
            : "",
        id_asignatura: 620509,
      },
    },
    {
      Practica: 2,
      Alumnos:
        getListadoPractica2ICINF.status === "success"
          ? getListadoPractica2ICINF.data.cantidad_alumnos
          : 0,
      Accion: {
        carrera:
          getListadoPractica2ICINF.status === "success"
            ? getListadoPractica2ICINF.data.carrera
            : "",
        id_asignatura: 620520,
      },
    },
  ];

  return (
    <Grid container direction="column" sx={{ backgroundColor: "#e8e9eb", minHeight: "100vh" }}>
      <Grid item sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Header toggleSidebar={toggleSidebar} isWideScreen={isWideScreen} showSidebarButton={true} />
      </Grid>
      <Grid container>
        {sidebarOpen && (
          <Grid item xs={3} sx={{ position: "fixed", top: "80px", zIndex: 1200 }}>
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
          <Card
            sx={{
              padding: "20px",
              backgroundColor: "white",
              width: "100%",
              maxWidth: "1120px",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                marginTop: "10px",
                marginBottom: "10px",
                fontSize: { xs: "1.3rem", sm: "1.4rem" },
                textAlign: "center"
              }}
            >
              Ingrese el semestre y período <Checklist style={{ marginLeft: "5px" }} />
            </Typography>

            <form
              onSubmit={onSubmit}
              style={{
                width: "100%",
                maxWidth: "1120px",
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
                    bgcolor: "white",
                    borderRadius: "5px",
                    marginTop: "10px",
                    padding: "10px",
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
                <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{
                    bgcolor: "white",
                    borderRadius: "5px",
                    marginTop: "10px",
                    padding: "10px",
                  }}
                >
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
                    justifyContent: "center",
                    bgcolor: "white",
                  }}
                >
                  <Button type="submit" variant="contained">
                    Buscar
                  </Button>
                </Grid>
              </Grid>
            </form>

            <Typography variant="h6" sx={{ marginBottom: "10px", textAlign: "center" }}>
              Prácticas Profesionales IECI
            </Typography>
            <MUIDataTable
              data={dataIECI}
              columns={columns}
              options={options}
            />

            <Typography variant="h6" sx={{ marginBottom: "10px", marginTop: "20px", textAlign: "center" }}>
              Prácticas Profesionales ICINF
            </Typography>
            <MUIDataTable
              data={dataICINF}
              columns={columns}
              options={options}
            />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Practicas;
