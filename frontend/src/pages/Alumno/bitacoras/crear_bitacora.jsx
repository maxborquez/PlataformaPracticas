import { useState, useEffect } from "react";
import { Grid, Card, Typography, Box, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import Header from "../../../components/headers/header";
import SidebarAlumno from "../../../components/sidebars/sidebarAlumno";
import clienteAxios from "../../../helpers/clienteaxios";
import { useParams, useNavigate } from "react-router-dom";

const CrearBitacora = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaCreacion, setFechaCreacion] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [idTipoBitacora, setIdTipoBitacora] = useState("");
  const [mensaje, setMensaje] = useState("");
  const { id_inscripcion_practica } = useParams();
  const id_alumno = localStorage.getItem("id_alumno");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const nuevaBitacora = {
        titulo,
        descripcion,
        fecha_creacion: fechaCreacion,
        hora_inicio: horaInicio,
        hora_fin: horaFin,
        id_tipo_bitacora: idTipoBitacora,
        id_estado_bitacora: 2, // Por defecto a 1 o ajusta según sea necesario
        id_inscripcion_practica,
        id_alumno,
      };

      const response = await clienteAxios.post("/bitacoras/create", nuevaBitacora);
      if (response.status === 200) {
        setMensaje("Bitácora creada exitosamente");
        navigate(`/bitacoras/${id_inscripcion_practica}`); // Navega de vuelta a la lista de bitácoras
      }
    } catch (error) {
      setMensaje("Error al crear la bitácora");
    }
  };

  return (
    <Grid container direction="column" sx={{ backgroundColor: "#e8e9eb", minHeight: "100vh" }}>
      <Grid item sx={{ position: "sticky", top: 0, zIndex: 1000, width: "100%" }}>
        <Header toggleSidebar={toggleSidebar} isWideScreen={isWideScreen} showSidebarButton={true} />
      </Grid>

      <Grid container item>
        {sidebarOpen && (
          <Grid item sx={{ position: "fixed", top: "80px", left: 0, width: "250px", zIndex: 1200, backgroundColor: "#36465d" }}>
            <SidebarAlumno />
          </Grid>
        )}

        <Grid item xs sx={{ marginLeft: sidebarOpen && isWideScreen ? "250px" : "0px", transition: "margin-left 0.3s", overflowY: "auto", paddingRight: "16px", overflowX: "auto", marginTop: "35px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <Card sx={{ padding: "20px", backgroundColor: "white", width: "100%", borderRadius: "8px", boxSizing: "border-box" }}>
            <Typography variant="h5" gutterBottom>Crear Bitácora</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
              <TextField
                label="Fecha de Creación"
                type="date"
                value={fechaCreacion}
                onChange={(e) => setFechaCreacion(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Hora de Inicio"
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Hora de Fin"
                type="time"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Tipo de Bitácora</InputLabel>
                <Select
                  value={idTipoBitacora}
                  onChange={(e) => setIdTipoBitacora(e.target.value)}
                  label="Tipo de Bitácora"
                >
                  <MenuItem value={1}>Código</MenuItem>
                  <MenuItem value={2}>Investigación</MenuItem>
                  <MenuItem value={3}>Gestión</MenuItem>
                  <MenuItem value={4}>Otro</MenuItem>
                </Select>
              </FormControl>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Crear Bitácora
              </Button>
            </form>
            {mensaje && (
              <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
                {mensaje}
              </Typography>
            )}
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CrearBitacora;
