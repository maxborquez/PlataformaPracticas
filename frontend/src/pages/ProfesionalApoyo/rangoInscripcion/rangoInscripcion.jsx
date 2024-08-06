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
  const [errorMessages, setErrorMessages] = useState({
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
    const { name, value } = e.target;
    const currentYear = new Date().getFullYear();
    const inputYear = new Date(value).getFullYear();
    
    let errorMessage = "";
    if (inputYear !== currentYear) {
      errorMessage = "La fecha debe ser del año actual.";
    }

    setRango({
      ...rango,
      [name]: value,
    });
    setErrorMessages({
      ...errorMessages,
      [name]: errorMessage,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isError = Object.values(errorMessages).some(
      (message) => message !== ""
    );

    const inicio1Date = new Date(rango.inicio1);
    const termino1Date = new Date(rango.termino1);
    const inicio2Date = new Date(rango.inicio2);
    const termino2Date = new Date(rango.termino2);

    if (termino1Date <= inicio1Date) {
      setErrorMessages((prev) => ({
        ...prev,
        termino1: "El término del semestre 1 debe ser mayor que el inicio del semestre 1.",
      }));
    } else if (inicio2Date <= termino1Date) {
      setErrorMessages((prev) => ({
        ...prev,
        inicio2: "El inicio del semestre 2 debe ser mayor que el término del semestre 1.",
      }));
    } else if (termino2Date <= inicio2Date) {
      setErrorMessages((prev) => ({
        ...prev,
        termino2: "El término del semestre 2 debe ser mayor que el inicio del semestre 2.",
      }));
    } else {
      setErrorMessages({
        inicio1: "",
        termino1: "",
        inicio2: "",
        termino2: "",
      });
    }

    if (isError) {
      Swal.fire("Error", "Corrige los errores antes de enviar el formulario", "error");
      return;
    }

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
            <Typography variant="h5">Rangos permitidos para inscipción de práctica</Typography>
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
                error={!!errorMessages.inicio1}
                helperText={errorMessages.inicio1}
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
                error={!!errorMessages.termino1}
                helperText={errorMessages.termino1}
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
                error={!!errorMessages.inicio2}
                helperText={errorMessages.inicio2}
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
                error={!!errorMessages.termino2}
                helperText={errorMessages.termino2}
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
