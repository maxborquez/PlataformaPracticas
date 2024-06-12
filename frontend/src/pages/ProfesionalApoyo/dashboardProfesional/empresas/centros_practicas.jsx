import { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import Header from "../../../../components/headers/header";
import TableEmpresa from "./components/tableEmpresa";
import SidebarProfesional from "../../../../components/sidebars/sidebarProfesional";
import { useNavigate } from "react-router-dom";
import { Business } from "@mui/icons-material";

const CentrosPracticas = () => {
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
            marginTop: "35px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              flexDirection: "column",
              alignItems: "center",
              marginTop: "15px",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              maxWidth: "80%",
              margin: "0 auto",
            }}
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
                Centros de práctica <Business style={{ marginLeft: "5px" }}/>
              </Typography>
            </Grid>
            <Grid item>
              <Button
                sx={{ marginLeft: "10px" }}
                variant="contained"
                onClick={() => navigate("/ingresar_empresa")}
              >
                Añadir empresa
              </Button>
            </Grid>
            <Grid item sx={{ width: "100%", overflowX: "hidden" }}>
              <TableEmpresa />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CentrosPracticas;
