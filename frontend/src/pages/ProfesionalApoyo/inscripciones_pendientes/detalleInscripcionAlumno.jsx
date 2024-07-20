import React, { useState, useEffect } from "react";
import { CircularProgress, Grid, Box, Typography, Button } from "@mui/material";
import Header from "../../../components/headers/header";
import { useQuery } from "react-query";
import clienteAxios from "../../../helpers/clienteaxios";
import { useParams, useNavigate } from "react-router-dom";
import { Business } from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
import SidebarProfesional from "../../../components/sidebars/sidebarProfesional";

const DetalleInscripcionAlumno = () => {
  const { id_inscripcion } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const zoomThreshold = 900;
      const isWide = window.innerWidth >= zoomThreshold;
      setIsWideScreen(isWide);
      setSidebarOpen(isWide);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { data, status } = useQuery("detalleInscripcion", async () => {
    const response = await clienteAxios.get(
      `/inscripcion/show/${parseInt(id_inscripcion, 10)}`
    );
    return response.data;
  });

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

  const columns = [
    { name: "Info", label: "Info" },
    { name: "dato", label: "dato" },
  ];

  const dataTableData = [
    {
      Info: "Fecha Inscripción",
      dato: new Date(
        data.inscripcion.fecha_inscripcion_practica
      ).toLocaleDateString("es-ES", {
        timeZone: "UTC",
      }),
    },
    {
      Info: "Fecha Inicio",
      dato: new Date(data.inscripcion.fecha_inicio).toLocaleDateString(
        "es-ES",
        {
          timeZone: "UTC",
        }
      ),
    },
    {
      Info: "Fecha Fin",
      dato: new Date(data.inscripcion.fecha_fin).toLocaleDateString("es-ES", {
        timeZone: "UTC",
      }),
    },
    {
      Info: "Nombre Alumno",
      dato: `${data.inscripcion.inscribe.alumno.primer_nombre} ${data.inscripcion.inscribe.alumno.segundo_nombre} ${data.inscripcion.inscribe.alumno.apellido_paterno} ${data.inscripcion.inscribe.alumno.apellido_materno}`,
    },
    { Info: "RUT Alumno", dato: data.inscripcion.inscribe.alumno.rut },
    {
      Info: "Correo Institucional Alumno",
      dato: data.inscripcion.inscribe.alumno.correo_institucional,
    },
    {
      Info: "Correo Personal Alumno",
      dato: data.inscripcion.inscribe.alumno.correo_personal,
    },
    {
      Info: "Teléfono Personal Alumno",
      dato: data.inscripcion.inscribe.alumno.telefono_personal,
    },
    { Info: "Descripción", dato: data.inscripcion.descripcion },
    { Info: "Objetivos", dato: data.inscripcion.objetivos },
    { Info: "Actividades", dato: data.inscripcion.actividades },
    { Info: "Nombre Empresa", dato: data.inscripcion.empresa.nombre },
    {
      Info: "Departamento Empresa",
      dato: data.inscripcion.empresa.departamento,
    },
    { Info: "Web Empresa", dato: data.inscripcion.empresa.web },
    { Info: "Rubro Empresa", dato: data.inscripcion.empresa.rubro },
    { Info: "Teléfono Empresa", dato: data.inscripcion.empresa.telefono },
    { Info: "Dirección Empresa", dato: data.inscripcion.empresa.direccion },
    {
      Info: "Estado Inscripción",
      dato: data.inscripcion.estado_inscripcion.nombre_estado_inscripcion,
    },
    { Info: "Nombre Supervisor", dato: data.inscripcion.supervisor.nombre },
    {
      Info: "Profesión Supervisor",
      dato: data.inscripcion.supervisor.profesion,
    },
    { Info: "Cargo Supervisor", dato: data.inscripcion.supervisor.cargo },
    {
      Info: "Teléfono Supervisor",
      dato: data.inscripcion.supervisor.telefono,
    },
    { Info: "Correo Supervisor", dato: data.inscripcion.supervisor.correo },
    { Info: "Modalidad", dato: data.inscripcion.modalidad.nombre_modalidad },
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
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "auto", // Asegurar que la tabla no tenga una altura máxima
    textLabels: {
      body: {
        noMatch: "No hay datos disponibles", // Mensaje en español cuando no hay datos
      },
    },
  };

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
              height: "calc(100vh - 80px)", // Ajustar altura para ocupar todo el espacio disponible
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
            paddingLeft: "16px",
            paddingTop: "16px",
            paddingBottom: "16px",
            display: "flex",
            justifyContent: "center",
            width: "auto", // Asegurar que el Grid ocupe todo el ancho disponible
          }}
        >
          <Grid
            sx={{
              padding: "20px",
              backgroundColor: "white",
              width: "100%",
              marginTop: "16px",
              boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
              borderRadius: "8px",
              boxSizing: "border-box",
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
                Detalle Inscripción <Business style={{ marginLeft: "5px" }} />
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(-1)}
              >
                Volver
              </Button>
            </Box>
            <MUIDataTable
              title={"Detalles de Inscripción"}
              data={dataTableData}
              columns={columns}
              options={options}
              style={{ overflow: "hidden" }} // Eliminar scrollbars
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetalleInscripcionAlumno;
