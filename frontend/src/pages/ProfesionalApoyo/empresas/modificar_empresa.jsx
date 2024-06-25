import { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/headers/header";
import SidebarProfesional from "../../../components/sidebars/sidebarProfesional";
import FormularioModificar from "./components/formularioModificar";

const ModificarEmpresa = () => {
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

  const handleBack = () => {
    navigate('/centros_practicas');
  };

  return (
    <Grid container direction="column" sx={{ backgroundColor: "#e8e9eb", minHeight: "100vh" }}>
      <Grid item sx={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
        <Header toggleSidebar={toggleSidebar} isWideScreen={isWideScreen} showSidebarButton={true}/>
      </Grid>

      <Grid container item sx={{ marginTop: '15px' }}>
        {sidebarOpen && (
          <Grid item sx={{ position: 'fixed', top: '80px', left: 0, width: '250px', zIndex: 1200, backgroundColor: '#36465d' }}>
            <SidebarProfesional />
          </Grid>
        )}

        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          sx={{ transition: 'margin-left 0.3s', marginLeft: isWideScreen ? '250px' : '0px' }}
        >
          <Grid
              item
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                mb: 2,
              }}
            >
              <Button
                direction="absolute"
                variant="contained"
                color="primary"
                onClick={handleBack}
                sx={{ mb: 2, mr: 10 }}
              >
              Volver
            </Button>
            <FormularioModificar id={id} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ModificarEmpresa;
