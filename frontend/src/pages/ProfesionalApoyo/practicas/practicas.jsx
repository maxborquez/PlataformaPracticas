import React, { useEffect, useState } from 'react';
import {
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import Header from "../../../components/headers/header";
import SidebarProfesional from "../../../components/sidebars/sidebarProfesional";
import { Checklist } from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../../helpers/clienteaxios';

const Practicas = () => {
  const [anio, setAnio] = useState(new Date().getFullYear());
  const [periodoAcademico, setPeriodoAcademico] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [dataIECI, setDataIECI] = useState([]);
  const [dataICINF, setDataICINF] = useState([]);
  const navigate = useNavigate();

  const carreraIECI = 29037;
  const carreraICINF = 29027;
  const practica1 = 620509;
  const practica2 = 620520;

  useEffect(() => {
    const handleResize = () => {
      const zoomThreshold = 900;
      setIsWideScreen(window.innerWidth >= zoomThreshold);
      setSidebarOpen(window.innerWidth >= zoomThreshold);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchData = async () => {
    try {
      const [ieciPractica1, ieciPractica2, icinfPractica1, icinfPractica2] = await Promise.all([
        clienteAxios.get(`/inscripcion/count/${carreraIECI}/${practica1}/${anio}/${periodoAcademico}`),
        clienteAxios.get(`/inscripcion/count/${carreraIECI}/${practica2}/${anio}/${periodoAcademico}`),
        clienteAxios.get(`/inscripcion/count/${carreraICINF}/${practica1}/${anio}/${periodoAcademico}`),
        clienteAxios.get(`/inscripcion/count/${carreraICINF}/${practica2}/${anio}/${periodoAcademico}`),
      ]);

      setDataIECI([
        { practica: 'Practica 1', count: ieciPractica1.data.count, carrera: carreraIECI, asignatura: practica1 },
        { practica: 'Practica 2', count: ieciPractica2.data.count, carrera: carreraIECI, asignatura: practica2 },
      ]);

      setDataICINF([
        { practica: 'Practica 1', count: icinfPractica1.data.count, carrera: carreraICINF, asignatura: practica1 },
        { practica: 'Practica 2', count: icinfPractica2.data.count, carrera: carreraICINF, asignatura: practica2 },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [anio, periodoAcademico]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleViewStudents = (carreraId, asignaturaId, year, period) => {
    navigate(`/listaestudiantes/${carreraId}/${asignaturaId}/${year}/${period}`);
  };

  const options = {
    responsive: "standard",
    search: false,
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    pagination: false,
    selectableRows: "none",
    sort: false,
  };

  const columnsIECI = [
    { 
      name: "practica", 
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
      name: "count", 
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
      name: "acciones",
      label: "Acción",
      options: {
        sort: false,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: '#326fa6',
            color: '#fff'
          }
        }),
        customBodyRenderLite: (dataIndex) => {
          const rowData = dataIECI[dataIndex];
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleViewStudents(rowData.carrera, rowData.asignatura, anio, periodoAcademico)}
            >
              Ver Estudiantes
            </Button>
          );
        },
      },
    },
  ];

  const columnsICINF = [
    { 
      name: "practica", 
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
      name: "count", 
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
      name: "acciones",
      label: "Acción",
      options: {
        sort: false,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: '#326fa6',
            color: '#fff'
          }
        }),
        customBodyRenderLite: (dataIndex) => {
          const rowData = dataICINF[dataIndex];
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleViewStudents(rowData.carrera, rowData.asignatura, anio, periodoAcademico)}
            >
              Ver Estudiantes
            </Button>
          );
        },
      },
    },
  ];

  return (
    <Grid container direction="column" sx={{ backgroundColor: "#e8e9eb", minHeight: "100vh" }}>
      <Grid item sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isWideScreen={isWideScreen} showSidebarButton={true} />
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
          <Card sx={{ padding: "20px", backgroundColor: "white", width: "100%", marginTop: "10  px", marginBottom: "10  px" }}>
            <Typography variant="h5" sx={{ marginTop: "10px", marginBottom: "10px", fontSize: { xs: "1.3rem", sm: "1.4rem" }, textAlign: "center" }}>
              Ingrese el semestre y período <Checklist style={{ marginLeft: "5px" }} />
            </Typography>
            <form
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
              onSubmit={handleSearch}
            >
              <Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "center", bgcolor: "white", borderRadius: "5px", padding: "1px" }}>
                <Grid item xs={12} sm={4} sx={{ bgcolor: "white", borderRadius: "5px", marginTop: "10px", padding: "10px" }}>
                  <TextField
                    placeholder="202x"
                    value={anio}
                    type="number"
                    inputProps={{ min: 2000 }}
                    sx={{ backgroundColor: "white" }}
                    onChange={(e) => setAnio(e.target.value)}
                    label="Año"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4} sx={{ bgcolor: "white", borderRadius: "5px", marginTop: "10px", padding: "10px" }}>
                  <FormControl fullWidth>
                    <InputLabel>Seleccione Período</InputLabel>
                    <Select
                      sx={{ backgroundColor: "white" }}
                      onChange={(e) => setPeriodoAcademico(e.target.value)}
                      value={periodoAcademico}
                      label="Seleccione periodo"
                      fullWidth
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </form>

            <Typography variant="h6" sx={{ marginBottom: "10px", textAlign: "center" }}>
              Prácticas Profesionales IECI
            </Typography>
            <MUIDataTable
              data={dataIECI}
              columns={columnsIECI}
              options={options}
              style={{ marginBottom: "20px" }} // Añadir margen entre tablas
            />

            <Typography variant="h6" sx={{ marginBottom: "10px", marginTop: "20px", textAlign: "center" }}>
              Prácticas Profesionales ICINF
            </Typography>
            <MUIDataTable
              data={dataICINF}
              columns={columnsICINF}
              options={options}
            />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Practicas;
