import { useState, useEffect } from "react";
import { Grid, Card, TextField, Button, Typography } from "@mui/material";
import Header from "../../../components/headers/header";
import SidebarProfesional from "../../../components/sidebars/sidebarProfesional";
import clienteAxios from "../../../helpers/clienteaxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RangoInscripcion = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [rango, setRango] = useState({
    id_rango: "",
    inicio1: "",
    termino1: "",
    inicio2: "",
    termino2: "",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await clienteAxios.get("/rango/getAll");
        setRango(response.data[0]);
      } catch (error) {
        Swal.fire("Error", "No se pudieron obtener los datos", "error");
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setRango({
      ...rango,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await clienteAxios.put(`/rango/update/${rango.id_rango}`, rango);
      Swal.fire("Éxito", "Fechas actualizadas correctamente", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudieron actualizar las fechas", "error");
    }
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
            <Typography variant="h5">Rangos permitidos para inscipcion de práctica</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Inicio semestre 1"
                type="date"
                name="inicio1"
                value={rango.inicio1.split("T")[0]}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Término semestre 1"
                type="date"
                name="termino1"
                value={rango.termino1.split("T")[0]}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Inicio semestre 2"
                type="date"
                name="inicio2"
                value={rango.inicio2.split("T")[0]}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Término semestre 2"
                type="date"
                name="termino2"
                value={rango.termino2.split("T")[0]}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: "20px" }}
              >
                Guardar
              </Button>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RangoInscripcion;
