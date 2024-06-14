import {
  Grid,
  Button,
  Typography,
  Card,
} from "@mui/material";
import { useState, useEffect } from "react";
import Header from "../../../../components/headers/header";
import SidebarProfesional from "../../../../components/sidebars/sidebarProfesional";
import MUIDataTable from "mui-datatables";

const InscripcionesPendientes = () => {
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

  // Supongamos que tienes datos de ejemplo
  const data = [
    { alumno: 'Juan Perez', rut: '20.356.893-9', oferta: 'Oferta A' },
    { alumno: 'María González', rut: '19.40.587-1', oferta: 'Oferta B' },
    // ... más datos
  ];

  const columns = [
    {
      name: "alumno",
      label: "Alumno",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: '#326fa6',
            color: 'white'
          }
        })
      }
    },
    {
      name: "rut",
      label: "RUT",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: '#326fa6',
            color: 'white'
          }
        })
      }
    },
    {
      name: "oferta",
      label: "Oferta que inscribe",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: '#326fa6',
            color: 'white'
          }
        })
      }
    },
    {
      name: "accion",
      label: "Acción",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <>
            <Button variant="contained" color="primary" sx={{ marginRight: 1 }}>
              Aprobar
            </Button>
            <Button variant="contained" color="secondary">
              Rechazar
            </Button>
          </>
        ),
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: '#326fa6',
            color: 'white'
          }
        })
      }
    },
  ];

  const options = {
    selectableRows: "none",
    responsive: "standard",
    search: false,
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
  };

  return (
    <Grid container direction="column" sx={{ backgroundColor: "#e8e9eb", minHeight: "100vh" }}>
      <Grid item sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Header toggleSidebar={toggleSidebar} isWideScreen={isWideScreen} showSidebarButton={true} />
      </Grid>

      <Grid container>
        {sidebarOpen && (
          <Grid item xs={3} sx={{ position: "fixed", top: "80px", zIndex: 1200 }}>
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
            elevation={3}
            sx={{
              padding: "20px",
              backgroundColor: "white",
              width: "100%",
              maxWidth: "1120px",
              marginTop: "15px",
              marginBottom: "15px",
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
                  }}
                >
                  Inscripciones Pendientes
                </Typography>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <MUIDataTable
                  data={data}
                  columns={columns}
                  options={options}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InscripcionesPendientes;
