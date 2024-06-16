import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Grid, Typography, Card, Alert } from "@mui/material";
import Header from "../../../components/headers/header";
import SidebarAlumno from "../../../components/sidebars/sidebarAlumno";
import { Construction } from "@mui/icons-material";
import clienteAxios from "../../../helpers/clienteaxios";
import Detalle from "../../Alumno/detalleInscripcion/components/Detalle";

const MiPractica = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const id_alumno = localStorage.getItem("id_alumno");
  const id_inscribe = localStorage.getItem("id_inscribe");

  const { data, status } = useQuery("estado_inscripcion", async () => {
    const response = await clienteAxios.post("/inscripcion/comprobar", {
      id_alumno: id_alumno,
    });
    return response.data;
  });

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
            <Grid
              container
              spacing={2}
              sx={{ flexDirection: "column", alignItems: "center" }}
            >
              <Grid item>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Mis practicas
                  <Construction style={{ marginLeft: "5px" }} />
                </Typography>
              </Grid>
              {status === "success" && data.inscrito_sistema && (
                <Grid item>
                  {localStorage.setItem(
                    "id_inscripcion_practica",
                    data.id_inscripcion_practica
                  )}
                  <Detalle id={id_inscribe} />
                </Grid>
              )}
              {status === "success" && data.inscrito_sistema === false && (
                <Grid item>
                  {localStorage.setItem("id_inscripcion_practica", "undefined")}
                  <Alert severity="warning">No tienes una práctica inscrita</Alert>
                </Grid>
              )}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MiPractica;
