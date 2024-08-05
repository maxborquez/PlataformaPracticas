import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import Header from "../../../components/headers/header";
import SidebarProfesional from "../../../components/sidebars/sidebarProfesional";
import { useNavigate, useParams } from "react-router-dom";
import { Business } from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
import { useQuery } from "react-query";
import clienteAxios from "../../../helpers/clienteaxios";

const DetalleCentroPractica = () => {
  const { id } = useParams();
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
      setSidebarOpen(window.innerWidth < zoomThreshold ? false : true);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { data, status } = useQuery(["empresa", id], async () => {
    const response = await clienteAxios.get(`/empresa/getById/${id}`);
    const empresaData = response.data;
    console.log(empresaData);

    // Filtrar inscripciones y supervisores con estado 2
    empresaData.inscripcion_practica = empresaData.inscripcion_practica.filter(
      (inscripcion) => inscripcion.id_estado_inscripcion === 2
    );
    empresaData.supervisor = empresaData.supervisor.filter(
      (supervisor) => supervisor.id_estado_supervisor === 2
    );

    return empresaData;
  });

  const empresaColumns = [
    { name: "nombre", label: "Nombre" },
    { name: "departamento", label: "Departamento" },
    { name: "web", label: "Página Web" },
    {
      name: "rubro",
      label: "Rubro",
      options: {
        customBodyRender: (rubro) => {
          return rubro && rubro.nombre_rubro ? rubro.nombre_rubro : "N/A";
        },
      },
    },
    { name: "telefono", label: "Teléfono" },
    { name: "direccion", label: "Dirección" },
    {
      name: "comuna",
      label: "Comuna",
      options: {
        customBodyRender: (comuna) => {
          return comuna && comuna.nombre ? comuna.nombre : "N/A";
        },
      },
    },
  ];
  

  const inscripcionColumns = [
    { name: "fecha_inscripcion_practica", label: "Fecha Inscripción" },
    { name: "fecha_inicio", label: "Fecha Inicio" },
    { name: "fecha_fin", label: "Fecha Fin" },
    { name: "descripcion", label: "Descripción" },
    { name: "objetivos", label: "Objetivos" },
    { name: "actividades", label: "Actividades" },
  ];

  const supervisorColumns = [
    { name: "nombre", label: "Nombre" },
    { name: "profesion", label: "Profesion" },
    { name: "cargo", label: "Cargo" },
    { name: "telefono", label: "Teléfono" },
    { name: "correo", label: "Correo" },
  ];

  if (status === "loading") {
    return (
      <Grid
        sx={{
          width: "35%",
          margin: "0px auto",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Cargando datos.........
        <CircularProgress />
      </Grid>
    );
  }

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
            marginTop: "16px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              padding: "20px",
              backgroundColor: "white",
              width: "100%",
              marginBottom: "15px",
              marginLeft: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Typography variant="h4" sx={{ textAlign: "center" }}>
                Detalle Centro Practica{" "}
                <Business style={{ marginLeft: "5px" }} />
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(-1)}
              >
                Volver
              </Button>
            </Box>
            {status === "success" && data && (
              <>
                <MUIDataTable
                  title={"Datos de la Empresa"}
                  data={[data]}
                  columns={empresaColumns}
                  options={{
                    responsive: "standard",
                    search: false,
                    download: false,
                    print: false,
                    viewColumns: false,
                    filter: false,
                    pagination: false,
                    selectableRows: "none",
                    sort: false,
                  }}
                />
                <br />
                <MUIDataTable
                  title={"Inscripciones de Práctica"}
                  data={data.inscripcion_practica}
                  columns={inscripcionColumns}
                  options={{
                    responsive: "standard",
                    search: false,
                    download: false,
                    print: false,
                    viewColumns: false,
                    filter: false,
                    pagination: false,
                    selectableRows: "none",
                    sort: false,
                  }}
                />
                <br />
                <MUIDataTable
                  title={"Supervisores"}
                  data={data.supervisor}
                  columns={supervisorColumns}
                  options={{
                    responsive: "standard",
                    search: false,
                    download: false,
                    print: false,
                    viewColumns: false,
                    filter: false,
                    pagination: false,
                    selectableRows: "none",
                    sort: false,
                  }}
                />
              </>
            )}
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetalleCentroPractica;
