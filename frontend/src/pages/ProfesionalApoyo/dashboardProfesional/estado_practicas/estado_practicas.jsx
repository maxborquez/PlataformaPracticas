import { useState, useEffect } from "react";
import { Grid, Typography, Paper, CircularProgress } from "@mui/material";
import Header from "../../../../components/headers/header";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import ListadoAlumnos from "./components/ListadoAlumnos";
import SidebarProfesional from "../../../../components/sidebars/sidebarProfesional";

const EstadoPracticas = () => {
  const { anio, periodo, asignatura, carrera } = useParams();

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

  const getEstadoPracticas = useQuery(
    ["estadoPracticas", anio, periodo, asignatura, carrera],
    async () => {
      const response = await clienteAxios.get(
        `/estadoPracticas/${anio}/${periodo}/${asignatura}/${carrera}`
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Error al obtener el estado de prácticas");
      }
    }
  );

  useEffect(() => {
    if (getEstadoPracticas.data) {
      console.log("Estado de prácticas:", getEstadoPracticas.data);
    }
  }, [getEstadoPracticas.data]);

  return (
    <Grid
      container
      direction="column"
      sx={{ backgroundColor: "#e8e9eb", minHeight: "100vh" }}
    >
      <Grid item sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Header
          toggleSidebar={toggleSidebar}
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
          xs
          sx={{
            marginLeft: sidebarOpen && isWideScreen ? "250px" : "0px",
            transition: "margin-left 0.3s",
            overflowY: "auto",
            paddingRight: "16px",
            overflowX: "auto",
            marginTop: "35px",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "16px",
              backgroundColor: "#fff",
              maxWidth: "1200px", // Adjust the width as needed
              margin: "auto",
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{ flexDirection: "column", alignItems: "center" }}
            >
              <Typography variant="h5" sx={{ textAlign: "center", marginTop: "15px" }}>
                  Listado de alumnos
              </Typography>
              <ListadoAlumnos
                anio={anio}
                periodo={periodo}
                asignatura={asignatura}
                carrera={carrera}
              />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EstadoPracticas;
