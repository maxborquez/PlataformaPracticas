import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import Header from "../../../../components/headers/header";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Work } from "@mui/icons-material";
import Autocomplete from "@mui/material/Autocomplete";
import SidebarProfesional from "../../../../components/sidebars/sidebarProfesional";

const ModificarOferta = () => {
  const [descripcion, setDescripcion] = useState("");
  const [cupos, setCupos] = useState("");
  const [experiencia, setExperiencia] = useState(0);
  const [modalidad, setModalidad] = useState("");
  const [empresa, setEmpresa] = useState({});
  const [periodo, setPeriodo] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const getmodalidades = useQuery("modalidades", async () => {
    const response = await clienteAxios.get("/inscripcion/modalidades");
    if (response.status == 200) {
      return response.data.modalidades;
    }
  });

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

  const getEmpresas = useQuery("empresas", async () => {
    const response = await clienteAxios.get("/empresa/getall");
    if (response.status == 200) {
      return response.data.empresas;
    }
  });

  const getPeriodos = useQuery("periodos", async () => {
    const response = await clienteAxios.get("/periodo/getall");
    if (response.status == 200) {
      return response.data.periodos;
    }
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      descripcion: descripcion,
      experiencia_laboral: experiencia == 1 ? true : false,
      cupos: Number(cupos),
      id_modalidad: modalidad,
      id_periodo_academico: periodo,
      id_empresa: empresa.id_empresa,
    };

    const response = await clienteAxios.put(`/oferta/update/${id}`, data);
    if (response.status == 200) {
      Swal.fire({
        title: "Actualizado",
        text: "La oferta de práctica ha sido actualizada correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      setTimeout(() => {
        navigate("/ofertapracticas");
        Swal.close();
      }, 2000);
    }
  };

  const getoferta = async () => {
    const response = await clienteAxios.get(`/oferta/show/${id}`);
    if (response.status == 200) {
      setLoading(false);
      setDescripcion(response.data.oferta.descripcion);
      setCupos(response.data.oferta.cupos);
      const experiencia =
        response.data.oferta.experiencia_laboral == true ? 1 : 0;
      setExperiencia(experiencia);
      setModalidad(response.data.oferta.id_modalidad);
      setEmpresa(response.data.oferta.empresa);
      setPeriodo(response.data.oferta.id_periodo_academico);
    }
  };
  useEffect(() => {
    getoferta();
  }, []);

  const remainingChars = 1000 - descripcion.length;
  const remainingCharsColor =
    remainingChars > 200 ? "green" : remainingChars > 100 ? "orange" : "red";

  if (!loading) {
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
                // Ajustar altura para ocupar todo el espacio disponible
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
              width: "100%", // Asegurar que el Grid ocupe todo el ancho disponible
            }}
          >
            <Grid
              sx={{
                padding: "20px",
                backgroundColor: "white",
                width: "100%",
                margin: "16px",
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
                <Typography
                  variant="h4"
                  sx={{ textAlign: "center" }}
                ></Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(-1)}
                >
                  Volver
                </Button>
              </Box>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  marginTop: "1px",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Modificar Oferta Práctica Profesional{" "}
                <Work style={{ marginLeft: "5px" }} />{" "}
              </Typography>

              <form
                style={{ width: "85%", margin: "0px auto" }}
                onSubmit={onSubmit}
              >
                <Card sx={{ padding: "15px", marginBottom: "10px" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={11} xl={11} lg={12} md={12} sm={11}>
                      <TextField
                        label="Descripcion"
                        multiline
                        rows={5}
                        value={descripcion}
                        required
                        onChange={(e) => {
                          setDescripcion(e.target.value);
                        }}
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          maxLength: 1001,
                        }}
                      />
                      <p
                        style={{
                          color: remainingCharsColor,
                          fontSize: "15px",
                          textAlign: "center",
                        }}
                      >
                        {remainingChars >= 0
                          ? `Carácteres restantes: ${remainingChars}`
                          : "Has superado el límite de carácteres. Por favor, reduce tu descripción."}
                      </p>
                    </Grid>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                      <TextField
                        label="Cupos"
                        value={cupos}
                        type="number"
                        inputProps={{ min: 0 }}
                        required
                        onChange={(e) => {
                          setCupos(e.target.value);
                        }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                      <FormControl fullWidth>
                        <InputLabel>Experiencia Laboral</InputLabel>
                        <Select
                          label="Experiencia Laboral"
                          value={experiencia}
                          onChange={(e) => {
                            setExperiencia(e.target.value);
                          }}
                          fullWidth
                        >
                          <MenuItem value={0}>No</MenuItem>
                          <MenuItem value={1}>Si</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                      <FormControl fullWidth>
                        <InputLabel>Modalidad</InputLabel>
                        <Select
                          required
                          label="Modalidad"
                          value={modalidad}
                          onChange={(e) => {
                            setModalidad(e.target.value);
                          }}
                          fullWidth
                        >
                          {getmodalidades.status == "success" &&
                            getmodalidades.data.map((modalidad, idx) => (
                              <MenuItem
                                key={idx}
                                value={modalidad.id_modalidad}
                              >
                                {modalidad.nombre_modalidad}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                      <Autocomplete
                        options={getEmpresas.data || []}
                        getOptionLabel={(option) => option.nombre || ""}
                        value={empresa}
                        onChange={(event, newValue) => {
                          setEmpresa(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="Empresa" fullWidth />
                        )}
                        noOptionsText="Sin coincidencias"
                      />
                    </Grid>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                      <FormControl fullWidth>
                        <InputLabel>Periodo académico</InputLabel>
                        <Select
                          required
                          label="Periodo académico"
                          value={periodo}
                          onChange={(e) => {
                            setPeriodo(e.target.value);
                          }}
                          fullWidth
                        >
                          {getPeriodos.status == "success" &&
                            Array.isArray(getPeriodos.data) &&
                            getPeriodos.data.map((periodo, idx) => (
                              <MenuItem
                                key={idx}
                                value={periodo.id_periodo_academico}
                              >
                                {periodo.anio} - {periodo.periodo}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      xl={12}
                      lg={12}
                      md={12}
                      sm={12}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        type="submit"
                        sx={{ maxWidth: "250px", margin: "0px auto" }}
                        variant="contained"
                        disabled={remainingChars === -1}
                      >
                        Actualizar
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
};
export default ModificarOferta;
