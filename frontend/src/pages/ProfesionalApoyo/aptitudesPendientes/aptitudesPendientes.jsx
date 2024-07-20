import React, { useState, useEffect } from "react";
import { Grid, Paper, Button, Typography, TextField, Box } from "@mui/material";
import Header from "../../../components/headers/header";
import SidebarProfesional from "../../../components/sidebars/sidebarProfesional";
import MUIDataTable from "mui-datatables";
import Swal from "sweetalert2";
import clienteAxios from "../../../helpers/clienteaxios";

const AptitudesPendientes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [aptitudesPendientes, setAptitudesPendientes] = useState([]);
  const [aptitudesAprobadas, setAptitudesAprobadas] = useState([]);
  const [nuevaAptitud, setNuevaAptitud] = useState("");

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

  useEffect(() => {
    const fetchAptitudes = async () => {
      try {
        const responsePendientes = await clienteAxios.get("/aptitud/getPendientes");
        setAptitudesPendientes(responsePendientes.data.aptitudes);
        const responseAprobadas = await clienteAxios.get("/aptitud/getAprobadas");
        setAptitudesAprobadas(responseAprobadas.data.aptitudes);
      } catch (error) {
        console.error("Error al obtener aptitudes:", error);
      }
    };

    fetchAptitudes();
  }, []);

  const handleAprobarAptitud = async (idAptitud) => {
    try {
      await clienteAxios.put(`/aptitud/aprobar/${idAptitud}`);
      Swal.fire(
        "Aprobada",
        "La aptitud ha sido aprobada correctamente",
        "success"
      ).then(() => {
        // Actualizar el estado después de aprobar una aptitud
        setAptitudesPendientes(aptitudesPendientes.filter(aptitud => aptitud.id_aptitud !== idAptitud));
        // Obtener nuevamente las aptitudes aprobadas
        clienteAxios.get("/aptitud/getAprobadas").then(response => setAptitudesAprobadas(response.data.aptitudes));
      });
    } catch (error) {
      console.error("Error al aprobar aptitud:", error);
      Swal.fire("Error", "Hubo un problema al aprobar la aptitud", "error");
    }
  };

  const handleEliminarAptitud = async (idAptitud) => {
    try {
      await clienteAxios.delete(`/aptitud/delete/${idAptitud}`);
      Swal.fire(
        "Eliminada",
        "La aptitud ha sido eliminada correctamente",
        "success"
      ).then(() => {
        // Actualizar el estado después de eliminar una aptitud
        setAptitudesPendientes(aptitudesPendientes.filter(aptitud => aptitud.id_aptitud !== idAptitud));
      });
    } catch (error) {
      console.error("Error al eliminar aptitud:", error);
      Swal.fire("Error", "Hubo un problema al eliminar la aptitud", "error");
    }
  };

  const handleSubmitNuevaAptitud = async (e) => {
    e.preventDefault();
    try {
      await clienteAxios.post("/aptitud/create", {
        nombre_aptitud: nuevaAptitud,
        id_estado: 2, // Estado 2 para aptitudes pendientes
      });
      Swal.fire(
        "Agregada",
        "Nueva aptitud agregada correctamente",
        "success"
      ).then(() => {
        setNuevaAptitud(""); // Limpiar el campo después de agregar
        // Obtener nuevamente las aptitudes pendientes
        clienteAxios.get("/aptitud/getPendientes").then(response => setAptitudesPendientes(response.data.aptitudes));
      });
    } catch (error) {
      console.error("Error al agregar aptitud:", error);
      Swal.fire("Error", "Hubo un problema al agregar la aptitud", "error");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9\s.-]*$/.test(value) && value.length <= 15) {
      setNuevaAptitud(value);
    }
  };

  const columnsPendientes = [
    {
      name: "nombre_aptitud",
      label: "Nombre de Aptitud",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "acciones",
      label: "Acciones",
      options: {
        customBodyRenderLite: (index) => {
          return (
            <Box display="flex" gap={1.2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleAprobarAptitud(aptitudesPendientes[index].id_aptitud)
                }
              >
                Aprobar
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() =>
                  handleEliminarAptitud(aptitudesPendientes[index].id_aptitud)
                }
              >
                Rechazar
              </Button>
            </Box>
          );
        },
      },
    },
  ];

  const columnsAprobadas = [
    {
      name: "nombre_aptitud",
      label: "Nombre de Aptitud",
      options: {
        filter: false,
        sort: true,
      },
    },
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

      <Grid container item sx={{ flexGrow: 1 }}>
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
              height: "calc(100vh - 80px)",
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
            display: "flex",
            justifyContent: "center",
            width: "auto",
          }}
        >
          <Paper
            sx={{
              padding: "16px",
              margin: "16px",
              width: "100%",
              maxWidth: "calc(100% - 32px)",
              backgroundColor: "white",
              borderRadius: "8px",
              boxSizing: "border-box",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              flexGrow: 1,
            }}
          >
            <Grid item alignSelf={"auto"} width={"50%"} marginBottom={"30px"}>
              <Typography variant="h5" marginBottom={"15px"}>
                Nueva aptitud
              </Typography>
              <form
                onSubmit={handleSubmitNuevaAptitud}
                style={{ display: "flex", alignItems: "center" }}
              >
                <TextField
                  label="Nueva Aptitud"
                  variant="outlined"
                  value={nuevaAptitud}
                  onChange={handleChange}
                  inputProps={{ maxLength: 15 }}
                  sx={{ marginRight: "15px" }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!nuevaAptitud}
                >
                  Agregar
                </Button>
              </form>
            </Grid>

            <Typography variant="h5" mb={"15px"} mt={"30px"}>
              Aptitudes pendientes
            </Typography>

            <MUIDataTable
              data={aptitudesPendientes}
              columns={columnsPendientes}
              options={options}
            />

            <Typography variant="h5" mb={"15px"} mt={"30px"}>
              Aptitudes aprobadas
            </Typography>
            <MUIDataTable
              data={aptitudesAprobadas}
              columns={columnsAprobadas}
              options={options}
            />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AptitudesPendientes;
