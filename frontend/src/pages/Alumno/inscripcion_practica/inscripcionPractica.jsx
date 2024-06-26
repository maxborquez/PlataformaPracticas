import { Grid, Typography, Alert, Paper } from "@mui/material";
import Header from "../../../components/headers/header";
import FormularioInscripcion from "./formularioInscripcion";
import { School } from "@mui/icons-material";
import SidebarAlumno from "../../../components/sidebars/sidebarAlumno";
import clienteAxios from "../../../helpers/clienteaxios";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";

const InscripcionPractica = () => {
  const id_alumno = localStorage.getItem("id_alumno");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const { data, status } = useQuery("estado_inscripcion", async () => {
    const response = await clienteAxios.post("/inscripcion/comprobar", {
      id_alumno: id_alumno,
    });
    return response.data;
  });

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
            <SidebarAlumno />
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
          <Paper
          elevation={3}
            sx={{
              padding: "20px",
              backgroundColor: "white",
              width: "100%",
              // Máximo ancho para hacerlo más responsivo

              borderRadius: "8px", // Bordes redondeados
              boxSizing: "border-box", // Asegurar que el padding no cause overflow
            }}
          >
            <Typography
              variant="h5"
              style={{
                textAlign: "center",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              Inscripción Práctica Profesional{" "}
              <School style={{ marginLeft: "5px" }} />
            </Typography>
            {status === "success" && data.inscrito_sistema && (
              <Grid item>
                {localStorage.setItem(
                  "id_inscripcion_practica",
                  data.id_inscripcion_practica
                )}
                <Alert severity="warning">
                  Ya tienes una practica inscrita actualmente
                </Alert>
              </Grid>
            )}
            {status === "success" && data.inscrito_sistema === false && (
              <Grid item>
                {localStorage.setItem("id_inscripcion_practica", "undefined")}
                <FormularioInscripcion />
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InscripcionPractica;
