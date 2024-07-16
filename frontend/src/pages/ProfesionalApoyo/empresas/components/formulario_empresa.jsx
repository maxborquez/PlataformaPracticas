import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Grid,
  Button,
  TextField,
  Typography,
  Alert,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Business } from "@mui/icons-material";
import { useQuery, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import clienteAxios from "../../../../helpers/clienteaxios";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";

const FormularioEmpresa = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [comuna, setComuna] = useState("");
  const [regiones, setRegiones] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [region, setRegion] = useState("");
  const [provincia, setProvincia] = useState("");
  const queryClient = useQueryClient();
  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerRegiones = async () => {
      try {
        const response = await clienteAxios.get("/comuna/regiones");
        setRegiones(response.data);
      } catch (error) {
        console.error("Error al obtener las regiones:", error);
      }
    };

    obtenerRegiones();
  }, []);

  const handleRegionChange = async (regionId) => {
    try {
      const response = await clienteAxios.get(
        `/comuna/getProvinciaByRegion/${regionId}`
      );
      setProvincias(response.data);
      setRegion(regionId);
      setProvincia("");
      setComuna("");
    } catch (error) {
      console.error("Error al obtener las provincias por región:", error);
    }
  };

  const handleProvinciaChange = async (provinciaId) => {
    try {
      const response = await clienteAxios.get(
        `/comuna/getComunasByProvincia/${provinciaId}`
      );
      setComunas(response.data);
      setProvincia(provinciaId);
      setComuna("");
    } catch (error) {
      console.error("Error al obtener las comunas por provincia:", error);
    }
  };

  const handleBack = () => {
    navigate("/centros_practicas");
  };

  const onSubmit = async (data) => {
    Swal.fire({
      title: "¿Estás seguro de los datos?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
      customClass: {
        container: "sweetalert_container",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data_oficial = {
          nombre: data.nombre,
          departamento: data.departamento,
          web: data.web,
          rubro: data.rubro,
          direccion: data.direccion,
          telefono: data.telefono,
          id_comuna: parseInt(comuna,10),
          id_estado_empresa: 2,
        };
        const response = await clienteAxios.post(
          "/empresa/create",
          data_oficial
        );

        if (response.status === 200) {
          Swal.fire({
            title: "Registrado",
            text: "La empresa ha sido registrada correctamente",
            icon: "success",
            confirmButtonText: "Aceptar",
            customClass: {
              container: "sweetalert_container",
            },
          });
          setTimeout(() => {
            queryClient.refetchQueries("empresas");
            formRef.current.reset();
            Swal.close();
          }, 2000);
        }
      }
    });
  };

  return (
    <Grid container justifyContent="center" sx={{ width: "100%" }}>
      <Card
        sx={{
          padding: "20px",
          width: "100%",
          margin: "16px",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Registro de empresa <Business style={{ marginLeft: "5px" }} />
        </Typography>
        <form method="POST" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ marginTop: "10px" }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nombre"
                fullWidth
                {...register("nombre", { required: true })}
              />
              {errors.nombre && (
                <Alert sx={{ marginTop: "5px" }} severity="error">
                  Este campo es requerido
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Departamento"
                {...register("departamento", { required: true })}
                fullWidth
              />
              {errors.departamento && (
                <Alert sx={{ marginTop: "5px" }} severity="error">
                  Este campo es requerido
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Web"
                {...register("web", { required: true })}
                fullWidth
              />
              {errors.web && (
                <Alert sx={{ marginTop: "5px" }} severity="error">
                  Este campo es requerido
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Rubro"
                {...register("rubro", { required: true })}
                fullWidth
              />
              {errors.rubro && (
                <Alert sx={{ marginTop: "5px" }} severity="error">
                  Este campo es requerido
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Dirección"
                {...register("direccion", { required: true })}
                fullWidth
              />
              {errors.direccion && (
                <Alert sx={{ marginTop: "5px" }} severity="error">
                  Este campo es requerido
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Teléfono"
                fullWidth
                type="text"
                placeholder="9xxxxxxxx"
                inputProps={{ maxLength: 9 }}
                {...register("telefono", {
                  required: true,
                  pattern: {
                    value: /^\d{9}$/, // Patrón para asegurarse de que tenga exactamente 9 dígitos
                    message: "El número de teléfono debe tener 9 dígitos",
                  },
                })}
              />
              {errors.telefono && (
                <Alert sx={{ marginTop: "5px" }} severity="error">
                  {errors.telefono.message}
                </Alert>
              )}
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Región</InputLabel>
                <Select
                  value={region}
                  onChange={(e) => handleRegionChange(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Seleccione una región</em>
                  </MenuItem>
                  {regiones.map((region) => (
                    <MenuItem
                      key={region.id_region}
                      value={region.id_region}
                    >
                      {region.nombre_region}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Provincia</InputLabel>
                <Select
                  value={provincia}
                  onChange={(e) => handleProvinciaChange(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Seleccione una provincia</em>
                  </MenuItem>
                  {provincias.map((provincia) => (
                    <MenuItem
                      key={provincia.id_provincia}
                      value={provincia.id_provincia}
                    >
                      {provincia.nombre_provincia}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Comuna</InputLabel>
                <Select
                  value={comuna}
                  onChange={(e) => setComuna(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Seleccione una comuna</em>
                  </MenuItem>
                  {comunas.map((comuna) => (
                    <MenuItem key={comuna.id_comuna} value={comuna.id_comuna}>
                      {comuna.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{ width: "200px", margin: "0px auto" }}
              >
                Registrar Empresa
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Grid>
  );
};

export default FormularioEmpresa;
