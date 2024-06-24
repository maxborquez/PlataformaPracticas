import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Grid, Typography, Button } from "@mui/material";
import Header from "../../../components/headers/header";
import SidebarProfesional from "../../../components/sidebars/sidebarProfesional";
import MUIDataTable from "mui-datatables";
import clienteAxios from "../../../helpers/clienteaxios";

const ListaEstudiantes = () => {
  const { careerId, asignaturaId, anio, periodo } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);

  const carreraMap = {
    29037: "IECI",
    29027: "ICINF",
    // Añadir más mapeos aquí si es necesario
  };

  const asignaturaMap = {
    620520: "Práctica 2",
    620509: "Práctica 1",
    // Añadir más mapeos aquí si es necesario
  };

  const nombreCarrera = carreraMap[careerId] || "Carrera Desconocida";
  const nombreAsignatura =
    asignaturaMap[asignaturaId] || "Asignatura Desconocida";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await clienteAxios.get(
          `/inscripcion/listaestudiantes/${careerId}/${asignaturaId}/${anio}/${periodo}`
        );
        // Transformar los datos para incluir el estado de práctica
        const transformedData = response.data.map((estudiante) => ({
          ...estudiante,
          estado_practica:
            estudiante.inscribe[0]?.estado_practica?.nombre_estado_practica ||
            "No disponible",
        }));
        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [careerId, asignaturaId, anio, periodo]);

  const columns = [
    {
      name: "rut",
      label: "RUT",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "primer_nombre",
      label: "Primer Nombre",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "apellido_paterno",
      label: "Apellido Paterno",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "apellido_materno",
      label: "Apellido Materno",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "correo_institucional",
      label: "Correo Institucional",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "estado_practica",
      label: "Estado de Práctica",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "perfil",
      label: "Perfil",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                navigate(`/perfilEstudiante/${tableMeta.rowData[0]}`)
              }
            >
              Ver Perfil
            </Button>
          );
        },
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
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
    selectableRows: "none",
    sort: false,
  };

  return (
    <Grid
      container
      direction="column"
      sx={{ backgroundColor: "#e8e9eb", minHeight: "100vh" }}
    >
      <Grid item sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isWideScreen={isWideScreen}
          showSidebarButton={true}
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
          <Card
            sx={{
              padding: "20px",
              backgroundColor: "white",
              width: "100%",
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
                textAlign: "center",
              }}
            >
              Lista de estudiantes {nombreAsignatura} - {nombreCarrera}
            </Typography>
            <MUIDataTable data={data} columns={columns} options={options} />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ListaEstudiantes;
