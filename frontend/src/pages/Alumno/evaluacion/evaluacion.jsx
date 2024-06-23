import { useState, useEffect } from "react";
import { Grid, Typography, Card } from "@mui/material";
import Header from "../../../components/headers/header";
import SidebarAlumno from "../../../components/sidebars/sidebarAlumno";
import { Construction } from "@mui/icons-material";
import SubirEvaluacion from "./components/subir_evaluacion";
import MostrarArchivoEvaluacion from "./components/mostrar_archivo_evaluacion";
import { useParams } from "react-router-dom";

const EvaluacionPractica = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
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
            marginTop: "35px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              padding: "20px",
              backgroundColor: "white",
              width: "100%",
              marginTop: "15px",
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
                  Subir evaluación de la empresa
                  <Construction style={{ marginLeft: "5px" }} />
                </Typography>
              </Grid>
              <Grid item>
                <SubirEvaluacion id={id} />
              </Grid>
              <Grid item sx={{ width: "100%", marginTop: "20px" }}>
                <MostrarArchivoEvaluacion id={id} />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EvaluacionPractica;
