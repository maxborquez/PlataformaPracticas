import {
    CircularProgress,
    Grid,
    Box,
    Typography,
    Button,
    Paper,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
  } from "@mui/material";
  import Header from "../../../../components/headers/header";
  import { useQuery, useMutation } from "react-query";
  import clienteAxios from "../../../../helpers/clienteaxios";
  import { useParams, useNavigate } from "react-router-dom";
  import SidebarAlumno from "../../../../components/sidebars/sidebarAlumno";
  import { useState, useEffect } from "react";
  
  const EditarBitacora = () => {
    const { id_bitacora } = useParams();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isWideScreen, setIsWideScreen] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [tipoBitacora, setTipoBitacora] = useState("");
    const [initialData, setInitialData] = useState({});
    const navigate = useNavigate();
  
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
  
    useEffect(() => {
      const handleResize = () => {
        const zoomThreshold = 900;
        const isWide = window.innerWidth >= zoomThreshold;
        setIsWideScreen(isWide);
        setSidebarOpen(isWide);
      };
  
      window.addEventListener("resize", handleResize);
  
      handleResize();
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  
    const getBitacora = useQuery(
      ["detallebitacora", id_bitacora],
      async () => {
        const response = await clienteAxios.get(
          `/bitacoras/detalle/${id_bitacora}`
        );
        return response.data;
      },
      {
        onSuccess: (data) => {
          setTitulo(data.bitacora.titulo);
          setDescripcion(data.bitacora.descripcion);
          setHoraInicio(data.bitacora.hora_inicio);
          setHoraFin(data.bitacora.hora_fin);
          setTipoBitacora(data.bitacora.id_tipo_bitacora);  // Use the correct field name
          setInitialData(data.bitacora);  // Save initial data
        },
      }
    );
  
    const editarBitacora = useMutation(async (bitacora) => {
      const response = await clienteAxios.put(
        `/bitacoras/update/${id_bitacora}`,
        bitacora
      );
      return response.data;
    });
  
    const handleSave = () => {
      const updatedFields = {};
  
      if (titulo !== initialData.titulo) updatedFields.titulo = titulo;
      if (descripcion !== initialData.descripcion) updatedFields.descripcion = descripcion;
      if (horaInicio !== initialData.hora_inicio) updatedFields.hora_inicio = horaInicio;
      if (horaFin !== initialData.hora_fin) updatedFields.hora_fin = horaFin;
      if (tipoBitacora !== initialData.id_tipo_bitacora) updatedFields.id_tipo_bitacora = tipoBitacora;  // Use the correct field name
  
      editarBitacora.mutate(updatedFields, {
        onSuccess: () => {
          navigate(`/detalle_bitacora/${id_bitacora}`);
        },
      });
    };
  
    if (getBitacora.status === "loading") {
      return (
        <Grid
          sx={{
            width: "35%",
            margin: "0px auto",
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Cargando datos.........
          <CircularProgress />
        </Grid>
      );
    }
  
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
                height: "calc(100vh - 80px)",
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
              paddingLeft: "16px",
              paddingTop: "16px",
              paddingBottom: "16px",
              display: "flex",
              justifyContent: "center",
              width: "auto",
            }}
          >
            <Grid
              sx={{
                padding: "20px",
                backgroundColor: "white",
                width: "100%",
                marginTop: "16px",
                boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <Typography variant="h4" sx={{ textAlign: "center" }}>
                  Editar Bitácora
                </Typography>
              </Box>
              {getBitacora.status === "success" && getBitacora.data.bitacora && (
                <>
                  <Paper sx={{ padding: "16px" }}>
                    <TextField
                      fullWidth
                      label="Título"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      sx={{ marginBottom: "16px" }}
                    />
                    <TextField
                      fullWidth
                      label="Descripción"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      sx={{ marginBottom: "16px" }}
                    />
                    <TextField
                      fullWidth
                      label="Hora de Inicio"
                      type="time"
                      value={horaInicio}
                      onChange={(e) => setHoraInicio(e.target.value)}
                      sx={{ marginBottom: "16px" }}
                    />
                    <TextField
                      fullWidth
                      label="Hora de Fin"
                      type="time"
                      value={horaFin}
                      onChange={(e) => setHoraFin(e.target.value)}
                      sx={{ marginBottom: "16px" }}
                    />
                    <FormControl fullWidth sx={{ marginBottom: "16px" }}>
                      <InputLabel>Tipo de Bitácora</InputLabel>
                      <Select
                        value={tipoBitacora}
                        onChange={(e) => setTipoBitacora(e.target.value)}
                        label="Tipo de Bitácora"
                      >
                        <MenuItem value={1}>Código</MenuItem>
                        <MenuItem value={2}>Investigación</MenuItem>
                        <MenuItem value={3}>Gestión</MenuItem>
                        <MenuItem value={4}>Otro</MenuItem>
                      </Select>
                    </FormControl>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        sx={{ marginRight: "10px" }}
                      >
                        Guardar
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          navigate(`/detalle_bitacora/${id_bitacora}`)
                        }
                      >
                        Cancelar
                      </Button>
                    </Box>
                  </Paper>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  
  export default EditarBitacora;
  