import {
  Grid,
  Button,
  TextField,
  Typography,
  Card,
} from "@mui/material";
import { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import { useQuery } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";

const FormularioModificar = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [nombre, setNombre] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [web, setWeb] = useState("");
  const [rubro, setRubro] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [comuna, setComuna] = useState({});
  const [empresa, setEmpresa] = useState({ id_comuna: "", nombre: "" });

  const getcomunas = useQuery("comunas", async () => {
    const response = await clienteAxios.get("/comuna/getComunas");
    if (response.status === 200) {
      return response.data.comuna;
    }
  });

  const navigate = useNavigate();

  const getEmpresa = async () => {
    const response = await clienteAxios.get(`/empresa/show/${id}`);
    if (response.status === 200) {
      setEmpresa(response.data.empresa);
      setNombre(response.data.empresa.nombre);
      setDepartamento(response.data.empresa.departamento);
      setWeb(response.data.empresa.web);
      setRubro(response.data.empresa.rubro);
      setDireccion(response.data.empresa.direccion);
      setTelefono(response.data.empresa.telefono);
      setComuna(response.data.empresa.comuna);
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmpresa();
  }, []);

  const handleComuna = (event) => {
    setComuna(event.target.value);
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    const data_oficial = {
      nombre: nombre,
      departamento: departamento,
      web: web,
      rubro: rubro,
      direccion: direccion,
      telefono: telefono,
      id_comuna: comuna.id_comuna,
    };
    const response = await clienteAxios.put(
      `empresa/update/${id}`,
      data_oficial
    );

    if (response.status === 200) {
      Swal.fire({
        title: "Actualizada",
        text: "La empresa ha sido actualizada correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        customClass: {
          container: "sweetalert_container",
        },
      });
      setTimeout(() => {
        navigate("/centros_practicas");
        Swal.close();
      }, 2000);
    }
  };

  if (!loading) {
    return (
      <Grid container justifyContent="center" sx={{ width: "100%" }}>
        <Card sx={{ padding: "20px", width: "100%", margin: "16px", backgroundColor: "white" }}>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            Empresa seleccionada: {empresa.nombre}
          </Typography>
          <form method="POST" onSubmit={onSubmit}>
            <Grid container spacing={2} sx={{ marginTop: "10px" }}>
              <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                <TextField
                  sx={{ backgroundColor: "white" }}
                  label="Nombre"
                  fullWidth
                  value={nombre}
                  onChange={(e) => {
                    setNombre(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                <TextField
                  sx={{ backgroundColor: "white" }}
                  label="Departamento"
                  value={departamento}
                  onChange={(e) => {
                    setDepartamento(e.target.value);
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                <TextField
                  label="Web"
                  sx={{ backgroundColor: "white" }}
                  value={web}
                  onChange={(e) => {
                    setWeb(e.target.value);
                  }}
                  fullWidth
                />
              </Grid>

              <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                <TextField
                  label="Rubro"
                  sx={{ backgroundColor: "white" }}
                  value={rubro}
                  onChange={(e) => {
                    setRubro(e.target.value);
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                <TextField
                  label="Dirección"
                  sx={{ backgroundColor: "white" }}
                  value={direccion}
                  onChange={(e) => {
                    setDireccion(e.target.value);
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                <TextField
                  label="Teléfono"
                  sx={{ backgroundColor: "white" }}
                  value={telefono}
                  onChange={(e) => {
                    setTelefono(e.target.value);
                  }}
                  fullWidth
                />
              </Grid>

              <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                <Autocomplete
                  sx={{ backgroundColor: "white" }}
                  options={getcomunas.data || []}
                  getOptionLabel={(option) => option.nombre || ""}
                  value={comuna}
                  onChange={(event, newValue) => {
                    setComuna(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Comuna" fullWidth />
                  )}
                  noOptionsText="Sin coincidencias"
                />
              </Grid>

              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                item
                xs={12}
                xl={12}
                lg={12}
                md={12}
                sm={12}
              >
                <Button variant="contained" type="submit" sx={{ width: "200px", margin: "0px auto" }}>
                  Actualizar Empresa
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Grid>
    );
  }

  return null;
};

export default FormularioModificar;
