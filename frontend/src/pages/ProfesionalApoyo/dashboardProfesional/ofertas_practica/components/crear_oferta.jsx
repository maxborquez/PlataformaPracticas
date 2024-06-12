import { useState, useEffect } from 'react';
import { Grid, Typography, Button, Card, FormControl, InputLabel, MenuItem, Select, TextField, Autocomplete } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import clienteAxios from "../../../../../helpers/clienteaxios";
import Swal from "sweetalert2";
import Header from "../../../../../components/headers/header";
import { Work } from "@mui/icons-material";
import SidebarProfesional from "../../../../../components/sidebars/sidebarProfesional";

const CrearOferta = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [cupos, setCupos] = useState("");
  const [experiencia, setExperiencia] = useState(0);
  const [modalidad, setModalidad] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [periodo, setPeriodo] = useState('');

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
    navigate('/ofertapracticas');
  };

  const getmodalidades = useQuery("modalidades", async () => {
    const response = await clienteAxios.get("/inscripcion/modalidades");
    if (response.status === 200) {
      return response.data.modalidades;
    }
  });

  const getEmpresas = useQuery("empresas", async () => {
    const response = await clienteAxios.get("/empresa/getall");
    if (response.status === 200) {
      return response.data.empresas;
    }
  });

  const getPeriodos = useQuery("periodos", async () => {
    const response = await clienteAxios.get("/periodo/getall");
    if (response.status === 200) {
      return response.data.periodos;
    }
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      descripcion: descripcion,
      experiencia_laboral: experiencia === 1,
      cupos: Number(cupos),
      id_modalidad: modalidad,
      id_periodo_academico: periodo,
      id_empresa: empresa.id_empresa
    };

    const response = await clienteAxios.post("/oferta/create", data);
    if (response.status === 200) {
      Swal.fire({
        title: "Registrado",
        text: "La oferta de práctica ha sido registrada correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      setTimeout(() => {
        navigate("/ofertapracticas");
        Swal.close();
      }, 2000);
    }
  };

  const remainingChars = 1000 - descripcion.length;
  const remainingCharsColor = remainingChars > 200 ? 'green' : remainingChars > 100 ? 'orange' : 'red';

  return (
    <Grid container direction="column" sx={{ backgroundColor: "#e8e9eb", minHeight: "100vh" }}>
      <Grid item sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Header toggleSidebar={toggleSidebar} isWideScreen={isWideScreen} showSidebarButton={true}/>
      </Grid>
      <Grid container>
        {sidebarOpen && (
          <Grid item xs={3} sx={{ position: "fixed", top: "80px", zIndex: 1200 }}>
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
          }}
        >
          <Card
            sx={{
              padding: "15px",
              backgroundColor: "withe",
              maxWidth: "1200px",
              margin: "auto",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              Crear Oferta Práctica Profesional
              <Work style={{ marginTop: "2px", marginLeft: "5px" }} />
            </Typography>
            <Grid container justifyContent="flex-end" sx={{ paddingRight: 2, mb: 2 }}>
              <Button variant="contained" color="primary" onClick={handleBack} sx={{ paddingRight: 2, mr: 14 }}>
                Volver
              </Button>
            </Grid>
            <form style={{ width: "85%", margin: "0px auto", marginBottom: "10px" }} onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={11} xl={11} lg={12} md={12} sm={11}>
                  <TextField
                    label="Descripcion"
                    multiline
                    sx={{ backgroundColor: "white" }}
                    rows={5}
                    value={descripcion}
                    required
                    onChange={(e) => setDescripcion(e.target.value)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ maxLength: 1001 }}
                  />
                  <p style={{ color: remainingCharsColor, fontSize: '15px', textAlign: 'center' }}>
                    {remainingChars >= 0 ? `Carácteres restantes: ${remainingChars}` : 'Has superado el límite de carácteres. Por favor, reduce tu descripción.'}
                  </p>
                </Grid>
                <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                  <TextField
                    sx={{ backgroundColor: "white" }}
                    label="Cupos"
                    value={cupos}
                    type="number"
                    inputProps={{ min: 0 }}
                    required
                    onChange={(e) => setCupos(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                  <FormControl fullWidth>
                    <InputLabel>Experiencia Laboral</InputLabel>
                    <Select
                      sx={{ backgroundColor: "white" }}
                      label="Experiencia Laboral"
                      value={experiencia}
                      onChange={(e) => setExperiencia(e.target.value)}
                      fullWidth
                    >
                      <MenuItem value={0}>No</MenuItem>
                      <MenuItem value={1}>Si</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel>Modalidad</InputLabel>
                    <Select
                      sx={{ backgroundColor: "white" }}
                      required
                      label="Modalidad"
                      value={modalidad}
                      onChange={(e) => setModalidad(e.target.value)}
                      fullWidth
                    >
                      {getmodalidades.status === "success" && getmodalidades.data.map((modalidad, idx) => (
                        <MenuItem key={idx} value={modalidad.id_modalidad}>{modalidad.nombre_modalidad}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                  <Autocomplete
                    sx={{ backgroundColor: "white", marginTop: "15px" }}
                    options={getEmpresas.data || []}
                    getOptionLabel={(option) => option.razon_social || ""}
                    value={empresa}
                    onChange={(event, newValue) => setEmpresa(newValue)}
                    renderInput={(params) => <TextField {...params} label="Empresa" fullWidth />}
                    noOptionsText="Sin coincidencias"
                  />
                </Grid>
                <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel>Periodo académico</InputLabel>
                    <Select
                      required
                      label="Periodo académico"
                      sx={{ backgroundColor: "white" }}
                      value={periodo}
                      onChange={(e) => setPeriodo(e.target.value)}
                      fullWidth
                    >
                      {getPeriodos.status === "success" && Array.isArray(getPeriodos.data) && getPeriodos.data.map((periodo, idx) => (
                        <MenuItem key={idx} value={periodo.id_periodo_academico}>{periodo.anio} - {periodo.periodo}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={11} xl={6} lg={12} md={6} sm={10} sx={{ display: "flex", justifyContent: "center" }}>
                  <Button type="submit" variant="contained" disabled={remainingChars === -1}>Publicar oferta</Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CrearOferta;
