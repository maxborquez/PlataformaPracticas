import {
  Grid,
  Button,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
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

  const [rut_empresa, setRut] = useState("");
  const [razon_social, setRazonSocial] = useState("");
  const [direccion, setDireccion] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState({});
  const [estado, setEstado] = useState("");
  const [empresa, setEmpresa] = useState({ id_ciudad: "", nombre: "" });

  const getciudades = useQuery("ciudades", async () => {
    const response = await clienteAxios.get("/ciudad/getCiudades");
    if (response.status == 200) {
      return response.data.ciudad;
    }
  });
  const navigate = useNavigate();
  const getEmpresa = async () => {
    const response = await clienteAxios.get(`/empresa/show/${id}`);
    if (response.status == 200) {
      setEmpresa(response.data.empresa);
      setRut(response.data.empresa.rut_empresa);
      setRazonSocial(response.data.empresa.razon_social);
      setDireccion(response.data.empresa.direccion);
      setCorreo(response.data.empresa.correo);
      setTelefono(response.data.empresa.telefono);
      console.log(response.data);
      setCiudad(response.data.empresa.ciudad);
      setEstado(response.data.empresa.id_estado_empresa);
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmpresa();
  }, []);

  const handleCiudad = (event) => {
    setCiudad(event.target.value);
  };

  const getEstados = useQuery("estados", async () => {
    const response = await clienteAxios.get("/estadoempresa/getall");
    return response.data.estados;
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const data_oficial = {
      rut_empresa: rut_empresa,
      razon_social: razon_social,
      direccion: direccion,
      correo: correo,
      telefono: telefono,
      id_ciudad: ciudad.id_ciudad,
      id_estado_empresa: estado,
    };
    const response = await clienteAxios.put(
      `empresa/update/${id}`,
      data_oficial
    );

    if (response.status == 200) {
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
        <Card sx={{ padding: "20px", width: "100%", margin:"16px", backgroundColor: "white" }}>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            Empresa seleccionada: {empresa.razon_social}{" "}
          </Typography>
          <form method="POST" onSubmit={onSubmit}>
            <Grid container spacing={2} sx={{ marginTop: "10px" }}>
              <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                <TextField
                  sx={{ backgroundColor: "white" }}
                  label="Rut"
                  fullWidth
                  value={rut_empresa}
                  onChange={(e) => {
                    setRut(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                <TextField
                  sx={{ backgroundColor: "white" }}
                  label="Razón social"
                  value={razon_social}
                  onChange={(e) => {
                    setRazonSocial(e.target.value);
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
                  label="Correo"
                  sx={{ backgroundColor: "white" }}
                  value={correo}
                  onChange={(e) => {
                    setCorreo(e.target.value);
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
                  options={getciudades.data || []}
                  getOptionLabel={(option) => option.nombre || ""}
                  value={ciudad}
                  onChange={(event, newValue) => {
                    setCiudad(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Ciudad" fullWidth />
                  )}
                  noOptionsText="Sin coincidencias"
                />
              </Grid>
              <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                <FormControl  fullWidth>
                  <InputLabel>Estado Empresa</InputLabel>
                  <Select
                    label="Estado Empresa"
                    sx={{ backgroundColor: "white" }}
                    value={estado}
                    onChange={(e) => {
                      setEstado(e.target.value);
                    }}
                    fullWidth
                  >
                    {getEstados.status == "success" &&
                      getEstados.data.map((estado, idx) => {
                        return (
                          <MenuItem key={idx} value={estado.id_estado_empresa}>
                            {estado.nombre_estado_empresa}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
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
};

export default FormularioModificar;
