import React, { useState, useEffect } from "react";
import { Grid, Typography, Card } from "@mui/material";
import Header from "../../../components/headers/header";
import SidebarAlumno from "../../../components/sidebars/sidebarAlumno";
import { Construction } from "@mui/icons-material";
import SubirArchivoInscripcion from "./components/subir_archivo_incripcion";
import MostrarArchivoArchivoInscripcion from "./components/mostrar_archivo_inscripcion";
import { useParams } from "react-router-dom";

const ArchivoInscripcionPractica = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [hasExistingFile, setHasExistingFile] = useState(false);
  const { id } = useParams();

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

  // Verificar si id es inválido (puede ser "undefined" o no un número válido)
  if (!id || isNaN(Number(id))) {
    return (
      <Grid
        container
        direction="column"
        sx={{ backgroundColor: "#e8e9eb", minHeight: "100vh" }}
      >
        <Grid item sx={{ position: "sticky", top: 0, zIndex: 1000, width: "100%" }}>
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
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                No tiene una práctica inscrita aún.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  // Si id es válido, renderizar el contenido normalmente
  return (
    <Grid
      container
      direction="column"
      sx={{ backgroundColor: "#e8e9eb", minHeight: "100vh" }}
    >
      <Grid item sx={{ position: "sticky", top: 0, zIndex: 1000, width: "100%" }}>
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
            <Grid container spacing={2} sx={{ flexDirection: "column", alignItems: "center" }}>
              <Grid item>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  Subir archivo de inscripcion de práctica
                  <Construction style={{ marginLeft: "5px" }} />
                </Typography>
              </Grid>
              <Grid item>
                <SubirArchivoInscripcion id={id} hasExistingFile={hasExistingFile} />
              </Grid>
              <Grid item sx={{ width: "100%", marginTop: "20px" }}>
                <MostrarArchivoArchivoInscripcion id={id} setHasExistingFile={setHasExistingFile} />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ArchivoInscripcionPractica;
